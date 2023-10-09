import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {
  IRegistrationVisits,
  IRegistrationVisitAudits,
  IchickReception,
  CheckList,
  BreedingManagement,
} from '../shared/registration'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class VisitAuditsService {
  // Http option header
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  }
  constructor(private http: HttpClient) {}

  setDate(format: string, date: Date) {
    if (format == 'yyyy-MM-DD') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = year + '-' + smonth + '-' + sday
      var dt = dateFormatted
    } //else { console.log("Format date not supported"); }
    if (format == 'yyyyMMDD') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = '' + year + smonth + sday
      var dt = dateFormatted
    }
    if (format == 'DD-MM-yyyy') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = sday + '-' + smonth + '-' + year
      var dt = dateFormatted
    } //else { console.log("Format date not supported"); }

    if (format == 'MM/DD/yyyy') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = smonth + '/' + sday + '/' + year
      var dt = dateFormatted
    } //else { console.log("Format date not supported"); }

    if (format == 'MM/DD/yyyy') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = smonth + '-' + sday + '-' + year
      var dt = dateFormatted
    } //else { console.log("Format date not supported"); }

    console.log('Format date', dt)
    return dt
  }
  // Create Registration visit
  createRegistrationVisits(registrationVisits: IRegistrationVisits) {
    console.log(
      'environment.registrationVisitAudit ' +
        environment.registrationVisitveterinarianUrl,
    )
    return this.http.post<IRegistrationVisits>(
      environment.registrationVisitUrl,
      registrationVisits,
    )
  }
  // Create Registration visit audit
  createRegistrationVisitsveterinarian(
    registrationVisits: IRegistrationVisits,
  ) {
    console.log(
      'environment.registrationVisitveterinarianUrl ' +
        environment.registrationVisitveterinarianUrl,
      registrationVisits,
    )
    return this.http.post<IRegistrationVisits>(
      environment.registrationVisitveterinarianUrl,
      registrationVisits,
    )
  }
  // Create Registration visitAudit
  createRegistrationVisitAudit(
    registrationVisitAudit: IRegistrationVisitAudits,
  ) {
    return this.http.post<IRegistrationVisitAudits>(
      environment.registrationVisitAudit,
      registrationVisitAudit,
    )
  }
  //get heath status by visit id
  getConsultingAuditVisitbyId(id: string) {
    return this.http.get<any>(
      environment.url_VisitAudits + '/' + id,
      this.httpOptions,
    )
  }

  //visit chick reception
  // Create
  createChickReception(chickReception: IchickReception) {
    return this.http.post<IRegistrationVisits>(
      environment.registrationChickReception + 'save',
      chickReception,
    )
  }

  //visit brooding check
  // Create
  createBroodingCheck(checkList: CheckList) {
    return this.http.post<any>(
      environment.registrationBroodingCheck + 'save',
      checkList,
    )
  }

  //visit breeding management
  //create
  createBreedingManagement(breedingManagement: BreedingManagement) {
    return this.http.post<any>(
      environment.url_breedingManagement + 'save',
      breedingManagement,
    )
  }


  //get chick Reception by farm 
  getCheckReceptionByFarm(farmID: string) {
    return this.http.get<any>(
      environment.registrationChickReception+ '/getByFarm/' +farmID
    )
  }

  //get Brooding check  by farm 
  getBroodingCheckByFarm(farmID: string) {
    return this.http.get<any>(
      environment.registrationBroodingCheck+ 'getByFarm/' +farmID
    )
  }

  //get Breeding Management by farm 
  getBreedingManagementByFarm(farmID: string) {
    return this.http.get<any>(
      environment.url_breedingManagement+ '/getByFarm/' +farmID
    )
  }
}
