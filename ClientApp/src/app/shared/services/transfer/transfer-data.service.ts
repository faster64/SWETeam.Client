import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  /**
   * true nếu full page, otherwise false
   */
  listenAdjustUI = new EventEmitter<boolean>();

  /**
   * Thông báo ngừng check live token
   */
  subOrUnsubCheckLiveToken = new EventEmitter<string>();

  constructor() { }
}
