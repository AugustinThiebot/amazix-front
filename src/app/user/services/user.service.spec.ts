import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(() => {
    let store: { [key: string] : any} = {};
    const mockLocalStorage = {
      getItem: (key: string) => key in store ? store[key]:null,
      setItem: (key: string, value: string) => store[key] = value,
      removeItem: (key: string) => delete store[key],
      clear: () => store = {}
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the user in localStorage', () => {
    let mockUser: User = {userGuid: 'mockGuid', email: 'mock@gmail.com'};
    service.setUser(mockUser);
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockUser));
  });
  
  it('should remove the user in localStorage', () => {
    service.setUser(null);
    expect(localStorage.getItem('user')).toBeNull();
  });
  
  it('should delete the user from localStorage', () => {
    let mockUser: User = {userGuid: 'mockGuid', email: 'mock@gmail.com'};
    service.setUser(mockUser);
    service.deleteUser();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should revoke the user', () => {
    spyOn(service, 'deleteUser').and.callThrough();
    service.revokeUser();
    expect(service.deleteUser).toHaveBeenCalled();
  });
});
