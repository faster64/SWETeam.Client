import { Directive, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { BaseService } from "../services/base/base.service";

@Directive()
export class BaseComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;

  public _onDestroySub: Subject<void> = new Subject<void>();

  constructor(
    public baseService: BaseService
  ){}

  ngOnInit(): void {

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
