import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { SnackBarParameter, SnackBarType } from '../../models/snackbar/snackbar.param';
import { TransferDataService } from '../../services/transfer/transfer-data.service';


@Component({
  selector: 'app-snackbar',
  template: '',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackBar implements OnInit, OnDestroy {

  private _onDestroySub: Subject<void> = new Subject<void>();
  private static _actionTextDefault = 'OK';

  public static snackBar: MatSnackBar;
  public static forever: number = 999999999;

  constructor(private _snackBar: MatSnackBar, private transferDataSV: TransferDataService) {
    SnackBar.snackBar = this._snackBar;
  }

  ngOnInit(): void {
  }

  /**
   * SnackBar success
   */
  public static openSnackBarSuccess(parameter: SnackBarParameter) {
    const snackBarRef = SnackBar.snackBar.open(parameter.message, parameter.actionText || this._actionTextDefault, {
      duration: parameter.duration,
      panelClass: ['my-custom-snackbar', "success"],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.handleCallback(snackBarRef, parameter);
  }

  /**
   * SnackBar warning
   */
  public static openSnackBarWarning(parameter: SnackBarParameter) {
    const snackBarRef = SnackBar.snackBar.open(parameter.message, parameter.actionText || this._actionTextDefault, {
      duration: parameter.duration,
      panelClass: ['my-custom-snackbar', "warning"],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.handleCallback(snackBarRef, parameter);
  }


  /**
   * SnackBar danger
   */
  public static openSnackBarDanger(parameter: SnackBarParameter) {
    const snackBarRef = SnackBar.snackBar.open(parameter.message, parameter.actionText || this._actionTextDefault, {
      duration: parameter.duration,
      panelClass: ['my-custom-snackbar', "danger"],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.handleCallback(snackBarRef, parameter);
  }

  /**
   * Handle callback
   */
  private static handleCallback(snackBarRef: MatSnackBarRef<TextOnlySnackBar>, parameter: SnackBarParameter) {
    if (parameter.afterDismissedCallback) {
      snackBarRef.afterDismissed().subscribe(response => {
        parameter.afterDismissedCallback(response);
      })
    }

    if (parameter.afterOpenedCallback) {
      snackBarRef.afterOpened().subscribe(response => {
        parameter.afterOpenedCallback(response);
      })
    }
  }

  /**
   * Dismiss
   */
  public static dismiss() {
    SnackBar.snackBar.dismiss();
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
