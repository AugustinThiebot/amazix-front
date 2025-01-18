import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {

  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var isAuthenticated: boolean = this.userService.isConnected();
    if (isAuthenticated) {
      return true;
    }
    else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }  
}
