import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginVerifyRoutingModule } from './login-verify-routing.module';
import { LoginVerifyComponent } from './login-verify.component';


@NgModule({
  declarations: [LoginVerifyComponent],
  imports: [
    CommonModule,
    LoginVerifyRoutingModule
  ],
  exports: [LoginVerifyComponent],
})
export class LoginVerifyModule { }
