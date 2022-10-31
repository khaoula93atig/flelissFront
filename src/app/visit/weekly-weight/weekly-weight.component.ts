import { array } from '@amcharts/amcharts5'
import { Component, OnInit, ViewChild } from '@angular/core'
import { AutofocusDirective } from 'src/app/shared/autofocus.directive'
import {
  DynamicGrid,
  WeeklyDynamicGrid,
  WeeklyWeightMeasurement,
} from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { HouseService } from '../../services/house.service'
import { VisitService } from '../../services/visit.service'

@Component({
  selector: 'app-weekly-weight',
  templateUrl: './weekly-weight.component.html',
  styleUrls: ['./weekly-weight.component.css'],
})
export class WeeklyWeightComponent implements OnInit {
  dynamicArray: Array<WeeklyDynamicGrid> = []
  newDynamic: any = {}
  week: number
  weightcalcul: number
  weightMeasure: number = 0
  nbrbirds: number
  measureWeight: any
  breed: number
  visitDate: string
  farmID: string
  subs: SubSink = new SubSink()
  centers: any[] = []
  centerId: string
  houses: any[] = []
  houseId: string
  flocks: any[] = []
  breeddescription: string
  breedId: number
  flockID: string
  compteur: number = 0
  succesMsg: string = null
  dangerMsg: string = null
  showDeviation: boolean = false
  disabledSave: boolean = true
  constructor(
    private HouseService: HouseService,
    private VisitService: VisitService,
  ) {}

  ngOnInit(): void {
    this.newDynamic = { week: this.week, weight: 0, nbr: 1 }
    this.dynamicArray.push(this.newDynamic)
    localStorage.setItem('getId', '') //store id
    //get all farm by company
    var companyID = sessionStorage.getItem('companyID')
    this.farmID = sessionStorage.getItem('farmID')
    this.subs.add(
      this.HouseService.getConsultingCenterbyFarm(this.farmID).subscribe(
        (data) => {
          console.log('data centers ******* ' + JSON.stringify(data))
          this.centers = data
        },
      ),
    )
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

  onSubmit() {
    console.log('ok2')
  }
  // Weight measurement
  addRow(index) {
    this.newDynamic = { week: this.week, weight: 0, nbr: index + 1 }
    this.dynamicArray.push(this.newDynamic)
    console.log(this.dynamicArray)
    this.compteur = index + 1
    console.log('    this.compteur' + this.compteur)
    return true
  }
  submitWeight(): void {
    for (var i = 0; i < this.dynamicArray.length; i++) {
      console.log('weight' + this.dynamicArray[i].weight.toString())
      //this.weightcalcul = this.dynamicArray[i].weight * this.dynamicArray[i].nbr;
      //this.weightMeasure += this.dynamicArray[i].weight;
      this.weightMeasure += parseFloat(this.dynamicArray[i].weight.toString())
      console.log(
        'this.dynamicArray[i].nbr.toString()' +
          this.dynamicArray[this.dynamicArray.length - 1].nbr.toString(),
      )
      this.nbrbirds = parseFloat(
        this.dynamicArray[this.dynamicArray.length - 1].nbr.toString(),
      )
    }

    this.weightMeasure = this.weightMeasure / this.nbrbirds
    if (
      this.centerId &&
      this.farmID &&
      this.houseId &&
      this.flockID &&
      this.week != null
    ) {
      for (let object of this.dynamicArray) {
        let weeklyWeightMeasurement: WeeklyWeightMeasurement = new Object() as WeeklyWeightMeasurement
        weeklyWeightMeasurement.centerId = this.centerId
        weeklyWeightMeasurement.farmId = this.farmID
        weeklyWeightMeasurement.houseId = this.houseId
        weeklyWeightMeasurement.flockId = this.flockID
        weeklyWeightMeasurement.flockNbr = object.nbr
        weeklyWeightMeasurement.weight = object.weight
        weeklyWeightMeasurement.average = this.weightMeasure
        weeklyWeightMeasurement.week = this.week
        weeklyWeightMeasurement.breed = this.breedId
        console.log(
          'weeklyWeightMeasurement ' + JSON.stringify(weeklyWeightMeasurement),
        )
        //Invoking service
        this.VisitService.saveWeeklyWeight(weeklyWeightMeasurement).subscribe(
          (data) => {
            if (data['response'] == 'OK') {
              console.log('  this.succesMsg ' + data['message'])
              //  setTimeout(_ => this.succesMsg = null, 30000);
              this.succesMsg = data['message']
              this.showDeviation = true
            } else {
              console.log('  this.succesMsg ' + data['message'])
              this.dangerMsg = data['message']
            }
          },
        )
      }
      this.initForm()
    }
    // this.Weightclosed = false;
  }
  getCenterId(event) {
    this.centerId = event
    this.subs.add(
      this.HouseService.getConsultingHouseByCenter(this.centerId).subscribe(
        (data) => {
          console.log('' + JSON.stringify(data))
          this.houses = data
        },
      ),
    )
  }
  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      return false
    } else {
      this.dynamicArray.splice(index, 1)

      return true
    }
  }
  getHouseId(event) {
    console.log('getSelectedhouse')
    console.log(event)
    this.houseId = event
    this.flocks = new Array()
    //get flock by house id
    console.log('house++++++++++++' + this.houseId)
    this.subs.add(
      this.VisitService.getConsultingFlock(this.houseId).subscribe((data) => {
        console.log('data flock' + data)
        for (let element of data) {
          if (element.checkEndOfCycle == false) this.flocks.push(element)
        }
      }),
    )
  }
  //get getSelectedFlock
  getflockID(event) {
    console.log('getSelectedflock')
    console.log(event)
    this.flockID = event
    this.subs.add(
      this.VisitService.getConsultingFlockbyId(this.flockID).subscribe(
        (data) => {
          console.log('data flock' + data)
          this.flocks = data

          for (let i of this.flocks) {
            // get breed
            if ((i.breed = i.breedObject.breedID)) {
              this.breeddescription = i.breedObject.description
              console.log('breeddescription' + this.breeddescription)
              this.breedId = i.breedObject.breedID
            }
          }
        },
      ),
    )
  }
  initForm() {
    this.dynamicArray = new Array()
    this.ngOnInit()
    this.breeddescription = ''
    this.week = null
    this.flockID = null
    this.houseId = null
    this.centerId = null
  }

  showButtonSave() {
    console.log('showButtonSave')
    if (
      this.centerId &&
      this.houseId &&
      this.flockID &&
      this.week != null &&
      this.dynamicArray.length >= 0
    ) {
      console.log('disabledSave')
      this.disabledSave = false
    }
  }
}
