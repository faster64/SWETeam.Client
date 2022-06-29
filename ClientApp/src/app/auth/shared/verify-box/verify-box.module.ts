import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyBoxComponent } from './verify-box.component';
import { SWETeamButtonModule } from '../../../shared/components/button/swe-team-button.module';
import { NgOtpInputModule } from  'ng-otp-input';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VerifyBoxComponent],
  imports: [
    CommonModule,
    SWETeamButtonModule,
    NgOtpInputModule,
    SharedModule
  ],
  exports: [VerifyBoxComponent]
})
export class VerifyBoxModule { }
