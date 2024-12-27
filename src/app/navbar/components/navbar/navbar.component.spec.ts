import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should display "Se connecter" and "Créer un compte" when user is not logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();

    const loginLink = fixture.nativeElement.querySelector('#login');
    const signupLink = fixture.nativeElement.querySelector('#sign-up');
    const accountLink = fixture.nativeElement.querySelector('#account');
    const logoutLink = fixture.nativeElement.querySelector('#logout');

    expect(loginLink).toBeTruthy();
    expect(signupLink).toBeTruthy();
    expect(accountLink).toBeFalsy();
    expect(logoutLink).toBeFalsy();
  });

  it('should display "Mon compte" and "Se déconnecter" when user is logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();

    const loginLink = fixture.nativeElement.querySelector('#login');
    const signupLink = fixture.nativeElement.querySelector('#sign-up');
    const accountLink = fixture.nativeElement.querySelector('#account');
    const logoutLink = fixture.nativeElement.querySelector('#logout');

    expect(loginLink).toBeFalsy();
    expect(signupLink).toBeFalsy();
    expect(accountLink).toBeTruthy();
    expect(logoutLink).toBeTruthy();
  });

  // it('should call logout method when clicking on "Se déconnecter"', () => {
  //   authServiceSpy.isLoggedIn.and.returnValue(true);
  //   fixture.detectChanges();
  //   component = fixture.componentInstance;
  //   spyOn(component, 'logout').and.callThrough();;

  //   const logoutLink = fixture.nativeElement.querySelector('#logout');
  //   logoutLink.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(component.logout).toHaveBeenCalled();
  //   expect(authServiceSpy.logout).toHaveBeenCalled();
  //   expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/');
  // });
});
