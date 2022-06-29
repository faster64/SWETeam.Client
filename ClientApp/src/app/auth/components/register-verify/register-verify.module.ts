import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterVerifyRoutingModule } from './register-verify-routing.module';
import { VerifyFormModule } from '../../shared/verify-form/verify-form.module';
import { RegisterVerifyComponent } from './register-verify.component';

@NgModule({
  declarations: [RegisterVerifyComponent],
  imports: [
    CommonModule,
    RegisterVerifyRoutingModule,
    VerifyFormModule
  ],
  exports: [RegisterVerifyComponent]
})
export class RegisterVerifyModule { }
