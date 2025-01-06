import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { AuthenticationService } from './services/authentication.service';

export function appInitilizerValidateToken(): Promise<void> {
  const authService = inject(AuthenticationService);
  return authService.validateToken().then(_isValid => {
  });
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
