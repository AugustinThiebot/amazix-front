import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

export const redirectAuthenticatedGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isConnected()) {
    router.navigate(['/products']);
    return false;
  }
  return true;
};
