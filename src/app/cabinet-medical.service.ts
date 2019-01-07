import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {CabinetInterface} from "./dataInterfaces/cabinet";
import {PatientInterface} from "./dataInterfaces/patient";
import {sexeEnum} from "./dataInterfaces/sexe";
import {InfirmierInterface} from "./dataInterfaces/infirmier";
import {Adresse} from "./dataInterfaces/adresse";


@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {
  private _cabinet: CabinetInterface;

  private _http: HttpClient;
  public get http(): HttpClient {return this._http;}

  constructor(http : HttpClient) {
    this._http = http;
  }

  async getData(url: string): Promise<CabinetInterface> {
    try {
      const response = await this.http.get(url, {responseType: 'text'}).toPromise();

      let parser = new DOMParser();
      let doc = parser.parseFromString(response, "application/xml");

      if (!doc) return null;

      const cabinet: CabinetInterface = {
        infirmiers: [],
        patientsNonAffectés: [],
        adresse: this.getAdressFrom(doc.querySelector("cabinet"))
      };

      const infirmiersXML = Array.from(doc.querySelectorAll("infirmiers > infirmier"));

      cabinet.infirmiers = infirmiersXML.map(I => ({
        id: I.getAttribute("id"),
        prénom: I.querySelector("prénom").textContent,
        nom: I.querySelector("nom").textContent,
        photo: I.querySelector("photo").textContent,
        adresse: this.getAdressFrom(I),
        patients: []
      }));

      const patientsXML = Array.from(doc.querySelectorAll("patients > patient"));
      const patients: PatientInterface[] = patientsXML.map(P => ({
        prénom: P.querySelector("prénom").textContent,
        nom: P.querySelector("nom").textContent,
        sexe: P.querySelector("sexe").textContent === "M" ? sexeEnum.M : sexeEnum.F,
        numéroSécuritéSociale: P.querySelector("numéro").textContent,
        adresse: this.getAdressFrom(P)
      }));

      const affectations = patientsXML.map((P, i) => {
        const visiteXML = P.querySelector("visite[intervenant]");
        let infirmier: InfirmierInterface = null;
        if (visiteXML !== null &&  P.querySelector("visite").getAttribute("intervenant") !== '') {
          infirmier = cabinet.infirmiers.find(I => I.id === visiteXML.getAttribute("intervenant"));
        }
        return {patient: patients[i], infirmier: infirmier};
      });

      affectations.forEach(({patient: P, infirmier: I}) => {
        if (I !== null) {
          I.patients.push(P);
        } else {
          cabinet.patientsNonAffectés.push(P);
        }
      });

      return cabinet;

    } catch(err) {
      console.error("ERROR in getData", err);
    }

  }

  public async affectation(infirmierId: string, numéroSécuritéSociale: number){
    console.log("ID : " + infirmierId + " Numéro : " + numéroSécuritéSociale);
    const res = await this._http.post( "/affectation", {
      infirmier: infirmierId,
      patient: numéroSécuritéSociale
    }, {observe: 'response'}).toPromise<HttpResponse<any>>();

    console.log('Affectation patient renvoie', res);
  }

  private getAdressFrom(root: Element): Adresse {
    let node: Element;
    return {
      ville: (node = root.querySelector("adresse > ville")) ? node.textContent : "",
      codePostal: (node = root.querySelector("adresse > codePostal")) ? parseInt(node.textContent, 10) : 0,
      rue: (node = root.querySelector("adresse > rue")) ? node.textContent : "",
      numéro: (node = root.querySelector("adresse > numéro")) ? node.textContent : "",
      étage: (node = root.querySelector("adresse > étage")) ? node.textContent : ""
    };
  }

}
