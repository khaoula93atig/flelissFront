import {Component, OnInit, ViewChild} from '@angular/core';
import {AutofocusDirective} from 'src/app/shared/autofocus.directive';
import {SubSink} from 'subsink';
import {DatePipe} from '@angular/common';
import {FarmService} from '../../services/farm.service';
import {HouseService} from '../../services/house.service';
import {VisitService} from '../../services/visit.service';
import {VisitVeterinarianService} from '../../services/visit-veterinarian.service';
import {
  IRegistrationHealthStatus,
  IRegistrationVisitHealthStatus,
  IRegistrationVisits,
  IRegistrationVisitNecropsy,
  Morbidity,
  VisitHealthStatus,
  VisitNecropsy, FileInfoVisit,
} from 'src/app/shared/registration';
import {ListVetVisitComponent} from '../list-vet-visit/list-vet-visit.component';
import {ClrWizard, ClrWizardPage} from '@clr/angular';
import {FlockService} from 'src/app/services/flock.service';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-vetvisit',
  templateUrl: './new-vet-visit.component.html',
  styleUrls: ['./new-vet-visit.component.css'],
})
export class NewVetVisitComponent implements OnInit {
  // add images
  fileList: File[] = [];
  listOfFiles: any[] = [];
  isLoading = false;
  // flock fields
  hatchDate: Date;
  chikedPlaced: any;
  breeddescription: string;
  // Spinner display visit
  loading: boolean;
  subs: SubSink = new SubSink();
  farms: any[] = [];
  visits: any[] = [];
  houses: any[] = [];
  flocks: any[] = [];
  tasks: any[] = [];
  visittasks: any = [];
  house: any[] = [];
  visit: any[] = [];
  alldata: any[] = [];
  visitDate = this.datepipe.transform(new Date(), 'yyyy/MM/DD');
  frequency: string;
  flockID: string;
  userID: string;
  psOrigin: string;
  birdsNumber: number;
  birdsNumberDay0: number;
  calculpercentage: number;
  calculpercentageWater: number;
  farmID: string = '';
  houseId: string = '';
  description: string;
  ageOfTheFlock: number;
  datevisit: Date;
  breedId: number;
  flockName: string;
  /*********visit fields***********/
  morbidity: number;
  mortality: number;
  dwg: number;
  eep: any;
  total_water_consumption: number;
  total_feed_consumption: number;
  fcr: number;
  visitIDnew: string;
  /********healthStatus*****/
  allhealthStatus: any[] = [];
  ProstrationHealthStatus: IRegistrationHealthStatus;
  AnorexiaHealthStatus: IRegistrationHealthStatus;
  RuffledHealthStatus: IRegistrationHealthStatus;
  DehydratationHealthStatus: IRegistrationHealthStatus;
  CoughingHealthStatus: IRegistrationHealthStatus;
  NasalExsudateHealthStatus: IRegistrationHealthStatus;
  SneezingHealthStatus: IRegistrationHealthStatus;
  TrachealHealthStatus: IRegistrationHealthStatus;
  OcularHealthStatus: IRegistrationHealthStatus;
  ConjonctivitisHealthStatus: IRegistrationHealthStatus;
  OedemaHealthStatus: IRegistrationHealthStatus;
  DiarrhoeaHealthStatus: IRegistrationHealthStatus;
  WhitishHealthStatus: IRegistrationHealthStatus;
  WateryHealthStatus: IRegistrationHealthStatus;
  MucoidHealthStatus: IRegistrationHealthStatus;
  GreenishHealthStatus: IRegistrationHealthStatus;
  NervousHealthStatus: IRegistrationHealthStatus;
  DermatitisHealthStatus: IRegistrationHealthStatus;
  Prostration: string;
  ProstrationMeasure: boolean;
  AnorexiaMeasure: boolean;
  RuffledMeasure: boolean;
  DehydratationMeasure: boolean;
  CoughingMeasure: boolean;
  NasalExsudateMeasure: boolean;
  SneezingMeasure: boolean;
  TrachealMeasure: boolean;
  OcularMeasure: boolean;
  ConjonctivitisMeasure: boolean;
  OedemaMeasure: boolean;
  DiarrhoeaMeasure: boolean;
  WhitishnMeasure: boolean;
  WateryMeasure: boolean;
  MucoidMeasure: boolean;
  GreenishMeasure: boolean;
  NervousMeasure: String;
  DermatitisMeasure: String;
  /************** */
  TotalmeasureFeedConsumption: number;
  TotalmeasureMortality: any;
  Morbidity: number;
  MorbidityPercentage: any;
  TotalmeasureWaterConsumption: number;
  weightVariationForFcr: number;
  weightVariationForDWG: number;
  //ageOfTheFlock: number
  averageWeight: number;
  FCR: any;
  DWG: any;
  FeedConsumptionPercentage: number;
  MortalityPercentage: any;
  WaterConsumptionPercentage: number;
  /************Necropsy***********/
  examinationMeasure: string;
  bonesMeasure: string;
  legFeetMeasure: string;
  tracheaMeasure: string;
  cropMeasure: string;
  thymusMeasure: string;
  liverMeasure: string;
  spleenMeasure: string;
  kidneyMeasure: string;
  heartMeasure: string;
  lungMeasure: string;
  gastroIntestMeasure: string;
  bursaFabriMeasure: string;
  brainMeasure: string;
  /*******Morbidity***** */
  nbrMorbidity: number;
  nbrTotal: number;
  dynamicArray: Array<Morbidity> = [];
  centers: any[] = [];
  centerId: string;
  generalObservation: string;
  /********EEP */
  Liveability: number;
  respiratoryObservation: string;
  digestiveObservation: string;
  locomotionObservation: string;
  otherObservation: string;
  ID: string;
  dangerMsg: string = null;
  succesMsg: string = null;
  breed: string;

  constructor(
    private datepipe: DatePipe,
    private FarmService: FarmService,
    private HouseService: HouseService,
    private VisitService: VisitService,
    private VisitVeterinarianService: VisitVeterinarianService,
    private ListComponenet: ListVetVisitComponent,
    private flockService: FlockService,
    private toastr: ToastrService,
  ) {
  }

  gethouse_id(id: string) {
    return id.substr(10, id.length);
  }

  getCenterId(event) {
    this.centerId = event;
    this.houseId = null;
    this.houses = [];
    this.flocks = [];
    this.flockID = null;
    this.flockName = null;
    this.breedId = null;
    this.breed = '';
    this.hatchDate = null;
    this.ageOfTheFlock = null;
    this.chikedPlaced = '';
    this.psOrigin = '';
    this.MorbidityPercentage = null;
    this.MortalityPercentage = null;
    this.FeedConsumptionPercentage = null;

    this.WaterConsumptionPercentage = null;
    this.FCR = null;
    this.DWG = null;
    this.eep = null;
    this.DWG = null;
    this.WaterConsumptionPercentage = null;

    this.ProstrationMeasure = null;
    this.AnorexiaMeasure = null;
    this.RuffledMeasure = null;
    this.DehydratationMeasure = null;
    this.CoughingMeasure = null;
    this.NasalExsudateMeasure = null;
    this.SneezingMeasure = null;
    this.TrachealMeasure = null;
    this.OcularMeasure = null;
    this.ConjonctivitisMeasure = null;
    this.OedemaMeasure = null;
    this.DiarrhoeaMeasure = null;
    this.WhitishnMeasure = null;
    this.WateryMeasure = null;
    this.MucoidMeasure = null;
    this.GreenishMeasure = null;
    this.NervousMeasure = null;
    this.DermatitisMeasure = null;
    this.examinationMeasure = null;
    this.bonesMeasure = null;
    this.legFeetMeasure = null;
    this.tracheaMeasure = null;
    this.cropMeasure = null;
    this.thymusMeasure = null;
    this.liverMeasure = null;
    this.spleenMeasure = null;
    this.kidneyMeasure = null;
    this.heartMeasure = null;
    this.lungMeasure = null;
    this.gastroIntestMeasure = null;
    this.bursaFabriMeasure = null;
    this.brainMeasure = null;
    this.getHouseId(event);

  }

  getHouseId(event) {
    this.subs.add(
      this.HouseService.getConsultingHouseByCenter(event).subscribe(
        (data) => {
          console.log('' + JSON.stringify(data));
          this.houses = data;
          this.loading = false;
        },
      ),
    );

  }

  // Morbidity Management!
  MorbidityOpened: boolean = false;

  submitMorbidity(): void {
    this.MorbidityOpened = true;
  }

  saveMorbidity(): void {
    this.MorbidityPercentage = (
      (this.nbrMorbidity / this.nbrTotal) *
      100
    ).toFixed(2);
    console.log('nbrTotal' + this.nbrTotal);
    console.log('nbrMorbidity' + this.nbrMorbidity);
    console.log('MorbidityPercentage' + this.MorbidityPercentage);
  }

  getDate(format: string, date: string) {
    if (format == 'MM/DD/yyyy') {
      const dateObj = date.split('/');
      let month = dateObj[0];
      let day = dateObj[1];
      let year = dateObj[2];
      console.log('date ***' + day + '-' + month + '-' + year);
      return day + '-' + month + '-' + year;
    }
    if (format == 'dd/MM/yyyy') {
      const dateObj = date.split('/');
      let month = dateObj[0];
      let day = dateObj[1];
      let year = dateObj[2];
      console.log('date ***' + day + '-' + month + '-' + year);
      return year + '-' + day + '-' + month;
    }
  }

  getProstration(event) {
    console.log('event prostration' + event);
    this.ProstrationMeasure = event;
  }

  getAnorexia(event) {
    console.log('event AnorexiaMeasure' + event);
    this.AnorexiaMeasure = event;
  }

  getRuffled(event) {
    console.log('event RuffledMeasure' + event);
    this.RuffledMeasure = event;
  }

  getDehydratation(event) {
    console.log('event DehydratationMeasure' + event);
    this.DehydratationMeasure = event;
  }

  getCoughing(event) {
    console.log('event CoughingMeasure' + event);
    this.CoughingMeasure = event;
  }

  getNasalExsudateMeasure(event) {
    console.log('event NasalExsudateMeasure' + event);
    this.NasalExsudateMeasure = event;
  }

  getSneezing(event) {
    console.log('event SneezingMeasure' + event);
    this.SneezingMeasure = event;
  }

  getTracheal(event) {
    console.log('event TrachealMeasure' + event);
    this.TrachealMeasure = event;
  }

  getOcular(event) {
    console.log('event OcularMeasure' + event);
    this.OcularMeasure = event;
  }

  getConjonctivitis(event) {
    console.log('event ConjonctivitisMeasure' + event);
    this.ConjonctivitisMeasure = event;
  }

  getOedema(event) {
    this.OedemaMeasure = event;
  }

  getDiarrhoea(event) {
    this.DiarrhoeaMeasure = event;
  }

  getWhitishn(event) {
    this.WhitishnMeasure = event;
  }

  getWatery(event) {
    this.WateryMeasure = event;
  }

  getMucoid(event) {
    this.MucoidMeasure = event;
  }

  getGreenish(event) {
    this.GreenishMeasure = event;
  }


  //get getSelectedhouse
  getflockId(event) {
    console.log('house', event);
    this.houseId = event;
    this.flocks = [];
    this.flockID = null;
    this.flockName = null;
    this.breedId = null;
    this.breed = '';
    this.hatchDate = null;
    this.ageOfTheFlock = null;
    this.chikedPlaced = '';
    this.psOrigin = '';
    this.MorbidityPercentage = null;
    this.MortalityPercentage = null;
    this.FeedConsumptionPercentage = null;

    this.WaterConsumptionPercentage = null;
    this.FCR = null;
    this.DWG = null;
    this.eep = null;
    this.DWG = null;
    this.WaterConsumptionPercentage = null;

    this.ProstrationMeasure = null;
    this.AnorexiaMeasure = null;
    this.RuffledMeasure = null;
    this.DehydratationMeasure = null;
    this.CoughingMeasure = null;
    this.NasalExsudateMeasure = null;
    this.SneezingMeasure = null;
    this.TrachealMeasure = null;
    this.OcularMeasure = null;
    this.ConjonctivitisMeasure = null;
    this.OedemaMeasure = null;
    this.DiarrhoeaMeasure = null;
    this.WhitishnMeasure = null;
    this.WateryMeasure = null;
    this.MucoidMeasure = null;
    this.GreenishMeasure = null;
    this.NervousMeasure = null;
    this.DermatitisMeasure = null;
    this.examinationMeasure = null;
    this.bonesMeasure = null;
    this.legFeetMeasure = null;
    this.tracheaMeasure = null;
    this.cropMeasure = null;
    this.thymusMeasure = null;
    this.liverMeasure = null;
    this.spleenMeasure = null;
    this.kidneyMeasure = null;
    this.heartMeasure = null;
    this.lungMeasure = null;
    this.gastroIntestMeasure = null;
    this.bursaFabriMeasure = null;
    this.brainMeasure = null;
    this.flockService.getFlockExisitsByHouse(this.houseId).subscribe(data => {
      this.flocks = data;
      console.log('flock', this.flocks);
      this.flockID = this.flocks[0].flockID;
      this.flockName = this.flocks[0].flockName;
      this.breedId = this.flocks[0].breed;
      this.birdsNumber = this.flocks[0].restFlockNumber;
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
      this.hatchDate = this.flocks[0].hatchDate;
      this.chikedPlaced = this.flocks[0].chikedPlaced;
      this.chikedPlaced = this.flocks[0].chikedPlaced;
      this.psOrigin = this.flocks[0].psOrigin;

      console.log('---------------------i.hatchDate' + this.flocks[0].hatchDate);

      // To set two dates to two variables
      var date1 = new Date(this.flocks[0].hatchDate);
      var date2 = new Date(this.visitDate);
      console.log('-------------------hatchDate' + date1);
      console.log('-------------------new date' + date2);
      // To calculate the time difference of two dates
      this.ageOfTheFlock = date2.getTime() - date1.getTime();
      this.ageOfTheFlock = Math.round(
        Math.abs(this.ageOfTheFlock / (1000 * 3600 * 24)),
      );
      this.GetTotalMeasure();
    });
  }


  GetTotalMeasure(): void {
    console.log(this.flockID);
    var visitDateFormatter = this.getDate('MM/DD/yyyy', this.visitDate);
    // get Total Measures of details
    this.subs.add(
      this.VisitVeterinarianService.getConsultingTotalMeasure(
        visitDateFormatter,
        8,
        this.flockID,
      ).subscribe((data) => {
        this.TotalmeasureMortality = data;
        this.MortalityPercentage = ((this.TotalmeasureMortality * 100) / this.birdsNumber).toFixed(2);
        this.Liveability = 100 - this.MortalityPercentage;
      }),
    );
    if ( this.ageOfTheFlock < 7){
    this.VisitService.getweeklyfeedandweightByFlockAndAge(0, this.flockID).subscribe(data=>{
      console.log(data);
      this.FeedConsumptionPercentage = data[0].totalStarterFeed;
      this.FCR = (data[0].totalStarterFeed / data[0].average).toFixed(2);
    }
    );
    }
    else if(this.ageOfTheFlock >= 7 && this.ageOfTheFlock < 14){
      this.VisitService.getweeklyfeedandweightByFlockAndAge(7, this.flockID).subscribe(data=>{
        console.log(data);
        this.FeedConsumptionPercentage = data[0].totalStarterFeed;
        this.FCR = (data[0].totalStarterFeed / data[0].average).toFixed(2);
        }
      );
    }
    else if(this.ageOfTheFlock >= 14 && this.ageOfTheFlock < 21){
      this.VisitService.getweeklyfeedandweightByFlockAndAge(14, this.flockID).subscribe(data=>{
        console.log(data);
        this.FeedConsumptionPercentage = data[0].totalGrowerFeed;
        this.FCR = (data[0].totalGrowerFeed / data[0].average).toFixed(2);
        }
      );
    }
    else if(this.ageOfTheFlock >= 21 && this.ageOfTheFlock < 28){
      this.VisitService.getweeklyfeedandweightByFlockAndAge(21, this.flockID).subscribe(data=>{
          console.log(data);
          this.FeedConsumptionPercentage = data[0].totalGrowerFeed;
          this.FCR = (data[0].totalGrowerFeed / data[0].average).toFixed(2);
        }
      );
    }
    else if(this.ageOfTheFlock >= 28 && this.ageOfTheFlock < 35){
      this.VisitService.getweeklyfeedandweightByFlockAndAge(28, this.flockID).subscribe(data=>{
          console.log(data);
          this.FeedConsumptionPercentage = data[0].totalFinisherFeed;
        this.FCR = (data[0].totalFinisherFeed / data[0].average).toFixed(2);
        }
      );
    }
    else if(this.ageOfTheFlock >= 35 && this.ageOfTheFlock < 42){
      this.VisitService.getweeklyfeedandweightByFlockAndAge(35, this.flockID).subscribe(data=>{
          console.log(data);
          this.FeedConsumptionPercentage = data[0].totalFinisherFeed;
        this.FCR = (data[0].totalFinisherFeed / data[0].average).toFixed(2);
        }
      );
    }
    else if(this.ageOfTheFlock >= 42 ){
      this.VisitService.getweeklyfeedandweightByFlockAndAge(42, this.flockID).subscribe(data=>{
          console.log(data);
          this.FeedConsumptionPercentage = data[0].totalFinisherFeed;
          this.FCR = (data[0].totalFinisherFeed / data[0].average).toFixed(2);
        }
      );
    }
    this.subs.add(
      this.VisitVeterinarianService.getWeightVariationByFlock(
        this.flockID,
      ).subscribe((data) => {
        console.log('weight', data);
        this.weightVariationForFcr = data.weightVariationFCR.toFixed(3);
        //this.ageOfTheFlock = data.ageFlock;
        this.averageWeight = this.weightVariationForFcr / this.ageOfTheFlock;
        console.log('averageWeight' + this.averageWeight);
        /*this.FCR = (
          (this.TotalmeasureFeedConsumption) /
          (this.birdsNumber * (this.averageWeight / 1000))
        ).toFixed(3);*/
        console.log('FCR' + this.FCR);
        this.weightVariationForDWG = data.weightVariationDWG.toFixed(3);
        this.DWG = (
          this.weightVariationForDWG /
          (data.endingDay - data.prevDay)
        ).toFixed(2);
        console.log('weightVariationForDWG' + this.weightVariationForDWG);
        console.log('DWG' + this.DWG);
        this.eep = (
          (this.Liveability * (data.lastWeightMeasure / 1000) * 100) /
          (this.ageOfTheFlock * this.FCR)
        ).toFixed(2);
        console.log(' this.eep' + this.eep);
      }),
    );
/*
    // get Total Measures of Feed consumption
    this.subs.add(
      this.VisitVeterinarianService.getConsultingTotalMeasure(
        visitDateFormatter,
        6,
        this.flockID,
      ).subscribe((data) => {
        this.TotalmeasureFeedConsumption = data;
        this.FeedConsumptionPercentage = this.TotalmeasureFeedConsumption  / this.birdsNumber;
         // (this.TotalmeasureFeedConsumption * 25 * 1000) / this.birdsNumber;
      }),
    );*/
    // get Total Measures of Water consumption
    this.subs.add(
      this.VisitVeterinarianService.getConsultingTotalMeasure(
        visitDateFormatter,
        7,
        this.flockID,
      ).subscribe((data) => {
        this.TotalmeasureWaterConsumption = data;
        this.WaterConsumptionPercentage = data;
        /*this.WaterConsumptionPercentage =
          (this.TotalmeasureWaterConsumption * 1000000) / this.birdsNumber;*/
      }),
    );
  }

  ngOnInit(): void {
    this.initForm();
    // set loding True
    this.loading = true;
    localStorage.setItem('getId', ''); //store id
    //get all farm by company
    var companyID = localStorage.getItem('companyID');
    console.log('companyID' + companyID);
    this.farmID = localStorage.getItem('farmID');
    console.log('his.farmID', this.farmID);
    this.subs.add(
      this.HouseService.getConsultingCenterbyFarm(this.farmID).subscribe(
        (data) => {
          console.log('data centers ******* ' + JSON.stringify(data));
          this.centers = data;
        },
      ),
    );
    /*this.subs.add(
      this.HouseService.getConsultingHouse(this.farmID).subscribe((data) => {
        console.log('data house++++++++++' + data)
        this.houses = data
        this.loading = false
      }),
    )*/
    this.subs.add(
      this.VisitVeterinarianService.getConsultingHealthStatus().subscribe(
        (data) => {
          this.allhealthStatus = data;
          console.log('data listof healthStatus' + this.allhealthStatus);

          // Find out from the list of types which one corresponding to the selected Code
          for (let healthStatus of this.allhealthStatus) {
            if (healthStatus.healthStatusId == 1) {
              this.ProstrationHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 2) {
              this.AnorexiaHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 3) {
              this.RuffledHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 4) {
              this.DehydratationHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 5) {
              this.CoughingHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 6) {
              this.NasalExsudateHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 7) {
              this.SneezingHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 8) {
              this.TrachealHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 9) {
              this.OcularHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 10) {
              this.ConjonctivitisHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 11) {
              this.OedemaHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 12) {
              this.DiarrhoeaHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 13) {
              this.WhitishHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 14) {
              this.WateryHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 15) {
              this.MucoidHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 16) {
              this.GreenishHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 17) {
              this.NervousHealthStatus = healthStatus;
            } else if (healthStatus.healthStatusId == 18) {
              this.DermatitisHealthStatus = healthStatus;
            }
          }
        },
      ),
    );
  }

  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective;

  show = false;
  openWZ = false;

  open() {
    this.openWZ = true;
    // clone the user (we don't want to modify the original in the dialog)
    setTimeout(() => {
      if (this.autofocus) {
        this.autofocus.setFocus();
      }
    }, 0.1);
  }

  close() {
    this.show = false;
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
    }
  }

  onSubmit() {
  }

  submit(): void {
    console.log(this.listOfFiles);
    console.log(this.fileList);
    let registrationVisitvet: IRegistrationVisits = new Object() as IRegistrationVisits;
    var date =
      this.visitDate.substring(3, 5) +
      '/' +
      this.visitDate.substring(0, 2) +
      '/' +
      this.visitDate.substring(6, 10);
    registrationVisitvet.visitdateString = date;
    registrationVisitvet.frequency = 'Weekly';
    registrationVisitvet.flockID = this.flockID;
    registrationVisitvet.houseID = this.houseId;
    registrationVisitvet.username = localStorage.getItem('user');
    registrationVisitvet.ageFlock = this.ageOfTheFlock;
    registrationVisitvet.morbidity = this.MorbidityPercentage;
    registrationVisitvet.mortality = this.MortalityPercentage;
    registrationVisitvet.dwg = this.DWG;
    registrationVisitvet.total_feed_consumption = this.FeedConsumptionPercentage;
    registrationVisitvet.total_water_consumption = this.WaterConsumptionPercentage;
    registrationVisitvet.fcr = this.FCR;
    registrationVisitvet.eep = this.eep;
    registrationVisitvet.typeVisit = 'veter_visit';
    registrationVisitvet.farmId = this.farmID;
    registrationVisitvet.centerID = this.centerId;
    //Invoking service
    this.VisitVeterinarianService.createRegistrationVisitsveterinarian(
      registrationVisitvet,
    ).subscribe((data) => {
      var alldata = data;
      this.visitIDnew = alldata.visitId;
      if (this.visitIDnew != null && this.visitIDnew != undefined) {
        console.log('data visit ' + alldata.visitId);
        // Store the login in the storage
        localStorage.setItem('visitId', this.visitIDnew);
        let visitHealthStatus: VisitHealthStatus = new Object() as VisitHealthStatus;
        visitHealthStatus.visitId = this.visitIDnew;
        visitHealthStatus.anorexia = this.AnorexiaMeasure;
        visitHealthStatus.prostration = this.ProstrationMeasure;
        visitHealthStatus.ruffledFeather = this.RuffledMeasure;
        visitHealthStatus.dehydratation = this.DehydratationMeasure;
        visitHealthStatus.generalObservation = this.generalObservation;
        visitHealthStatus.coughing = this.CoughingMeasure;
        visitHealthStatus.nasalExsudate = this.NasalExsudateMeasure;
        visitHealthStatus.sneezing = this.SneezingMeasure;
        visitHealthStatus.trachealRales = this.TrachealMeasure;
        visitHealthStatus.ocularDischarge = this.OcularMeasure;
        visitHealthStatus.conjonctivitis = this.ConjonctivitisMeasure;
        visitHealthStatus.oedema = this.OedemaMeasure;
        visitHealthStatus.respiratoryObservation = this.respiratoryObservation;
        visitHealthStatus.diarrhoea = this.DiarrhoeaMeasure;
        visitHealthStatus.whitish = this.WhitishnMeasure;
        visitHealthStatus.watery = this.WateryMeasure;
        visitHealthStatus.mucoid = this.MucoidMeasure;
        visitHealthStatus.greenish = this.GreenishMeasure;
        visitHealthStatus.digestiveObservation = this.digestiveObservation;
        visitHealthStatus.locomotionObservation = this.locomotionObservation;
        visitHealthStatus.nervous = this.NervousMeasure;
        visitHealthStatus.dermatitis = this.DermatitisMeasure;
        visitHealthStatus.otherObservation = this.otherObservation;
        console.log('visitHealthStatus ' + JSON.stringify(visitHealthStatus));
        this.VisitVeterinarianService.createRegistrationVisithealthStatus(
          visitHealthStatus,
        ).subscribe((data) => {
          console.log(
            'data message visitHealthStatus created' + data['message'],
          );
          console.log(
            'data message visitHealthStatus created' + data['response'],
          );
        });

        let visitNecropsy: VisitNecropsy = new Object() as VisitNecropsy;
        visitNecropsy.visitId = this.visitIDnew;
        visitNecropsy.externalExamination = this.examinationMeasure;
        visitNecropsy.bones = this.bonesMeasure;
        visitNecropsy.legFeet = this.legFeetMeasure;
        visitNecropsy.trachea = this.tracheaMeasure;
        visitNecropsy.crop = this.cropMeasure;
        visitNecropsy.thymus = this.thymusMeasure;
        visitNecropsy.liver = this.liverMeasure;
        visitNecropsy.spleen = this.spleenMeasure;
        visitNecropsy.kidney = this.kidneyMeasure;
        visitNecropsy.heart = this.heartMeasure;
        visitNecropsy.lung = this.lungMeasure;
        visitNecropsy.gastroIntestinalTract = this.gastroIntestMeasure;
        visitNecropsy.bursaFabricius = this.bursaFabriMeasure;
        visitNecropsy.brain = this.brainMeasure;
        console.log('visitNecropsy ' + JSON.stringify(visitNecropsy));
        this.VisitVeterinarianService.createRegistrationVisitNecropsy(
          visitNecropsy,
        ).subscribe(( data ) => {
          console.log('alldata', data);
          for ( const file of this.fileList) {
            const fileInfoVisit: FileInfoVisit = new Object() as FileInfoVisit;
            fileInfoVisit.visitId = this.visitIDnew;
            fileInfoVisit.visitNecropsyNbservationId = data.visitNecropsyObservationId;
            fileInfoVisit.url = ' ';
            console.log(fileInfoVisit);
            this.uploadNecropsyFile(file , fileInfoVisit);
          }
        });
        if(this.agreementFile != null) {
          console.log('test file');
          this.uploadFile(date, this.visitIDnew);
        }
        this.toastr.success('Success', 'Successfully added');
        this.initForm();
        this.ListComponenet.refresh();
      } else {
        this.toastr.error('Error', 'Operation failed');
      }
    });

    //this.GetData();

  }

  initForm(): void {
    this.visitDate = this.datepipe.transform(new Date(), 'yyyy/MM/DD');
    this.farmID = '';
    this.houseId = '';
    this.flockID = '';

    this.breed = '';
    this.hatchDate = null;
    this.ageOfTheFlock = null;
    this.chikedPlaced = '';
    this.psOrigin = '';
    this.MorbidityPercentage = null;
    this.MortalityPercentage = null;
    this.FeedConsumptionPercentage = null;

    this.WaterConsumptionPercentage = null;
    this.FCR = null;
    this.DWG = null;
    this.eep = null;
    this.DWG = null;
    this.WaterConsumptionPercentage = null;

    this.ProstrationMeasure = null;
    this.AnorexiaMeasure = null;
    this.RuffledMeasure = null;
    this.DehydratationMeasure = null;
    this.CoughingMeasure = null;
    this.NasalExsudateMeasure = null;
    this.SneezingMeasure = null;
    this.TrachealMeasure = null;
    this.OcularMeasure = null;
    this.ConjonctivitisMeasure = null;
    this.OedemaMeasure = null;
    this.DiarrhoeaMeasure = null;
    this.WhitishnMeasure = null;
    this.WateryMeasure = null;
    this.MucoidMeasure = null;
    this.GreenishMeasure = null;
    this.NervousMeasure = null;
    this.DermatitisMeasure = null;
    this.examinationMeasure = null;
    this.bonesMeasure = null;
    this.legFeetMeasure = null;
    this.tracheaMeasure = null;
    this.cropMeasure = null;
    this.thymusMeasure = null;
    this.liverMeasure = null;
    this.spleenMeasure = null;
    this.kidneyMeasure = null;
    this.heartMeasure = null;
    this.lungMeasure = null;
    this.gastroIntestMeasure = null;
    this.bursaFabriMeasure = null;
    this.brainMeasure = null;
  }

  fileChange(event): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      console.log('fileList ' + fileList[0]);
      const formData = new FormData();
      formData.append('file', file, file.name);
      const headers = new Headers();
      headers.append(
        'Authorization',
        'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9....',
      );
    }
  }

  changeIndicator: number = Math.random();
  agreementFile: any = null;

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.agreementFile = event.target.files[0];
    }
  }

  // Upload the file
  uploadFile(date, visitIDnew) {
    console.log('date ' + date);
    const formData: FormData = new FormData();
    formData.append('analyse', this.agreementFile);
    this.ID = this.getDate('dd/MM/yyyy', date);
    console.log('this.ID     ' + this.ID);
    this.subs.add(
      this.VisitVeterinarianService.uploadAnalyse(
        formData,
        this.ID,
        visitIDnew,
      ).subscribe((data) => {
        if (data['response'] == 'OK') {
          this.changeIndicator = Math.random();
        }
        this.agreementFile = null;
      }),
    );
  }

  @ViewChild('wizard') wizard: ClrWizard;
  @ViewChild('pageThree') pageThree: ClrWizardPage;
  @ViewChild('pageFive') pageFive: ClrWizardPage;

  public jumpTo(page: ClrWizardPage) {
    if (page && page.completed) {
      this.wizard.navService.currentPage = page;
    } else {
      this.wizard.navService.setLastEnabledPageCurrent();
    }
    this.wizard.open();
  }

  public jumpToThree(): void {
    this.jumpTo(this.pageThree);
  }

  public jumpToFive(): void {
    this.jumpTo(this.pageFive)
  }

  // add images
  onFileChanged(event: any) {
    this.isLoading = true;
    for (var i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
        this.fileList.push(selectedFile);
        this.listOfFiles.push(selectedFile.name);
      }
    }

    this.isLoading = false;

    //this.attachment.nativeElement.value = '';
  }

  removeSelectedFile(index) {
    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
  }
uploadNecropsyFile(fichier, filevisit) {
  const formData = new FormData();
  formData.append('fichier', fichier);
  formData.append('fileEntite', JSON.stringify(filevisit));


  // Invoking service
  this.VisitVeterinarianService.addfilesTovist(formData).subscribe(data => {
    console.log(" data " + data[" response"]);

  });
}

}
