import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { provideHttpClient } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, NzInputModule, NzIconModule, NzFormModule, NzButtonModule],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid with empty form', () => {
    component.loginForm['controls']["emailControl"].setValue("");
    component.loginForm['controls']["passwordControl"].setValue("");
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be invalid with invalid mail', () => {
    component.loginForm['controls']["emailControl"].setValue("OneUser");
    component.loginForm['controls']["passwordControl"].setValue("V@lidP@ssword123!");
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be invalid with short password', () => {
    component.loginForm['controls']["emailControl"].setValue("example@mail.com");
    component.loginForm['controls']["passwordControl"].setValue("1234567");
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be valid with valid mail & password', () => {
    component.loginForm['controls']["emailControl"].setValue("example@mail.com");
    component.loginForm['controls']["passwordControl"].setValue("V@lidPassword123!");
    expect(component.loginForm.valid).toBeTruthy();
  });
});
