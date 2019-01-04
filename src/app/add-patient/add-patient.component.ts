import {Component, OnInit} from '@angular/core';
import {PatientInterface} from "../dataInterfaces/patient";
import {sexeEnum} from "../dataInterfaces/sexe";
import {HttpClient, HttpResponse} from "@angular/common/http";

import {NgForm} from "@angular/forms";
import {SecretaryComponent} from "../secretary/secretary.component";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  private _cabinet: SecretaryComponent;
  private _http: HttpClient;
  private sexe: 'M';

  public get http(): HttpClient {return this._http;}

  constructor(http : HttpClient, cabinet: SecretaryComponent) {
    this._http = http;
    this._cabinet = cabinet;
  }

  public async addPatient(patient: PatientInterface): Promise<PatientInterface> {
    const res = await this._http.post('/addPatient', {
      patientName: patient.nom,
      patientForname: patient.prénom,
      patientNumber: patient.numéroSécuritéSociale,
      patientSex: patient.sexe === sexeEnum.M ? 'M' : 'F',
      patientBirthday: 'AAAA-MM-JJ',
      patientFloor: patient.adresse.étage,
      patientStreetNumber: patient.adresse.numéro,
      patientStreet: patient.adresse.rue,
      patientPostalCode: patient.adresse.codePostal,
      patientCity: patient.adresse.ville
    }, {observe: 'response'}).toPromise<HttpResponse<any>>();

    console.log('Add patient renvoie', res);
    if (res.status === 200) {
      // OK on peut ajouter en local
      this._cabinet.addPatient(patient);
    }
    return null;
  }

  public onSubmit(form: NgForm): Promise<PatientInterface> {
    const patient: PatientInterface = {
      prénom: '',
      nom: '',
      sexe: sexeEnum.F,
      numéroSécuritéSociale: '',
      adresse: {
        ville: '',
        codePostal: 0,
        rue: '',
        numéro: '',
        étage: ''
      }
    };
    return new Promise<PatientInterface>((resolve, reject) => {
        patient.nom = form.value['patientName'];
        patient.prénom = form.value['patientForname'];
        patient.sexe = this.sexe === "M" ? sexeEnum.M : sexeEnum.F;
        patient.adresse.codePostal = parseInt(form.value['patientPostalCode']);
        patient.adresse.numéro = form.value['patientStreetNumber'];
        patient.adresse.rue = form.value['patientStreet'];
        patient.adresse.ville = form.value['patientCity'];
        patient.adresse.étage = form.value['patientFloor'];
        patient.numéroSécuritéSociale = form.value['patientNumber'];
        resolve(this.addPatient(patient));
      }
    )};


  ngOnInit() {
  }

}
