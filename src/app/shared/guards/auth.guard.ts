import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Data, RouterStateSnapshot } from '@angular/router';
import { SessionProvider } from '../../core/providers/session.provider';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private session: SessionProvider
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state.url, route.data);
  }

  checkLogin(url: string, data?: Data) {
    let isLoggedIn: boolean;
    try {
      isLoggedIn = this.session.isLoggedIn();
    } catch (error) {
      isLoggedIn = false;
    }

    if (!isLoggedIn) {
      this.session.setRedirectUrl(url);
      this.session.logout();
      return false;
    }

    return true;
  }
}