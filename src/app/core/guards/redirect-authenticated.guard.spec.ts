import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { redirectAuthenticatedGuard } from './redirect-authenticated.guard';
import { AuthenticationService } from '../services/authentication.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('redirectAuthenticatedGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectAuthenticatedGuard(...guardParameters));

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['isConnected']);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: AuthenticationService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should redirect if an authenticated user navigates to the login page', () => {
    authServiceSpy.isConnected.and.returnValue(true);
    const result = executeGuard({} as any, {} as any);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/products']);
    expect(result).toBeFalse();
  });

  it('should allow unauthenticated user to navigate the login page', () => {
    authServiceSpy.isConnected.and.returnValue(false);
    const result = executeGuard({} as any, {} as any);
    expect(result).toBeTrue();
  });
});
