import { HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { LoginPayload, SignupPayload } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = `${environment.apiUrl}/Auth`

  constructor(private http: HttpClient) { }

  login(user: LoginPayload): Observable<any> {
    let url = `${this.baseUrl}/login`
    return this.http.post(url, user, {withCredentials: true});
  }
  
  signup(user: SignupPayload): Observable<any> {
    let url = `${this.baseUrl}/register`
    return this.http.post(url, user);
  }

  // logout(): Observable<any> {
  //   let url = `${this.baseUrl}/logout`
  //   return this.http.post(url);
  // }
}
