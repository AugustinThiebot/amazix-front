import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
  standalone: false
})
export class LogoutComponent {

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.logoutUser();
  }

  logoutUser() {
    this.authenticationService.logout$().subscribe({
      next: () => {
        this.userService.revokeUser();
      },
      error: (err: any) => {
        console.error('Logout failed', err);
        this.userService.revokeUser();
      }
    });
  }

}
