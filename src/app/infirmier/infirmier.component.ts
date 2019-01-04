import { Component, OnInit } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import { NgForm } from "@angular/forms";
import {PatientInterface} from "../dataInterfaces/patient";
import { AddPatientComponent } from "../add-patient/add-patient.component";

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements OnInit  {
  private _cms: CabinetInterface;
  private _add = false;
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

  public addPatients(){
    this._add = !this._add;
  }

  public isAdding(){
    return this._add;
  }

  public none(){
    this._add = false;
  }

  ngOnInit() {
  }


}
