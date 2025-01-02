import { inject, NgModule, provideAppInitializer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';

export function initAuth(authService: AuthenticationService) {
  return authService.initializeUserState();
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    provideAppInitializer(() => initAuth(inject(AuthenticationService))),
    provideHttpClient()
  ]
})
export class CoreModule { }
