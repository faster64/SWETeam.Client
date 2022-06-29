import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Message } from '../../../shared/models/message/message';
import { SnackBarParameter, SnackBarType } from '../../../shared/models/snackbar/snackbar.param';
import { TransferDataService } from '../../../shared/services/transfer/transfer-data.service';
import { ObjectHelper } from '../../../shared/helpers/object-helper';
import { SWETeamButton } from '../../../shared/components/button/swe-team-button.component';
import { VerifyOtpResult } from '../../models/responses/verify-otp-result';

@Component({
  selector: 'verify-box',
  templateUrl: './verify-box.component.html',
  styleUrls: ['./verify-box.component.scss']
})
export class VerifyBoxComponent implements OnInit {
  private _length: number = 6;
  private _verifyTextDefault = "Verify";
  private _verifyingTextDefault = "Verifying...";

  @Input()
  verifyText = this._verifyTextDefault;

  @Input()
  verifyingText = this._verifyingTextDefault;

  @Input()
  get length(): number {
    return this._length;
  }

  set length(value: number) {
    if (value < 6 || value > 16) {
      this._length = 6;
      throw Error("OTP's length must greater than or equal to 6 and less than or equal to 16");
    }
    this._length = value;
  }

  @Input()
  allowNumbersOnly = false;

  @Input()
  isPasswordInput = false;

  @Input()
  disableAutoFocus = false;

  @Input()
  placeholder = "";

  @Input()
  requiredTime = 60;

  @Output()
  onReady = new EventEmitter<any>();

  @Output()
  onResend = new EventEmitter<any>();

  @ViewChild("verifyBtn")
  verifyBtn!: SWETeamButton;

  @ViewChild(NgOtpInputComponent, { static: false }) otpInput!: NgOtpInputComponent;

  countdown = this.requiredTime;
  isShowResend = true;
  intervalId: any;

  /**
   * Disabled button verify khi chưa nhập đủ
   */
  disabledBtn = true;

  constructor(
    private _transfer: TransferDataService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Xử lý khi change OTP
   */
  onChange(e: string) {
    if (e.length === this._length) {
      this.disabledBtn = false;
      this.verifyBtn.clickExecute(e);
    } else {
      this.disabledBtn = true;
      this.verifyBtn.isFinished = true;
      this.verifyBtn.disabled = true;
    }
  }

  /**
   * Emit OTP đã nhập
   */
  fireOTP(e: any) {
    let otp = "";
    otp = parseInt(e) + "";
    if (Number.isNaN(otp) || otp === 'NaN') {
      otp = this.otpInput.currentVal;
    }

    const message = new Message(this, otp);
    message.callback = (response: VerifyOtpResult) => {
      this.verifyBtn.isFinished = true;
    }
    this.onReady.emit(message);

  }

  /**
   * Gửi lại OTP
   */
  resend(e: any) {
    const message = new Message(this, null);

    this.isShowResend = false;
    this.intervalId = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        this.cancelCountDown();
      }
    }, 1000);

    message.callback = () => {
      this.cancelCountDown();
    };
    this.onResend.emit(message);
  }

  cancelCountDown() {
    this.isShowResend = true;
    this.countdown = this.requiredTime;
    clearInterval(this.intervalId);
  }
}

