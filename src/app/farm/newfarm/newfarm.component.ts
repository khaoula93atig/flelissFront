import { Component, OnInit, ViewChild } from '@angular/core'
import { FarmService } from '../../services/farm.service'
import {
  IRegistrationFarms,
  IRegistrationUsers,
  IRegistrationCompany,
} from '../../shared/registration'
import {
  HttpEventType,
  HttpResponse,
  HttpClient,
} from '../../../../node_modules/@angular/common/http'
import { AutofocusDirective } from '../../shared/autofocus.directive'

import { SubSink } from 'subsink'
import { CompanyService } from '../../services/company.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-newfarm',
  templateUrl: './newfarm.component.html',
  styleUrls: ['./newfarm.component.css'],
})
export class NewfarmComponent implements OnInit {
  constructor(
    private FarmService: FarmService,
    private CompanyService: CompanyService,
    private http: HttpClient,
    private toaster: ToastrService
  ) {}
  percentDone: number
  uploadSuccess: boolean
  subs: SubSink = new SubSink()

  managers: IRegistrationUsers
  companydata: IRegistrationCompany
  companies: IRegistrationCompany[]
  // Spinner display farm
  loading: boolean
  farm = new Object() as IRegistrationFarms
  Name: string = ''

  farmId: string
  farmName: string
  address: string
  housesNumber: number
  area: string
  breed: string
  typeProduction: string // Broilers     Pullets   Laying hens   breeders
  farmManageName: string
  farmManageEmail: string
  farmManageTel: string
  companyID: string

  bridsNumberPerCenter: number
  numberCenter: number
  result: string
  fcr: number
  epef: number
  avMortalityRate: number
  avLayRate: number
  rotation: number
  zone: string
  productionDensity: string

  ngOnInit() {
    this.subs.add(
      this.CompanyService.getConsultingCompany().subscribe((data) => {
        this.companies = data
      }),
    )
  }
  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective

  show = false

  open() {
    this.show = true
    // clone the user (we don't want to modify the original in the dialog)
    console.log('ok')
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
    console.log('ok3')
    if (event.keyCode === 13) {
    }
  }

  onSubmit() {}
  getCompanyId(event) {
    this.companyID = event
  }

  // farm creation
  submit(): void {
    // Show the spinner for loading process ....
    setTimeout((_) => (this.loading = true))

    let registrationFarm: IRegistrationFarms = new Object() as IRegistrationFarms

    registrationFarm.address = this.address
    registrationFarm.farmName = this.farmName
    registrationFarm.housesNumber = this.housesNumber
    registrationFarm.address = this.address
    registrationFarm.area = this.area
    registrationFarm.breed = this.breed
    registrationFarm.typeProduction = this.typeProduction
    registrationFarm.farmManageName = this.farmManageName
    registrationFarm.farmManageEmail = this.farmManageEmail
    registrationFarm.farmManageTel = this.farmManageTel
    registrationFarm.companyID = this.companyID
    registrationFarm.bridsNumberPerCenter = this.bridsNumberPerCenter
    registrationFarm.numberCenter = this.numberCenter
    registrationFarm.result = this.result
    registrationFarm.avLayRate = this.avLayRate
    registrationFarm.avMortalityRate = this.avMortalityRate
    registrationFarm.fcr = this.fcr
    registrationFarm.epef = this.epef
    registrationFarm.rotation = this.rotation
    // Invoking service
    this.FarmService.createRegistrationFarms(registrationFarm).subscribe(
      (data) => {
        if (data['response'] == 'OK') {
          this.clearTheForm()
          this.show=false
          this.toaster.success('Success', 'Successfully added')
        } else {
          this.toaster.error('Error', 'Operation failed')
        }
        /*setTimeout((_) => (this.loading = false))
        this.FarmService.askForReload(true)

        this.clearTheForm()*/
      },
    )
  }
  getproductionType(event) {
    this.typeProduction = event
  }
  // Reset the form after 'Annuler' Button clicked
  @ViewChild('myForm') formValues
  clearTheForm() {
    this.formValues.resetForm()
  }
}
