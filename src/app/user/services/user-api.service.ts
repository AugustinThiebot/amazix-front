import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private readonly baseUserUrl = `${environment.apiUrl}/User`;  

  constructor(private http: HttpClient) { }

  user(): Promise<User> {
      let url = `${this.baseUserUrl}`;
      return firstValueFrom(this.http.get<User>(url, {withCredentials: true}));
    }

  getUser(): Promise<User> {
    const userStored = localStorage.getItem('user');
    if (userStored) {
      return Promise.resolve(JSON.parse(userStored));
    }
    else {
      return this.user();;
    }
  }
}
