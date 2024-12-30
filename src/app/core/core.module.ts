import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { TokenService } from './services/token.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TokenService,
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ]
})
export class CoreModule { }
