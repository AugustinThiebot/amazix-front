import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private token!: string;

  login() {
    this.token = "fakeToken";
  }
  
  signup() {
    this.token = "fakeToken";
  }

  getToken(): string {
    return this.token;
  }
}
