import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SWETeamButton } from 'src/app/shared/components/button/swe-team-button.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { Routing } from 'src/app/shared/constants/common.constant';
import { ErrorCode } from 'src/app/shared/enumerations/error-code.enum';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { TransferDataService } from 'src/app/shared/services/transfer/transfer-data.service';
import { ObjectHelper } from 'src/app/shared/helpers/object-helper';
import { User } from '../../models/user-model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  user = new UserRegister();

  acceptPolicy = false;

  @ViewChild("registerBtn")
  registerBtn!: SWETeamButton;

  @ViewChild("email") emailInput!: ElementRef;
  @ViewChild("password") passwordInput!: ElementRef;
  @ViewChild("confirmPassword") confirmPasswordInput!: ElementRef;
  @ViewChild("firstName") firstNameInput!: ElementRef;
  @ViewChild("lastName") lastNameInput!: ElementRef;
  @ViewChild("address") addressInput!: ElementRef;

  constructor(
    private _transferDataSV: TransferDataService,
    private _authService: AuthService,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.checkLoggedIn();
  }

  ngAfterViewInit(): void {
    this.initForm();
    this._cdr.detectChanges();
  }

  /**
   * khởi tạo form
   */
  initForm() {
    this.user.Email = "cuongnguyen.ftdev@gmail.com";
    this.user.Password = "admin12@@";
    this.user.ConfirmPassword = "admin12@@";
    this.user.FirstName = "Nguyễn Văn";
    this.user.LastName = "Cương";
    this.user.Address = "154 Đình Thôn, Mỹ Đình, Hà Nội"
    this.acceptPolicy = true;
    this.emailInput.nativeElement.focus();
  }

  /**
   * Nếu đã logged in thì đẩy vào dashboard
   */
  checkLoggedIn() {
    if (this._authService.isLoggedIn()) {
      this._router.navigate([Routing.DASHBOARD]);
    }
  }

  /**
   * Thực thi khi có lỗi trong lúc validate
   */
  executeOnError(field: string, message: string): boolean {
    const snackBarParameter = new SnackBarParameter();
    snackBarParameter.duration = SnackBar.forever;
    snackBarParameter.message = message;
    snackBarParameter.afterDismissedCallback = () => this.focusOnFieldError(field);
    SnackBar.openSnackBarDanger(snackBarParameter);

    this.focusOnFieldError(field);
    return false;
  }

  /**
   * focus vào field lỗi
   */
  private focusOnFieldError(field: string) {
    if (field.isNullOrEmpty() === false) {
      (this as any)[`${field}Input`].nativeElement.focus();
    }
  }

  /**
   * Validate thông tin
   */
  validateInfo(): boolean {
    if (this.user.Email.isNullOrEmpty()) {
      return this.executeOnError("email", "Email không được để trống");

    } else if (this.user.Email.isMail() === false) {
      return this.executeOnError("email", "Email không đúng định dạng");

    } else if (this.user.Password.isNullOrEmpty()) {
      return this.executeOnError("password", "Mật khẩu không được để trống");

    } else if (this.user.ConfirmPassword.isNullOrEmpty()) {
      return this.executeOnError("confirmPassword", "Xác nhận mật khẩu không được để trống");

    } else if (this.user.Password !== this.user.ConfirmPassword) {
      return this.executeOnError("password", "Mật khẩu và mật khẩu xác nhận phải giống nhau");

    } else if (this.user.FirstName.isNullOrEmpty()) {
      return this.executeOnError("firstName", "Họ không được để trống");

    } else if (this.user.LastName.isNullOrEmpty()) {
      return this.executeOnError("lastName", "Tên không được để trống");

    } else if (this.user.Address.isNullOrEmpty()) {
      return this.executeOnError("address", "Địa chỉ không được để trống");

    } else if (!this.acceptPolicy) {
      return this.executeOnError("", "Bạn phải đồng ý với điều khoản");
    }

    return true;
  }

  /**
   * Xử lý data trước khi register
   */
  beforeRegister() {
    if (this.user.Gender) {
      try {
        this.user.Gender = parseInt(this.user.Gender + "");
      } catch (error) {
        throw Error("Có lỗi trong quá trình parse gender value");
      }
    }
  }

  /**
   * Đăng ký
   */
  register(e: any) {
    if (!this.validateInfo()) {
      this.registerBtn.isFinished = true;
      return;
    }

    SnackBar.dismiss();
    this.beforeRegister();

    this._authService.register(this.user).subscribe(response => {
      this.registerBtn.isFinished = true;
      if (response.Code === HttpStatusCode.Ok) {
        const mail = ObjectHelper.clone(this.user.Email);
        this.user = ObjectHelper.clearValue(this.user);

        const snackBarParameter = new SnackBarParameter();
        snackBarParameter.actionText = "OK";
        snackBarParameter.message = "Đăng ký tài khoản thành công. Kiểm tra mail để xác thực tài khoản. Xin cảm ơn!";
        snackBarParameter.duration = SnackBar.forever;
        snackBarParameter.afterDismissedCallback = () => {
          this._router.navigateByUrl(`/${Routing.VERIFY_REGISTER}/${btoa(mail)}`)
        }
        SnackBar.openSnackBarSuccess(snackBarParameter);
      } else {
        if (response.ValidateInfo && response.ValidateInfo.length) {
          const firstError = response.ValidateInfo[0];
          const snackBarParameter = new SnackBarParameter();
          if (firstError.FieldName.toLocaleLowerCase() === "email" && firstError.Code == ErrorCode.Duplicate) {
            snackBarParameter.message = "Email đã tồn tại. Vui lòng sử dụng email khác!";
            this.focusOnFieldError("email");
          } else {
            snackBarParameter.message = firstError.ErrorMessage;
          }

          SnackBar.openSnackBarDanger(snackBarParameter);
        } else {
          SnackBar.openSnackBarDanger(new SnackBarParameter(null, response.ErrorMessage));
        }
      }
    },
      error => this.registerBtn.isFinished = true
    );

  }
}

class UserRegister extends User {
  public ConfirmPassword: string = "";
}
