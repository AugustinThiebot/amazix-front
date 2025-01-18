import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { redirectAuthenticatedGuard } from './redirect-authenticated.guard';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user/services/user.service';

describe('redirectAuthenticatedGuard', () => {
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectAuthenticatedGuard(...guardParameters));

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['isConnected']);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: UserService, useValue: userServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should redirect if an authenticated user navigates to the login page', () => {
    userServiceSpy.isConnected.and.returnValue(true);
    const result = executeGuard({} as any, {} as any);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/products']);
    expect(result).toBeFalse();
  });

  it('should allow unauthenticated user to navigate the login page', () => {
    userServiceSpy.isConnected.and.returnValue(false);
    const result = executeGuard({} as any, {} as any);
    expect(result).toBeTrue();
  });
});
