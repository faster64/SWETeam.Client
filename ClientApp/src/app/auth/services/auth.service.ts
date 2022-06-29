import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageKey } from 'src/app/shared/constants/localstorage.key';
import { StringHelper } from 'src/app/shared/helpers/string-helper';
import { HttpService } from 'src/app/shared/services/base/http.service';
import { TransferDataService } from 'src/app/shared/services/transfer/transfer-data.service';
import { environment } from 'src/environments/environment';
import { AuthResult } from '../models/responses/auth-result';
import { UserCred } from '../models/requests/user-cred';
import { VerifyModel } from '../models/requests/verify-model';
import { RefreshTokenModel } from '../models/requests/refresh-token-model';
import { VerifyOtpResult } from '../models/responses/verify-otp-result';
import { BaseResponse } from '../models/responses/base-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * auth api url
   */
  private auth_api_url = environment.auth_api_url;

  /**
   * List clear khi logout
   */
  private clearList = [LocalStorageKey.USER_ID, LocalStorageKey.ACCESS_TOKEN, LocalStorageKey.ROLE_NAME, LocalStorageKey.REFRESH_TOKEN];

  /**
   * Thời gian ping check live token
   */
  get PING_TIME() {
    return 30000;
  };

  constructor(
    private _httpService: HttpService,
    private _transfer: TransferDataService
  ) { }

  public getUserId() {
    return localStorage.getItem(`${environment.team}_${LocalStorageKey.USER_ID}`) || "";
  }

  public getToken() {
    return localStorage.getItem(`${environment.team}_${LocalStorageKey.ACCESS_TOKEN}`) || "";
  }

  public getRefreshToken() {
    return localStorage.getItem(`${environment.team}_${LocalStorageKey.REFRESH_TOKEN}`) || "";
  }

  /**
   * Lưu user config
   */
  saveTokenConfig(accessToken: string) {
    const config = StringHelper.parseJwt(accessToken);
    const keys = Object.keys(config);

    localStorage.setItem(`${environment.team}_${LocalStorageKey.ACCESS_TOKEN}`, accessToken);
    keys.forEach(key => {
      let snakeCaseKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      if (!snakeCaseKey.startsWith('_')) {
        snakeCaseKey = `_${snakeCaseKey}`;
      }

      localStorage.setItem(`${environment.team}${snakeCaseKey}`, config[key]);
    });
  }

  /**
   * Lưu config
   */
  saveAuthConfig(config: AuthResult) {
    this.saveTokenConfig(config.AccessToken);
    localStorage.setItem(`${environment.team}_${LocalStorageKey.REFRESH_TOKEN}`, config.RefreshToken);
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem(`${environment.team}_${LocalStorageKey.LOGGED_IN}`) === '1')
      return true;
    return false;
  }

  /**
   * Refresh token
   */
  refreshToken(refresh: RefreshTokenModel) {
    const url = `${this.auth_api_url}/refresh-token`;
    return this._httpService.post<AuthResult>(url, refresh);
  }

  /**
   * ping check live token
   */
  ping() {
    const url = `${this.auth_api_url}/ping?uid=${this.getUserId()}`;
    return this._httpService.get<string>(url);
  }

  /**
   * Đăng ký
   */
  register(userInfo: any) {
    const url = `${this.auth_api_url}/register`;
    return this._httpService.post<AuthResult>(url, userInfo);
  }

  /**
   * Đăng nhập
   */
  login(userCred: UserCred) {
    const url = `${this.auth_api_url}/login`;
    return this._httpService.post<AuthResult>(url, userCred);
  }

  /**
   * Đăng xuất
   */
  logout(callback?: Function) {
    const url = `${this.auth_api_url}/logout?uid=${this.getUserId()}`;
    this._httpService.get<AuthResult>(url).subscribe(response => {
      this.clearList.forEach(item => localStorage.removeItem(`${environment.team}_${item}`));
      localStorage.setItem(`${environment.team}_${LocalStorageKey.LOGGED_IN}`, "0");
      this._transfer.subOrUnsubCheckLiveToken.emit("unsub");

      if (callback) {
        callback(response);
      }
    },
      err => {
        localStorage.setItem(`${environment.team}_${LocalStorageKey.LOGGED_IN}`, "0");
        this._transfer.subOrUnsubCheckLiveToken.emit("unsub");
        if (callback) {
          callback(err);
        }
      }
    );
  }

  /**
   * Gửi mã OTP
   */
  sendOtpAsync(verifyModel: VerifyModel, endpoint: string) {
    const url = `${this.auth_api_url}/${endpoint}`;
    return this._httpService.post<VerifyOtpResult>(url, verifyModel);
  }

  /**
   * Cấp mã OTP mới
   * u: UserName
   */
  sendNewOtp(u: string, type: number) {
    const url = `${this.auth_api_url}/provide-new-otp?u=${btoa(u)}&type=${type}`;
    return this._httpService.get<BaseResponse>(url);
  }
}
