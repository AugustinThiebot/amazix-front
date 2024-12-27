import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: false
})
export class SignUpComponent {
  mySignupForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {
    this.mySignupForm = this.fb.group({
        emailControl: ['', [Validators.required, Validators.email]],
        passwordControl: ['', [Validators.required, Validators.minLength(6)]],
        passwordAgainControl: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignup() {
    this.auth.signup();
    this.router.navigateByUrl('/products');
  }
}
