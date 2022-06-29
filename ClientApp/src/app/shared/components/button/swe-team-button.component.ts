import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ButtonColor } from '../../constants/color.constant';
import { PerrmisionConstant } from '../../constants/common.constant';
import { SnackBarParameter, SnackBarType } from '../../models/snackbar/snackbar.param';
import { TransferDataService } from '../../services/transfer/transfer-data.service';
import { ObjectHelper } from '../../helpers/object-helper';
import { SnackBar } from '../snackbar/snackbar.component';

@Component({
  selector: 'swe-team-button',
  templateUrl: './swe-team-button.component.html',
  styleUrls: ['./swe-team-button.component.scss']
})
export class SWETeamButton implements OnInit, AfterViewInit {
  private _executingTextDefault = "Executing...";
  private _textStable = "";

  private _isFinished = true;
  get isFinished(): boolean {
    return this._isFinished;
  }

  set isFinished(value: boolean) {
    this._isFinished = value;

    if (value === false) {
      this._text = this.executingText;
      this.disabled = true;
    } else {
      this._text = this._textStable;
      this.disabled = false;
    }
  }

  //#region Input
  @Input()
  actionPermission: number = -1;

  @Input()
  executingText = this._executingTextDefault;

  @Input()
  color: ButtonColor = ButtonColor.PRIMARY;

  @Input()
  disabled = false;

  private _text = "Please set button's text";
  @Input()
  get text(): string {
    return this._text;
  }

  set text(value: string) {
    if (value.isNullOrEmpty()) {
      throw Error("value cannot be null or empty");
    }
    this._text = value;
    this._textStable = ObjectHelper.clone(value);
  }

  @Input()
  class = "";

  @Input()
  style = {};

  @Input()
  draggable = false;

  @Input()
  autofocus = false;

  @Input()
  name = "";

  @Input()
  value: any;

  @Input()
  hidden = false;

  //#endregion

  //#region Output
  @Output()
  onClick = new EventEmitter<any>();

  @Output()
  onDblclick = new EventEmitter<any>();
  //#endregion

  @ViewChild("baseBtn")
  btn!: ElementRef;

  constructor(public transferDataSV: TransferDataService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getButtonWidth();
  }

  getButtonWidth() {
    return this.btn.nativeElement.offsetWidth;
  }

  canShowProcessing() {
    return this.getButtonWidth() >= 110;
  }

  /**
   * Execute when click button
   */
  clickExecute(e: any) {
    if (!this.isFinished)
      return;

    const hasPermission = this.checkPermission();
    if (hasPermission) {
      this.isFinished = false;
      this.onClick.emit(e);
    } else {
      this.notPermissionNotify();
    }
  }

  /**
   * Execute when dblclick button
   */
  dlclickExecute(e: any) {
    if (!this.isFinished)
      return;

    const hasPermission = this.checkPermission();
    if (hasPermission) {
      this.isFinished = false;
      this.onDblclick.emit(e);
    } else {
      this.notPermissionNotify();
    }
  }

  /**
   * Check permission
   */
  checkPermission() {
    // return userPermission & this.actionPermission === this.actionPermission;
    return true;
  }

  /**
   * Bắn noti khi không có quyền
   */
  notPermissionNotify() {
    const snackBarParameter = new SnackBarParameter();
    snackBarParameter.message = PerrmisionConstant.NOT_PERMISSION;
    snackBarParameter.actionText = PerrmisionConstant.OK;
    snackBarParameter.duration = SnackBar.forever;

    SnackBar.openSnackBarWarning(snackBarParameter);
  }
}
