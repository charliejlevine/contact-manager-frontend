import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactManagerService {

  url = 'https://knightscontacts.com';

  constructor(private http: HttpClient) { }

  getContacts(userId: string) {
    return this.http.post(`${this.url}/api/contact`, { id: userId });
  }

  addContact(body: any) {
    return this.http.put(`${this.url}/api/contact`, body);
  }
}
