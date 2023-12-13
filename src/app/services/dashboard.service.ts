import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

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

  url_getWeightperBreed: '/farmApi/dashboard/weightPerFlock/breed/';

  constructor(private http: HttpClient) {
  }

  getweeklyweightStandardBybreed(breed: number) {
    return this.http.get<any>(environment.url_WeeklyWeightMeasurement + '/StandardWeeklyweightBybreed/' + breed);
  }

  getweeklyweightByBreed(breed: number, flock: string, farmid: string) {
    return this.http.get<any>(environment.url_WeeklyWeightMeasurement + 'weeklyweightBybreed/' + breed + '/' + flock + '/' + farmid);
  }

  getweeklyWeightByNombreOfOieaux(breed: number, flock: string, farmid: string, week: number) {
    return this.http.get<any>(environment.url_WeeklyWeightMeasurement + 'weeklyweightBynbreOiseau/' + breed + '/' + flock + '/' + farmid + '/' + week);
  }

  getstandardweeklyWeightByBreedAndage(breed: number, week: number) {
    return this.http.get<any>(environment.url_WeeklyWeightMeasurement + 'standardweight/' + breed + '/' + week);
  }

  getMortalityByBreed(companyId: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/breed/' + companyId, this.httpOptions);
  }

  // daily percentage details by farm
  getMortalityByFarm(task: number, visitDate: string, companyId: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/farm/' + task + '/' + visitDate + '/' + companyId, this.httpOptions);
  }

  // general percentage details by farm
  getGeneralMortalityByFarm(companyId: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/farmgeneral/' + companyId, this.httpOptions);
  }

  // percentage Mortality by center
  getMortalityByCenter(farmId: String) {
    return this.http.get<any>(environment.url_mortaliteDash + '/center/' + farmId, this.httpOptions);
  }

  // percentage Mortality By house
  getMortalityByHouse(centerId: String) {
    return this.http.get<any>(environment.url_mortaliteDash + '/house/' + centerId, this.httpOptions);
  }

  // weekly weight mesurement by company for farm
  getweeklyweightbycompanyforfarms(companyId: string) {
    return this.http.get<any>(environment.url_dashboard + '/weeklyweight/company/' + companyId, this.httpOptions);
  }

  // weekly weight mesurement by farm for center
  getweeklyweightbyFarmforcenter(farmId: string) {
    return this.http.get<any>(environment.url_dashboard + '/weeklyweight/farm/' + farmId, this.httpOptions);
  }

  // weekly weight mesurement by center for house
  getweeklyweightbyCenterforHouse(centerId: string) {
    return this.http.get<any>(environment.url_dashboard + '/weeklyweight/center/' + centerId, this.httpOptions);
  }

  // get alert by farm
  getalertByFarm(visitDate: string, farmId: string) {
    return this.http.get<any>(environment.url_dashboard + '/alert/' + visitDate + '/' + farmId, this.httpOptions);
  }

  // get alert by house
  getalertByhouse(visitDate: string, houseId: string) {
    return this.http.get<any>(environment.url_dashboard + '/alert/house/' + visitDate + '/' + houseId, this.httpOptions);
  }

  // get feed consumption
  getfeedByhouse(visitDate: string, houseId: string) {
    return this.http.get<any>(environment.url_dashboard + '/feed/house/' + visitDate + '/' + houseId, this.httpOptions);
  }

  // get feed consumption
  gettotalFeedByhouse(visitDate: string, houseId: string) {
    return this.http.get<any>(environment.url_dashboard + '/totalfeed/house/' + visitDate + '/' + houseId, this.httpOptions);
  }

  // get details by company
  getMortalityByCompany(companyId: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/company/' + companyId, this.httpOptions);
  }

  // get survival by company
  getSurvivalByCompany(companyId: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/company/survival/' + companyId, this.httpOptions);
  }

  // get survival by farm
  getSurvivalByFarm(farmId: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/farm/survival/' + farmId, this.httpOptions);
  }

  // get details by farm
  getMortalityCountByFarm(farmId: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/farm/mortality/' + farmId, this.httpOptions);
  }

  // get details by house
  getMortalityCountByHouse(houseId: string, date: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/house/mortality/' + houseId + '/' + date, this.httpOptions);
  }

  // get survival by house
  getSurvivalByhouse(houseId: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/house/survival/' + houseId, this.httpOptions);
  }

  // get age of flock
  getAgeFlock(houseId: string, date: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/ageofFlock/' + houseId + '/' + date, this.httpOptions);
  }

  // feed by house of last days
  getFeedByHouseOfLastDays(houseId: string) {
    return this.http.get<any>(environment.url_dashboard + '/feed/lastHouse/' + houseId, this.httpOptions);
  }

  // Weight by house of last days
  getWeightByHouseOfLastDays(houseId: string) {
    return this.http.get<any>(environment.url_dashboard + '/weight/lastdays/' + houseId, this.httpOptions);
  }

  // water by house of last days
  getwaterByHouseOfLastDays(houseId: string) {
    return this.http.get<any>(environment.url_dashboard + '/water/lastdays/' + houseId, this.httpOptions);
  }

  // water consumption by house daily
  getwaterconsumptionByHouseDaily(houseId: string, date: string) {
    return this.http.get<any>(environment.url_dashboard + '/water/house/' + houseId + '/' + date, this.httpOptions);
  }

  // weight by house daily
  getweightByHouseDaily(houseId: string, date: string) {
    return this.http.get<any>(environment.url_dashboard + '/weight/house/' + houseId + '/' + date, this.httpOptions);
  }

  // CV by house daily
  getcvByHouseDaily(houseId: string, date: string) {
    return this.http.get<any>(environment.url_dashboard + '/weight/cv/house/' + houseId + '/' + date, this.httpOptions);
  }

  // water consumption total by house
  getwaterconsumptionTotalByHouse(houseId: string, date: string) {
    return this.http.get<any>(environment.url_dashboard + '/totalwater/house/' + houseId + '/' + date, this.httpOptions);
  }

  // details by house last days
  getMortalityByHouseOfLastDays(houseId: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/mortalityByHouse/lastDays/' + houseId, this.httpOptions);
  }

  // get result of outgoing flocks body weight
  getResultOutFlocks(companyId: string) {
    return this.http.get<any[]>(environment.url_dashboard + '/flock/out/' + companyId, this.httpOptions);
  }


  // get weight by breed by centerId
  getWeightperBreed(centerID: string) {
    return this.http.get<any>(environment.url_weightByBreed + centerID, this.httpOptions);
  }

  // get flocks  by centerId
  getWeightperFlock(centerID: string) {
    return this.http.get<any>(environment.url_weightByFlock + centerID, this.httpOptions);
  }

  // get feed total consum by company
  getfeedConsumTotalByCompany(companyId: string, date: string) {
    return this.http.get<any>(environment.url_dashboard + '/feed/company/' + companyId + '/' + date , this.httpOptions);
  }

  // getflocks By house and year
  getFlocksByHouseandYear(houseId: string, year: number) {
    return this.http.get<any>(environment.url_dashboard + '/flock/house/' + houseId + '/' + year);
  }

  // get weekly weight of flocks By house and year
  getWeightFlocksByHouseandYear(houseId: string, year: number) {
    return this.http.get<any>(environment.url_dashboard + '/flock/weight/' + houseId + '/' + year);
  }

  // get feed of flocks By house and year
  getFeedFlocksByHouseandYear(houseId: string, year: number) {
    return this.http.get<any>(environment.url_dashboard + '/flock/feed/' + houseId + '/' + year);
  }

  getFcrFlocksByHouse(houseId: string) {
    return this.http.get<any>(environment.url_dashboard + '/flock/fcr/' + houseId );
  }

  // get Water of flocks By house and year
  getWaterFlocksByHouseandYear(houseId: string, date: string, year: number) {
    return this.http.get<any>(environment.url_dashboard + '/flock/water/' + houseId + '/' + date + '/' + year, this.httpOptions);
  }


  // get Mortality by Flocks and year
  getMortalityByFlocksAndYear(houseId: string, year: number) {
    return this.http.get<any>(environment.url_mortaliteDash + '/mortalityByflock/' + houseId + '/' + year);
  }


  // get Mortality by age of flock
  getMortalityByage(flockId: string) {
    return this.http.get<any>(environment.url_mortaliteDash + '/flock/' + flockId);
  }

  // get Weekly weight by farm for company (la moyenne)
  getWeeklyWeightByfarm(companyId: string): Observable<any> {
    return this.http.get<any[]>(environment.url_dashboard + '/farm/weight/' + companyId);
  }

  // get Weekly weight by house
  getWeeklyWeightByHouse(companyId: string , farmName: string): Observable<any> {
    return this.http.get<any[]>(environment.url_dashboard + '/house/weight/' + companyId + '/' + farmName);
  }
}
