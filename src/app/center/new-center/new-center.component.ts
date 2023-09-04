import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { AutofocusDirective } from 'src/app/shared/autofocus.directive'
import {
  Center,
  IRegistrationCompany,
  IRegistrationFarms,
  IRegistrationHouses,
  IRegistrationUsers,
} from 'src/app/shared/registration'
import { SubSink } from 'subsink/dist/subsink'
import { FarmService } from '../../services/farm.service'
import { CompanyService } from '../../services/company.service'
import { ToastrService } from 'ngx-toastr'
import { ListCenterComponent } from '../list-center/list-center.component'
@Component({
  selector: 'app-new-center',
  templateUrl: './new-center.component.html',
  styleUrls: ['./new-center.component.css'],
})
export class NewCenterComponent implements OnInit {
  @Output() refreshList = new EventEmitter();
  constructor(
    private FarmService: FarmService,
    private CompanyService: CompanyService,
    private http: HttpClient,
    private toaster: ToastrService,
    private listCenter: ListCenterComponent
  ) {}
  percentDone: number
  uploadSuccess: boolean
  subs: SubSink = new SubSink()
  // Properties farm to Form Fields

  manager: IRegistrationUsers
  managers: IRegistrationUsers
  companydata: IRegistrationCompany
  companies: IRegistrationCompany[]
  // Spinner display farm
  loading: boolean
  farm = new Object() as IRegistrationFarms
  Name: string = ''
  companyID: string
  centerId: string
  housesNumber: number
  centerName: string
  address: string
  breed: string
  productionDensity: string
  zone: string
  centerManagerName: string
  centerManagerEmail: string
  centerManagerTel: string
  nutritionSupervisor: string
  sanitarySupervisor: string
  bridsNumberPerHouse: number
  centerMultiage: string
  avMortalityPerFlock: number
  avWaterConsumption: number
  avFeedConsumption: number
  eggProduction: number
  avFcr: number
  avEef: number
  mainDiseases: string
  species: string
  farmId: string
  companyId: string
  farms: []
  message: string = null
  dangerMsg: string = null
  ngOnInit() {
    this.companyId=localStorage.getItem("companyID")
    this.subs.add(
      this.FarmService. getConsultingFarm(this.companyId).subscribe((data) => {
        this.farms = data
      }),
    )
  }
  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective

  show = false

  open() {
    this.show = true
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
  getCompanyId(event) {
    this.companyID = event
  }
  getFarmId(event) {
    this.farmId = event
  }
  // farm creation
  submit(): void {
    // Show the spinner for loading process ....
    setTimeout((_) => (this.loading = true))
    let center: Center = new Object() as Center
    center.companyId = this.companyId
    center.centerName = this.centerName
    center.address = this.address
    center.breed = this.breed
    center.productionDensity = this.productionDensity
    center.zone = this.zone
    center.centerManagerName = this.centerManagerName
    center.housesNumber = this.housesNumber
    center.centerManagerName = this.centerManagerName
    center.centerManagerEmail = this.centerManagerEmail
    center.centerManagerTel = this.centerManagerTel
    center.nutritionSupervisor = this.nutritionSupervisor
    center.sanitarySupervisor = this.sanitarySupervisor
    center.bridsNumberPerHouse = this.bridsNumberPerHouse
    center.avMortalityPerFlock = this.avMortalityPerFlock
    center.avWaterConsumption = this.avWaterConsumption
    center.eggProduction = this.eggProduction
    center.avFcr = this.avFcr
    center.avEef = this.avEef
    center.mainDiseases = this.mainDiseases
    center.species = this.species
    center.centerMultiage = this.centerMultiage
    center.farmId = this.farmId
    center.avFeedConsumption = this.avFeedConsumption
    // Invoking service
    this.FarmService.createCenter(center).subscribe((data) => {
      if (data['response'] == 'OK') {
        this.clearTheForm()
          this.show=false
          this.toaster.success('Success', 'Successfully added')
          this.listCenter.ngOnInit()
        
      } else {
        this.toaster.error('Error', 'Operation failed')
      }
    })
  }
  cleanForm() {
    window.location.reload()
    this.centerName = ''
    this.address = ''
    this.breed = ''
    this.productionDensity = ''
    this.zone = ''
    this.centerManagerName = ''
    this.housesNumber = null
    this.centerManagerName = ''
    this.centerManagerEmail = ''
    this.centerManagerTel = null
    this.nutritionSupervisor = null
    this.sanitarySupervisor = null
    this.bridsNumberPerHouse = null
    this.avMortalityPerFlock = null
    this.avWaterConsumption = null
    this.eggProduction = null
    this.avFcr = null
    this.avEef = null
    this.mainDiseases = null
    this.species = null
    this.centerMultiage = null
    this.farmId = null
    this.avFeedConsumption = null
  }
  // Reset the form after 'Annuler' Button clicked
  @ViewChild('myForm') formValues
  clearTheForm() {
    this.formValues.resetForm()
  }
}
