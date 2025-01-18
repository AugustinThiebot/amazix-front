import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { computed, signal } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user/services/user.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let _currentUser: ReturnType<typeof signal>;

  beforeEach(() => {
    _currentUser = signal(<User | null>(null));
    let isConnected = computed(() => _currentUser() !== null);
    userServiceSpy = jasmine.createSpyObj('AuthService',['logout$'], {isConnected: isConnected});
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should display "Se connecter" and "Créer un compte" when user is not logged in', () => {
    _currentUser.set(null);
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
    _currentUser.set({ userGuid: '1234', email: 'test@example.com' });
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
  //   userServiceSpy.isLoggedIn.and.returnValue(true);
  //   fixture.detectChanges();
  //   component = fixture.componentInstance;
  //   spyOn(component, 'logout').and.callThrough();;

  //   const logoutLink = fixture.nativeElement.querySelector('#logout-anchor');
  //   logoutLink.click();
  //   expect(component.logout).toHaveBeenCalled();
  //   expect(userServiceSpy.logout).toHaveBeenCalled();
  // });
});
