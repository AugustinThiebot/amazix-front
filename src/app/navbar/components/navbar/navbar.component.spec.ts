import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    tokenServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should display "Se connecter" and "Créer un compte" when user is not logged in', () => {
    tokenServiceSpy.isAuthenticated.and.returnValue(false);
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
    tokenServiceSpy.isAuthenticated.and.returnValue(true);
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
  //   tokenServiceSpy.isLoggedIn.and.returnValue(true);
  //   fixture.detectChanges();
  //   component = fixture.componentInstance;
  //   spyOn(component, 'logout').and.callThrough();;

  //   const logoutLink = fixture.nativeElement.querySelector('#logout-anchor');
  //   logoutLink.click();
  //   expect(component.logout).toHaveBeenCalled();
  //   expect(tokenServiceSpy.logout).toHaveBeenCalled();
  // });
});
