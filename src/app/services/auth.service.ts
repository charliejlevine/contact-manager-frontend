import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginInfo, RegisterInfo } from '../layout/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'knightscontacts.com:3000';

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginInfo): Observable<boolean> {
    let isLoginValid = false;
    if (loginInfo.username === 'test') {
      isLoginValid = true;
    }
    return of(isLoginValid);
  }

  register(registerInfo: RegisterInfo) {
    return this.http.put(`${this.url}/api/user`, registerInfo);
  }

  test() {
    return this.http.get(`${this.url}/api/test`);
  }
}
