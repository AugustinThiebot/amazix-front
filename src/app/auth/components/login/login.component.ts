import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginPayload } from 'src/app/models/user';
import { TokenService } from 'src/app/core/services/token.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent  {
  myLoginForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, private tokenService: TokenService, private route: Router) {
    this.myLoginForm = this.fb.group({
        emailControl: ['', [Validators.required, Validators.email]],
        passwordControl: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    var userPayload: LoginPayload = {
      email: this.myLoginForm.controls['emailControl'].value,
      password: this.myLoginForm.controls['passwordControl'].value
    };
    this.authenticationService.login(userPayload).subscribe({
      next: (response) => {
        this.tokenService.setToken(response.token);
        this.route.navigateByUrl('/products');
      },
      error: (_error) => {
        alert('Échec de la connexion. Vérifiez vos identificants');
      }
    });
  }
}
