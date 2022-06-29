import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Routing } from '../constants/common.constant';
import { LocalStorageKey } from '../constants/localstorage.key';

@Injectable({
  providedIn: 'root' // you can change to any level if needed
})
export class BaseGuard implements CanActivate {

  constructor(public router: Router, public authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate([`/${Routing.ACCESS_DENIED}`]);
    return false;
  }


}
