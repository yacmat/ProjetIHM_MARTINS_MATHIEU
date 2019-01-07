import {Component, OnInit} from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {PatientInterface} from "../dataInterfaces/patient";
import {sexeEnum} from "../dataInterfaces/sexe";
import {HttpClient} from "@angular/common/http";
import {InfirmierInterface} from "../dataInterfaces/infirmier";

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements OnInit  {
  private _cms: CabinetInterface;
  private _http: HttpClient;
  public patient: PatientInterface;

  public get cms(): CabinetInterface {return this._cms;}

  constructor(cabinetMedicalService: CabinetMedicalService) {
    this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService){
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
  }

  public getprenom(infirmier){
    return infirmier.prénom;
  }

  public getNum(patient){
    return patient.numéroSécuritéSociale;
  }

  public getSexe(patient){
    if (patient.sexe === sexeEnum.M){
      return "Masculin";
    }
    else return "Féminin";
  }

  public affectation(patient: PatientInterface, infirmierId: string){
    this._http.post( "/affectation", {
      infirmier: infirmierId,
      patient: patient.numéroSécuritéSociale
    }, {observe: 'response'})
  }

  public desaffectation(patient: PatientInterface){
    this._http.post( "/affectation", {
      infirmier: "none",
      patient: patient.numéroSécuritéSociale
    }, {observe: 'response'})
  }

  ngOnInit() {
  }


}
