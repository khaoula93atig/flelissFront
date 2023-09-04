import { Component, OnInit, ViewChild } from '@angular/core'
import { AutofocusDirective } from 'src/app/shared/autofocus.directive'
import { SubSink } from 'subsink'
import { FarmService } from '../../services/farm.service'
import { HouseService } from '../../services/house.service'
import { VisitService } from '../../services/visit.service'
import { VisitAuditsService } from '../../services/visit-audits.service'
import { ListVisitAuditsComponent } from '../list-visit-audits/list-visit-audits.component'

import {
  IRegistrationVisits,
  IRegistrationTask,
  IRegistrationVisitTasks,
  DynamicGrid,
  IRegistrationVisitAudits,
} from 'src/app/shared/registration'
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { ClrDatagrid } from '@clr/angular'

@Component({
  selector: 'app-new-visit-audits',
  templateUrl: './new-visit-audits.component.html',
  styleUrls: ['./new-visit-audits.component.css'],
})
export class NewVisitAuditsComponent implements OnInit {
  visitIDnew: string
  visitDate = this.datepipe.transform(new Date(), 'yyyy/MM/dd')
  // Spinner display visit
  loading: boolean
  subs: SubSink = new SubSink()
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
  farms: any[] = []
  houses: any[] = []
  house: any[] = []
  flocks: any[] = []
  House_id: any[] = []
  breeddescription: string
  username: string
  farmID: string
  houseId: string
  flockID: string
  birdsNumber: number
  birdsNumberDay0: number
  psOrigin: string
  ageOfTheFlock: any
  /*********Audits fields */
  Audit1Measure: boolean
  Audit2Measure: boolean
  Audit3Measure: boolean
  Audit4Measure: boolean
  Audit5Measure: boolean
  Audit6Measure: boolean
  Audit7Measure: boolean
  Audit8Measure: boolean
  Audit9Measure: boolean
  Audit10Measure: boolean
  Audit11Measure: boolean
  Audit12Measure: boolean
  Audit13Measure: boolean
  Audit14Measure: boolean
  Audit15Measure: boolean
  Audit16Measure: boolean
  Audit17Measure: boolean
  Audit18Measure: boolean
  Audit19Measure: boolean
  Audit20Measure: boolean
  Audit21Measure: boolean
  Audit22Measure: boolean
  Audit23Measure: boolean
  Audit24Measure: boolean
  Audit25Measure: boolean
  Audit26Measure: boolean
  Audit27Measure: boolean
  Audit28Measure: boolean
  Audit29Measure: boolean
  Audit30Measure: boolean
  Audit31Measure: boolean
  Audit32Measure: boolean
  Audit33Measure: boolean
  Audit34Measure: boolean
  Audit35Measure: boolean
  Audit36Measure: boolean
  Audit37Measure: boolean
  Audit38Measure: boolean
  Audit39Measure: boolean
  Audit40Measure: boolean
  Audit41Measure: boolean
  Audit42Measure: boolean
  Audit43Measure: boolean
  Audit44Measure: boolean
  Audit45Measure: boolean
  Audit46Measure: boolean
  Audit47Measure: boolean
  Audit48Measure: boolean
  Audit49Measure: boolean
  Audit50Measure: boolean
  Audit51Measure: boolean
  Audit52Measure: boolean
  Audit53Measure: boolean
  Audit54Measure: boolean
  Audit55Measure: boolean
  Audit56Measure: boolean
  Audit57Measure: boolean
  Audit58Measure: boolean
  Audit59Measure: boolean
  Audit60Measure: boolean
  Audit61Measure: boolean
  Audit62Measure: boolean
  Audit63Measure: boolean
  Audit64Measure: boolean
  Audit65Measure: boolean
  Audit66Measure: boolean
  Audit67Measure: boolean
  Audit68Measure: boolean
  Audit69Measure: boolean
  Audit70Measure: boolean
  Audit71Measure: boolean
  Audit72Measure: boolean
  Audit73Measure: boolean
  Audit74Measure: boolean
  Audit75Measure: boolean
  Audit76Measure: boolean
  constructor(
    private FarmService: FarmService,
    private VisitService: VisitService,
    private HouseService: HouseService,
    private datepipe: DatePipe,
    private VisitAuditsService: VisitAuditsService,
    private ListComponenet: ListVisitAuditsComponent,
  ) {}

  // Reference to the included DataGrid showing the different sectors
  @ViewChild(ClrDatagrid) dg: ClrDatagrid
  gethouse_id(id: string) {
    return id.substr(10, id.length)
  }
  /************Get event radio*************/
  getAudit1(event) {
    console.log('event 1' + event)
    this.Audit1Measure = event
  }
  getAudit2(event) {
    console.log('event 2' + event)
    this.Audit2Measure = event
  }
  getAudit3(event) {
    console.log('event 3' + event)
    this.Audit3Measure = event
  }
  getAudit4(event) {
    console.log('event 4' + event)
    this.Audit4Measure = event
  }
  getAudit5(event) {
    console.log('event 5' + event)
    this.Audit5Measure = event
  }
  getAudit6(event) {
    console.log('event 6' + event)
    this.Audit6Measure = event
  }
  getAudit7(event) {
    console.log('event 7' + event)
    this.Audit7Measure = event
  }
  getAudit8(event) {
    console.log('event 8' + event)
    this.Audit8Measure = event
  }
  getAudit9(event) {
    console.log('event 9' + event)
    this.Audit9Measure = event
  }
  getAudit10(event) {
    console.log('event 10' + event)
    this.Audit10Measure = event
  }
  getAudit11(event) {
    console.log('event 11' + event)
    this.Audit11Measure = event
  }
  getAudit12(event) {
    console.log('event 12' + event)
    this.Audit12Measure = event
  }
  getAudit13(event) {
    console.log('event 13' + event)
    this.Audit13Measure = event
  }
  getAudit14(event) {
    console.log('event 14' + event)
    this.Audit14Measure = event
  }
  getAudit15(event) {
    console.log('event 15' + event)
    this.Audit15Measure = event
  }
  getAudit16(event) {
    console.log('event 16' + event)
    this.Audit16Measure = event
  }
  getAudit17(event) {
    console.log('event 17' + event)
    this.Audit17Measure = event
  }
  getAudit18(event) {
    console.log('event 18' + event)
    this.Audit18Measure = event
  }
  getAudit19(event) {
    console.log('event 19' + event)
    this.Audit19Measure = event
  }
  getAudit20(event) {
    console.log('event 20' + event)
    this.Audit20Measure = event
  }
  getAudit21(event) {
    console.log('event 21' + event)
    this.Audit21Measure = event
  }
  getAudit22(event) {
    console.log('event 22' + event)
    this.Audit22Measure = event
  }
  getAudit23(event) {
    console.log('event 23' + event)
    this.Audit23Measure = event
  }
  getAudit24(event) {
    console.log('event 24' + event)
    this.Audit24Measure = event
  }
  getAudit25(event) {
    console.log('event 25' + event)
    this.Audit25Measure = event
  }
  getAudit26(event) {
    console.log('event 26' + event)
    this.Audit26Measure = event
  }
  getAudit27(event) {
    console.log('event 27' + event)
    this.Audit27Measure = event
  }
  getAudit28(event) {
    console.log('event 28' + event)
    this.Audit28Measure = event
  }
  getAudit29(event) {
    console.log('event 29' + event)
    this.Audit29Measure = event
  }
  getAudit30(event) {
    console.log('event 30' + event)
    this.Audit30Measure = event
  }
  getAudit31(event) {
    console.log('event 31' + event)
    this.Audit31Measure = event
  }
  getAudit32(event) {
    console.log('event 32' + event)
    this.Audit32Measure = event
  }
  getAudit33(event) {
    console.log('event 33' + event)
    this.Audit33Measure = event
  }
  getAudit34(event) {
    console.log('event 34' + event)
    this.Audit34Measure = event
  }
  getAudit35(event) {
    console.log('event 35' + event)
    this.Audit35Measure = event
  }
  getAudit36(event) {
    console.log('event 36' + event)
    this.Audit36Measure = event
  }
  getAudit37(event) {
    console.log('event 37' + event)
    this.Audit37Measure = event
  }
  getAudit38(event) {
    console.log('event 38' + event)
    this.Audit38Measure = event
  }
  getAudit39(event) {
    console.log('event 39' + event)
    this.Audit39Measure = event
  }
  getAudit40(event) {
    console.log('event 40' + event)
    this.Audit40Measure = event
  }
  getAudit41(event) {
    console.log('event 41' + event)
    this.Audit41Measure = event
  }
  getAudit42(event) {
    console.log('event 42' + event)
    this.Audit42Measure = event
  }
  getAudit43(event) {
    console.log('event 43' + event)
    this.Audit43Measure = event
  }
  getAudit44(event) {
    console.log('event 44' + event)
    this.Audit44Measure = event
  }
  getAudit45(event) {
    console.log('event 45' + event)
    this.Audit45Measure = event
  }
  getAudit46(event) {
    console.log('event 46' + event)
    this.Audit46Measure = event
  }
  getAudit47(event) {
    console.log('event 47' + event)
    this.Audit47Measure = event
  }
  getAudit48(event) {
    console.log('event 48' + event)
    this.Audit48Measure = event
  }
  getAudit49(event) {
    console.log('event 49' + event)
    this.Audit49Measure = event
  }
  getAudit50(event) {
    console.log('event 50' + event)
    this.Audit50Measure = event
  }
  getAudit51(event) {
    console.log('event 51' + event)
    this.Audit51Measure = event
  }
  getAudit52(event) {
    console.log('event 52' + event)
    this.Audit52Measure = event
  }
  getAudit53(event) {
    console.log('event 53' + event)
    this.Audit53Measure = event
  }
  getAudit54(event) {
    console.log('event 54' + event)
    this.Audit54Measure = event
  }
  getAudit55(event) {
    console.log('event 55' + event)
    this.Audit55Measure = event
  }
  getAudit56(event) {
    console.log('event 56' + event)
    this.Audit56Measure = event
  }
  getAudit57(event) {
    console.log('event 57' + event)
    this.Audit57Measure = event
  }
  getAudit58(event) {
    console.log('event 58' + event)
    this.Audit58Measure = event
  }
  getAudit59(event) {
    console.log('event 59' + event)
    this.Audit59Measure = event
  }
  getAudit60(event) {
    console.log('event 60' + event)
    this.Audit60Measure = event
  }
  getAudit61(event) {
    console.log('event 61' + event)
    this.Audit61Measure = event
  }
  getAudit62(event) {
    console.log('event 62' + event)
    this.Audit62Measure = event
  }
  getAudit63(event) {
    console.log('event 63' + event)
    this.Audit63Measure = event
  }
  getAudit64(event) {
    console.log('event 64' + event)
    this.Audit64Measure = event
  }
  getAudit65(event) {
    console.log('event 65' + event)
    this.Audit65Measure = event
  }
  getAudit66(event) {
    console.log('event 66' + event)
    this.Audit66Measure = event
  }
  getAudit67(event) {
    console.log('event 67' + event)
    this.Audit67Measure = event
  }
  getAudit68(event) {
    console.log('event 68' + event)
    this.Audit68Measure = event
  }
  getAudit69(event) {
    console.log('event 69' + event)
    this.Audit69Measure = event
  }
  getAudit70(event) {
    this.Audit70Measure = event
  }
  getAudit71(event) {
    this.Audit71Measure = event
  }
  getAudit72(event) {
    this.Audit72Measure = event
  }
  getAudit73(event) {
    this.Audit73Measure = event
  }
  getAudit74(event) {
    this.Audit74Measure = event
  }
  getAudit75(event) {
    this.Audit75Measure = event
  }
  getAudit76(event) {
    this.Audit76Measure = event
  }

  //get getSelectedfarm
  getFarmId(event) {
    this.farmID = event

    this.subs.add(
      this.HouseService.getConsultingHouse(this.farmID).subscribe((data) => {
        this.houses = data
        this.loading = false
      }),
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
    //get flock by house id
    this.subs.add(
      this.VisitService.getConsultingFlock(this.houseId).subscribe((data) => {
        this.flocks = data
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

            // To set two dates to two variables
            var date1 = new Date(i.hatchDate)
            var date2 = new Date()

            // To calculate the time difference of two dates
            this.ageOfTheFlock = date2.getTime() - date1.getTime()

            // To calculate the no. of days between two dates
            this.ageOfTheFlock = Math.round(
              Math.abs(this.ageOfTheFlock / (1000 * 3600 * 24)),
            )

            // get breed
            if ((i.breed = i.breedObject.breedID)) {
              this.breeddescription = i.breedObject.description
            }
          }
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

  onKeyPress(event) {
    if (event.keyCode === 13) {
    }
  }

  onSubmit() {}
  ngOnInit(): void {
    localStorage.setItem('getId', '') //store id
    //get all farm by company
    var companyID = localStorage.getItem('companyID')
    this.subs.add(
      this.FarmService.getConsultingFarm(companyID).subscribe((data) => {
        this.farms = data
      }),
    )
  }
  submit(): void {
    let registrationVisitAudit: IRegistrationVisits = new Object() as IRegistrationVisits
    registrationVisitAudit.visitdateString = this.visitDate
    registrationVisitAudit.frequency = 'Weekly'
    registrationVisitAudit.flockID = this.flockID
    registrationVisitAudit.houseID = this.houseId
    registrationVisitAudit.username = localStorage.getItem('user')
    registrationVisitAudit.ageFlock = this.ageOfTheFlock

    //Invoking service
    this.VisitAuditsService.createRegistrationVisits(
      registrationVisitAudit,
    ).subscribe((data) => {
      var alldata = data
      this.visitIDnew = alldata.visitId
      // Store the login in the storage
      localStorage.setItem('visitId', this.visitIDnew)

      //Audit1

      let registrationVisitAudit1: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit1.breedingMnagementId = 1
      registrationVisitAudit1.visitId = this.visitIDnew
      registrationVisitAudit1.measure = this.Audit1Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit1,
      ).subscribe((data) => {})

      //Audit2

      let registrationVisitAudit2: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit2.breedingMnagementId = 2
      registrationVisitAudit2.visitId = this.visitIDnew
      registrationVisitAudit2.measure = this.Audit2Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit2,
      ).subscribe((data) => {})

      //Audit3

      let registrationVisitAudit3: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit3.breedingMnagementId = 3
      registrationVisitAudit3.visitId = this.visitIDnew
      registrationVisitAudit3.measure = this.Audit3Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit3,
      ).subscribe((data) => {})

      //Audit4

      let registrationVisitAudit4: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit4.breedingMnagementId = 4
      registrationVisitAudit4.visitId = this.visitIDnew
      registrationVisitAudit4.measure = this.Audit4Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit4,
      ).subscribe((data) => {})
      //Audit5

      let registrationVisitAudit5: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit5.breedingMnagementId = 5
      registrationVisitAudit5.visitId = this.visitIDnew
      registrationVisitAudit5.measure = this.Audit5Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit5,
      ).subscribe((data) => {})
      //Audit6

      let registrationVisitAudit6: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit6.breedingMnagementId = 6
      registrationVisitAudit6.visitId = this.visitIDnew
      registrationVisitAudit6.measure = this.Audit6Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit6,
      ).subscribe((data) => {})
      //Audit7

      let registrationVisitAudit7: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit7.breedingMnagementId = 7
      registrationVisitAudit7.visitId = this.visitIDnew
      registrationVisitAudit7.measure = this.Audit7Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit7,
      ).subscribe((data) => {})
      //Audit8

      let registrationVisitAudit8: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit8.breedingMnagementId = 8
      registrationVisitAudit8.visitId = this.visitIDnew
      registrationVisitAudit8.measure = this.Audit8Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit8,
      ).subscribe((data) => {})
      //Audit9

      let registrationVisitAudit9: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit9.breedingMnagementId = 9
      registrationVisitAudit9.visitId = this.visitIDnew
      registrationVisitAudit9.measure = this.Audit9Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit9,
      ).subscribe((data) => {})
      //Audit10

      let registrationVisitAudit10: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit10.breedingMnagementId = 10
      registrationVisitAudit10.visitId = this.visitIDnew
      registrationVisitAudit10.measure = this.Audit10Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit10,
      ).subscribe((data) => {})
      //Audit11

      let registrationVisitAudit11: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit11.breedingMnagementId = 11
      registrationVisitAudit11.visitId = this.visitIDnew
      registrationVisitAudit11.measure = this.Audit11Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit11,
      ).subscribe((data) => {})
      //Audit12

      let registrationVisitAudit12: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit12.breedingMnagementId = 12
      registrationVisitAudit12.visitId = this.visitIDnew
      registrationVisitAudit12.measure = this.Audit12Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit12,
      ).subscribe((data) => {})
      //Audit13

      let registrationVisitAudit13: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit13.breedingMnagementId = 13
      registrationVisitAudit13.visitId = this.visitIDnew
      registrationVisitAudit13.measure = this.Audit13Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit13,
      ).subscribe((data) => {})
      //Audit14

      let registrationVisitAudit14: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit14.breedingMnagementId = 14
      registrationVisitAudit14.visitId = this.visitIDnew
      registrationVisitAudit14.measure = this.Audit14Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit14,
      ).subscribe((data) => {})
      //Audit15

      let registrationVisitAudit15: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit15.breedingMnagementId = 15
      registrationVisitAudit15.visitId = this.visitIDnew
      registrationVisitAudit15.measure = this.Audit15Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit15,
      ).subscribe((data) => {})
      //Audit16

      let registrationVisitAudit16: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit16.breedingMnagementId = 16
      registrationVisitAudit16.visitId = this.visitIDnew
      registrationVisitAudit16.measure = this.Audit16Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit16,
      ).subscribe((data) => {})
      //Audit17

      let registrationVisitAudit17: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit17.breedingMnagementId = 17
      registrationVisitAudit17.visitId = this.visitIDnew
      registrationVisitAudit17.measure = this.Audit17Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit17,
      ).subscribe((data) => {})
      //Audit18

      let registrationVisitAudit18: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit18.breedingMnagementId = 18
      registrationVisitAudit18.visitId = this.visitIDnew
      registrationVisitAudit18.measure = this.Audit18Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit18,
      ).subscribe((data) => {})
      //Audit19

      let registrationVisitAudit19: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit19.breedingMnagementId = 19
      registrationVisitAudit19.visitId = this.visitIDnew
      registrationVisitAudit19.measure = this.Audit19Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit19,
      ).subscribe((data) => {})
      //Audit20

      let registrationVisitAudit20: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit20.breedingMnagementId = 20
      registrationVisitAudit20.visitId = this.visitIDnew
      registrationVisitAudit20.measure = this.Audit20Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit20,
      ).subscribe((data) => {})
      //Audit21

      let registrationVisitAudit21: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit21.breedingMnagementId = 21
      registrationVisitAudit21.visitId = this.visitIDnew
      registrationVisitAudit21.measure = this.Audit21Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit21,
      ).subscribe((data) => {})
      //Audit22

      let registrationVisitAudit22: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit22.breedingMnagementId = 22
      registrationVisitAudit22.visitId = this.visitIDnew
      registrationVisitAudit22.measure = this.Audit22Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit22,
      ).subscribe((data) => {})
      //Audit23

      let registrationVisitAudit23: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit23.breedingMnagementId = 23
      registrationVisitAudit23.visitId = this.visitIDnew
      registrationVisitAudit23.measure = this.Audit23Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit23,
      ).subscribe((data) => {})
      //Audit24

      let registrationVisitAudit24: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit24.breedingMnagementId = 24
      registrationVisitAudit24.visitId = this.visitIDnew
      registrationVisitAudit24.measure = this.Audit24Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit24,
      ).subscribe((data) => {})
      //Audit25

      let registrationVisitAudit25: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit25.breedingMnagementId = 25
      registrationVisitAudit25.visitId = this.visitIDnew
      registrationVisitAudit25.measure = this.Audit25Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit25,
      ).subscribe((data) => {})
      //Audit26

      let registrationVisitAudit26: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit26.breedingMnagementId = 26
      registrationVisitAudit26.visitId = this.visitIDnew
      registrationVisitAudit26.measure = this.Audit26Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit26,
      ).subscribe((data) => {})
      //Audit27

      let registrationVisitAudit27: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit27.breedingMnagementId = 27
      registrationVisitAudit27.visitId = this.visitIDnew
      registrationVisitAudit27.measure = this.Audit27Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit27,
      ).subscribe((data) => {})
      //Audit28

      let registrationVisitAudit28: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit28.breedingMnagementId = 28
      registrationVisitAudit28.visitId = this.visitIDnew
      registrationVisitAudit28.measure = this.Audit28Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit28,
      ).subscribe((data) => {})
      //Audit29

      let registrationVisitAudit29: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit29.breedingMnagementId = 29
      registrationVisitAudit29.visitId = this.visitIDnew
      registrationVisitAudit29.measure = this.Audit29Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit29,
      ).subscribe((data) => {})
      //Audit30

      let registrationVisitAudit30: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit30.breedingMnagementId = 30
      registrationVisitAudit30.visitId = this.visitIDnew
      registrationVisitAudit30.measure = this.Audit30Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit30,
      ).subscribe((data) => {})
      //Audit31

      let registrationVisitAudit31: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit31.breedingMnagementId = 31
      registrationVisitAudit31.visitId = this.visitIDnew
      registrationVisitAudit31.measure = this.Audit31Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit31,
      ).subscribe((data) => {})
      //Audit32

      let registrationVisitAudit32: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit32.breedingMnagementId = 32
      registrationVisitAudit32.visitId = this.visitIDnew
      registrationVisitAudit32.measure = this.Audit32Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit32,
      ).subscribe((data) => {})

      //Audit33

      let registrationVisitAudit33: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit33.breedingMnagementId = 33
      registrationVisitAudit33.visitId = this.visitIDnew
      registrationVisitAudit33.measure = this.Audit33Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit33,
      ).subscribe((data) => {})

      //Audit34

      let registrationVisitAudit34: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit34.breedingMnagementId = 34
      registrationVisitAudit34.visitId = this.visitIDnew
      registrationVisitAudit34.measure = this.Audit34Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit34,
      ).subscribe((data) => {})

      //Audit35

      let registrationVisitAudit35: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit35.breedingMnagementId = 35
      registrationVisitAudit35.visitId = this.visitIDnew
      registrationVisitAudit35.measure = this.Audit35Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit35,
      ).subscribe((data) => {})

      //Audit36

      let registrationVisitAudit36: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit36.breedingMnagementId = 36
      registrationVisitAudit36.visitId = this.visitIDnew
      registrationVisitAudit36.measure = this.Audit36Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit36,
      ).subscribe((data) => {})

      //Audit37

      let registrationVisitAudit37: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit37.breedingMnagementId = 37
      registrationVisitAudit37.visitId = this.visitIDnew
      registrationVisitAudit37.measure = this.Audit37Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit37,
      ).subscribe((data) => {})

      //Audit38

      let registrationVisitAudit38: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit38.breedingMnagementId = 38
      registrationVisitAudit38.visitId = this.visitIDnew
      registrationVisitAudit38.measure = this.Audit38Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit38,
      ).subscribe((data) => {})

      //Audit39

      let registrationVisitAudit39: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit39.breedingMnagementId = 39
      registrationVisitAudit39.visitId = this.visitIDnew
      registrationVisitAudit39.measure = this.Audit39Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit39,
      ).subscribe((data) => {})

      //Audit40

      let registrationVisitAudit40: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit40.breedingMnagementId = 40
      registrationVisitAudit40.visitId = this.visitIDnew
      registrationVisitAudit40.measure = this.Audit40Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit40,
      ).subscribe((data) => {})

      //Audit41

      let registrationVisitAudit41: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit41.breedingMnagementId = 41
      registrationVisitAudit41.visitId = this.visitIDnew
      registrationVisitAudit41.measure = this.Audit41Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit41,
      ).subscribe((data) => {})
      //Audit42

      let registrationVisitAudit42: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit42.breedingMnagementId = 42
      registrationVisitAudit42.visitId = this.visitIDnew
      registrationVisitAudit42.measure = this.Audit42Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit42,
      ).subscribe((data) => {})
      //Audit43

      let registrationVisitAudit43: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit43.breedingMnagementId = 43
      registrationVisitAudit43.visitId = this.visitIDnew
      registrationVisitAudit43.measure = this.Audit43Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit43,
      ).subscribe((data) => {})
      //Audit44

      let registrationVisitAudit44: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit44.breedingMnagementId = 44
      registrationVisitAudit44.visitId = this.visitIDnew
      registrationVisitAudit44.measure = this.Audit44Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit44,
      ).subscribe((data) => {})
      //Audit45

      let registrationVisitAudit45: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit45.breedingMnagementId = 45
      registrationVisitAudit45.visitId = this.visitIDnew
      registrationVisitAudit45.measure = this.Audit45Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit45,
      ).subscribe((data) => {})
      //Audit46

      let registrationVisitAudit46: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit46.breedingMnagementId = 46
      registrationVisitAudit46.visitId = this.visitIDnew
      registrationVisitAudit46.measure = this.Audit46Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit46,
      ).subscribe((data) => {})
      //Audit47

      let registrationVisitAudit47: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit47.breedingMnagementId = 47
      registrationVisitAudit47.visitId = this.visitIDnew
      registrationVisitAudit47.measure = this.Audit47Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit47,
      ).subscribe((data) => {})
      //Audit48

      let registrationVisitAudit48: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit48.breedingMnagementId = 48
      registrationVisitAudit48.visitId = this.visitIDnew
      registrationVisitAudit48.measure = this.Audit48Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit48,
      ).subscribe((data) => {})
      //Audit49

      let registrationVisitAudit49: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit49.breedingMnagementId = 49
      registrationVisitAudit49.visitId = this.visitIDnew
      registrationVisitAudit49.measure = this.Audit49Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit49,
      ).subscribe((data) => {})
      //Audit50

      let registrationVisitAudit50: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit50.breedingMnagementId = 50
      registrationVisitAudit50.visitId = this.visitIDnew
      registrationVisitAudit50.measure = this.Audit50Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit50,
      ).subscribe((data) => {})
      //Audit51

      let registrationVisitAudit51: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit51.breedingMnagementId = 51
      registrationVisitAudit51.visitId = this.visitIDnew
      registrationVisitAudit51.measure = this.Audit51Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit51,
      ).subscribe((data) => {})
      //Audit52

      let registrationVisitAudit52: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit52.breedingMnagementId = 52
      registrationVisitAudit52.visitId = this.visitIDnew
      registrationVisitAudit52.measure = this.Audit52Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit52,
      ).subscribe((data) => {})
      //Audit53

      let registrationVisitAudit53: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit53.breedingMnagementId = 53
      registrationVisitAudit53.visitId = this.visitIDnew
      registrationVisitAudit53.measure = this.Audit53Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit53,
      ).subscribe((data) => {})
      //Audit54

      let registrationVisitAudit54: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit54.breedingMnagementId = 54
      registrationVisitAudit54.visitId = this.visitIDnew
      registrationVisitAudit54.measure = this.Audit54Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit54,
      ).subscribe((data) => {})
      //Audit55

      let registrationVisitAudit55: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit55.breedingMnagementId = 55
      registrationVisitAudit55.visitId = this.visitIDnew
      registrationVisitAudit55.measure = this.Audit55Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit55,
      ).subscribe((data) => {})
      //Audit56

      let registrationVisitAudit56: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit56.breedingMnagementId = 56
      registrationVisitAudit56.visitId = this.visitIDnew
      registrationVisitAudit56.measure = this.Audit56Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit56,
      ).subscribe((data) => {})
      //Audit57

      let registrationVisitAudit57: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit57.breedingMnagementId = 57
      registrationVisitAudit57.visitId = this.visitIDnew
      registrationVisitAudit57.measure = this.Audit57Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit57,
      ).subscribe((data) => {})
      //Audit58

      let registrationVisitAudit58: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit58.breedingMnagementId = 58
      registrationVisitAudit58.visitId = this.visitIDnew
      registrationVisitAudit58.measure = this.Audit58Measure

      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit58,
      ).subscribe((data) => {})
      //Audit59

      let registrationVisitAudit59: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit59.breedingMnagementId = 59
      registrationVisitAudit59.visitId = this.visitIDnew
      registrationVisitAudit59.measure = this.Audit59Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit59,
      ).subscribe((data) => {})
      //Audit60

      let registrationVisitAudit60: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit60.breedingMnagementId = 60
      registrationVisitAudit60.visitId = this.visitIDnew
      registrationVisitAudit60.measure = this.Audit60Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit60,
      ).subscribe((data) => {})
      //Audit61

      let registrationVisitAudit61: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit61.breedingMnagementId = 61
      registrationVisitAudit61.visitId = this.visitIDnew
      registrationVisitAudit61.measure = this.Audit61Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit61,
      ).subscribe((data) => {})
      //Audit62

      let registrationVisitAudit62: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit62.breedingMnagementId = 62
      registrationVisitAudit62.visitId = this.visitIDnew
      registrationVisitAudit62.measure = this.Audit62Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit62,
      ).subscribe((data) => {})
      //Audit63

      let registrationVisitAudit63: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit63.breedingMnagementId = 63
      registrationVisitAudit63.visitId = this.visitIDnew
      registrationVisitAudit63.measure = this.Audit63Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit63,
      ).subscribe((data) => {})
      //Audit64

      let registrationVisitAudit64: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit64.breedingMnagementId = 64
      registrationVisitAudit64.visitId = this.visitIDnew
      registrationVisitAudit64.measure = this.Audit64Measure
      console.log(
        '  registrationVisitAudit64.measure' + registrationVisitAudit64.measure,
      )
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit64,
      ).subscribe((data) => {
        console.log('data message registrationVisitAudit64' + data['message'])
        console.log(
          'data response, registrationVisitAudit64' + data['response'],
        )
      })
      //Audit65

      let registrationVisitAudit65: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit65.breedingMnagementId = 65
      registrationVisitAudit65.visitId = this.visitIDnew
      registrationVisitAudit65.measure = this.Audit65Measure
      console.log(
        '  registrationVisitAudit65.measure' + registrationVisitAudit65.measure,
      )
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit65,
      ).subscribe((data) => {
        console.log('data message registrationVisitAudit65' + data['message'])
        console.log(
          'data response, registrationVisitAudit65' + data['response'],
        )
      })
      //Audit66

      let registrationVisitAudit66: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit66.breedingMnagementId = 66
      registrationVisitAudit66.visitId = this.visitIDnew
      registrationVisitAudit66.measure = this.Audit66Measure
      console.log(
        '  registrationVisitAudit66.measure' + registrationVisitAudit66.measure,
      )
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit66,
      ).subscribe((data) => {
        console.log('data message registrationVisitAudit66' + data['message'])
        console.log(
          'data response, registrationVisitAudit66' + data['response'],
        )
      })
      //Audit67

      let registrationVisitAudit67: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit67.breedingMnagementId = 67
      registrationVisitAudit67.visitId = this.visitIDnew
      registrationVisitAudit67.measure = this.Audit67Measure
      console.log(
        '  registrationVisitAudit67.measure' + registrationVisitAudit67.measure,
      )
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit67,
      ).subscribe((data) => {})
      //Audit68

      let registrationVisitAudit68: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit68.breedingMnagementId = 68
      registrationVisitAudit68.visitId = this.visitIDnew
      registrationVisitAudit68.measure = this.Audit68Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit41,
      ).subscribe((data) => {})
      //Audit69

      let registrationVisitAudit69: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit69.breedingMnagementId = 69
      registrationVisitAudit69.visitId = this.visitIDnew
      registrationVisitAudit69.measure = this.Audit69Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit69,
      ).subscribe((data) => {})
      //Audit70

      let registrationVisitAudit70: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit70.breedingMnagementId = 70
      registrationVisitAudit70.visitId = this.visitIDnew
      registrationVisitAudit70.measure = this.Audit70Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit70,
      ).subscribe((data) => {})
      //Audit71

      let registrationVisitAudit71: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit71.breedingMnagementId = 71
      registrationVisitAudit71.visitId = this.visitIDnew
      registrationVisitAudit71.measure = this.Audit71Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit71,
      ).subscribe((data) => {})

      //Audit72

      let registrationVisitAudit72: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit72.breedingMnagementId = 72
      registrationVisitAudit72.visitId = this.visitIDnew
      registrationVisitAudit72.measure = this.Audit72Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit72,
      ).subscribe((data) => {})

      //Audit73

      let registrationVisitAudit73: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit73.breedingMnagementId = 73
      registrationVisitAudit73.visitId = this.visitIDnew
      registrationVisitAudit73.measure = this.Audit73Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit73,
      ).subscribe((data) => {})

      //Audit74

      let registrationVisitAudit74: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit74.breedingMnagementId = 74
      registrationVisitAudit74.visitId = this.visitIDnew
      registrationVisitAudit74.measure = this.Audit74Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit74,
      ).subscribe((data) => {})

      //Audit75

      let registrationVisitAudit75: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit75.breedingMnagementId = 75
      registrationVisitAudit75.visitId = this.visitIDnew
      registrationVisitAudit75.measure = this.Audit75Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit75,
      ).subscribe((data) => {})

      //Audit76

      let registrationVisitAudit76: IRegistrationVisitAudits = new Object() as IRegistrationVisitAudits
      registrationVisitAudit76.breedingMnagementId = 76
      registrationVisitAudit76.visitId = this.visitIDnew
      registrationVisitAudit76.measure = this.Audit76Measure
      // Invoking service
      this.VisitAuditsService.createRegistrationVisitAudit(
        registrationVisitAudit76,
      ).subscribe((data) => {})
    })
    this.ListComponenet.refresh()

    this.show = false
  }
}
