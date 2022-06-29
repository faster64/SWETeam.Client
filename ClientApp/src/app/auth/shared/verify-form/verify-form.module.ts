import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyFormComponent } from './verify-form.component';
import { VerifyBoxModule } from '../verify-box/verify-box.module';
import { SWETeamButtonModule } from 'src/app/shared/components/button/swe-team-button.module';


@NgModule({
  declarations: [VerifyFormComponent],
  imports: [
    CommonModule,
    VerifyBoxModule,
    SWETeamButtonModule
  ],
  exports: [VerifyFormComponent],
})
export class VerifyFormModule { }
