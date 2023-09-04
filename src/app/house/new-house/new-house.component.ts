import { Component, OnInit, ViewChild } from '@angular/core'
import { HouseService } from '../../services/house.service'
import { ListHouseComponent } from '../../house/list-house/list-house.component'
import {
  IRegistrationHouses,
  IRegistrationFarms,
} from '../../shared/registration'
import { environment } from '../../../environments/environment'

import {
  HttpEventType,
  HttpResponse,
  HttpClient,
} from '../../../../node_modules/@angular/common/http'
import { AutofocusDirective } from 'src/app/shared/autofocus.directive'
import { NgForm } from '@angular/forms'
import { SubSink } from 'subsink'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.component.html',
  styleUrls: ['./new-house.component.css'],
})
export class NewHouseComponent implements OnInit {
  constructor(
    private HouseService: HouseService,
    private http: HttpClient,
    private ListComponenet: ListHouseComponent,
    private toaster: ToastrService
  ) {}

  percentDone: number
  uploadSuccess: boolean

  // Properties house to Form Fields
  houseId: string
  address: string
  farmID: string
  birdsNumber: string
  Farm: IRegistrationFarms
  Farms: IRegistrationFarms[]
  ventilation: string
  density: BigInteger
  waterSource: string
  area: BigInteger
  feeder: string
  nbrCyclesPerYear: BigInteger
  durationOfRotation: BigInteger
  // Spinner display farm
  loading: boolean
  farmId: string
  subs: SubSink = new SubSink()
  centers: any[] = []
  housesName: string
  centerId: string
  ngOnInit() {
    // Get farm
    this.HouseService.getfarm().subscribe(
      (data) => (this.Farms = data as IRegistrationFarms[]),
    )

    this.farmId = localStorage.getItem('farmID')
    console.log(this.farmId)
    this.subs.add(
      this.HouseService.getConsultingCenterbyFarm(this.farmId).subscribe(
        (data) => {
          this.centers = data
        },
      ),
    )
  }

  //popup new house
  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective

  show = false

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

  //getSelectedventilation
  getventilationSelect(event) {
    this.ventilation = event
  }
  //getSelectedWater
  getWaterSelect(event) {
    this.waterSource = event
  }
  getCenterId(event) {
    this.centerId = event
  }
  // house creation
  submit(): void {
    // Show the spinner for loading process ....
    setTimeout((_) => (this.loading = true))
    var x = localStorage.getItem('farmID')

    let registrationHouse: IRegistrationHouses = new Object() as IRegistrationHouses
    registrationHouse.birdsNumber = this.birdsNumber
    registrationHouse.ventilation = this.ventilation
    registrationHouse.density = this.density
    registrationHouse.waterSource = this.waterSource
    registrationHouse.area = this.area
    registrationHouse.feeder = this.feeder
    registrationHouse.nbrCyclesPerYear = this.nbrCyclesPerYear
    registrationHouse.durationOfRotation = this.durationOfRotation
    registrationHouse.farmID = x
    registrationHouse.houseName = this.housesName
    registrationHouse.centerId = this.centerId

    // Find out from the list of types which one corresponding to the selected Code
    for (let i of this.Farms) {
      if (i.id == this.farmID) {
        this.Farm = i
        break
      }
    }
    registrationHouse.Farm = this.Farm

    // Invoking service
    this.HouseService.createRegistrationHouses(registrationHouse).subscribe(
      (data) => {
        if (data['response'] == 'OK') {
          this.clearTheForm()
          this.show=false
          this.toaster.success('Success', 'Successfully added')
          this.HouseService.askForReload(true)

        // We clear the form!
        this.clearTheForm()
        this.ListComponenet.refresh()
          

        } else {
          this.toaster.error('Error', 'Operation failed')
        }

        
      },
    )
  }

  // Reset the form after 'Annuler' Button clicked
  @ViewChild('myForm') formValues
  clearTheForm() {
    this.formValues.resetForm()
  }
}
