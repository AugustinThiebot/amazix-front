import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // readonly users: User[] = [
  //   {id: 152, firstName: 'Michel', lastName: 'Blanc', email: 'michel.blanc@gmail.com'},
  //   {id: 126, firstName: 'Paul', lastName: 'Vert', email: 'paul.vert@outlook.com'}
  // ];

}
