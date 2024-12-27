import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export class AuthGuard implements CanActivateFn {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.auth.getToken();
    if (token) {
      return true;
    }
    else {
      this.router.navigateByUrl('auth/login');
      return false;
    }
      
  }

}