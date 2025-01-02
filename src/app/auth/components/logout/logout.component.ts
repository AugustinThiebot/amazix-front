import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
  standalone: false
})
export class LogoutComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.logoutUser();
  }

  logoutUser() {
    this.authenticationService.logout$().subscribe({
      next: () => {
        this.authenticationService.setUser(null);
        this.router.navigateByUrl('auth/login');
      },
      error: (err: any) => {
        console.error('Logout failed', err);
      }
    });
  }

}
