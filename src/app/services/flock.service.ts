import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FlockReport, IRegistrationFlocks } from '../shared/registration'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FlockService {
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

  //get all flock by farm
  getConsultingHouse(houseId: string) {
    return this.http.get<any>(
      environment.url_flock + '/house/' + houseId,
      this.httpOptions,
    )
  }
//getby farm id 
findbyFarm(farmid: string) {
  return this.http.get<any>(
    environment.url_flock + '/farm/' + farmid,
    this.httpOptions,
  )
}

  //get all info for flock report
  getFlockReport(flockId: string) {
    return this.http.get<FlockReport>(
      environment.url_flock + '/report/' + flockId,
      this.httpOptions,
    )
  }
  // Create Registration Flock
  createRegistrationFlocks(registrationFlock: IRegistrationFlocks) {
    return this.http.post<IRegistrationFlocks>(
      environment.registrationFlockUrl,
      registrationFlock,
    )
  }
  //save modification
  save(flock: any) {
    
    return this.http.put<any>(environment.url_flock + '/update', flock)
  }
  //update nbr flock
  updateRestNumberFlock(flockId, nbMortality) {
    return this.http.put<any>(
      environment.url_flock +
        '/updateRestNumberFlock/' +
        flockId +
        '/' +
        nbMortality,
      this.httpOptions,
    )
  }
}
