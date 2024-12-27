import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService',['getToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if token exists', () => {
    authServiceSpy.getToken.and.returnValue('mockToken');
    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBeTrue();
  });

  it('should navigate to login if token is missing', () => {
    authServiceSpy.getToken.and.returnValue('');
    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});
