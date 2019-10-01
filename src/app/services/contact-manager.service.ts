import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../layout/contact-manager/contact/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactManagerService {

  url = 'https://knightscontacts.com';

  constructor(private http: HttpClient) { }

  getContacts(body: { userId: string }) {
    return this.http.post(`${this.url}/api/contact`, body);
  }

  deleteContact(body: { contactId: string }) {
    return this.http.request('delete', `${this.url}/api/contact`, { body });
  }

  addContact(body: Contact) {
    return this.http.put(`${this.url}/api/contact`, body);
  }

  editContact(body: Contact) {
    return this.http.patch(`${this.url}/api/contact`, body);
  }

  searchContacts(body: { userId: string, search: string }) {
    return this.http.post(`${this.url}/api/contact`, body);
  }
}
