import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockAuthService: jasmine.SpyObj<AuthenticationService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthenticationService', ['signup$']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule, NzInputModule, NzIconModule, NzFormModule, NzButtonModule],
      providers: [
        {provide: AuthenticationService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid with empty form', () => {
    component.signupForm.setValue({
      emailControl: "",
      passwordControl: "",
      passwordAgainControl: ""
    });
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should be invalid with different passwords', () => {
    component.signupForm.setValue({
      emailControl: "test@mail.com",
      passwordControl: "P@ssword123!",
      passwordAgainControl: "AnotherP@ssword!123"
    });
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should be invalid with invalid mail', () => {
    component.signupForm.setValue({
      emailControl: "InvalidUser",
      passwordControl: "P@ssword123!",
      passwordAgainControl: "P@ssword123!"
    });
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should be invalid with same invalid passwords', () => {
    component.signupForm.setValue({
      emailControl: "test@mail.com",
      passwordControl: "Inv@lidP@ssword",
      passwordAgainControl: "Inv@lidP@ssword"
    });
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should be valid with valid mail & passwords', () => {
    component.signupForm.setValue({
      emailControl: "test@mail.com",
      passwordControl: "V@lidP@ssword123",
      passwordAgainControl: "V@lidP@ssword123"
    });
    expect(component.signupForm.valid).toBeTruthy();
  });

  it('should call signup$ and navigate to login on valid response', () => {
    component.signupForm.setValue({
      emailControl: "test@mail.com",
      passwordControl: "V@lidP@ssword123",
      passwordAgainControl: "V@lidP@ssword123"
    });
    const validResponse = new HttpResponse({
      status: 200,
      body: { message: 'Success'}
    });
    mockAuthService.signup$.and.returnValue(of(validResponse));

    component.onSignup();

    expect(mockAuthService.signup$).toHaveBeenCalledWith({
      email: "test@mail.com",
      password: "V@lidP@ssword123"
    });
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should call signup$ and not navigate to login on invalid response', () => {
    component.signupForm.setValue({
      emailControl: "test@mail.com",
      passwordControl: "V@lidP@ssword123",
      passwordAgainControl: "V@lidP@ssword123"
    });
    const errorResponse = new HttpErrorResponse({
      error: {code: 'some code', message: 'some message'},
      status: 400,
      statusText: 'Bad Request'
    });
    mockAuthService.signup$.and.returnValue(throwError(() => errorResponse));
    spyOn(window, 'alert').and.callThrough();

    component.onSignup();

    expect(mockAuthService.signup$).toHaveBeenCalledWith({
      email: "test@mail.com",
      password: "V@lidP@ssword123"
    });
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalledWith('/login');
    expect(window.alert).toHaveBeenCalledWith('Échec de la création du compte. Vérifiez recommencer.');
  });

  it('should not call signup$ if the form is invalid', () => {
    component.signupForm.setValue({
      emailControl: "test@mail.com",
      passwordControl: "V@lidP@ssword123",
      passwordAgainControl: "InV@lidP@ssword123"
    });

    component.onSignup();
    
    expect(mockAuthService.signup$).not.toHaveBeenCalled();
  });
});
