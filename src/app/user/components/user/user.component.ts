import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: false
})
export class UserComponent implements OnInit {

  user$!: Observable<User | undefined>;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    const user = this.userService.users.find(u => u.id === userId);
    this.user$ = new Observable<User | undefined>(observer => {
      observer.next(user);
      observer.complete();
    });
  }
  




}
