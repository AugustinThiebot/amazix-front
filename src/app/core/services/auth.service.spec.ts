import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        AuthService, {provide: Router, useValue: routerSpy}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the token as a string', () => {
    const token = service.getToken();
    expect(typeof token).toBe('string');
  });

  it('should sign up and update isLoggedIn eventually', (done: DoneFn) => {
    service.signup();
    setTimeout(() => {
      expect(service.isLoggedIn()).toBe(true);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/products');
      done();
    }, 3000);
  });

  it('should login and update isLoggedIn eventually', (done: DoneFn) => {
    service.login();
    setTimeout(() => {
      expect(service.isLoggedIn()).toBe(true);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/products');
      done();
    }, 3000);
  });

  it('should logout immediatly and update isLoggedIn', () => {
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
    // @ts-ignore
    expect(service.token).toBe("");
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
