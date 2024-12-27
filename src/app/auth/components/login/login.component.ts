import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent  {
  myLoginForm: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.myLoginForm = this.fb.group({
        emailControl: ['', [Validators.required, Validators.email]],
        passwordControl: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    this.auth.login();
  }
}
