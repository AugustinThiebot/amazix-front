import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogoutComponent } from './components/logout/logout.component';
import { redirectAuthenticatedGuard } from '../core/guards/redirect-authenticated.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [redirectAuthenticatedGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [redirectAuthenticatedGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}