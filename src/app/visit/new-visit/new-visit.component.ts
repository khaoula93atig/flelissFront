import {Component, OnInit, ViewChild} from '@angular/core';
import {AutofocusDirective} from 'src/app/shared/autofocus.directive';
import {SubSink} from 'subsink';
import {FarmService} from '../../services/farm.service';
import {HouseService} from '../../services/house.service';
import {VisitService} from '../../services/visit.service';
import {FlockService} from '../../services/flock.service';
import {ListVisitComponent} from '../../visit/list-visit/list-visit.component';
import {
  IRegistrationVisits,
  IRegistrationTask,
  IRegistrationVisitTasks,
  DynamicGrid,
  WeeklyWeightMeasurement, WeeklyFeed,
} from 'src/app/shared/registration';
import {FormGroup, Validators, FormArray, FormControl} from '@angular/forms';

import {DatePipe, NumberSymbol} from '@angular/common';
import {ClrDatagrid} from '@clr/angular';
import {far} from '@fortawesome/free-regular-svg-icons';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-visit',
  templateUrl: './new-visit.component.html',
  styleUrls: ['./new-visit.component.css'],

})
export class NewVisitComponent implements OnInit {
  visitIDnew: any = '';
  max: number;
  input: number;
  date: Date;
  taskId: string;
  visitId: string;
  measure: DoubleRange;
  standard: string;
  hatchDate: Date;
  chikedPlaced: any;
  name: string;
  startOfCycle: string;
  breeddescription: string;
  username: string;
  weightCalcul = true;
  totalFeed = 0;
  totalWater = 0;
  testFeed = 0;
  testWater = 0;
  weeklyFeed = new WeeklyFeed();

  constructor(
    private farmService: FarmService,
    private visitService: VisitService,
    private houseService: HouseService,
    private datepipe: DatePipe,
    private listComponenet: ListVisitComponent,
    private flockService: FlockService,
    library: FaIconLibrary
  ) {
    library.addIconPacks(far);
  }

  faExclamation = faExclamationCircle;


  // Spinner display visit
  loading: boolean;
  subs: SubSink = new SubSink();
  farms: any[] = [];
  houses: any[] = [];
  flocks: any[] = [];
  tasks: any[] = [];
  visittasks: any = [];
  house: any[] = [];
  visit: any[] = [];
  visitDate: string;
  breedId: number;
  breed: BigInteger;
  flockID: string;
  psOrigin: string;
  birdsNumber: number;
  birdsNumberDay0: number;
  calculpercentage: number;
  calculpercentageWater: number;
  farmID: string ;
  houseId: string;
  description: string;
  ageOfTheFlock: any;
  // task fields
  tempTask: IRegistrationTask;
  humidityTask: IRegistrationTask;
  airSpeedTask: IRegistrationTask;
  amoniacTask: IRegistrationTask;
  lightIntensityTask: IRegistrationTask;
  feedConsumptionTask: IRegistrationTask;
  waterConsumptionTask: IRegistrationTask;
  mortalityTask: IRegistrationTask;
  litterConditionTask: IRegistrationTask;
  densityTask: IRegistrationTask;
  weightTask: IRegistrationTask;
  homogeneityFlockTask: IRegistrationTask;
  maxWeight: number;
  minWeight: number;
  // humidity fields
  measureHumResult: string;
  standardHumResult: string;
  deviationHumResult: string;
  // temperature fields
  measureTemResult: string;
  standardTemResult: string;
  deviationTemResult: string;
  // airSpeedTask fields
  measureAirSResult: string;
  standardAirSResult: string;
  deviationAirSResult: string;
  // amoniacTask fields
  measureAmoResult: string;
  standardAmoResult: string;
  deviationAmoResult: string;
  // lightIntensityTask fields
  measureLighIResult: string;
  standardLighIResult: string;
  deviationLighIResult: string;
  // feedConsumptionTask fields
  measureFeedCResult: string;
  standardFeedCResult: string;
  deviationFeedCResult: string;
  percentageFeedCResult: string;
  // waterConsumptionTask fields
  measureWatCResult: string;
  standardWatCResult: string;
  deviationWatCResult: string;
  percentageWatCResult: string;
  // mortalityTask fields
  measureMortResult: string;
  percentageMortResult: string;
  standardMortResult: string;
  deviationMortResult: string;
  // litterConditionTask fields
  measureLittCResult: string;
  standardLittCResult: string;
  deviationLittCResult: string;
  // densityTask fields
  measureDensResult: string;
  standardDensResult: string;
  deviationDensResult: string;
  // weightTask fields
  measureWeightResult: string;
  standardWeightResult: number;
  deviationWeightResult: string;
  // homogeneityFlockTask fields
  measureHomogResult: string;
  standardHomogResult: string;
  deviationHomogResult: string;
  // task measures
  measureTemp: number;
  measureHumidity: number;
  measureAirSpeed: number;
  measureAmoniac: number;
  measurelightIntensity: number;
  measurefeedConsumption: number;
  measureWaterConsumption: number;
  measureMortality: number;
  measureLitterCondition: number;
  measureDensity: number;
  measureWeight: any;
  measureHomogeneity: number;
  messageTemp: string;
  messageHumidity: string;
  messageAirSpeed: string;
  messageAmoniac: string;
  messagelightIntensity: string;
  messagefeedConsumption: string;
  messageWaterConsumption: string;
  messageMortality: string;
  messageDensity: string;
  messageWeight: string;
  messageHomogeneity: string;
  centers: any[] = [];
  // weight fields
  weightcalcul: number;
  visitID: string;
  weightMeasure: number;
  nbrbirds: number;
  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};
  centerId: string;
  cv: number;
  flockNumber: number;
  flockName = ' ';
  flock: any;
  nbrofBirdWeight: number;
  uniformity: number;
  weeklyWeightMeasurement: WeeklyWeightMeasurement = new WeeklyWeightMeasurement();
  // Reference to the included DataGrid showing the different sectors
  @ViewChild(ClrDatagrid) dg: ClrDatagrid;

  getCenterId(event) {
    this.centerId = event;
    this.houses = [];
    this.houseId = null;
    this.flockID = null;
    this.flocks = [];
    this.flockName = null;
    this.startOfCycle = null;
    this.breeddescription = '';
    this.hatchDate = null;
    this.ageOfTheFlock = null;
    this.chikedPlaced = null;
    this.psOrigin = null;
    this.subs.add(
      this.houseService.getConsultingHouseByCenter(this.centerId).subscribe(
        (data) => {
          this.houses = data;
          this.loading = false;
        },
      ),
    );
  }

  // get getSelectedhouse
  getHouseId(event) {
    this.houseId = event;
    this.flockID = null;
    this.flocks = [];
    this.flockName = null;
    this.startOfCycle = null;
    this.breeddescription = '';
    this.hatchDate = null;
    this.ageOfTheFlock = null;
    this.chikedPlaced = null;
    this.psOrigin = null;
    this.subs.add(
      this.houseService.gethouse(this.houseId).subscribe((data) => {
        this.house = data;
        for (let i of this.house) {
          this.birdsNumber = i.birdsNumber;
          this.birdsNumberDay0 = i.birdsNumber;
        }
      }),
    );
    this.flocks = new Array();
    this.subs.add(
      this.visitService.getConsultingFlock(this.houseId).subscribe((data) => {
        for (let element of data) {
          if (element.checkEndOfCycle == false) {
            this.flocks.push(element);
          }
        }
        console.log(this.flocks);
        this.flock = this.flocks[0];
        this.flockName = this.flock.flockName;
        this.flockID = this.flock.flockID;
        this.hatchDate = this.flock.hatchDate;
        this.chikedPlaced = this.flock.chikedPlaced;
        this.chikedPlaced = this.flock.chikedPlaced;
        this.psOrigin = this.flock.psOrigin;
        this.flockNumber = this.flock.flockNumber;
        this.calculAge();
        // get breed
        if ((this.flock.breed = this.flock.breedObject.breedID)) {
          this.breeddescription = this.flock.breedObject.description;
          this.breedId = this.flock.breedObject.breedID;
        }
        if (this.flock.restFlockNumber == 0) {
          this.max = this.flock.flockNumber;
        } else if (this.flock.flockNumber > 0) {
          this.max = this.flock.restFlockNumber;
        }
        console.log(this.max);
        this.visitService.getweeklyWeightByFlockAndAge(this.ageOfTheFlock, this.flockID).subscribe(
          data1 => {
            console.log('weekly', data1);
            if (data1.length != 0) {
              this.weightCalcul = false;
              this.cv = data1[0].cv;
              this.measureWeight = data1[0].average;
            }

          });
        this.visitService.getweeklyfeedByFlockAndAge(this.ageOfTheFlock, this.flockID).subscribe(
          data2 => {
            console.log('feed', data2);
            if (data2.length != 0) {
              this.measurefeedConsumption = data2[0];

            }
            this.loading = false;
          });
        this.visitService.getVisitTasksVerification(this.flockID, this.ageOfTheFlock, 8).subscribe(data3 => {
          console.log(data3);
          this.measureMortality = data3[0].measure;
        });
        this.getTotalMeasureTask(this.flockID, this.ageOfTheFlock);
      })
    );
  }

  calculTotalTemporary() {
    if (this.testFeed == this.totalFeed) {
      this.totalFeed = this.totalFeed + this.measurefeedConsumption;
    } else {
      this.totalFeed = this.testFeed + this.measurefeedConsumption;
    }
  }

  calculTotalWaterTemporary() {
    if (this.testWater == this.totalWater) {
      this.totalWater = this.totalWater + this.measureWaterConsumption;
    } else {
      this.totalWater = this.testWater + this.measureWaterConsumption;
    }
  }

  calculAge() {
    let date1 = new Date(this.flock.hatchDate);
    let date2 = new Date(this.visitDate);
    // To calculate the time difference of two dates
    this.ageOfTheFlock = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    this.ageOfTheFlock = Math.round(
      Math.abs(this.ageOfTheFlock / (1000 * 3600 * 24)),
    );
    this.getvisitByAgeAndFlock(this.ageOfTheFlock, this.flockID);
  }

  ngOnInit(): void {
    // this.visitDate = this.reverseDate("MM/DD/yyyy", new Date());
    this.visitDate = this.reverseDate('yyyy-MM-DD', new Date());
    localStorage.setItem('getId', ''); // store id
    // get all farm by company
    var companyID = localStorage.getItem('companyID');
    this.farmID = localStorage.getItem('farmID');
    this.subs.add(
      this.houseService.getConsultingCenterbyFarm(this.farmID).subscribe(
        (data) => {
          this.centers = data;
        },
      ),
    );
    this.subs.add(
      this.farmService.getConsultingFarm(companyID).subscribe((data) => {
        this.farms = data;
      }),
    );

    this.initResults();
    this.initVisit();
    //this.initWeight();

    // get all Task
    this.subs.add(
      this.visitService.getConsultingTask().subscribe((data) => {
        this.tasks = data;
        // Find out from the list of types which one corresponding to the selected Code
        for (let task of this.tasks) {
          if (task.taskId == 1) {
            this.tempTask = task;
          } else if (task.taskId == 2) {
            this.humidityTask = task;
          } else if (task.taskId == 3) {
            this.airSpeedTask = task;
            console.log('id' + task.taskId);
          } else if (task.taskId == 4) {
            this.amoniacTask = task;
          } else if (task.taskId == 5) {
            this.lightIntensityTask = task;
          } else if (task.taskId == 6) {
            this.feedConsumptionTask = task;
          } else if (task.taskId == 7) {
            this.waterConsumptionTask = task;
          } else if (task.taskId == 8) {
            this.mortalityTask = task;
          } else if (task.taskId == 9) {
            this.litterConditionTask = task;
          } else if (task.taskId == 10) {
            this.densityTask = task;
          } else if (task.taskId == 11) {
            this.weightTask = task;
          } else if (task.taskId == 12) {
            this.homogeneityFlockTask = task;
          }
        }
      }),
    );
    this.newDynamic = {weight: 0, nbr: 1};
    this.dynamicArray.push(this.newDynamic);
  }

  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective;

  show = false;

  // open Dialog Results
  open() {
    this.show = true;

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

  // Weight Management!
  WeightOpened: boolean = false;

  showWeight(): void {
    this.WeightOpened = true;
  }

  // Weight measurement
  addRow() {
    this.newDynamic = {weight: 0, nbr: this.dynamicArray.length + 1};
    this.dynamicArray.push(this.newDynamic);
    console.log('test', this.dynamicArray);
    return true;
  }

  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      return false;
    } else {
      this.dynamicArray.splice(index, 1);

      for (let i = index; i < this.dynamicArray.length; i++) {
        this.dynamicArray[i].nbr = this.dynamicArray[i].nbr - 1;
      }

      return true;
    }
  }

  object: any[];
  // save weight
  Weightclosed: boolean = true;

  submitWeight(): void {
    this.maxWeight = this.dynamicArray[0].weight;
    this.minWeight = this.dynamicArray[0].weight;
    this.weightMeasure = 0;
    this.cv = 0;
    console.log(this.dynamicArray);
    this.nbrofBirdWeight = this.dynamicArray.length;
    for (var i = 0; i < this.dynamicArray.length; i++) {
      this.weightMeasure = this.weightMeasure + this.dynamicArray[i].weight;
      if (this.maxWeight < this.dynamicArray[i].weight) {
        this.maxWeight = this.dynamicArray[i].weight;
      }
      if (this.minWeight > this.dynamicArray[i].weight) {
        this.minWeight = this.dynamicArray[i].weight;
      }
    }

    this.measureWeight = (this.weightMeasure / this.dynamicArray.length).toFixed(2);
    this.cv = ((this.maxWeight - this.minWeight) / this.measureWeight) * 100;
    this.cv = parseFloat(this.cv.toFixed(3));
    let bornSup = parseFloat((this.measureWeight + ((this.measureWeight / 100) * 10)).toFixed(2));
    let bornInf = parseFloat((this.measureWeight - ((this.measureWeight / 100) * 10)).toFixed(2));
    let outOff= 0;
    // calcul uniformity
    for (i = 0; i < this.dynamicArray.length; i++) {
      if (this.dynamicArray[i].weight > bornSup || this.dynamicArray[i].weight < bornInf) {
        outOff++;
      }
    }
    this.uniformity = parseFloat((((this.dynamicArray.length - outOff) / this.dynamicArray.length) * 100).toFixed(2));
    // this.Weightclosed = false
    this.WeightOpened = false;
    this.dynamicArray = [];
    this.newDynamic = {weight: 0, nbr: 1};
    this.dynamicArray.push(this.newDynamic);

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
    }
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
    }

    if (format == 'MM/DD/yyyy') {
      console.log('date ');
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      let smonth = month < 10 ? '0' + month : month;
      let sday = day < 10 ? '0' + day : day;

      var dateFormatted = sday + '/' + smonth + '/' + year;
      var dt = dateFormatted;
    }

    if (format == 'MM/DD/yyyy') {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      let smonth = month < 10 ? '0' + month : month;
      let sday = day < 10 ? '0' + day : day;

      var dateFormatted = sday + '/' + smonth + '/' + year;
      var dt = dateFormatted;
    }

    return dt;
  }

  getTotalMeasureTask(flockId, ageFlock) {
    this.visitService.totalMeasureTaskDate(flockId, ageFlock, 6).subscribe(data => {
      console.log(data);
      this.totalFeed = data;
      this.testFeed = data;
    });
    this.visitService.totalMeasureTaskDate(flockId, ageFlock, 7).subscribe(data => {
      console.log(data);
      this.totalWater = data;
      this.testWater = data;
    });
  }

  // visit Creation
  submit(): void {
    // Show the spinner for loading process ....
    setTimeout((_) => (this.loading = true));

    // Find out from the list of types which one corresponding to the selected Code

    let registrationVisit: IRegistrationVisits = new Object() as IRegistrationVisits;

    var date =
      this.visitDate.substring(8, 10) +
      '/' +
      this.visitDate.substring(7, 5) +
      '/' +
      this.visitDate.substring(0, 4);

    registrationVisit.visitdateString = date;
    this.farmID = localStorage.getItem('farmID');

    registrationVisit.frequency = 'Daily';
    registrationVisit.flockID = this.flockID;
    registrationVisit.houseID = this.houseId;
    registrationVisit.username = localStorage.getItem('user');
    registrationVisit.ageFlock = this.ageOfTheFlock;
    registrationVisit.typeVisit = 'daily_visit';
    registrationVisit.centerID = this.centerId;
    registrationVisit.farmId = this.farmID;
    registrationVisit.mortality = this.measureMortality;
    registrationVisit.total_feed_consumption = this.totalFeed;
    registrationVisit.total_water_consumption = this.totalWater;
    if(this.measureWeight != null && this.measureWeight != 0){
      registrationVisit.fcr = this.totalFeed / this.measureWeight;
    }
    console.log('visit', registrationVisit);
    // Invoking service
    this.visitService.createRegistrationVisits(registrationVisit).subscribe(
      (data) => {
        console.log('visit', data);
        var alldata = data;
        localStorage.setItem('visitId', JSON.stringify(data));
        this.visitIDnew = alldata.visitId;
        // Store the login in the storage

        if (alldata.statusSave == 'success') {
          // temperature
          let registrationVisitTasksTemperature: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTasksTemperature.ageFlock = this.ageOfTheFlock;
          registrationVisitTasksTemperature.taskId = this.tempTask.taskId;
          registrationVisitTasksTemperature.visitId = this.visitIDnew;
          registrationVisitTasksTemperature.measure = this.measureTemp;
          registrationVisitTasksTemperature.breedId = this.breedId;
          // Invoking service
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTasksTemperature,
          ).subscribe((data) => {
            this.messageTemp = data['response'];
          });

          // humidity
          let registrationVisitTasksHumidity: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTasksHumidity.ageFlock = this.ageOfTheFlock;
          registrationVisitTasksHumidity.taskId = this.humidityTask.taskId;
          registrationVisitTasksHumidity.visitId = this.visitIDnew;
          registrationVisitTasksHumidity.measure = this.measureHumidity;
          registrationVisitTasksHumidity.breedId = this.breedId;
          // Invoking service
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTasksHumidity,
          ).subscribe((data) => {
            this.messageHumidity = data['response'];
          });

          // air speed
          let registrationVisitTasksAirSpeedTask: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTasksAirSpeedTask.ageFlock = this.ageOfTheFlock;
          registrationVisitTasksAirSpeedTask.taskId = this.airSpeedTask.taskId;
          registrationVisitTasksAirSpeedTask.visitId = this.visitIDnew;
          registrationVisitTasksAirSpeedTask.measure = this.measureAirSpeed;
          registrationVisitTasksAirSpeedTask.breedId = this.breedId;
          // Invoking service
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTasksAirSpeedTask,
          ).subscribe((data) => {
            this.messageAirSpeed = data['response'];
          });

          // amoniac
          let registrationVisitTasksAmoniacTask: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTasksAmoniacTask.ageFlock = this.ageOfTheFlock;
          registrationVisitTasksAmoniacTask.taskId = this.amoniacTask.taskId;
          registrationVisitTasksAmoniacTask.visitId = this.visitIDnew;
          registrationVisitTasksAmoniacTask.measure = this.measureAmoniac;
          registrationVisitTasksAmoniacTask.breedId = this.breedId;
          // Invoking service
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTasksAmoniacTask,
          ).subscribe((data) => {
            var x = localStorage.setItem(
              'visitId',
              registrationVisitTasksAmoniacTask.visitId,
            );
            this.messageAmoniac = data['response'];
          });
          // feedConsumption
          let registrationVisitTasksfeedConsumptiont: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTasksfeedConsumptiont.ageFlock = this.ageOfTheFlock;
          registrationVisitTasksfeedConsumptiont.taskId = this.feedConsumptionTask.taskId;
          registrationVisitTasksfeedConsumptiont.visitId = this.visitIDnew;
          registrationVisitTasksfeedConsumptiont.measure = this.measurefeedConsumption;
          this.calculpercentage =
            (this.measurefeedConsumption * 25 * 1000) / this.birdsNumber;
          registrationVisitTasksfeedConsumptiont.percentage = this.calculpercentage;
          registrationVisitTasksfeedConsumptiont.breedId = this.breedId;

          // Invoking service
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTasksfeedConsumptiont,
          ).subscribe((data) => {
            this.messagefeedConsumption = data['response'];
          });

          // weight
          // console.log('weightTask.taskId' + this.weightTask.taskId)
          if(this.measureWeight != null) {
            console.log(this.measureWeight);
            let registrationVisitTasksWeight: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
            registrationVisitTasksWeight.ageFlock = this.ageOfTheFlock;
            registrationVisitTasksWeight.taskId = this.weightTask.taskId;
            registrationVisitTasksWeight.visitId = this.visitIDnew;
            registrationVisitTasksWeight.measure = this.measureWeight;
            registrationVisitTasksWeight.breedId = this.breedId;
            // Invoking service
            this.visitService.createRegistrationVisitTasks(
              registrationVisitTasksWeight,
            ).subscribe((data) => {
              this.messageWeight = data['response'];
            });

            // homogenité
            let registrationVisitTaskshomognite: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
            registrationVisitTaskshomognite.ageFlock = this.ageOfTheFlock;
            registrationVisitTaskshomognite.taskId = this.homogeneityFlockTask.taskId;
            registrationVisitTaskshomognite.visitId = this.visitIDnew;
            registrationVisitTaskshomognite.measure = this.cv;
            this.visitService.createRegistrationVisitTasks(
              registrationVisitTaskshomognite,
            ).subscribe((data) => {
              this.messageHomogeneity = data['response'];
            });
          }

          // light intensité
          let registrationVisitTasklight: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTasklight.ageFlock = this.ageOfTheFlock;
          registrationVisitTasklight.taskId = this.lightIntensityTask.taskId;
          registrationVisitTasklight.visitId = this.visitIDnew;
          registrationVisitTasklight.measure = this.measurelightIntensity;
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTasklight,
          ).subscribe((data) => {
            this.messageHomogeneity = data['response'];
          });

          // density
          let registrationVisitTaskDensity: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTaskDensity.ageFlock = this.ageOfTheFlock;
          registrationVisitTaskDensity.taskId = this.densityTask.taskId;
          registrationVisitTaskDensity.visitId = this.visitIDnew;
          registrationVisitTaskDensity.measure = this.measureDensity;
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTaskDensity,
          ).subscribe((data) => {
            this.messageHomogeneity = data['response'];
          });


          // WaterConsumption
          let registrationVisitTasksWaterConsumption: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTasksWaterConsumption.ageFlock = this.ageOfTheFlock;
          registrationVisitTasksWaterConsumption.taskId = this.waterConsumptionTask.taskId;
          registrationVisitTasksWaterConsumption.visitId = this.visitIDnew;
          registrationVisitTasksWaterConsumption.measure = this.measureWaterConsumption;
          this.calculpercentageWater =
            (this.measureWaterConsumption * 1000000) / this.birdsNumber;
          registrationVisitTasksWaterConsumption.percentage = this.calculpercentageWater;
          registrationVisitTasksWaterConsumption.breedId = this.breedId;
          // Invoking service
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTasksWaterConsumption,
          ).subscribe((data) => {
            this.messageWaterConsumption = data['response'];
          });

          // Mortality
          let registrationVisitTasksMortality: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTasksMortality.ageFlock = this.ageOfTheFlock;
          registrationVisitTasksMortality.taskId = this.mortalityTask.taskId;
          registrationVisitTasksMortality.visitId = this.visitIDnew;
          registrationVisitTasksMortality.measure = this.measureMortality;
          this.calculpercentage = (this.measureMortality * 100) / this.flockNumber;
          registrationVisitTasksMortality.percentage = this.calculpercentage;
          registrationVisitTasksMortality.breedId = this.breedId;
          // Invoking service
          console.log('mortality', registrationVisitTasksMortality);
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTasksMortality,
          ).subscribe((data) => {
            this.messageMortality = data['response'];
            switch (this.ageOfTheFlock) {
              case 0 :
                this.weeklyFeed.totalStarterFeed = this.totalFeed;
                this.weeklyFeed.starterFeedPerBird = this.totalFeed / this.flocks[0].restFlockNumber;
                this.saveweeklyFeed(this.weeklyFeed);
                this.saveWeeklyWeight(this.weeklyWeightMeasurement);
                break;
              case 7 :
                this.weeklyFeed.totalStarterFeed = this.totalFeed;
                this.weeklyFeed.starterFeedPerBird = this.totalFeed / this.flocks[0].restFlockNumber;
                this.saveweeklyFeed(this.weeklyFeed);
                this.saveWeeklyWeight(this.weeklyWeightMeasurement);
                break;
              case 14 :
                this.weeklyFeed.totalGrowerFeed = this.totalFeed;
                this.weeklyFeed.growerFeedPerBird = this.totalFeed / this.flocks[0].restFlockNumber;
                this.saveweeklyFeed(this.weeklyFeed);
                this.saveWeeklyWeight(this.weeklyWeightMeasurement);
                break;
              case 21 :
                this.weeklyFeed.totalGrowerFeed = this.totalFeed;
                this.weeklyFeed.growerFeedPerBird = this.totalFeed / this.flocks[0].restFlockNumber;
                this.saveweeklyFeed(this.weeklyFeed);
                this.saveWeeklyWeight(this.weeklyWeightMeasurement);
                break;
              case 28 :
                this.weeklyFeed.totalFinisherFeed = this.totalFeed;
                this.weeklyFeed.finisherFeedBird = this.totalFeed / this.flocks[0].restFlockNumber;
                this.saveweeklyFeed(this.weeklyFeed);
                this.saveWeeklyWeight(this.weeklyWeightMeasurement);
                break;
              case 35 :
                this.weeklyFeed.totalFinisherFeed = this.totalFeed;
                this.weeklyFeed.finisherFeedBird = this.totalFeed / this.flocks[0].restFlockNumber;
                this.saveweeklyFeed(this.weeklyFeed);
                this.saveWeeklyWeight(this.weeklyWeightMeasurement);
                break;
              case 42 :
                this.weeklyFeed.totalFinisherFeed = this.totalFeed;
                this.weeklyFeed.finisherFeedBird = this.totalFeed / this.flocks[0].restFlockNumber;
                this.saveweeklyFeed(this.weeklyFeed);
                this.saveWeeklyWeight(this.weeklyWeightMeasurement);
                break;
            }
          });

          let registrationVisitTasksLitterCondition: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks;
          registrationVisitTasksLitterCondition.ageFlock = this.ageOfTheFlock;
          registrationVisitTasksLitterCondition.taskId = this.litterConditionTask.taskId;
          registrationVisitTasksLitterCondition.visitId = this.visitIDnew;
          registrationVisitTasksLitterCondition.measure = this.measureLitterCondition;
          // Invoking service
          console.log('litter condition ', registrationVisitTasksLitterCondition);
          this.visitService.createRegistrationVisitTasks(
            registrationVisitTasksLitterCondition,
          ).subscribe((data) => {
            this.messageMortality = data['response'];
          });
        }
        // this.showResult(this.visitIDnew)
        this.resultOpened = true;
        // this.showResult(this.visitIDnew);
        this.visitService.getConsultingvisitID(this.visitIDnew).subscribe(
          (data) => {
            // this.showResult(this.visitIDnew);
            for (let d of data) {
              if (d.taskId == 9) {
                if (d.measure == 0) {
                  d.measure = 'aerate';
                } else if (d.measure == 1) {
                  d.measure = 'not aerate';
                } else {
                  d.measure = 'humid';
                }
              }
            }
            this.visittasks = data;
          });

      },
    );
  }

  // button save
  submitAll(): void {
    this.submit();
  }

  saveweeklyFeed(feed) {
    feed.farmId = this.farmID;
    feed.centerId = this.centerId;
    feed.houseId = this.houseId;
    feed.flockId = this.flockID;
    feed.week = this.ageOfTheFlock;
    feed.breed = this.breedId;
    console.log(this.weeklyFeed);
    this.visitService.saveWeeklyFeed(this.weeklyFeed).subscribe((data) => {
      console.log('weeklyFeed ' + JSON.stringify(this.weeklyFeed));
      console.log('data[\'response\']  ' + data['response']);
      if (data['response'] == 'OK') {
        console.log('test');
      }
    });
  }
  saveWeeklyWeight(weeklyWeightMeasurement){
    weeklyWeightMeasurement.centerId = this.centerId;
    weeklyWeightMeasurement.farmId = this.farmID;
    weeklyWeightMeasurement.houseId = this.houseId;
    weeklyWeightMeasurement.flockId = this.flockID;
    weeklyWeightMeasurement.flockNbr = this.nbrofBirdWeight;
    // weeklyWeightMeasurement.weight = o;
    weeklyWeightMeasurement.average = this.measureWeight;
    weeklyWeightMeasurement.week = this.ageOfTheFlock;
    weeklyWeightMeasurement.breed = this.breedId;
    weeklyWeightMeasurement.cv = this.cv;
    weeklyWeightMeasurement.uniformity =  this.uniformity;
    this.visitService.saveWeeklyWeight(weeklyWeightMeasurement).subscribe(data=>
      console.log(weeklyWeightMeasurement)
    );

  }

  // Reset the form after 'Annuler' Button clicked
  @ViewChild('myForm') formValues;

  clearTheForm() {
    this.formValues.resetForm();
  }

  // result Management!
  resultOpened: boolean = false;

  // visit initialization
  initVisit(): void {
    // this.visitDate = new Date();
    this.visitDate = this.reverseDate('yyyy-MM-DD', new Date());
    this.centerId = '';
    this.measureTemp = null;
    this.farmID = '';
    this.measureHumidity = null;
    this.measureAirSpeed = null;
    this.measureAmoniac = null;
    this.measurelightIntensity = null;
    this.measurefeedConsumption = null;
    this.measureWaterConsumption = null;
    this.measureMortality = null;
    this.measureDensity = null;
    this.measureWeight = null;
    this.measureHomogeneity = null;
    this.resultOpened = false;
    this.startOfCycle = null;
    this.breeddescription = '';
    this.hatchDate = null;
    this.ageOfTheFlock = null;
    this.chikedPlaced = null;
    this.psOrigin = null;
    this.flockID = null;
    this.houseId = null;
    this.show = false;
    this.show = false;
    this.houses = [];
    this.centers = [];
    this.flocks = [];
    this.listComponenet.refresh();
    // console.log('show' + this.show)
  }

  // tasks results initialization
  initResults(): void {
    this.measureTemResult = '';
    this.standardTemResult = '';
    this.deviationTemResult = '';
    this.measureHumResult = '';
    this.standardHumResult = '';
    this.deviationHumResult = '';
    this.measureAirSResult = '';
    this.standardAirSResult = '';
    this.deviationAirSResult = '';
    this.measureAmoResult = '';
    this.standardAmoResult = '';
    this.deviationAmoResult = '';
    this.measureLighIResult = '';
    this.standardLighIResult = '';
    this.deviationLighIResult = '';
    this.measureFeedCResult = '';
    this.standardFeedCResult = '';
    this.deviationFeedCResult = '';
    this.measureFeedCResult = '';
    this.standardFeedCResult = '';
    this.deviationFeedCResult = '';
    this.percentageFeedCResult = '';
    this.measureWatCResult = '';
    this.standardWatCResult = '';
    this.deviationWatCResult = '';
    this.percentageWatCResult = '';
    this.measureMortResult = '';
    this.percentageMortResult = '';
    this.standardMortResult = '';
    this.deviationMortResult = '';
    this.measureLittCResult = '';
    this.standardLittCResult = '';
    this.deviationLittCResult = '';
    this.measureDensResult = '';
    this.standardDensResult = '';
    this.deviationDensResult = '';
    this.measureWeightResult = '';
    this.standardWeightResult = null;
    this.deviationWeightResult = '';
    this.measureHomogResult = '';
    this.standardHomogResult = '';
    this.deviationHomogResult = '';
  }

  // weight initialization
  initWeight(): void {
    this.weightMeasure = 0;
    this.measureWeight = 0;
    this.nbrbirds = 0;
  }

  getvisitByAgeAndFlock(age, flock) {
    this.visitService.getVisitByAgeAndflock(age, flock).subscribe(data => {
      console.log('exisit', data);
    });
  }
}
