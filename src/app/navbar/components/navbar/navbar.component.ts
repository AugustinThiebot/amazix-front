import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent {
  isLoggedIn!: boolean;
  
  constructor(private authService: AuthService) {
    effect(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }
  
  logout() {
    this.authService.logout();
  }

}
