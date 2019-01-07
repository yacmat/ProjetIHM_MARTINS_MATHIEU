import { Component, OnInit } from '@angular/core';
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {PatientInterface} from "../dataInterfaces/patient";
import {sexeEnum} from "../dataInterfaces/sexe";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  public patientsNA: PatientInterface[];
  private _cms: CabinetInterface;
  private cabinet : CabinetMedicalService;
  private _add = false;
  public get cms(): CabinetInterface {return this._cms;}

  constructor(cabinetMedicalService: CabinetMedicalService) {
    this.cabinet = cabinetMedicalService;
    this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService){
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    this.patientsNA = this._cms.patientsNonAffectés;
  }

  getprenom(patient){
    return patient.prénom;
  }

  getNum(patient){
    return patient.numéroSécuritéSociale;
  }

  public getNR(patient){
    return patient.adresse.numéro;
  }

  public isAdding(){
    return this._add;
  }

  public addPatients(){
    this._add = !this._add;
  }

  public none(){
    this._add = false;
  }

  getNb(){
    return this.patientsNA.reduce((acc,e) => acc + 1,0);
  }

  public getSexe(patient){
    if (patient.sexe === sexeEnum.M){
      return "Masculin";
    }
    else return "Féminin";
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    //@ts-ignore
    this.cabinet.affectation('none', event.container.data[event.currentIndex].numéroSécuritéSociale);

  }

  ngOnInit() {
  }

}
