import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { AuthenticationService } from './services/authentication.service';

export function appInitilizerCheckTokenValidity(): Promise<void> {
  const authService = inject(AuthenticationService);
  return authService.checkTokenValidity().then(
    _isValid => {},
    () => {}
  );
}

export function appInitilizerGetXsrfToken(): Promise<any> {
  const authService = inject(AuthenticationService);
  return authService.xsrfToken().then(
    _ => {},
    () => {}
  )
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideAppInitializer(() => appInitilizerCheckTokenValidity()),
    provideAppInitializer(() => appInitilizerGetXsrfToken()),
    provideHttpClient(withInterceptors([tokenInterceptor]), withXsrfConfiguration({cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN'})),
  ]
})
export class CoreModule { }
