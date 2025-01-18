import { Component } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent {
  isLoggedIn = this.userService.isConnected;
  userId = this.userService.userId;
  
  constructor(private userService: UserService) {

  }
}
