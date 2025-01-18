import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginPayload, SignupPayload, User } from 'src/app/models/user';
import { UserService } from 'src/app/user/services/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly baseAuthUrl = `${environment.apiUrl}/Auth`;
  private readonly baseRegistrationUrl = `${environment.apiUrl}/Registration`;
  private readonly baseXsrfUrl = `${environment.apiUrl}/Xsrf`;
  

  constructor(private http: HttpClient) {
    
  }

  login$(user: LoginPayload): Observable<any> {
    let url = `${this.baseAuthUrl}/login`;
    return this.http.post(url, user, {withCredentials: true});
  }
  
  signup$(user: SignupPayload): Observable<any> {
    let url = `${this.baseRegistrationUrl}/register`;
    return this.http.post(url, user);
  }

  logout$(): Observable<any> {
    let url = `${this.baseAuthUrl}/logout`;
    return this.http.post(url, {}, {withCredentials: true});
  }  

  checkTokenValidity(): Promise<boolean> {
    let url = `${this.baseAuthUrl}/validate-token`;
    return firstValueFrom(this.http.get<{valid:boolean}>(url, {withCredentials: true})).then(
      response => response.valid,
      () => false
    );
  }

  refreshToken(userGuid?: string) {
    let url = `${this.baseAuthUrl}/refresh`;
    return this.http.post(url, {UserId: userGuid}, {withCredentials: true});
  }

  xsrfToken(): Promise<any> {
    let url = `${this.baseXsrfUrl}/xsrf`;
    return firstValueFrom(this.http.get<{elment:any}>(url, {withCredentials: true}));
  }
}
