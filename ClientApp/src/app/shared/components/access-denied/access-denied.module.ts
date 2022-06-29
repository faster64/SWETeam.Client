import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessDeniedRoutingModule } from './access-denied-routing.module';
import { SWETeamButtonModule } from '../button/swe-team-button.module';
import { AccessDeniedComponent } from './access-denied.component';


@NgModule({
  declarations: [AccessDeniedComponent],
  imports: [
    CommonModule,
    AccessDeniedRoutingModule,
    SWETeamButtonModule
  ],
  exports: [AccessDeniedComponent]
})
export class AccessDeniedModule { }
