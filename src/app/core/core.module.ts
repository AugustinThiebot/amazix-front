import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { TokenService } from './services/token.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    TokenService,
    provideHttpClient()
  ]
})
export class CoreModule { }
