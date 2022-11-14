import { Component, OnInit, ViewChild } from '@angular/core'
import { AutofocusDirective } from 'src/app/shared/autofocus.directive'
import { SubSink } from 'subsink'
import { FarmService } from '../../services/farm.service'
import { HouseService } from '../../services/house.service'
import { VisitService } from '../../services/visit.service'
import { FlockService } from '../../services/flock.service'
import { ListVisitComponent } from '../../visit/list-visit/list-visit.component'
import {
  IRegistrationVisits,
  IRegistrationTask,
  IRegistrationVisitTasks,
  DynamicGrid,
} from 'src/app/shared/registration'
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms'

import { DatePipe } from '@angular/common'
import { ClrDatagrid } from '@clr/angular'

@Component({
  selector: 'app-new-visit',
  templateUrl: './new-visit.component.html',
  styleUrls: ['./new-visit.component.css'],
})
export class NewVisitComponent implements OnInit {
  visitIDnew: any = ''
  exampleForm = new FormGroup({
    sample: new FormControl('', Validators.required),
  })

  date: Date
  latest_date: String
  taskId: string
  visitId: string
  measure: DoubleRange
  standard: string
  actionPlan: string
  hatchDate: Date
  chikedPlaced: any
  name: string
  dateToday: Date = new Date()
  startOfCycle: string
  addForm: FormGroup
  House_id: any[] = []
  breeddescription: string
  username: string
  rows: FormArray
  itemForm: FormGroup
  constructor(
    private FarmService: FarmService,
    private VisitService: VisitService,
    private HouseService: HouseService,
    private datepipe: DatePipe,
    private ListComponenet: ListVisitComponent,
    private FlockService: FlockService,
  ) {}

  // Spinner display visit
  loading: boolean
  subs: SubSink = new SubSink()
  farms: any[] = []
  houses: any[] = []
  flocks: any[] = []
  tasks: any[] = []
  visittasks: any = []
  house: any[] = []
  visit: any[] = []
  alldata: any[] = []
  visitDate: string
  breedId: number
  frequency: string
  breed: BigInteger
  flockID: string
  userID: string
  psOrigin: string
  birdsNumber: number
  birdsNumberDay0: number
  calculpercentage: number
  calculpercentageWater: number
  farmID: string = ''
  houseId: string = ''
  description: string
  ageOfTheFlock: any
  datevisit: Date
  //task fields
  tempTask: IRegistrationTask
  humidityTask: IRegistrationTask
  airSpeedTask: IRegistrationTask
  amoniacTask: IRegistrationTask
  lightIntensityTask: IRegistrationTask
  feedConsumptionTask: IRegistrationTask
  waterConsumptionTask: IRegistrationTask
  mortalityTask: IRegistrationTask
  litterConditionTask: IRegistrationTask
  densityTask: IRegistrationTask
  weightTask: IRegistrationTask
  homogeneityFlockTask: IRegistrationTask
  //humidity fields
  measureHumResult: string
  standardHumResult: string
  deviationHumResult: string
  //temperature fields
  measureTemResult: string
  standardTemResult: string
  deviationTemResult: string
  //airSpeedTask fields
  measureAirSResult: string
  standardAirSResult: string
  deviationAirSResult: string
  //amoniacTask fields
  measureAmoResult: string
  standardAmoResult: string
  deviationAmoResult: string
  //lightIntensityTask fields
  measureLighIResult: string
  standardLighIResult: string
  deviationLighIResult: string
  //feedConsumptionTask fields
  measureFeedCResult: string
  standardFeedCResult: string
  deviationFeedCResult: string
  percentageFeedCResult: string
  //waterConsumptionTask fields
  measureWatCResult: string
  standardWatCResult: string
  deviationWatCResult: string
  percentageWatCResult: string
  //mortalityTask fields
  measureMortResult: string
  percentageMortResult: string
  standardMortResult: string
  deviationMortResult: string
  //litterConditionTask fields
  measureLittCResult: string
  standardLittCResult: string
  deviationLittCResult: string
  //densityTask fields
  measureDensResult: string
  standardDensResult: string
  deviationDensResult: string
  //weightTask fields
  measureWeightResult: string
  standardWeightResult: number
  deviationWeightResult: string
  //homogeneityFlockTask fields
  measureHomogResult: string
  standardHomogResult: string
  deviationHomogResult: string
  //task measures
  measureTemp: number
  measureHumidity: number
  measureAirSpeed: number
  measureAmoniac: number
  measurelightIntensity: number
  measurefeedConsumption: number
  measureWaterConsumption: number
  measureMortality: number
  measureDensity: number
  measureWeight: any
  measureHomogeneity: number
  messageTemp: string
  messageHumidity: string
  messageAirSpeed: string
  messageAmoniac: string
  messagelightIntensity: string
  messagefeedConsumption: string
  messageWaterConsumption: string
  messageMortality: string
  messageDensity: string
  messageWeight: string
  messageHomogeneity: string
  centers: any[] = []
  //weight fields
  weightcalcul: number
  visitID: string = ''
  weightMeasure: number = 0
  nbrbirds: number = 0
  dynamicArray: Array<DynamicGrid> = []
  newDynamic: any = {}
  sommeWeight: number = 0
  centerId: string
  cv: number
  flockNumber: number
  // Reference to the included DataGrid showing the different sectors
  @ViewChild(ClrDatagrid) dg: ClrDatagrid
  gethouse_id(id: string) {
    return id.substr(10, id.length)
  }

  //get getSelectedfarm
  getFarmId(event) {
    //console.log(event)
    this.farmID = event

    this.subs.add(
      this.HouseService.getConsultingHouse(this.farmID).subscribe((data) => {
        this.houses = data
        this.loading = false
      }),
    )
  }
  getCenterId(event) {
    this.centerId = event
    this.subs.add(
      this.HouseService.getConsultingHouseByCenter(this.centerId).subscribe(
        (data) => {
          //console.log('' + JSON.stringify(data))
          this.houses = data
          this.loading = false
        },
      ),
    )
  }
  //get getSelectedhouse
  getHouseId(event) {
    this.houseId = event
    this.subs.add(
      this.HouseService.gethouse(this.houseId).subscribe((data) => {
        this.house = data
        for (let i of this.house) {
          this.birdsNumber = i.birdsNumber
          this.birdsNumberDay0 = i.birdsNumber
        }
      }),
    )
    this.flocks = new Array()
    this.subs.add(
      this.VisitService.getConsultingFlock(this.houseId).subscribe((data) => {
        for (let element of data) {
          if (element.checkEndOfCycle == false) this.flocks.push(element)
        }
        this.loading = false
      }),
    )
  }
  //get getSelectedFlock
  getflockID(event) {
    this.flockID = event
    this.subs.add(
      this.VisitService.getConsultingFlockbyId(this.flockID).subscribe(
        (data) => {
          this.flocks = data
          this.loading = false

          for (let i of this.flocks) {
            this.hatchDate = i.hatchDate
            this.chikedPlaced = i.chikedPlaced
            this.chikedPlaced = i.chikedPlaced
            this.psOrigin = i.psOrigin
            this.flockNumber = i.flockNumber
            var date1 = new Date(i.hatchDate)
            var date2 = new Date(this.visitDate)
            // To calculate the time difference of two dates
            this.ageOfTheFlock = date2.getTime() - date1.getTime()

            // To calculate the no. of days between two dates
            this.ageOfTheFlock = Math.round(
              Math.abs(this.ageOfTheFlock / (1000 * 3600 * 24)),
            )
            // get breed
            if ((i.breed = i.breedObject.breedID)) {
              this.breeddescription = i.breedObject.description
              this.breedId = i.breedObject.breedID
            }
          }
        },
      ),
    )
  }

  ngOnInit(): void {
    // this.visitDate = this.reverseDate("MM/DD/yyyy", new Date());
    this.visitDate = this.reverseDate('yyyy-MM-DD', new Date())
    localStorage.setItem('getId', '') //store id
    //get all farm by company
    var companyID = sessionStorage.getItem('companyID')
    this.farmID = sessionStorage.getItem('farmID')
    this.subs.add(
      this.HouseService.getConsultingCenterbyFarm(this.farmID).subscribe(
        (data) => {
          //console.log('data centers ******* ' + JSON.stringify(data))
          this.centers = data
        },
      ),
    )
    this.subs.add(
      this.FarmService.getConsultingFarm(companyID).subscribe((data) => {
        this.farms = data
      }),
    )

    this.initResults()
    this.initVisit()
    this.initWeight()

    //get all Task
    this.subs.add(
      this.VisitService.getConsultingTask().subscribe((data) => {
        this.tasks = data
        // Find out from the list of types which one corresponding to the selected Code
        for (let task of this.tasks) {
          if (task.taskId == 1) {
            this.tempTask = task
          } else if (task.taskId == 2) {
            this.humidityTask = task
          } else if (task.taskId == 3) {
            this.airSpeedTask = task
            console.log('id' + task.taskId)
          } else if (task.taskId == 4) {
            this.amoniacTask = task
          } else if (task.taskId == 5) {
            this.lightIntensityTask = task
          } else if (task.taskId == 6) {
            this.feedConsumptionTask = task
          } else if (task.taskId == 7) {
            this.waterConsumptionTask = task
          } else if (task.taskId == 8) {
            this.mortalityTask = task
          } else if (task.taskId == 9) {
            this.litterConditionTask = task
          } else if (task.taskId == 10) {
            this.densityTask = task
          } else if (task.taskId == 11) {
            this.weightTask = task
          } else if (task.taskId == 12) {
            this.homogeneityFlockTask = task
          }
        }
      }),
    )
    this.newDynamic = { weight: '', nbr: '' }
    this.dynamicArray.push(this.newDynamic)
  }

  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective

  show = false

  //open Dialog Results
  open() {
    this.show = true

    // clone the user (we don't want to modify the original in the dialog)

    setTimeout(() => {
      if (this.autofocus) {
        this.autofocus.setFocus()
      }
    }, 0.1)
  }

  close() {
    this.show = false
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
    }
  }

  onSubmit() {}

  // Weight Management!
  WeightOpened: boolean = false
  showWeight(): void {
    this.WeightOpened = true
  }

  // Weight measurement
  addRow(index) {
    this.newDynamic = { weight: 0, nbr: 0 }
    this.dynamicArray.push(this.newDynamic)
   // console.log(this.dynamicArray)
    return true
  }
  set VisitIdNew(id) {
    this.visitIDnew = id
  }
  get VisitIdNew() {
    return this.visitIDnew
  }
  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      return false
    } else {
      this.dynamicArray.splice(index, 1)

      return true
    }
  }
  object: any[]
  //save weight
  Weightclosed: boolean = true
  submitWeight(): void {
    for (var i = 0; i < this.dynamicArray.length; i++) {
      this.weightcalcul = this.dynamicArray[i].weight * this.dynamicArray[i].nbr
      this.weightMeasure = +this.weightMeasure + this.weightcalcul
      this.nbrbirds = +this.nbrbirds + +this.dynamicArray[i].nbr
    }

    this.measureWeight = (this.weightMeasure / this.nbrbirds).toFixed(2)
    this.VisitService.getStndardWeigth(
      this.ageOfTheFlock,
      this.breedId,
    ).subscribe((data) => {
      this.standardWeightResult = data.weight
      if (data != null) {
        this.cv = (this.standardWeightResult / this.measureWeight) * 100
        this.cv = parseFloat(this.cv.toFixed(3))
        // this.Weightclosed = false
        this.WeightOpened = false
      }
    })
  }

  reverseDate(format: string, date: Date) {
    if (format == 'yyyy-MM-DD') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = year + '-' + smonth + '-' + sday
      var dt = dateFormatted
    } //else { console.log("Format date not supported"); }
    if (format == 'yyyyMMDD') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = '' + year + smonth + sday
      var dt = dateFormatted
    }
    if (format == 'DD-MM-yyyy') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = sday + '-' + smonth + '-' + year
      var dt = dateFormatted
    } //else { console.log("Format date not supported"); }

    if (format == 'MM/DD/yyyy') {
      console.log('date ')
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = sday + '/' + smonth + '/' + year
      var dt = dateFormatted
    } //else { console.log("Format date not supported"); }

    if (format == 'MM/DD/yyyy') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = sday + '/' + smonth + '/' + year
      var dt = dateFormatted
    } //else { console.log("Format date not supported"); }

    return dt
  }
  //date formatting
  setDate(format: string, date: string) {
    if (format == 'yyyy-MM-DD') {
      var dateObj = date.split('-')
      var year = dateObj[0]
      var month = dateObj[1]
      var day = dateObj[2]

      var dateFormatted = new Date()
      dateFormatted.setFullYear(+year, +month - 1, +day)
      var dt = dateFormatted
    } //else { console.log("Format date not supported"); }

    if (format == 'MM/DD/yyyy') {
      console.log('date string ' + date)
      const dateObj = date.split('/')
      let month = dateObj[0]
      let day = dateObj[1]
      let year = dateObj[2]
      console.log(
        'date string month ' + month + ' day ' + day + ' year ' + year,
      )
      let dateFormatted = new Date()
      dateFormatted.setFullYear(+year, +month - 1, +day)
      var dt = dateFormatted
      console.log('date date ' + dt)
    } //else { console.log("Format date not supported"); }
    return dt
  }
  //date formatting
  setNewDate(format: string, date: Date) {
    if (format == 'MM/DD/yyyy') {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      let smonth = month < 10 ? '0' + month : month
      let sday = day < 10 ? '0' + day : day

      var dateFormatted = smonth + '/' + sday + '/' + year
      var dt = dateFormatted
    } //else { console.log("Format date not supported"); }

    return dt
  }
  //visit Creation
  submit(): void {
    // Show the spinner for loading process ....
    setTimeout((_) => (this.loading = true))

    // Find out from the list of types which one corresponding to the selected Code

    //let registrationTask: IRegistrationTask = new Object() as IRegistrationTask;
    // registrationTask.description = this.description;

    let registrationVisit: IRegistrationVisits = new Object() as IRegistrationVisits

    var date =
      this.visitDate.substring(8, 10) +
      '/' +
      this.visitDate.substring(7, 5) +
      '/' +
      this.visitDate.substring(0, 4)

    registrationVisit.visitdateString = date
    this.farmID = sessionStorage.getItem('farmID')

    registrationVisit.frequency = 'Daily'
    registrationVisit.flockID = this.flockID
    registrationVisit.houseID = this.houseId
    registrationVisit.username = sessionStorage.getItem('user')
    registrationVisit.ageFlock = this.ageOfTheFlock
    registrationVisit.typeVisit = 'daily_visit'
    registrationVisit.centerID = this.centerId
    registrationVisit.farmId = this.farmID
    //Invoking service
    this.VisitService.createRegistrationVisits(registrationVisit).subscribe(
      (data) => {
        var alldata = data
        sessionStorage.setItem('visitId', JSON.stringify(data))
        this.visitIDnew = alldata.visitId
        // Store the login in the storage

        if (alldata.statusSave == 'success') {
          // temperature
          let registrationVisitTasksTemperature: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks
          registrationVisitTasksTemperature.ageFlock = this.ageOfTheFlock
          registrationVisitTasksTemperature.taskId = this.tempTask.taskId
          registrationVisitTasksTemperature.visitId = this.visitIDnew
          registrationVisitTasksTemperature.measure = this.measureTemp
          registrationVisitTasksTemperature.breedId = this.breedId
          // Invoking service
          this.VisitService.createRegistrationVisitTasks(
            registrationVisitTasksTemperature,
          ).subscribe((data) => {
            this.messageTemp = data['response']
          })

          // humidity
          let registrationVisitTasksHumidity: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks
          registrationVisitTasksHumidity.ageFlock = this.ageOfTheFlock
          registrationVisitTasksHumidity.taskId = this.humidityTask.taskId
          registrationVisitTasksHumidity.visitId = this.visitIDnew
          registrationVisitTasksHumidity.measure = this.measureHumidity
          registrationVisitTasksHumidity.breedId = this.breedId
          //Invoking service
          this.VisitService.createRegistrationVisitTasks(
            registrationVisitTasksHumidity,
          ).subscribe((data) => {
            this.messageHumidity = data['response']
          })

          // air speed
          let registrationVisitTasksAirSpeedTask: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks
          registrationVisitTasksAirSpeedTask.ageFlock = this.ageOfTheFlock
          registrationVisitTasksAirSpeedTask.taskId = this.airSpeedTask.taskId
          registrationVisitTasksAirSpeedTask.visitId = this.visitIDnew
          registrationVisitTasksAirSpeedTask.measure = this.measureAirSpeed
          registrationVisitTasksAirSpeedTask.breedId = this.breedId
          // Invoking service
          this.VisitService.createRegistrationVisitTasks(
            registrationVisitTasksAirSpeedTask,
          ).subscribe((data) => {
            this.messageAirSpeed = data['response']
          })

          // amoniac
          let registrationVisitTasksAmoniacTask: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks
          registrationVisitTasksAmoniacTask.ageFlock = this.ageOfTheFlock
          registrationVisitTasksAmoniacTask.taskId = this.amoniacTask.taskId
          registrationVisitTasksAmoniacTask.visitId = this.visitIDnew
          registrationVisitTasksAmoniacTask.measure = this.measureAmoniac
          registrationVisitTasksAmoniacTask.breedId = this.breedId
          // Invoking service
          this.VisitService.createRegistrationVisitTasks(
            registrationVisitTasksAmoniacTask,
          ).subscribe((data) => {
            var x = sessionStorage.setItem(
              'visitId',
              registrationVisitTasksAmoniacTask.visitId,
            )
            this.messageAmoniac = data['response']
          })
          // feedConsumption
          let registrationVisitTasksfeedConsumptiont: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks
          registrationVisitTasksfeedConsumptiont.ageFlock = this.ageOfTheFlock
          registrationVisitTasksfeedConsumptiont.taskId = this.feedConsumptionTask.taskId
          registrationVisitTasksfeedConsumptiont.visitId = this.visitIDnew
          registrationVisitTasksfeedConsumptiont.measure = this.measurefeedConsumption
          this.calculpercentage =
            (this.measurefeedConsumption * 25 * 1000) / this.birdsNumber
          registrationVisitTasksfeedConsumptiont.percentage = this.calculpercentage
          registrationVisitTasksfeedConsumptiont.breedId = this.breedId

          // Invoking service
          this.VisitService.createRegistrationVisitTasks(
            registrationVisitTasksfeedConsumptiont,
          ).subscribe((data) => {
            this.messagefeedConsumption = data['response']
          })

          // weight
          //console.log('weightTask.taskId' + this.weightTask.taskId)
          let registrationVisitTasksWeight: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks
          registrationVisitTasksWeight.ageFlock = this.ageOfTheFlock
          registrationVisitTasksWeight.taskId = this.weightTask.taskId
          registrationVisitTasksWeight.visitId = this.visitIDnew
          registrationVisitTasksWeight.measure = this.measureWeight
          registrationVisitTasksWeight.breedId = this.breedId
          // Invoking service
          this.VisitService.createRegistrationVisitTasks(
            registrationVisitTasksWeight,
          ).subscribe((data) => {
            this.messageWeight = data['response']
          })

          //homogenité
          let registrationVisitTaskshomognite: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks
          registrationVisitTaskshomognite.ageFlock = this.ageOfTheFlock
          registrationVisitTaskshomognite.taskId = this.homogeneityFlockTask.taskId
          registrationVisitTaskshomognite.visitId = this.visitIDnew
          registrationVisitTaskshomognite.measure = this.cv
          this.VisitService.createRegistrationVisitTasks(
            registrationVisitTaskshomognite,
          ).subscribe((data) => {
            this.messageHomogeneity = data['response']
          })


          // WaterConsumption
          let registrationVisitTasksWaterConsumption: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks
          registrationVisitTasksWaterConsumption.ageFlock = this.ageOfTheFlock
          registrationVisitTasksWaterConsumption.taskId = this.waterConsumptionTask.taskId
          registrationVisitTasksWaterConsumption.visitId = this.visitIDnew
          registrationVisitTasksWaterConsumption.measure = this.measureWaterConsumption
          this.calculpercentageWater =
            (this.measureWaterConsumption * 1000000) / this.birdsNumber
          registrationVisitTasksWaterConsumption.percentage = this.calculpercentageWater
          registrationVisitTasksWaterConsumption.breedId = this.breedId
          // Invoking service
          this.VisitService.createRegistrationVisitTasks(
            registrationVisitTasksWaterConsumption,
          ).subscribe((data) => {
            this.messageWaterConsumption = data['response']
          })

          //Mortality
          let registrationVisitTasksMortality: IRegistrationVisitTasks = new Object() as IRegistrationVisitTasks
          registrationVisitTasksMortality.ageFlock = this.ageOfTheFlock
          registrationVisitTasksMortality.taskId = this.mortalityTask.taskId
          registrationVisitTasksMortality.visitId = this.visitIDnew
          registrationVisitTasksMortality.measure = this.measureMortality
          this.calculpercentage =
            (this.measureMortality * 100) / this.birdsNumberDay0
          registrationVisitTasksMortality.percentage = this.calculpercentage
          registrationVisitTasksMortality.breedId = this.breedId
          // Invoking service
          this.VisitService.createRegistrationVisitTasks(
            registrationVisitTasksMortality,
          ).subscribe((data) => {
            this.messageMortality = data['response']
          })
        }
        let totale = this.flockNumber - this.measureMortality

        this.FlockService.updateRestNumberFlock(
          this.flockID,
          this.flockNumber - this.measureMortality,
        ).subscribe((data) => {
          //console.log('success  ' + data['response'])
        })
        /*if (
          this.messageTemp &&
          this.messageHumidity &&
          this.messageWeight &&
          this.messageAirSpeed &&
          this.messageAmoniac &&
          this.messagefeedConsumption &&
          this.messageWaterConsumption &&
          this.messageMortality == 'OK'
        ) {
          console.log('////////////////')
        }*/

        this.showResult(this.visitIDnew)
      },
    )

    //  this.exampleForm.reset();
  }
  //button save
  submitAll(): void {
    this.submit()
  }
  // Reset the form after 'Annuler' Button clicked
  @ViewChild('myForm') formValues
  clearTheForm() {
    this.formValues.resetForm()
  }
  // result Management!
  resultOpened: boolean = false

  //visit initialization
  initVisit(): void {
    // this.visitDate = new Date();
    this.visitDate = this.reverseDate('yyyy-MM-DD', new Date())
    this.measureTemp = null
    this.farmID = ''
    this.measureHumidity = null
    this.measureAirSpeed = null
    this.measureAmoniac = null
    this.measurelightIntensity = null
    this.measurefeedConsumption = null
    this.measureWaterConsumption = null
    this.measureMortality = null
    this.measureDensity = null
    this.measureWeight = null
    this.measureHomogeneity = null
    this.resultOpened = false
    this.startOfCycle = null
    this.breeddescription = ''
    this.hatchDate = null
    this.ageOfTheFlock = null
    this.chikedPlaced = null
    this.psOrigin = null
    this.flockID = null
    this.houseId = null
    this.show = false
    this.show = false
    this.houses = []
    this.centers = []
    this.flocks = []
    this.ListComponenet.refresh()
    //console.log('show' + this.show)
  }
  //tasks results initialization
  initResults(): void {
    this.measureTemResult = ''
    this.standardTemResult = ''
    this.deviationTemResult = ''
    this.measureHumResult = ''
    this.standardHumResult = ''
    this.deviationHumResult = '' 
    this.measureAirSResult = ''
    this.standardAirSResult = ''
    this.deviationAirSResult = ''
    this.measureAmoResult = ''
    this.standardAmoResult = ''
    this.deviationAmoResult = ''
    this.measureLighIResult = ''
    this.standardLighIResult = ''
    this.deviationLighIResult = ''
    this.measureFeedCResult = ''
    this.standardFeedCResult = ''
    this.deviationFeedCResult = ''
    this.measureFeedCResult = ''
    this.standardFeedCResult = ''
    this.deviationFeedCResult = ''
    this.percentageFeedCResult = ''
    this.measureWatCResult = ''
    this.standardWatCResult = ''
    this.deviationWatCResult = ''
    this.percentageWatCResult = ''
    this.measureMortResult = ''
    this.percentageMortResult = ''
    this.standardMortResult = ''
    this.deviationMortResult = ''
    this.measureLittCResult = ''
    this.standardLittCResult = ''
    this.deviationLittCResult = ''
    this.measureDensResult = ''
    this.standardDensResult = ''
    this.deviationDensResult = ''
    this.measureWeightResult = ''
    this.standardWeightResult = null
    this.deviationWeightResult = ''
    this.measureHomogResult = ''
    this.standardHomogResult = ''
    this.deviationHomogResult = ''
  }
  //weight initialization
  initWeight(): void {
    this.weightMeasure = null
    this.measureWeight = null
    this.nbrbirds = null
  }
  //open tasks Results  after save
  showResult(id): void {
    this.resultOpened = true
    // visit result by visit ID
    //console.log('idVisit for result ' + this.visitIDnew)
    this.subs.add(
      this.VisitService.getConsultingvisitID(this.visitIDnew).subscribe(
        (visittasks) => {
          this.visittasks.forEach((element) => {
            //console.log('visitTasks element => ', element.standard)
          })
          //console.log('visitTasks Result' + visittasks)
          for (let i = 0; i < visittasks.length; i++) {
            /*console.log('controle' + visittasks[i])
            console.log('controleID *' + visittasks[i].measure)
            console.log(
              'controleDescroption *' + visittasks[i].task.description,
            )*/
            if (visittasks[i].taskId == 1) {
              //console.log('ok1')
              this.measureTemResult = visittasks[i].measure
              this.standardTemResult = visittasks[i].standard
              this.deviationTemResult = visittasks[i].deviation
              /*console.log('measureTemResult' + this.measureTemResult)
              console.log('standardTemResult' + this.standardTemResult)
              console.log('deviationTemResult' + this.deviationTemResult)*/
            } else if (visittasks[i].taskId == 2) {
              //console.log('ok2')
              this.measureHumResult = visittasks[i].measure
              this.standardHumResult = visittasks[i].standard
              this.deviationHumResult = visittasks[i].deviation
              /*console.log('measureHumResult' + this.measureHumResult)
              console.log('standardHumResult' + this.standardHumResult)
              console.log('deviationHumResult' + this.deviationHumResult)*/
            } else if (visittasks[i].taskId == 3) {
              //console.log('ok3')
              this.measureAirSResult = visittasks[i].measure
              this.standardAirSResult = visittasks[i].standard
              this.deviationAirSResult = visittasks[i].deviation
              /*console.log('measureAirSResult' + this.measureAirSResult)
              console.log('standardAirSResult' + this.standardAirSResult)
              console.log('deviationAirSResult' + this.deviationAirSResult)*/
            } else if (visittasks[i].taskId == 4) {
              //console.log('ok4')
              this.measureAmoResult = visittasks[i].measure
              this.standardAmoResult = '< ' + visittasks[i].standard
              this.deviationAmoResult = visittasks[i].deviation
              /*console.log('measureAmoResult' + this.measureAmoResult)
              console.log('standardAmoResult' + this.standardAmoResult)
              console.log('deviationAmoResult' + this.deviationAmoResult)*/
            } else if (visittasks[i].taskId == 5) {
              this.measureLighIResult = visittasks[i].measure
              this.standardLighIResult = visittasks[i].standard
              this.deviationLighIResult = visittasks[i].deviation
              /*console.log('measureLighIResult' + this.measureLighIResult)
              console.log('standardLighIResult' + this.standardLighIResult)
              console.log('deviationLighIResult' + this.deviationLighIResult)*/
            } else if (visittasks[i].taskId == 6) {
              this.measureFeedCResult = visittasks[i].measure
              this.standardFeedCResult = visittasks[i].standard
              this.deviationFeedCResult = visittasks[i].deviation
              this.percentageFeedCResult = visittasks[i].percentage.toFixed(2)
              /*console.log('measureFeedCResult' + this.measureFeedCResult)
              console.log('standardFeedCResult' + this.standardFeedCResult)
              console.log('deviationFeedCResult' + this.deviationFeedCResult)
              console.log('percentageFeedCResult' + this.percentageFeedCResult)*/
            } else if (visittasks[i].taskId == 7) {
              this.measureWatCResult = visittasks[i].measure
              this.standardWatCResult = visittasks[i].standard
              this.deviationWatCResult = visittasks[i].deviation
              this.percentageWatCResult = visittasks[i].percentage.toFixed(2)
             /* console.log('measureWatCResult' + this.measureWatCResult)
              console.log('percentageWatCResult' + this.percentageWatCResult)
              console.log('standardWatCResult' + this.standardWatCResult)
              console.log('deviationWatCResult' + this.deviationWatCResult)*/
            } else if (visittasks[i].taskId == 8) {
              this.measureMortResult = visittasks[i].measure
              this.standardMortResult = visittasks[i].standard
              this.deviationMortResult = visittasks[i].deviation
              this.percentageMortResult = visittasks[i].percentage.toFixed(2)
              /*console.log('measureMortResult' + this.measureMortResult)
              console.log('percentageMortResult' + this.percentageMortResult)
              console.log('standardMortResult' + this.standardMortResult)
              console.log('deviationMortResult' + this.deviationMortResult)*/
            } else if (visittasks[i].taskId == 9) {
              this.measureLittCResult = visittasks[i].measure
              this.standardLittCResult = visittasks[i].standard
              this.deviationLittCResult = visittasks[i].deviation
              /*console.log('measureLittCResult' + this.measureLittCResult)
              console.log('standardLittCResult' + this.standardLittCResult)
              console.log('deviationLittCResult' + this.deviationLittCResult)*/
            } else if (visittasks[i].taskId == 10) {
              this.measureDensResult = visittasks[i].measure
              this.standardDensResult = visittasks[i].standard
              this.deviationDensResult = visittasks[i].deviation
              /*console.log('measureDensResult' + this.measureDensResult)
              console.log('standardDensResult' + this.standardDensResult)
              console.log('deviationDensResult' + this.deviationDensResult)*/
            } else if (visittasks[i].taskId == 11) {
              //console.log('ok11')
              this.measureWeightResult = visittasks[i].measure
              this.standardWeightResult = visittasks[i].standard
              this.deviationWeightResult = visittasks[i].deviation
              /*console.log('measureWeightResult' + this.measureWeightResult)
              console.log('standardWeightResult' + this.standardWeightResult)
              console.log('deviationWeightResult' + this.deviationWeightResult)*/
            } else if (visittasks[i].taskId == 12) {
              this.measureHomogResult = visittasks[i].measure
              this.standardHomogResult = visittasks[i].standard
              this.deviationHomogResult = visittasks[i].deviation
              /*console.log('measureHomogResult' + this.measureHomogResult)
              console.log('standardHomogResult' + this.standardHomogResult)
              console.log('deviationHomogResult' + this.deviationHomogResult )*/
            }
          }
        },
      ),
    )
  }
}
