import { Component, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: false
})
export class UserComponent implements OnInit {

  user = computed(() => this.authService.currentUser());

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {

  }
  




}
