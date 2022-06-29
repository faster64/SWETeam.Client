import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SWETeamButton } from 'src/app/shared/components/button/swe-team-button.component';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { ErrorMessageConstant, Routing } from 'src/app/shared/constants/common.constant';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage.key';
import { SessionStorageKey } from 'src/app/shared/constants/sessionstorage.key';
import { HttpStatusCodeExtension } from 'src/app/shared/enumerations/http-status-code-extension.enum';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { TransferDataService } from 'src/app/shared/services/transfer/transfer-data.service';
import { environment } from 'src/environments/environment';
import { UserCred } from '../../models/requests/user-cred';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild("email") emailInput!: ElementRef;
  @ViewChild("password") passwordInput!: ElementRef;
  @ViewChild("loginBtn")
  loginBtn!: SWETeamButton;

  userCred = new UserCred();

  constructor(
    private _transfer: TransferDataService,
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
   * Nếu đã logged in thì đẩy vào dashboard
   */
  checkLoggedIn() {
    if(this._authService.isLoggedIn()) {
      this._router.navigate([Routing.DASHBOARD]);
    }
  }

  /**
   * khởi tạo form
   */
  initForm() {
    this.userCred.UserName = "cuongnguyen.ftdev@gmail.com";
    this.userCred.Password = "10041998Cc!";
    this.emailInput.nativeElement.focus();
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
   * Validate trước khi tiến hành đăng nhập
   */
  validateBeforeLogin(): boolean {
    if (this.userCred.UserName.isNullOrEmpty()) {
      return this.executeOnError("email", "Tài khoản không được để trống");

    } else if (this.userCred.Password.isNullOrEmpty()) {
      return this.executeOnError("password", "Mật khẩu không được để trống");
    }

    return true;
  }

  /**
   * Đăng nhập
   */
  login(e: any) {
    if (!this.validateBeforeLogin()) {
      this.loginBtn.isFinished = true;
      return;
    }
    SnackBar.dismiss();

    const cred = new UserCred();
    cred.UserName = btoa(this.userCred.UserName);
    cred.Password = btoa(this.userCred.Password);
    this._authService.login(cred).subscribe(
      response => {
        this.loginBtn.isFinished = true;
        if (response.Code == HttpStatusCode.Ok) {
          this._authService.saveAuthConfig(response);
          localStorage.setItem(`${environment.team}_${LocalStorageKey.LOGGED_IN}`, '1');
          this._transfer.subOrUnsubCheckLiveToken.emit("sub");
          this._router.navigateByUrl(`/${Routing.DASHBOARD}`);

        } else if (response.Code == HttpStatusCode.BadRequest) {
          SnackBar.openSnackBarDanger(new SnackBarParameter(null, response.ErrorMessage));
        }
        // Nếu tài khoản chưa đc xác minh
        else if (response.Code == HttpStatusCodeExtension.NotVerified) {
          const message = new Message(this, {
            title: 'Thông báo',
            content: ErrorMessageConstant.ACCOUNT_NOT_VERIFIED,
            confirmText: 'Xác minh ngay',
          });
          message.callback = () => {
            this._router.navigateByUrl(`/${Routing.VERIFY_REGISTER}/${cred.UserName}`);
          }

          MessageBox.cofirm(message);
        }

      },

      () => {
        this.loginBtn.isFinished = true;
        SnackBar.openSnackBarDanger(new SnackBarParameter(null, ErrorMessageConstant.HAS_ERROR_MESSAGE));
      }
    );
  }

  /**
   * Đăng nhập khi ấn enter
   */
  loginByEnter(e: any) {
    if (e.key === "Enter") {
      this.login(e);
    }
  }
}
