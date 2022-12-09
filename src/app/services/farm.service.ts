import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Center, IRegistrationFarms } from '../shared/registration'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FarmService {
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
  //**********farm***********/

  //get all farm
  getConsultingFarm(companyID: string) {
    return this.http.get<any>(
      environment.url_farm +'/getByCompany/'+ companyID,
      this.httpOptions,
    )
  }
  getConsultingAllFarm() {
    return this.http.get<any>(environment.url_farm, this.httpOptions)
  }

  //save modification
  save(farm: any) {
    return this.http.put<any>(environment.url_farm + '/update', farm)
  }

  // Create Registration Farm
  createRegistrationFarms(registrationFarms: IRegistrationFarms) {
    return this.http.post<IRegistrationFarms>(
      environment.registrationFarmUrl,
      registrationFarms,
    )
  }

  //get all farm
  getConsultingALLFarm() {
    return this.http.get<any>(environment.url_farm, this.httpOptions)
  }

  //get all centers
  getConsultingALLCenters() {
    return this.http.get<any>(environment.centerUrl, this.httpOptions)
  }
  //get all centers by role user
  getConsultingALLCentersByRoleUser(role, farmIdUser, companyIdUser) {
    return this.http.get<any>(
      environment.centerUrl +
        'findCentersByRole/' +
        role +
        '/' +
        farmIdUser +
        '/' +
        companyIdUser,
      this.httpOptions,
    )
  }

  // Create  center
  createCenter(center: Center) {
    return this.http.post<Center>(environment.centerUrl + 'save', center)
  }

  //save modification
  updateCenter(center: any) {
    return this.http.put<any>(environment.centerUrl + '/update', center)
  }

  //getById
  findById(id:string){
    return this.http.get<any>(environment.url_farm +'/getByid/'+ id)
  }
  
}
