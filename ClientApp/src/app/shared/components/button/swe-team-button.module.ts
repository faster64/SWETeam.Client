import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SWETeamButton } from './swe-team-button.component';
import {MatButtonModule} from '@angular/material/button';
// import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [SWETeamButton],
  imports: [
    CommonModule,
    MatButtonModule,
    // MatDividerModule,
    MatIconModule
  ],
  exports: [
    SWETeamButton
  ]
})
export class SWETeamButtonModule { }
