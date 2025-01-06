import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './services/authentication.service';
import { appInitilizerValidateToken } from './core.module';

describe('appInitilizerValidateToken', () => {
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthenticationService',['validateToken']);
    TestBed.configureTestingModule({
        providers: [
            {provide: AuthenticationService, useValue: mockAuthService}
        ]
    });
  });

  it('should resolve gracefully when validateToken succeeds', async () => {
    mockAuthService.validateToken.and.returnValue(Promise.resolve(true));
    const result = await TestBed.runInInjectionContext(() => appInitilizerValidateToken());
    expect(result).toBeUndefined();
  });

  it('should resolve gracefully when validateToken fails', async () => {
    mockAuthService.validateToken.and.returnValue(Promise.reject('Error'));
    const result = await TestBed.runInInjectionContext(() => appInitilizerValidateToken());
    expect(result).toBeUndefined();
  });
});
