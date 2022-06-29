import { Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/services/auth.service';
import { Routing } from './shared/constants/common.constant';
import { LocalStorageKey } from './shared/constants/localstorage.key';
import { SessionStorageKey } from './shared/constants/sessionstorage.key';
import { TransferDataService } from './shared/services/transfer/transfer-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild("app", { read: ViewContainerRef, static: true })
  containerRef!: ViewContainerRef;

  @ViewChild("appContent", { static: true })
  appContent!: ElementRef;

  /**
   * Danh sách các route hiển thị full màn hình
   */
  fullPageRoutes: PageRoute[] = [];

  priodicalId: any;

  _onDestroySub: Subject<void> = new Subject<void>();

  constructor(
    private _transfer: TransferDataService,
    private _authService: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver
  ) {

  }

  ngOnInit() {
    this.initData();
    this.routerChangeSubscribe();
    this.checkLiveTokenPriodically();
  }

  /**
   * Khởi tạo dữ liệu
   */
  initData() {
    this.fullPageRoutes = [
      { path: Routing.NOT_FOUND, type: PageRouteType.Equal },
      { path: Routing.ACCESS_DENIED, type: PageRouteType.Equal },
      { path: Routing.LOGIN, type: PageRouteType.Equal },
      { path: Routing.REGISTER, type: PageRouteType.Equal },
      { path: Routing.VERIFY, type: PageRouteType.Equal },
      { path: Routing.VERIFY_REGISTER, type: PageRouteType.StartWith },
      { path: Routing.VERIFY_LOGIN, type: PageRouteType.StartWith },
    ];
  }


  /**
   * Check live token
   */
  checkLiveTokenPriodically() {
    this.setPing();

    this._transfer.subOrUnsubCheckLiveToken.pipe(takeUntil(this._onDestroySub)).subscribe((response) => {
      if (response === "unsub") {
        clearInterval(this.priodicalId);
      } else {
        this.setPing();
      }
    });
  }

  /**
   * Set ping định kỳ
   */
  setPing() {
    if (this._authService.isLoggedIn()) {
      this._authService.ping().subscribe();

      this.priodicalId = setInterval(() => {
        this._authService.ping().subscribe();
      }, this._authService.PING_TIME);
    }
  }

  /**
   * Handle khi route change
   */
  routerChangeSubscribe() {
    this.router.events.pipe(takeUntil(this._onDestroySub)).subscribe(async (event: any) => {
      if (event instanceof NavigationEnd) {
        let isFullPage = false;
        for (let i = 0; i < this.fullPageRoutes.length; i++) {
          if (event.url === '/') {
            isFullPage = true;
            break;
          }

          const fullPageRoute = this.fullPageRoutes[i];
          if (fullPageRoute.type === PageRouteType.Equal && `/${fullPageRoute.path}` === event.url) {
            isFullPage = true;
            break;
          } else if (fullPageRoute.type === PageRouteType.StartWith && event.url.startsWith(`/${fullPageRoute.path}`) && event.url !== '/') {
            isFullPage = true;
            break;
          } else if (fullPageRoute.type === PageRouteType.EndWith && event.url.endsWith(`/${fullPageRoute.path}`) && event.url !== '/') {
            isFullPage = true;
            break;
          }
        }

        this.adjustUI(isFullPage);

        if (!isFullPage) {
          this.bindingHeaderDynamic();
        }
      }
    });
  }

  /**
   * Chỉnh sửa lại UI khi vào form login
   * app-content adjust thành full page
   */
  adjustUI(isFullPage: boolean) {
    const htmlElement = this.appContent.nativeElement as HTMLElement;

    if (isFullPage) {
      this.containerRef.clear();
      htmlElement.style.top = "0";
      htmlElement.style.left = "0";
    } else {
      htmlElement.style.top = "44px";
      htmlElement.style.left = "180px";
    }

  }

  /**
   * Binding header
   */
  async bindingHeaderDynamic() {
    const { HeaderComponent } = await import('src/app/shared/components/header/header.component');
    const componentFactory = this.cfr.resolveComponentFactory(HeaderComponent);

    this.containerRef.clear();
    const componentRef = this.containerRef.createComponent(componentFactory);
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


interface PageRoute {
  path: string;
  type: PageRouteType;
}

enum PageRouteType {
  Equal = 1,
  StartWith = 2,
  EndWith = 3,
}
