import { Component, effect } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent {
  isLoggedIn!: boolean;
  
  constructor(private tokenService: TokenService) {
    effect(() => {
      this.isLoggedIn = this.tokenService.isAuthenticated();
    });
  }
}
