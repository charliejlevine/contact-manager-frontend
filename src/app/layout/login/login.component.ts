import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { delay } from 'rxjs/operators';
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
  error = '';
  disableLogin = false;
  isSignUp = false;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.authService.test(), 'test');
    this.disableLogin = true;
    if (!this.signInForm.valid) {
      this.error = 'Please fill in username and password';
    }
    this.authService.login(this.loginInfo.username, this.loginInfo.password)
      .pipe(
        delay(1500)
      )
      .subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
        }
        this.disableLogin = false;
      });
  }

  register() {
    console.log(this.signUpForm);
  }

}
