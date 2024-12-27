import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;
  isLoggedIn = signal(false);

  constructor(private router: Router) { }


  login() {
    setTimeout(() => {
      this.token = "fakeToken";
      this.isLoggedIn.set(true);
      this.router.navigateByUrl('/products');
    }, 2000);
  }
  
  signup() {
    setTimeout(() => {
      this.token = "fakeToken";
      this.isLoggedIn.set(true);
      this.router.navigateByUrl('/products');
    }, 2000);
  }
  
  logout() {
    this.token = "";
    this.isLoggedIn.set(false);
    this.router.navigateByUrl('/');
  }

  getToken(): string {
    return this.token;
  }
}
