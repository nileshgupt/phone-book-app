import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PhoneRecordComponent } from './components/phone-record/phone-record.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpService } from './services/httpService';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhoneRecordComponent,
    NewContactComponent,
    EditContactComponent
  ],
  imports: [
    
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
