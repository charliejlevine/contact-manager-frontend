import { Component, OnInit } from '@angular/core';
import { Contact } from './contact/contact.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {

  contacts = [
    {
      name: 'Charlie Levine',
      email: 'charlie@example.com',
      phone: '(123) 456-7890',
      address: '4000 Central Florida Blvd'
    },
    {
      name: 'Jeremy Dantes',
      email: 'jeremy@example.com',
      phone: '(123) 456-7890',
      address: '4000 Central Florida Blvd'
    },
    {
      name: 'Mark Trinidad',
      email: 'mark@example.com',
      phone: '(123) 456-7890',
      address: '4000 Central Florida Blvd'
    },
    {
      name: 'Nelson Torres',
      email: 'nelson@example.com',
      phone: '(123) 456-7890',
      address: '4000 Central Florida Blvd'
    }
  ];

  addContactForm: Contact = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
  modalTitle = {
    addContact: 'Add Contact',
    logout: 'Logout'
  };

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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
    console.log('logout');
  }

  addContact() {
    console.log('add contact');
  }

  resetAddForm() {
    this.addContactForm.name = '';
    this.addContactForm.email = '';
    this.addContactForm.phone = '';
    this.addContactForm.address = '';
  }

}
