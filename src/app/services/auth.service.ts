import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInfo, RegisterInfo } from '../layout/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://knightscontacts.com';

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginInfo) {
    return this.http.put(`${this.url}/api/user/login`, loginInfo);
  }

  register(registerInfo: RegisterInfo) {
    return this.http.put(`${this.url}/api/user`, registerInfo);
  }

  helloworld() {
    return this.http.get(`${this.url}/api/helloworld`);
  }
}
