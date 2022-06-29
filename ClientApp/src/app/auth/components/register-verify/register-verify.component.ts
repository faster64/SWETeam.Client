import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBox } from 'src/app/shared/components/message-box/message-box.component';
import { SnackBar } from 'src/app/shared/components/snackbar/snackbar.component';
import { Routing } from 'src/app/shared/constants/common.constant';
import { OtpType } from 'src/app/shared/enumerations/common.enum';
import { Message } from 'src/app/shared/models/message/message';
import { SnackBarParameter } from 'src/app/shared/models/snackbar/snackbar.param';
import { VerifyOtpResult } from '../../models/responses/verify-otp-result';
import { AuthService } from '../../services/auth.service';
import { VerifyFormComponent } from '../../shared/verify-form/verify-form.component';

@Component({
  selector: 'app-register-verify',
  templateUrl: './register-verify.component.html',
  styleUrls: ['./register-verify.component.scss']
})
export class RegisterVerifyComponent extends VerifyFormComponent {

  endpoint = "verify-account";

  message = new Message(this, null);

  constructor(
    authSV: AuthService,
    activatedRoute: ActivatedRoute,
    router: Router
  ) {
    super(authSV, activatedRoute, router);
  }

  verifySuccess(response: VerifyOtpResult | Event) {
    const message = new Message(this, {
      title: 'Thông báo',
      content: "Chúc mừng, tài khoản của bạn đã được thành công. Bạn có muốn đăng nhập?",
      confirmText: 'OK',
    });
    message.callback = () => {
      this.router.navigateByUrl(`/${Routing.LOGIN}`);
    }

    MessageBox.cofirm(message);
  }

  verifyFailed(response: VerifyOtpResult | Event) {
    SnackBar.openSnackBarDanger(new SnackBarParameter(this, (response as VerifyOtpResult).ErrorMessage));
  }

  /**
   * Gửi lại OTP xác minh tài khoản
   */
  resend(message: Message) {
    this.authSV.sendNewOtp(this.userMail, OtpType.Verify).subscribe(response => {
      if (response.Success) {
        SnackBar.openSnackBarSuccess(new SnackBarParameter(null, response.Message, "", SnackBar.forever));
      }
      else {
        SnackBar.openSnackBarDanger(new SnackBarParameter(null, response.ErrorMessage, "", SnackBar.forever));
        message.callback();
      }
    })
  }
}
