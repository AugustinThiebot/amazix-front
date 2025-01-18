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
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();
  isConnected = computed(() => this.currentUser() !== null);
  userId = computed(() => this.currentUser()?.userGuid );

  constructor(private router: Router) {
  }
    
  setUser(user: User | null): void {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');    
    this._currentUser.set(user);
  }

  revokeUser() {
    this.deleteUser();
  }

  deleteUser() {
    this.setUser(null);
    localStorage.removeItem('user');
  }

}
