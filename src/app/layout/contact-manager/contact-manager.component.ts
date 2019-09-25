import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
