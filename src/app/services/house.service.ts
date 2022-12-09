import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import {
  IRegistrationHouses,
  IRegistrationFlocks,
} from '../shared/registration'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class HouseService {
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

  // Fetching the all HOUSE
  getfarm(): Observable<any> {
    return this.http.get<IRegistrationHouses[]>(environment.url_farm)
  }

  //get all house by farme id
  getConsultingHouse(farmID: string) {
    console.log(
      'environment.url_house farmID' +
        environment.url_house +
        '/farm/' +
        farmID,
    )
    return this.http.get<any>(
      environment.url_house + '/farm/' + farmID,
      this.httpOptions,
    )
  }
  //get all house by center
  getConsultingHouseByCenter(centerId: string) {
    return this.http.get<any>(
      environment.url_house + '/center/' + centerId,
      this.httpOptions,
    )
  }
  //get all center
  getConsultingCenterbyFarm(farmID: string) {
    return this.http.get<any>(
      environment.centerUrl + 'getByFarmId/' + farmID,
      this.httpOptions,
    )
  }
  //get house by id
  gethouse(houseId: string) {
    return this.http.get<any>(
      environment.url_house + '/' + houseId,
      this.httpOptions,
    )
  }

  // Create Registration House
  createRegistrationHouses(registrationHouses: IRegistrationHouses) {
    console.log('registrationHouses', registrationHouses)
    return this.http.post<IRegistrationHouses>(
      environment.registrationHouseUrl,
      registrationHouses,
    )
  }

  //save modification
  save(house: any) {
    console.log('house' + house.houseId)
    console.log('house' + house)
    return this.http.put<any>(environment.url_house + '/update', house)
  }
  //get all breed
  getConsultingBreed() {
    return this.http.get<any>(environment.url_breed, this.httpOptions)
  }

  //get all breed
  getConsultingBreed1() {
    return this.http.get<any>(environment.test, this.httpOptions)
  }
}
