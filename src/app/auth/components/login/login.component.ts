import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { LoginPayload, User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent  {
  loginForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, private route: Router) {
    this.loginForm = this.fb.group({
        emailControl: ['', [Validators.required, Validators.email]],
        passwordControl: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin() {
    var userPayload: LoginPayload = {
      email: this.loginForm.controls['emailControl'].value,
      password: this.loginForm.controls['passwordControl'].value
    };
    this.authenticationService.login$(userPayload).subscribe({
      next: (response : User) => {
        this.authenticationService.setUser(response);
        const userGuid = response.userGuid;
        this.route.navigateByUrl(`/user/${userGuid}`);
      },
      error: (_error) => {
        alert('Échec de la connexion. Vérifiez vos identificants');
      }
    });
  }
}
