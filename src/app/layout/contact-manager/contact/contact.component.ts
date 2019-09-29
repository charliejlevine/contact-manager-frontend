import { Component, OnChanges, Input } from '@angular/core';
import { Contact } from './contact.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    address: '',
    notes: ''
  };
  editContact: Contact = {
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

  constructor(private modalService: NgbModal) { }

  ngOnChanges() {
    this.resetEditForm();
  }

  open(modal) {
    this.modalService.open(modal).result
      .then((result) => {
        result === 'edit' ? this.saveContact() : this.deleteContact();
      }, (reason) => {
        if (reason === 'edit') { this.resetEditForm(); }
      });
  }

  resetEditForm() {
    this.editContact.name = this.contact.name;
    this.editContact.email = this.contact.email;
    this.editContact.phone = this.contact.phone;
    this.editContact.address = this.contact.address;
  }

  saveContact() {
    this.contact.name = this.editContact.name;
    this.contact.email = this.editContact.email;
    this.contact.phone = this.editContact.phone;
    this.contact.address = this.editContact.address;
  }

  deleteContact() {
    console.log('delete');
  }
}
