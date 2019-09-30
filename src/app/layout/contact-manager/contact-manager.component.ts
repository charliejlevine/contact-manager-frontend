import { Component, OnInit } from '@angular/core';

import { Contact } from './contact/contact.model';
import { ContactManagerService } from 'src/app/services/contact-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {

  contacts = [];

  addContactForm: Contact = {
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  };
  modalTitle = {
    addContact: 'Add Contact',
    logout: 'Logout'
  };
  userId: string;
  search = '';

  constructor(private contactService: ContactManagerService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
    } else {
      this.userId = userId;
      this.getContacts();
    }
  }

  getContacts() {
    const body = {
      userId: this.userId,
    };
    this.contactService.getContacts(body)
      .subscribe((res: any) => {
        this.contacts = res.contacts;
      });
  }

  searchContacts() {
    const body = {
      userId: this.userId,
    };
    this.contactService.searchContacts(body, this.search)
      .subscribe((res: any) => {
        this.contacts = res.contacts;
      });
  }

  addContact() {
    const body = {
      userId: this.userId,
      ...this.addContactForm
    };
    this.resetAddForm();
    this.contactService.addContact(body)
      .subscribe(() => {
        this.getContacts();
      });
  }

  open(modal) {
    this.modalService.open(modal).result
      .then((result) => {
        result === 'addContact' ? this.addContact() : this.logout();
      }, (reason) => {
        if (reason === 'addContact') { this.resetAddForm(); }
      });
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  resetAddForm() {
    this.addContactForm.name = '';
    this.addContactForm.email = '';
    this.addContactForm.phone = '';
    this.addContactForm.address = '';
    this.addContactForm.notes = '';
  }

}
