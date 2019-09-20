import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {

  contacts = [
    {
      name: 'Charlie Levine'
    },
    {
      name: 'Jeremy Dantes'
    },
    {
      name: 'Mark Trinidad'
    },
    {
      name: 'Nelson Torres'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
