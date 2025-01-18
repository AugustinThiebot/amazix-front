import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { UserService } from 'src/app/user/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
  standalone: false
})
export class LogoutComponent {

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) {
    this.logoutUser();
  }

  logoutUser() {
    this.authenticationService.logout$().subscribe({
      next: () => {
        this.userService.revokeUser();
        this.router.navigate(['auth/login']);
      },
      error: (err: any) => {
        this.userService.revokeUser();
        this.router.navigate(['auth/login']);
      }
    });
  }

}
