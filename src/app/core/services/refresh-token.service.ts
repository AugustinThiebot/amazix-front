import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  private readonly httpBackend: HttpClient;
  private readonly baseAuthUrl = `${environment.apiUrl}/Auth`;

  constructor(private handler: HttpBackend) {
    this.httpBackend = new HttpClient(handler);
  }

  refreshToken(userGuid?: string) {
    let url = `${this.baseAuthUrl}/refresh`;
    return this.httpBackend.post(url, {UserId: userGuid}, {withCredentials: true});
  }


}
