import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: false
})
export class SignUpComponent {
  mySignupForm: FormGroup;
  passwordVisible: Boolean = false;
  passwordAgainVisible: Boolean = false;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) {
    this.mySignupForm = this.fb.group({
        emailControl: ['', [Validators.required, Validators.email]],
        passwordControl: ['', [Validators.required, CustomValidators.passwordValidator()]],
        passwordAgainControl: ['', [Validators.required, CustomValidators.passwordValidator()]]
    },
    {
      validators: CustomValidators.matchFields('passwordControl', 'passwordAgainControl')
    });
  }

  onSignup() {
    this.auth.signup();
  }
}
