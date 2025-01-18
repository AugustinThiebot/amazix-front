import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from '../user/services/user.service';
import { User } from '../models/user';
import { UserApiService } from '../user/services/user-api.service';

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

export function appInitilizerGetUser(): Promise<any> {
  const userApiService = inject(UserApiService);
  const userService = inject(UserService);
  return userApiService.getUser()
      .then((user:User) => userService.setUser(user))
      .catch((error: any) => console.error(error)); 
}




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideAppInitializer(() => appInitilizerCheckTokenValidity()),
    provideAppInitializer(() => appInitilizerGetXsrfToken()),
    provideAppInitializer(() => appInitilizerGetUser()),
    provideHttpClient(withInterceptors([tokenInterceptor]), withXsrfConfiguration({cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN'})),
  ]
})
export class CoreModule { }
