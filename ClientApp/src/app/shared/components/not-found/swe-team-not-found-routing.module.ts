import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SWETeamNotFound } from './swe-team-not-found.component';

const routes: Routes = [
  {
    path: "",
    component: SWETeamNotFound
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SWETeamNotFoundRoutingModule { }
