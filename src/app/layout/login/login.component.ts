import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginInfo, RegisterInfo, LoginMessage } from './login.model';
import { finalize } from 'rxjs/operators';

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
  isLoading = false;
  isSignUp = false;
  displayedTitle = '';
  displayedError = '';
  title = {
    signIn: 'Sign In',
    register: 'Register'
  };
  error = {
    invalidForm: 'Please fill in all fields',
    invalidLogin: 'Invalid Login',
    invalidEmail: 'Invalid Email'
  };

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.displayedTitle = this.title.signIn;
    const userId = localStorage.getItem('userId');
    const storedUser = localStorage.getItem('user');
    if (userId) {
      this.router.navigate(['/home']);
    }
  }

  toSignUp() {
    this.isSignUp = true;
    this.displayedTitle = this.title.register;
    this.displayedError = '';
  }

  toSignIn() {
    this.isSignUp = false;
    this.displayedTitle = this.title.signIn;
    this.displayedError = '';
  }

  login() {
    this.isLoading = true;
    if (!this.signInForm.valid) {
      this.displayedError = this.error.invalidForm;
      this.isLoading = false;
      return;
    } else {
      this.displayedError = '';
    }
    this.authService.login(this.loginInfo)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((message: LoginMessage) => {
        localStorage.setItem('userId', message.id);
        this.router.navigate(['/home']);
        this.isLoading = false;
      }, error => {
        this.displayedError = error.error.message;
      });
  }

  register() {
    this.isLoading = true;
    if (!this.signUpForm.valid) {
      this.displayedError = this.error.invalidForm;
      this.isLoading = false;
      return;
    } else {
      this.displayedError = '';
    }
    this.authService.register(this.registerInfo)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.isLoading = false;
        this.toSignIn();
        this.loginInfo.username = this.registerInfo.username;
        this.loginInfo.password = this.registerInfo.password;
      }, error => {
        this.displayedError = error.error.message;
      });
  }

}
