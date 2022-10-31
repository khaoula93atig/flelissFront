import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // Http option header
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  };
  constructor(private http: HttpClient) { }
  
  private reloadRequested = new BehaviorSubject<boolean>(false);
  goForReload = this.reloadRequested.asObservable();

  // Trigger for the reload
  askForReload(reload: boolean) {
    this.reloadRequested.next(reload);
  }
  //**********Company***********/

//get all Company
  getConsultingCompany() {

    return this.http.get<any>(environment.url_company,this.httpOptions);
   
  }

//save modification 
   save(company: any) {
    return this.http.put<any>(environment.url_company + "/update", company);
  }
  
}
