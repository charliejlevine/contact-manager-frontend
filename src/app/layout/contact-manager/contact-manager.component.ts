import { Component, OnInit } from '@angular/core';
import { Contact } from './contact/contact.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ContactManagerService } from 'src/app/services/contact-manager.service';

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
    address: '',
    notes: ''
  };
  modalTitle = {
    addContact: 'Add Contact',
    logout: 'Logout'
  };
  userId: string;

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
    this.contactService.getContacts(this.userId)
      .subscribe(() => {
        //
      });
  }

  addContact() {
    const body = {
      id: this.userId,
      ...this.addContactForm
    };
    this.contactService.addContact(body)
      .subscribe((res: {contacts: any}) => {
        this.contacts = res.contacts;
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
  }

}
