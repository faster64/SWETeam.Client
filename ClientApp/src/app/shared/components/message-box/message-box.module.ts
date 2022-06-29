import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBox } from './message-box.component';
import { NotiBoxComponent } from './noti-box/noti-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [MessageBox, NotiBoxComponent, NotiBoxComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule
  ],
  exports: [
    MessageBox
  ]
})
export class MessageBoxModule { }
