import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginInfo, RegisterInfo } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('signInForm') signInForm: NgForm;
  @ViewChild('signUpForm') signUpForm: NgForm;

  loginInfo: LoginInfo = {
    username: '',
    password: ''
  };
  registerInfo: RegisterInfo = {
    username: '',
    password: '',
    email: ''
  };
  title = 'Sign In';
  displayedError = '';
  disableLogin = false;
  disableRegister = false;
  isSignUp = false;
  rememberMe = false;
  error = {
    invalidForm: 'Please fill in all fields',
    invalidLogin: 'Invalid Login',
    invalidEmail: 'Invalid Email'
  };

  constructor(private router: Router,
              private authService: AuthService,
              private cookieService: CookieService) { }

  ngOnInit() {
    const cookieUser = this.cookieService.get('user');
    this.loginInfo = cookieUser ? JSON.parse(cookieUser) : this.loginInfo;
  }

  toSignUp() {
    this.isSignUp = true;
    this.title = 'Register';
    this.displayedError = '';
  }

  toSignIn() {
    this.isSignUp = false;
    this.title = 'Sign In';
    this.displayedError = '';
  }

  login() {
    this.disableLogin = true;
    if (!this.signInForm.valid) {
      this.displayedError = this.error.invalidForm;
      this.disableLogin = false;
      return;
    } else {
      this.displayedError = '';
    }
    this.authService.login(this.loginInfo)
      .subscribe(isLoginValid => {
        if (this.rememberMe) {
          const cookieUser = JSON.stringify(this.loginInfo);
          this.cookieService.set('user', cookieUser);
        }
        if (isLoginValid) {
          this.router.navigate(['/home']);
        } else {
          this.displayedError = this.error.invalidLogin;
        }
        this.disableLogin = false;
      });
  }

  register() {
    this.disableRegister = true;
    if (!this.signUpForm.valid) {
      this.displayedError = this.error.invalidForm;
      this.disableRegister = false;
      return;
    } else {
      this.displayedError = '';
    }
    this.authService.register(this.registerInfo)
      .subscribe(isEmailValid => {
        if (isEmailValid) {
          this.verifyEmail();
        } else {
          this.displayedError = this.error.invalidEmail;
        }
        this.disableRegister = false;
      });
  }

  verifyEmail() {
    console.log('check your email');
  }

}
