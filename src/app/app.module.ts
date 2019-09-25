import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { ContactManagerComponent } from './layout/contact-manager/contact-manager.component';
import { ContactComponent } from './layout/contact-manager/contact/contact.component';
import { AuthService } from './services/auth.service';
import { ContactManagerService } from './services/contact-manager.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactManagerComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [AuthService, ContactComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
