import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginPayload, SignupPayload, User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly baseAuthUrl = `${environment.apiUrl}/Auth`;
  private readonly baseRegistrationUrl = `${environment.apiUrl}/Registration`;
  private readonly baseXsrfUrl = `${environment.apiUrl}/Xsrf`;  

  constructor(private http: HttpClient) { }

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

  xsrfToken(): Promise<any> {
    let url = `${this.baseXsrfUrl}/xsrf`;
    return firstValueFrom(this.http.get<{elment:any}>(url, {withCredentials: true}));
  }
}
