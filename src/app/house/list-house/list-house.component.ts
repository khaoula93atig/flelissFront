import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core'
import {
  IRegistrationHouses,
  IRegistrationFarms,
  IRegistrationFlocks,
} from '../../shared/registration'
import { HouseService } from '../../services/house.service'
import {
  ClrDatagridStringFilterInterface,
  ClrDatagridFilterInterface,
  ClrDatagrid,
} from '@clr/angular'
import { Subject } from 'rxjs'
import { Router } from '@angular/router'
import { SubSink } from 'subsink'
import { NewHouseComponent } from '../new-house/new-house.component'
import { FlockService } from '../../services/flock.service'
import { DatePipe } from '@angular/common'
import { FlockReportComponent } from '../flock-report/flock-report.component'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css'],
})
export class ListHouseComponent implements OnInit {
  flocks: any[] = []
  flock: any[] = []
  ID: string = ''
  // Layout set up boolean properties
  edit_mode: boolean = false
  create_mode: boolean = false
  // Reference to the included DataGrid showing the different sectors
  @ViewChild(ClrDatagrid) dg: ClrDatagrid
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef
  files = []
  subs: SubSink = new SubSink()
  id: any[] = []
  houses: any[] = []
  house: any[] = []
  breeds: any[] = []
  agreement: any[] = []
  loading: boolean = true
  urlAgreement: string = ''
  basic: boolean
  houseIddetail: string
  breedId: number
  flockNumber: number
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

  // Properties Flock to Form Fields
  flockID: string
  houseIdforflock: string
  breed: number
  cycle: number
  startOfCycle: string
  startOfCycle2: string
  hatchDate: string
  chikedPlaced: number
  psOrigin: string
  checkEndOfCycle: boolean
  disabledCheck: boolean
  endOfCycle: Date = new Date()
  flockName: string
  existsFlocks: any[] = []
  outgoFlocks: any[] = []
  constructor(
    private HouseService: HouseService,
    private router: Router,
    private FlockService: FlockService,
    private datepipe: DatePipe,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.refresh()
  }
  refresh() {
    //get house by farm id
    var farmID = sessionStorage.getItem('farmID')
    this.subs.add(
      this.HouseService.getConsultingHouse(farmID).subscribe((data) => {
        this.houses = data

        this.loading = false
      }),
    )
    this.subs.add(
      this.HouseService.getConsultingBreed().subscribe((data) => {
        this.breeds = data
      }),
    )
  }
  refreshDataFlockGrid() {
    //get flock by house id
    this.subs.add(
      this.FlockService.getConsultingHouse(this.houseIddetail).subscribe(
        (data) => {
          this.flocks = data
          this.loading = false
        },
      ),
    )
  }
  //get Breed
  getBreed(event) {
    this.breedId = event
  }
  onDetailOpen(event) {
    this.house=event
    console.log(event)
    this.existsFlocks = []
    this.outgoFlocks = []
    if (event != null && event != undefined) {
      this.houseIddetail = event.houseId
      //get flock by house id
      this.subs.add(
        this.FlockService.getConsultingHouse(this.houseIddetail).subscribe(
          (data) => {
            this.flocks = data
            this.loading = false
            for (let flo of this.flocks) {
              if (flo.checkEndOfCycle == true) {
                this.outgoFlocks.push(flo)
              } else {
                this.existsFlocks.push(flo)
              }
            }
          },
        ),
      )
    }
  }
  refreshFlock(event) {
    if (event != null && event != undefined) {
      this.houseIddetail = event
      //get flock by house id
      this.subs.add(
        this.FlockService.getConsultingHouse(this.houseIddetail).subscribe(
          (data) => {
            this.flocks = data
            this.loading = false
          },
        ),
      )
    }
  }

  //substr houseId
  gethouse_id(id: string) {
    return id.substr(10, id.length)
  }
  //update house
  sauvegarder(detail) {
    this.subs.add(this.HouseService.save(detail).subscribe((data) => {}))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  showCreatePanel() {
    // We display editor panel with the selected Sector
    this.create_mode = true
    this.edit_mode = false
    setTimeout(() => this.dg.resize())
  }
  hideCreatePanel() {
    // We hide the editor panel
    this.create_mode = false
    setTimeout(() => this.dg.resize())
  }

  // house Management!
  houseManagerOpened: boolean = false
  showhouseManager(): void {
    this.houseManagerOpened = true
  }

  // Flock Management!
  FlockManagerOpened: boolean = false
  showFlockManager(detail): void {
    this.FlockManagerOpened = true
    this.houseIdforflock = detail.houseId
  }

  //getSelectedventilation
  getventilationSelect(event) {
    this.ventilation = event
  }
  //getSelectedWater
  getWaterSelect(event) {
    this.waterSource = event
  }
  // House creation
  submit(): void {
    // Show the spinner for loading process ....
    setTimeout((_) => (this.loading = true))
    var x = sessionStorage.getItem('farmID')
    let registrationHouse: IRegistrationHouses = new Object() as IRegistrationHouses
    registrationHouse.birdsNumber = this.birdsNumber
    registrationHouse.address = this.address
    registrationHouse.farmID = x
    // Find out from the list of types which one corresponding to the selected Code
    for (let i of this.houses) {
      if (i.id == this.farmID) {
        this.Farm = i
        break
      }
    }
    registrationHouse.Farm = this.Farm

    // Invoking service
    this.HouseService.createRegistrationHouses(registrationHouse).subscribe(
      (data) => {
        setTimeout((_) => (this.loading = false))
        this.HouseService.askForReload(true)

        this.clearTheForm()
      },
    )
  }
  // Reset the form after 'Annuler' Button clicked
  @ViewChild('myForm') formValues
  clearTheForm() {
    this.formValues.resetForm()
  }
  //popup new house
  @ViewChild(NewHouseComponent) modal: NewHouseComponent
  //open flock report
  @ViewChild(FlockReportComponent) modalReport: FlockReportComponent
  ngAfterViewInit(): void {}

  // Weight Management!
  updateOpened: boolean = false
  updtateHouse: IRegistrationHouses = new Object() as IRegistrationHouses

  showupdate(house: any): void {
    this.updateOpened = true
    this.houseId = house.houseId
    this.birdsNumber = house.birdsNumber
    this.ventilation = house.ventilation
    this.density = house.density
    this.waterSource = house.waterSource
    this.nbrCyclesPerYear = house.nbrCyclesPerYear
    this.durationOfRotation = house.durationOfRotation
    this.area = house.area
    this.feeder = house.feeder
  }
  //update house
  saveupdate() {
    this.updtateHouse.houseId = this.houseId
    this.updtateHouse.birdsNumber = this.birdsNumber
    this.updtateHouse.ventilation = this.ventilation
    this.updtateHouse.density = this.density
    this.updtateHouse.waterSource = this.waterSource
    this.updtateHouse.area = this.area
    this.updtateHouse.feeder = this.feeder
    this.updtateHouse.durationOfRotation=this.durationOfRotation
    this.updtateHouse.nbrCyclesPerYear=this.nbrCyclesPerYear
    this.subs.add(
      this.HouseService.save(this.updtateHouse).subscribe((data) => {
        if (data['response'] == 'OK') {
          this.toaster.success('Success', 'Successfully added')
          this.refresh()
        } else {
          this.toaster.error('Error', 'Operation failed')
        }

      }),
    )
  }
  // flock creation
  submitFlock(): void {
    // Show the spinner for loading process ....
    setTimeout((_) => (this.loading = true))
    let registrationFlock: IRegistrationFlocks = new Object() as IRegistrationFlocks
    registrationFlock.breed = this.breedId
    registrationFlock.chikedPlaced = this.chikedPlaced
    registrationFlock.cycle = this.cycle
    registrationFlock.hatchDateString = this.hatchDate
    registrationFlock.houseId = this.houseIdforflock
    registrationFlock.psOrigin = this.psOrigin
    registrationFlock.startOfCycleString = this.startOfCycle
    registrationFlock.flockNumber = this.flockNumber
    registrationFlock.checkEndOfCycle = false
    registrationFlock.flockName = this.flockName
    registrationFlock.farmId = sessionStorage.getItem('farmID')
    // Invoking service
console.log(registrationFlock)
    this.FlockService.createRegistrationFlocks(registrationFlock).subscribe(
      (data) => {
        if (data['response'] == 'OK') {
          console.log(this.houseIddetail)
          this.FlockManagerOpened = false
          this.toaster.success('Success', 'Successfully added')
          //this.refreshDataFlockGrid()
          /*setTimeout((_) => (this.loading = false))
          this.FlockService.askForReload(true)*/

          // We clear the form!
          this.clearTheForm()
          this.onDetailOpen(this.house)
          this.refreshDataFlockGrid()
          this.refresh()
        }
        else{
          this.toaster.error('Error', 'Operation failed')
        }
      },
    )
    
  }
  //show updated flock
  updateflockOpened: boolean = false
  updtateFlock: IRegistrationFlocks = new Object() as IRegistrationFlocks
  showupdateflock(flock: any): void {
    this.updateflockOpened = true
    this.flockID = flock.flockID
    this.breed = flock.breed
    this.cycle = flock.cycle
    this.chikedPlaced = flock.chikedPlaced
    this.psOrigin = flock.psOrigin
    this.hatchDate = this.datepipe.transform(flock.hatchDate, 'MM/dd/yyyy')
    this.startOfCycle = this.datepipe.transform(
      flock.startOfCycle,
      'MM/dd/yyyy',
    )
    this.checkEndOfCycle = flock.checkEndOfCycle
    this.disabledCheck = flock.checkEndOfCycle
    this.endOfCycle = flock.endOfCycle
    this.flockNumber = flock.flockNumber
    this.flockName = flock.flockName
  }
  //save updated flock
  saveupdateFlock() {
    this.updtateFlock.flockID = this.flockID
    this.updtateFlock.breed = this.breed
    this.updtateFlock.cycle = this.cycle
    this.updtateFlock.chikedPlaced = this.chikedPlaced
    this.updtateFlock.psOrigin = this.psOrigin
    this.updtateFlock.hatchDateString = this.hatchDate
    this.updtateFlock.startOfCycleString = this.startOfCycle
    this.updtateFlock.checkEndOfCycle = this.checkEndOfCycle
    this.updtateFlock.flockNumber = this.flockNumber
    this.updtateFlock.endOfCycle = this.endOfCycle
    this.updtateFlock.flockName = this.flockName
    this.subs.add(
      this.FlockService.save(this.updtateFlock).subscribe((data) => {
        if (data['response'] == 'OK') {
          console.log(this.houseIddetail)
          this.FlockManagerOpened = false
          this.toaster.success('Success', 'Successfully updated')
          this.clearTheForm()
          this.onDetailOpen(this.house)
        }
        else{
          this.toaster.error('Error', 'Operation failed')
        }
      }),
    )
    if (this.checkEndOfCycle == true) {
      this.modalReport.openModel(this.flockID)
    }
    //this.refreshDataFlockGrid()
    //this.onDetailOpen(this.houseId)
  }
}
