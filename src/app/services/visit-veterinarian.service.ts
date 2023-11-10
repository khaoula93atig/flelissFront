import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  IRegistrationVisits,
  IRegistrationVisitHealthStatus,
  IRegistrationVisitNecropsy,
  VisitHealthStatus,
  VisitNecropsy,
} from '../shared/registration';

@Injectable({
  providedIn: 'root',
})
export class VisitVeterinarianService {
  // Http option header
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(private http: HttpClient) {
  }

  //get Total Measure
  getConsultingTotalMeasure(
    visitDate: string,
    taskId: number,
    flockId: String,
  ) {
    console.log(
      '*********** ' +
      environment.url_visittasks +
      '/getbydate/' +
      visitDate +
      '/' +
      taskId +
      '/' +
      flockId,
    );
    return this.http.get<any>(
      environment.url_visittasks +
      '/getbydate/' +
      visitDate +
      '/' +
      taskId +
      '/' +
      flockId,
      this.httpOptions,
    );
  }

  //get Weight Variation By Flock
  getWeightVariationByFlock(flockId: String) {
    return this.http.get<any>(
      environment.url_visittasks + '/flock/' + flockId,
      this.httpOptions,
    );
  }

  //get health status
  getConsultingHealthStatus() {
    return this.http.get<any>(environment.url_healthStatus, this.httpOptions);
  }

  // Create Registration visit
  createRegistrationVisitsveterinarian(
    registrationVisits: IRegistrationVisits,
  ) {
    console.log(
      'environment.registrationVisitveterinarianUrl ' +
      environment.registrationVisitveterinarianUrl,
      registrationVisits,
    );
    return this.http.post<IRegistrationVisits>(
      environment.registrationVisitveterinarianUrl,
      registrationVisits,
    );
  }

  // Create Registration visithealthStatus
  createRegistrationVisithealthStatus(VisitHealthStatus: VisitHealthStatus) {
    return this.http.post<IRegistrationVisitHealthStatus>(
      environment.registrationVisitHealthStatus,
      VisitHealthStatus,
    );
  }

  //get all visit vet
  getConsultingVisitvet(userName: string, role: string, farmId: string) {
    return this.http.get<any>(
      environment.VisitveterinarianUrl +
      '/username/' +
      userName +
      '/' +
      role +
      '/' +
      farmId,
      this.httpOptions,
    );
  }

  // Create Registration VisitNecropsy
  createRegistrationVisitNecropsy(visitNecropsy: VisitNecropsy) {
    return this.http.post<IRegistrationVisitNecropsy>(
      environment.registrationVisitNecropsy,
      visitNecropsy,
    );
  }

  //get heath status by visit id
  getConsultingHealthStatusbyId(id: string) {
    return this.http.get<any>(
      environment.url_visitHeathStatus + '/' + id,
      this.httpOptions,
    );
  }

  //get necropsyby visit id
  getConsultingNecropsybyId(id: string) {
    return this.http.get<any>(
      environment.url_VisitNecropsy + '/' + id,
      this.httpOptions,
    );
  }

  uploadAnalyse(formData: FormData, date: string, visitId: string) {
    return this.http.post(
      environment.upload_analyseUrl + date + '/' + visitId,
      formData,
    );
  }

  showAnalyse(visitDate, visitId) {
    let urlReport = environment.upload_analyseUrl + visitDate + '/' + visitId;
    console.log('urlReport ' + urlReport);
    window.open(urlReport, '_blank');
  }
}
