import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const userService = inject(UserService);

  const handleTokenRefresh = () => {
    var userGuid = userService.currentUser()?.userGuid;
    authService.refreshToken(userGuid).subscribe({
      error: (_err) => {
        userService.revokeUser();
      }
    });
  }
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            handleTokenRefresh();
          }
        }
      },
      error: (err) => {
        if (err.status === 401) {
          handleTokenRefresh();
        }
      }
    })
  );
};