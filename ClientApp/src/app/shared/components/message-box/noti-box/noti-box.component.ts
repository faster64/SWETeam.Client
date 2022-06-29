import { Component, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageBoxType } from 'src/app/shared/enumerations/common.enum';
import { Message } from 'src/app/shared/models/message/message';

@Component({
  selector: 'swe-team-noti-box',
  templateUrl: './noti-box.component.html',
  styleUrls: ['./noti-box.component.scss']
})
export class NotiBoxComponent implements OnInit, OnDestroy {

  public _onDestroySub: Subject<void> = new Subject<void>();

  MessageBoxType = MessageBoxType;

  constructor(
    public dialogRef: MatDialogRef<NotiBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Xác nhận
   */
  confirm(e: any) {
    this.data.callback(e);
  }

  /**
   * Xác nhận xóa
   */
  confirmDelete(e: any) {
    this.data.callback(e);
  }

  /**
   * Đồng ý
   */
  agree(e: any) {
    this.data.callback(e);
  }

  ngOnDestroy(): void {
    // unsubscribe khi destroy
    if (this._onDestroySub) {
      this._onDestroySub.next();
      this._onDestroySub.complete();
      this._onDestroySub.unsubscribe();
    }
  }
}
