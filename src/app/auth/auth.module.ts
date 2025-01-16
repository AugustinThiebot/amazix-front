import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LogoutComponent } from './components/logout/logout.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzButtonModule    
  ],
})
export class AuthModule { }
