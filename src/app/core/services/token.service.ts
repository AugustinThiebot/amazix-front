import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token',token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    const token = this.getToken();
    return !!token && jwtDecode(token).exp! > Date.now() / 1000
  }
}
