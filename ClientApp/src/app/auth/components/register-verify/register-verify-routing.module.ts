import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterVerifyComponent } from './register-verify.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterVerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterVerifyRoutingModule { }
