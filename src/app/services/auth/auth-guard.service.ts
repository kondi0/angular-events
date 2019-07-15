import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import * as _ from 'lodash';
import { USER_INFO } from '../../constants/constants';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private router: Router) {}

    canLoad(route: Route) {
        return this.checkLogin();
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkLogin();
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state);
    }

    private checkLogin() {
        if (this.isLoggedIn()) {
            return true;
        }

        this.router.navigate([`/login`]);

        return false;
    }

    private isLoggedIn(): boolean {
        return !_.isEmpty(JSON.parse(localStorage.getItem(USER_INFO)));
    }
}
