import { Component, OnInit } from '@angular/core';
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {CabinetMedicalService} from "../cabinet-medical.service";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  private _cms: CabinetInterface;
  public get cms(): CabinetInterface {return this._cms;}

  constructor(cabinetMedicalService: CabinetMedicalService) {
    this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService){
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
  }

  getprenom(patient){
    return patient.prénom;
  }

  getnumero(patient){
    return patient.numéroSécuritéSociale;
  }

  ngOnInit() {
  }

}
