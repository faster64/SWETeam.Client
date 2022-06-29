import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginVerifyComponent } from './login-verify.component';

const routes: Routes = [
  {
    path: '',
    component: LoginVerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginVerifyRoutingModule { }
