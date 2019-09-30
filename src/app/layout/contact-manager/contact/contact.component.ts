import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactManagerService } from 'src/app/services/contact-manager.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contact: Contact = {
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  };
  @Output() getContactsOutput = new EventEmitter();
  editContactForm: Contact = {
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  };
  modalTitle = {
    edit: 'Edit Contact',
    delete: 'Delete Contact'
  };
  userId: string;

  constructor(private modalService: NgbModal,
              private contactService: ContactManagerService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.resetEditForm();
  }

  open(modal) {
    this.modalService.open(modal).result
      .then((result) => {
        result === 'edit' ? this.editContact() : this.deleteContact();
      }, (reason) => {
        if (reason === 'edit') {
          this.resetEditForm();
        }
      });
  }

  resetEditForm() {
    this.editContactForm = _.clone(this.contact);
  }

  editContact() {
    const body = {
      userId: this.userId,
      contactId: this.contact._id,
      ...this.editContactForm
    };
    this.contactService.editContact(body)
      .subscribe(() => {
        this.getContactsOutput.emit();
      });
  }

  deleteContact() {
    const body = {
      contactId: this.contact._id
    };
    this.contactService.deleteContact(body)
      .subscribe(() => {
        this.getContactsOutput.emit();
      });
  }
}
