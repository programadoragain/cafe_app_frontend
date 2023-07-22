import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  token: any = localStorage.getItem('token');

  constructor(public router: Router, private snackbarService: SnackbarService) { }

  public isAuthenticated(): boolean {
    if (this.token) return true;
    else {
      this.router.navigate(['/']);
      return false;
    }
  }

  /*
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray: any= route.data.expectedRole;

    try {
      if (this.token) {
        var tokenPayload: any = jwt_decode(this.token);
      }
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let expectedRole = '';

    for (let i = 0; i < 2; i++) {
      if (expectedRoleArray[i] == tokenPayload.role) {
        expectedRole = tokenPayload.role;
      }
    }

    if (tokenPayload.role == 'user' || tokenPayload.role == 'admin') {
      if (this.isAuthenticated() && tokenPayload.role == expectedRole) {
        return true;
      }
      this.snackbarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.router.navigate(['/cafe/dashboard']);
      return false;
    }
    else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
  */

}


