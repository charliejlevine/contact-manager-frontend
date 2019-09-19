import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'knightscontacts.com:3000';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    let isLoginValid = false;
    if (username === 'test') {
      isLoginValid = true;
    }
    return of(isLoginValid);
  }

  test() {
    return this.http.get(`${this.url}/api/test`);
  }
}
