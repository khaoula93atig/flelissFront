import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // Http option header
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  };

  url_getWeightperBreed: "/farmApi/dashboard/weightPerFlock/breed/"
  constructor(private http: HttpClient) { }

  getweeklyweightStandardBybreed(breed:number){
    return this.http.get<any>(environment.url_WeeklyWeightMeasurement+'/StandardWeeklyweightBybreed/'+breed)  
  }

  getweeklyweightByBreed(breed:number, flock:string, farmid:string){
    return this.http.get<any>(environment.url_WeeklyWeightMeasurement+'weeklyweightBybreed/'+breed+'/'+flock+'/'+farmid)
  }

  getweeklyWeightByNombreOfOieaux(breed:number, flock:string, farmid:string, week:number){
    return this.http.get<any>(environment.url_WeeklyWeightMeasurement+'weeklyweightBynbreOiseau/'+breed+'/'+flock+'/'+farmid+'/'+week)
  }

  getstandardweeklyWeightByBreedAndage(breed:number, week:number){
    return this.http.get<any>(environment.url_WeeklyWeightMeasurement+'standardweight/'+breed+'/'+week)
  }

  getMortalityByBreed(companyId:string){
    return this.http.get<any>(environment.url_mortaliteDash+'/breed/'+companyId, this.httpOptions)
  }
  //daily percentage mortality by farm
  getMortalityByFarm(task:number,visitDate:string, companyId:string){
    return this.http.get<any>(environment.url_mortaliteDash+'/farm/'+task+'/'+visitDate+'/'+companyId, this.httpOptions)
  }

  //general percentage mortality by farm
  getGeneralMortalityByFarm(companyId:string){
    return this.http.get<any>(environment.url_mortaliteDash+'/farmgeneral/'+companyId, this.httpOptions)
  }

  //weekly weight mesurement by company for farm 
  getweeklyweightbycompanyforfarms(companyId:string){
    return this.http.get<any>(environment.url_dashboard+'/weeklyweight/company/'+companyId, this.httpOptions)
  }



  //get weight by breed by centerId
  getWeightperBreed(centerID: string) {
    console.log("getWeightperBreed " + this.url_getWeightperBreed + centerID)
    return this.http.get<any>(environment.url_weightByBreed + centerID, this.httpOptions);
  }
  //get flocks  by centerId
  getWeightperFlock(centerID: string) {
    console.log("getWeightperFlock " + environment.url_weightByFlock + centerID)
    return this.http.get<any>(environment.url_weightByFlock + centerID, this.httpOptions);
  }
}
