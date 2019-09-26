import { Component, OnChanges, Input, NgZone } from '@angular/core';
import { Contact } from './contact.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnChanges {

  @Input() contact: Contact = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
  editContact: Contact = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
  modalTitle = {
    edit: 'Edit Contact',
    delete: 'Delete Contact'
  };

  constructor(private modalService: NgbModal) { }

  ngOnChanges() {
    this.resetEditForm();
  }

  open(editContact) {
    this.modalService.open(editContact).result
      .then((result) => {
        this.saveEditForm();
      }, (reason) => {
        this.resetEditForm();
      });
  }

  resetEditForm() {
    this.editContact.name = this.contact.name;
    this.editContact.email = this.contact.email;
    this.editContact.phone = this.contact.phone;
    this.editContact.address = this.contact.address;
  }

  saveEditForm() {
    this.contact.name = this.editContact.name;
    this.contact.email = this.editContact.email;
    this.contact.phone = this.editContact.phone;
    this.contact.address = this.editContact.address;
  }
}
