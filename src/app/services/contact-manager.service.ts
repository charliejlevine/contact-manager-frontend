import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginInfo, RegisterInfo } from '../layout/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class ContactManagerService {

  url = 'https://knightscontacts.com';

  constructor(private http: HttpClient) { }

  endpoint1(loginInfo: LoginInfo) {
    return this.http.put(`${this.url}/api/user/login`, loginInfo);
  }

  endpoint2(registerInfo: RegisterInfo) {
    return this.http.put(`${this.url}/api/user`, registerInfo);
  }

  endpoint3() {
    return this.http.get(`${this.url}/api/helloworld`);
  }
}
