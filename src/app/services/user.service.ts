import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { IRegistrationUsers } from '../shared/registration'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
  //**********user***********/

  //get all user
  getConsultingUser(farmID: string) {
    return this.http.get<any>(
      environment.url_user + '/farm/' + farmID,
      this.httpOptions,
    )
  }
  getConsultingUserBycompany(companyID: string) {
    return this.http.get<any>(
      environment.url_user + '/company/' + companyID,
      this.httpOptions,
    )
  }

  // Create Registration user
  createRegistrationUsers(registrationUsers: IRegistrationUsers) {
    console.log('registrationFarms', registrationUsers)
    return this.http.post<IRegistrationUsers>(
      environment.registrationUserUrl,
      registrationUsers,
    )
  }
  //save modification
  save(user: any) {
    return this.http.put<any>(environment.url_user + '/update', user)
  }
  //get all role
  getConsultingRole() {
    return this.http.get<any>(environment.url_role, this.httpOptions)
  }

  getWeightByFlock() {
    return this.http.get<any>(environment.url_weightByFlock, this.httpOptions)
  }
}
