import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { InfirmierComponent } from "./infirmier/infirmier.component";
import { PatientComponent } from "./patient/patient.component";
import { AddPatientComponent } from "./add-patient/add-patient.component";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    PatientComponent,
    InfirmierComponent,
    AddPatientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
