import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginInfo, RegisterInfo, LoginMessage, RegisterMessage } from '../layout/login/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://knightscontacts.com';

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginInfo): Observable<LoginMessage> {
    return this.http.post<LoginMessage>(`${this.url}/api/user`, loginInfo);
  }

  register(registerInfo: RegisterInfo): Observable<RegisterMessage> {
    return this.http.put<RegisterMessage>(`${this.url}/api/user`, registerInfo);
  }
}
