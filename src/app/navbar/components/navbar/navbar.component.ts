import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn = false; // À remplacer par un vrai service d'authentification

  constructor() {}

  logout() {
    
  }

}
