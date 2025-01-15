import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['isConnected']);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthGuard,
        {provide: Router, useValue: routerSpy},
        {provide: AuthenticationService, useValue: authServiceSpy}
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if token exists', () => {
    authServiceSpy.isConnected.and.returnValue(true);
    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBeTrue();
  });

  it('should navigate to login if token is missing', () => {
    authServiceSpy.isConnected.and.returnValue(false);
    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});
