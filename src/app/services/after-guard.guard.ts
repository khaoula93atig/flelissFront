import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationEnd , Event } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AfterGuardGuard implements CanActivate {
    currentRoute: String;
  constructor(private router: Router , private tokenService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.loggedIn()) {

      this.router.navigateByUrl('/Dashboard/general');
    }
    return true;

  }
}
