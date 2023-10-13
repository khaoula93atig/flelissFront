import {Component, OnInit, ViewChild} from '@angular/core';
import {AutofocusDirective} from '../../shared/autofocus.directive';
import {ToastrService} from 'ngx-toastr';
import {FlockService} from '../../services/flock.service';
import {HouseService} from '../../services/house.service';
import {VisitService} from '../../services/visit.service';
import {DashboardService} from '../../services/dashboard.service';
import {IRegistrationVisits, IRegistrationVisitTasks} from '../../shared/registration';

@Component({
  selector: 'app-motality-visit',
  templateUrl: './motality-visit.component.html',
  styleUrls: ['./motality-visit.component.css']
})
export class MotalityVisitComponent implements OnInit {
  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective;
  show = false;
  flockName: string;
  breed: string;
  visitDate: string;
  farmID: string;
  centers: any[] = [];
  centerId: string;
  houses: any[] = [];
  houseId: string;
  flocks: any[] = [];
  breedId: number;
  flockID: string;
  chickPlaced: number;
  historiqueMortality: any[] = [];
  add: boolean = false;
  hatchDate: any;
  ageOfTheFlock: number;
  measureMortality: number;
  calculpercentage= 0;
  visitIDnew: string;
  registrationVisit: IRegistrationVisits = new Object() as IRegistrationVisits;
  constructor(
    private houseService: HouseService,
    private visitService: VisitService,
    private toaster: ToastrService,
    private flockService: FlockService,
  ) { }

  ngOnInit(): void {
    this.visitDate = this.reverseDate('yyyy-MM-DD', new Date());
    this.farmID = localStorage.getItem('farmID');
    this.houseService.getConsultingCenterbyFarm(this.farmID).subscribe(
      (data) => {
        this.centers = data;
      });
  }

  // open Dialog Results
  open() {
    this.show = true;
    setTimeout(() => {
      if (this.autofocus) {
        this.autofocus.setFocus();
      }
    }, 0.1);
  }

  close() {
    this.show = false;
  }

  getCenterId(event) {
    this.centerId = event;
    this.houses = [];
    this.flocks = [];
    this.flockName = null;
    this.houseId = null;
    this.flockID = null;
    this.breedId = 0;
    this.breed = null;
    this.chickPlaced = null;
    this.historiqueMortality = [];
    this.houseService.getConsultingHouseByCenter(this.centerId).subscribe(
        (data) => {
          this.houses = data;
        },
      );
  }
  getHouseId(event) {
    this.houseId = event;
    this.flocks = [];
    this.flockID = null;
    this.flockName = null;
    this.chickPlaced = null;
    this.historiqueMortality = [];
    this.flockService.getFlockExisitsByHouse(this.houseId).subscribe(data => {
      this.flocks = data;
      console.log('flock', this.flocks);
      this.flockID = this.flocks[0].flockID;
      this.getHistoriqueMortality(this.flockID);
      this.flockName = this.flocks[0].flockName;
      this.chickPlaced = this .flocks[0].flockNumber;
      this.hatchDate = this.flocks[0].hatchDate;
      this.calculAgeOfFlock();
      this.breedId = this.flocks[0].breed;
      switch (this.breedId) {
        case 1: {
          this.breed = 'Hubbard';
          break;
        }
        case 2: {
          this.breed = 'Cobb 500';
          break;
        }
        case 3: {
          this.breed = 'Ross 308';
          break;
        }
        case 4: {
          this.breed = 'Arbor Acres plus';
          break;
        }
      }
    });
  }

  AddNew(){
    var date =
      this.visitDate.substring(8, 10) +
      '/' +
      this.visitDate.substring(7, 5) +
      '/' +
      this.visitDate.substring(0, 4);
    this.registrationVisit.visitdateString = date;
    this.registrationVisit.frequency = 'Daily';
    this.registrationVisit.flockID = this.flockID;
    this.registrationVisit.houseID = this.houseId;
    this.registrationVisit.username = localStorage.getItem('user');
    this.registrationVisit.ageFlock = this.ageOfTheFlock;
    this.registrationVisit.typeVisit = 'daily_visit';
    this.registrationVisit.centerID = this.centerId;
    this.registrationVisit.farmId = this.farmID;
    this.registrationVisit.mortality = this.measureMortality;
    console.log(this.registrationVisit);
    this.visitService.createRegistrationVisits(this.registrationVisit).subscribe(
      (data) => {
        console.log('visit', data);
        var alldata = data;
        localStorage.setItem('visitId', JSON.stringify(data));
        this.visitIDnew = alldata.visitId;
        // Store the login in the storage

        if (alldata.statusSave == 'success') {
          // Mortality
          let registrationVisitTasksMortality: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTasksMortality.ageFlock = this.ageOfTheFlock;
          registrationVisitTasksMortality.taskId = '8';
          registrationVisitTasksMortality.visitId = this.visitIDnew;
          registrationVisitTasksMortality.measure = this.measureMortality;
          this.calculpercentage = (this.measureMortality * 100) / this.chickPlaced;
          registrationVisitTasksMortality.percentage = this.calculpercentage;
          registrationVisitTasksMortality.breedId = this.breedId;
          // Invoking service
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTasksMortality,
          ).subscribe((data) => {
            this.toaster.success('Successfully added');
            this.add = false;
            this.getHistoriqueMortality(this.flockID);
          });
        }
      });
  }
  getHistoriqueMortality(flock){
    this.visitService.getHistoriqueMortalityByFlock(flock).subscribe(data => {
      console.log(data);
      this.historiqueMortality = data;
    });
  }

  calculAgeOfFlock(){
    let date1 = new Date(this.hatchDate);
    let date2 = new Date(this.visitDate);
    // To calculate the time difference of two dates
    this.ageOfTheFlock = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    this.ageOfTheFlock = Math.round(
      Math.abs(this.ageOfTheFlock / (1000 * 3600 * 24)),
    );
  }

  reverseDate(format: string, date: Date) {
    if (format == 'yyyy-MM-DD') {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      let smonth = month < 10 ? '0' + month : month;
      let sday = day < 10 ? '0' + day : day;

      var dateFormatted = year + '-' + smonth + '-' + sday;
      var dt = dateFormatted;
    } //else { console.log("Format date not supported"); }
    if (format == 'yyyyMMDD') {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      let smonth = month < 10 ? '0' + month : month;
      let sday = day < 10 ? '0' + day : day;

      var dateFormatted = '' + year + smonth + sday;
      var dt = dateFormatted;
    }
    if (format == 'DD-MM-yyyy') {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      let smonth = month < 10 ? '0' + month : month;
      let sday = day < 10 ? '0' + day : day;

      var dateFormatted = sday + '-' + smonth + '-' + year;
      var dt = dateFormatted;
    } //else { console.log("Format date not supported"); }

    if (format == 'MM/DD/yyyy') {
      console.log('date ');
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      let smonth = month < 10 ? '0' + month : month;
      let sday = day < 10 ? '0' + day : day;

      var dateFormatted = sday + '/' + smonth + '/' + year;
      var dt = dateFormatted;
    } //else { console.log("Format date not supported"); }

    if (format == 'MM/DD/yyyy') {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      let smonth = month < 10 ? '0' + month : month;
      let sday = day < 10 ? '0' + day : day;

      var dateFormatted = sday + '/' + smonth + '/' + year;
      var dt = dateFormatted;
    } //else { console.log("Format date not supported"); }

    return dt;
  }

}
