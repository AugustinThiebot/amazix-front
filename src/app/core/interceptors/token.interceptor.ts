import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            authService.setUser(null);
            router.navigate(['auth/login']);
          }
        }
      },
      error: (err) => {
        if (err.status === 401) {
          authService.setUser(null);
          router.navigate(['auth/login']);
        }
      }
    })
  );
};