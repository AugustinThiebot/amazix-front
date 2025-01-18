import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom} from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUserUrl = `${environment.apiUrl}/User`;
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();
  isConnected = computed(() => this.currentUser() !== null);
  userId = computed(() => this.currentUser()?.userGuid );

  constructor(private http: HttpClient, private router: Router) {
    this.getUser()
      .then((user:User) => this.setUser(user))
      .catch(this.handleError); 
  }
  
  user(): Promise<User> {
    let url = `${this.baseUserUrl}`;
    return firstValueFrom(this.http.get<User>(url, {withCredentials: true}));
  }
  
  setUser(user: User): void {
    if (user) {
      this._currentUser.set(user);
      localStorage.setItem('user', JSON.stringify(user));
    }
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

  revokeUser() {
    this.deleteUser();
    this.router.navigate(['auth/login']);
  }

  deleteUser() {
    localStorage.removeItem('user');
  }

  private handleError(error: any): void {
    console.error(error);
    alert(`Impossible de récupérer les informations du compte : ${error}`);
  } 

}
