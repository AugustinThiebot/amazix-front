import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginPayload, SignupPayload, User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseAuthUrl = `${environment.apiUrl}/Auth`;
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();
  isConnected = computed(() => this.currentUser() !== null);

  constructor(private http: HttpClient) {
    this.setUser(this.getUser());
  }

  login$(user: LoginPayload): Observable<any> {
    let url = `${this.baseAuthUrl}/login`;
    return this.http.post(url, user, {withCredentials: true});
  }
  
  signup$(user: SignupPayload): Observable<any> {
    let url = `${this.baseAuthUrl}/register`;
    return this.http.post(url, user);
  }

  logout$(): Observable<any> {
    let url = `${this.baseAuthUrl}/logout`;
    return this.http.post(url, {}, {withCredentials: true});
  }

  setUser(user: User | null): void {
    this._currentUser.set(user);
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }

  getUser(): User | null {
    const userStored = localStorage.getItem('user');
    return userStored ? JSON.parse(userStored):null;
  }

  validateToken(): Promise<boolean> {
    let url = `${this.baseAuthUrl}/validate-token`;
    return firstValueFrom(this.http.get<{valid:boolean}>(url, {withCredentials: true})).then(
      response => response.valid,
      () => false
    );
  }
}
