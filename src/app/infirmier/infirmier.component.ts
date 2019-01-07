import {Component, OnInit} from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {PatientInterface} from "../dataInterfaces/patient";
import {sexeEnum} from "../dataInterfaces/sexe";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements OnInit  {
  private _cms: CabinetInterface;
  private cabinet : CabinetMedicalService;
  private _http: HttpClient;
  public patient: PatientInterface;

  public get cms(): CabinetInterface {return this._cms;}

  constructor(cabinetMedicalService: CabinetMedicalService) {
    this.cabinet = cabinetMedicalService;
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

  public getNR(patient){
    return patient.adresse.numéro;
  }

  public getPatients(infirmier){
    return infirmier.patients;
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
    this.cabinet.affectation(event.container.id, event.container.data[event.currentIndex].numéroSécuritéSociale);
  }

  ngOnInit() {
  }


}
