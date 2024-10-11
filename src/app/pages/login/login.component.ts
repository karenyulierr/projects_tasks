import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public form: UntypedFormGroup = new UntypedFormGroup({});
  errorMessage: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const email = this.form.get('email')?.value ?? '';
    const password = this.form.get('password')?.value ?? '';

    if (this.authenticationService.login(email, password)) {
      this.router.navigate(['/projects']);
      console.log("login");
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }

}
