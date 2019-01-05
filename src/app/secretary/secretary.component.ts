import { Component, OnInit } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {PatientComponent} from "../patient/patient.component";

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {
  private _cms: CabinetInterface;
  private patient: PatientComponent;
  public get cms(): CabinetInterface {return this._cms;}

  constructor(cabinetMedicalService: CabinetMedicalService) {
    this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService){
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
  }

  getprenom(infirmier){
    return infirmier.prénom;
  }

  refresh() {
    window.location.reload();
  }

  addPatient(patient){
    this._cms.patientsNonAffectés.push(patient);
    this.refresh();
  }

  ngOnInit() {
  }

}
