import { Component, effect } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent {
  isLoggedIn!: boolean;
  
  constructor(private tokenService: TokenService, private authenticaionService: AuthenticationService) {
    effect(() => {
      this.isLoggedIn = this.tokenService.isAuthenticated();
    });
  }
  
  logout() {
    // this.authenticaionService.logout();
  }

}
