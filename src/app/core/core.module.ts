import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

export function appInitilizerValidateToken(): Promise<void> {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  return authService.validateToken().then(isValid => {
    if (!isValid) {
      router.navigate(['auth/logout']);
    }
  })
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideAppInitializer(() => appInitilizerValidateToken()),
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ]
})
export class CoreModule { }
