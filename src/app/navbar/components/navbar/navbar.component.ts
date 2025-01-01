import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent {
  isLoggedIn = this.authService.isConnected;
  
  constructor(private authService: AuthenticationService) {

  }
}
