import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getMortalityByBreed(){
    return this.http.get<any>(environment.url_mortaliteDash)
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
