import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import {
  IRegistrationFarms,
  IRegistrationVisits,
  IRegistrationVisitTasks,
  WeeklyWeightMeasurement,
  WeeklyFeed,
} from '../shared/registration'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  // Http option header
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  }
  constructor(private http: HttpClient) {}

  private reloadRequested = new BehaviorSubject<boolean>(false)
  goForReload = this.reloadRequested.asObservable()

  // Trigger for the reload
  askForReload(reload: boolean) {
    this.reloadRequested.next(reload)
  }
  //**********visit***********/

  //get all visit
  getConsultingVisit(userName: string, role: string, farmId: string) {
    console.log(
      'getConsultingVisit ' +
        environment.url_visit +
        '/username/' +
        userName +
        '/' +
        role +
        '/' +
        farmId,
    )
    return this.http.get<any>(
      environment.url_visit +
        '/username/' +
        userName +
        '/' +
        role +
        '/' +
        farmId,
      this.httpOptions,
    )
  }
  // Create Registration visit
  createRegistrationVisits(registrationVisits: IRegistrationVisits) {
    return this.http.post<IRegistrationVisits>(
      environment.registrationVisitUrl,
      registrationVisits,
    )
  }
  //save modification
  save(visit: any) {
    return this.http.put<any>(environment.url_visit + '/update', visit)
  }
  //get flock by house id
  getConsultingFlock(houseID: string) {
    console.log('url_flock' + environment.url_flock + '/house/' + houseID)
    return this.http.get<any>(
      environment.url_flock + '/house/' + houseID,
      this.httpOptions,
    )
  }
  getConsultingFlockbyId(flockID: string) {
    return this.http.get<any>(
      environment.url_flock + '/' + flockID,
      this.httpOptions,
    )
  }

  getConsultingTask() {
    return this.http.get<any>(environment.url_task, this.httpOptions)
  }

  //
  // Create Registration visitTasks
  createRegistrationVisitTasks(
    registrationVisitTasks: IRegistrationVisitTasks,
  ) {
    return this.http.post<IRegistrationVisitTasks>(
      environment.registrationVisitTasksUrl,
      registrationVisitTasks,
    )
  }

  getConsultingvisitID(id: string) {
    return this.http.get<any>(
      environment.url_visittasks + '/' + id,
      this.httpOptions,
    )
  }
  getStndardWeigth(ageFlock, breed) {
    return this.http.get<any>(
      environment.url_dailyWeight + 'getByAgeDays/' + ageFlock + '/' + breed,
      this.httpOptions,
    )
  }
  //get all visittasks
  getConsultingVisitTasks() {
    return this.http.get<any>(environment.url_visittasks, this.httpOptions)
  }

  //post weekly weight
  saveWeeklyWeight(weeklyWeightMeasurement) {
    return this.http.post<WeeklyWeightMeasurement>(
      environment.url_WeeklyWeightMeasurement + 'save',
      weeklyWeightMeasurement,
    )
  }
  //post weekly feed
  saveWeeklyFeed(weeklyFeed) {
    return this.http.post<WeeklyFeed>(
      environment.url_WeeklyFeed + 'save',
      weeklyFeed,
    )
  }
}
