import { Component } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: false
})
export class UserComponent {

  readonly user: User = {id: 152, firstName: 'Michel', lastName: 'Blanc', email: 'michel.blanc@gmail.com'};


}
