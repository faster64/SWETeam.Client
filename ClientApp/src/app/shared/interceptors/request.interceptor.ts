import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackBar } from '../components/snackbar/snackbar.component';
import { SnackBarParameter } from '../models/snackbar/snackbar.param';
import { CommonConstant, ErrorMessageConstant, PerrmisionConstant, Routing } from '../constants/common.constant';
import { AuthService } from 'src/app/auth/services/auth.service';
import { switchMap, take, filter } from 'rxjs/operators';
import { AuthResult } from 'src/app/auth/models/responses/auth-result';
import { TransferDataService } from '../services/transfer/transfer-data.service';
import { environment } from 'src/environments/environment';
import { LocalStorageKey } from '../constants/localstorage.key';
import { RefreshTokenModel } from 'src/app/auth/models/requests/refresh-token-model';

@Injectable()
export class RequestHandlingInterceptor implements HttpInterceptor {

  failed = false;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _transfer: TransferDataService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.injectToken(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          return this.handleUnauthorized(request, next);

        } else if (error.status === HttpStatusCode.Forbidden) {
          SnackBar.openSnackBarDanger(new SnackBarParameter(null, PerrmisionConstant.NOT_PERMISSION, '', SnackBar.forever));

        } else if (error.status === 0) {
          SnackBar.openSnackBarDanger(new SnackBarParameter(null, ErrorMessageConstant.HAS_ERROR_MESSAGE, ''));
        }

        return throwError(error.error);
      })
    );
  }

  /**
   * Xử lý khi unauthorized
   */
  handleUnauthorized(request: HttpRequest<unknown>, next: HttpHandler) {

    // Nếu unauthorized thì thử refresh token.
    return this.tryRefreshToken().pipe(
      switchMap(response => {
        if (this.failed) {
          this.failed = false; // reset fail variable
          this._transfer.subOrUnsubCheckLiveToken.emit("unsub");
          this._router.navigate([Routing.LOGIN]);
          localStorage.setItem(`${environment.team}_${LocalStorageKey.LOGGED_IN}`, '0');

          return throwError("");
        }

        // success thì tiếp tục request
        if (response.Code == HttpStatusCode.Ok) {
          localStorage.setItem(`${environment.team}_${LocalStorageKey.LOGGED_IN}`, '1');
          this._authService.saveAuthConfig(response);

        } else {
          this.failed = true;
          this.logout();
          return throwError(response.ErrorMessage || "");
        }

        return next.handle(this.injectToken(request))
      })
    )
  }

  /**
   * Inject token vào request
   */
  injectToken(request: HttpRequest<unknown>) {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this._authService.getToken()}`,
      },
    });
  }

  /**
   * Refresh token
   */
  tryRefreshToken() {
    const refresh = new RefreshTokenModel();
    refresh.UserId = this._authService.getUserId() || CommonConstant.ZERO_GUID;
    refresh.RefreshToken = this._authService.getRefreshToken();

    return this._authService.refreshToken(refresh);
  }

  /**
   * Đăng xuất
   */
  logout() {
    this._authService.logout((response: AuthResult) => {
      return this._router.navigateByUrl(`/${Routing.LOGIN}`);
    });
  }
}
