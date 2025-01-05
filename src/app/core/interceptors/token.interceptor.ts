import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  const handleTokenRefresh = () => {
    authService.refreshToken().subscribe({
      error: (_err) => {
        authService.revokeToken();
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