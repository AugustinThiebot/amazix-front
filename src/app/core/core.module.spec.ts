import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './services/authentication.service';
import { appInitilizerCheckTokenValidity, appInitilizerGetXsrfToken } from './core.module';

describe('Core Module Initializers', () => {
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthenticationService',['checkTokenValidity', 'xsrfToken']);
    TestBed.configureTestingModule({
        providers: [
            {provide: AuthenticationService, useValue: mockAuthService}
        ]
    });
  });

  it('should resolve gracefully when checkTokenValidity succeeds', async () => {
    mockAuthService.checkTokenValidity.and.returnValue(Promise.resolve(true));
    const result = await TestBed.runInInjectionContext(() => appInitilizerCheckTokenValidity());
    expect(result).toBeUndefined();
  });

  it('should resolve gracefully when get xsrf token succeeds', async () => {
    mockAuthService.xsrfToken.and.returnValue(Promise.resolve(true));
    const result = await TestBed.runInInjectionContext(() => appInitilizerGetXsrfToken());
    expect(result).toBeUndefined();
  });

  it('should resolve gracefully when checkTokenValidity fails', async () => {
    mockAuthService.checkTokenValidity.and.returnValue(Promise.reject('Error'));
    const result = await TestBed.runInInjectionContext(() => appInitilizerCheckTokenValidity());
    expect(result).toBeUndefined();
  });
});
