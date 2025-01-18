import { Component, computed, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: false
})
export class UserComponent implements OnInit {

  user = computed(() => this.userService.currentUser());

  constructor(private userService: UserService) {}

  ngOnInit() {

  }
  




}
