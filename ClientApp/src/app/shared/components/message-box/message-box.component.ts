import { Component, OnInit } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxType } from '../../enumerations/common.enum';
import { Message } from '../../models/message/message';
import { NotiBoxComponent } from './noti-box/noti-box.component';

@Component({
  selector: 'message-box',
  template: '',
  styles: [],
})
export class MessageBox implements OnInit {
  private static _dialog: MatDialog;
  private static _config: MatDialogConfig;

  constructor(
    public dialog: MatDialog
  ) {
    MessageBox._dialog = dialog;
  }

  ngOnInit(): void {
    MessageBox.initConfig();
  }

  /**
   * Khởi tạo common config
   */
  private static initConfig() {
    this._config = new MatDialogConfig();
    const position: DialogPosition = {};
    position.top = '50px';

    this._config.minWidth = '440px';
    this._config.maxWidth = '80%';
    this._config.minHeight = '120px';
    this._config.maxHeight = '280px';
    this._config.position = position;
  }

  /**
   * Chuẩn bị config để open dialog
   */
  private static prepareConfig(message: Message, boxType: MessageBoxType) {
    const config = this._config;

    message.data = Object.assign(message.data || {}, { boxType: boxType })
    config.data = message;

    return config;
  }


  /**
   * Mở dialog confirm
   * Cách dùng: Ví dụ tại component A, muốn mở dialog:
   * MessageBox.openConfirm( new Message(this, {title: 'your-title', content: 'your-content', 'your-callback'}) );
   */
  public static cofirm(message: Message) {
    const config = this.prepareConfig(message, MessageBoxType.Confirm)
    const dialogRef = MessageBox._dialog.open(NotiBoxComponent, config);

    return dialogRef.afterClosed();
  }

  /**
   * Mở dialog confirm
   * Cách dùng: Ví dụ tại component A, muốn mở dialog:
   * MessageBox.openConfirmDelete( new Message(this, {title: 'your-title', content: 'your-content', 'your-callback'}) );
   */
  public static confirmDelete(message: Message) {
    const config = this.prepareConfig(message, MessageBoxType.ConfirmDelete)
    const dialogRef = MessageBox._dialog.open(NotiBoxComponent, config);

    return dialogRef.afterClosed();
  }

  /**
   * Mở dialog confirm
   * Cách dùng: Ví dụ tại component A, muốn mở dialog:
   * MessageBox.openInformation( new Message(this, {title: 'your-title', content: 'your-content', 'your-callback'}) );
   */
  public static information(message: Message) {
    const config = this.prepareConfig(message, MessageBoxType.Information)
    const dialogRef = MessageBox._dialog.open(NotiBoxComponent, config);

    return dialogRef.afterClosed();
  }

  /**
   * Customize
   */
  public static openCustom(component: any, message: Message) {
    const config = this.prepareConfig(message, MessageBoxType.None)
    const dialogRef = MessageBox._dialog.open(component, config);

    return dialogRef.afterClosed();
  }
}
