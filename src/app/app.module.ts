import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { ContactManagerComponent } from './layout/contact-manager/contact-manager.component';
import { ContactComponent } from './layout/contact-manager/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactManagerComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
