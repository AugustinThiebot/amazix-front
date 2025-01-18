import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './services/authentication.service';
import { appInitilizerCheckTokenValidity, appInitilizerGetUser, appInitilizerGetXsrfToken } from './core.module';
import { UserService } from '../user/services/user.service';
import { UserApiService } from '../user/services/user-api.service';
import { User } from '../models/user';

describe('Core Module Initializers', () => {
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockUserAPIService: jasmine.SpyObj<UserApiService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthenticationService',['checkTokenValidity', 'xsrfToken']);
    mockUserService = jasmine.createSpyObj('UserService',['setUser']);
    mockUserAPIService = jasmine.createSpyObj('UserAPIService',['getUser']);
    TestBed.configureTestingModule({
        providers: [
            {provide: AuthenticationService, useValue: mockAuthService},
            {provide: UserService, useValue: mockUserService},
            {provide: UserApiService, useValue: mockUserAPIService}
        ]
    });
  });

  it('should resolve gracefully when checkTokenValidity succeeds', async () => {
    mockAuthService.checkTokenValidity.and.returnValue(Promise.resolve(true));
    const result = await TestBed.runInInjectionContext(() => appInitilizerCheckTokenValidity());
    expect(result).toBeUndefined();
  });

  it('should resolve gracefully when checkTokenValidity fails', async () => {
    mockAuthService.checkTokenValidity.and.returnValue(Promise.reject('Error'));
    const result = await TestBed.runInInjectionContext(() => appInitilizerCheckTokenValidity());
    expect(result).toBeUndefined();
  });

  it('should resolve gracefully when get xsrf token succeeds', async () => {
    mockAuthService.xsrfToken.and.returnValue(Promise.resolve(true));
    const result = await TestBed.runInInjectionContext(() => appInitilizerGetXsrfToken());
    expect(result).toBeUndefined();
  });

  it('should resolve gracefully when get user succeeds', async () => {
    let mockUser: User = {userGuid: 'anyGuid', email: 'mock@mail.com'};
    mockUserAPIService.getUser.and.returnValue(Promise.resolve(mockUser));
    const result = await TestBed.runInInjectionContext(() => appInitilizerGetUser());
    expect(result).toBeUndefined();
  });
  
  it('should resolve gracefully when get user fails', async () => {
    mockUserAPIService.getUser.and.returnValue(Promise.reject('Error'));
    const result = await TestBed.runInInjectionContext(() => appInitilizerGetUser());
    expect(result).toBeUndefined();
  });
});
