import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { SignupPayload } from 'src/app/models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: false
})
export class SignUpComponent {
  signupForm: FormGroup;
  passwordVisible: Boolean = false;
  passwordAgainVisible: Boolean = false;

  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, private route: Router) {
    this.signupForm = this.fb.group({
        emailControl: ['', [Validators.required, Validators.email]],
        passwordControl: ['', [Validators.required, CustomValidators.passwordValidator()]],
        passwordAgainControl: ['', [Validators.required, CustomValidators.passwordValidator()]]
    },
    {
      validators: CustomValidators.matchFields('passwordControl', 'passwordAgainControl')
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      var userPayload: SignupPayload = {
        email: this.signupForm.controls['emailControl'].value,
        password: this.signupForm.controls['passwordControl'].value
      }
      this.authenticationService.signup$(userPayload).subscribe({
        next: _response => {
          alert('Votre compte a été créé avec succès !');
          this.route.navigateByUrl('/login');
        },
        error: _error => {
          alert('Échec de la création du compte. Vérifiez recommencer.');
        }
      });
    }
  }
}
