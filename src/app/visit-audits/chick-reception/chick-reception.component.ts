import { Component, OnInit } from '@angular/core'
import { IchickReception } from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { FarmService } from '../../services/farm.service'
import { HouseService } from '../../services/house.service'
import { VisitService } from '../../services/visit.service'
import { VisitAuditsService } from '../../services/visit-audits.service'
import { DatePipe, formatDate } from '@angular/common'
import { ToastrService } from 'ngx-toastr'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-chick-reception',
  templateUrl: './chick-reception.component.html',
  styleUrls: ['./chick-reception.component.css'],
})
export class ChickReceptionComponent implements OnInit {
  deviation=''
  opened=false
  isAllume=true;
  checkReception = new IchickReception()
  visitDate: Date
  chicReceptionId: number
  centerId: string
  farmId: string
  housesId: string
  flockId: String
  breed: String
  hatchDate: Date
  chikedPlaced: String
  psOrigin: String
  psAge: String
  

  subs: SubSink = new SubSink()
  farms: any[] = []
  houses: any[] = []
  flocks: any[] = []
  centers: any[] = []
  breeddescription: string
  houseId: string

  flockID: string
  ageOfTheFlock: any
  test: string
  succesMsg: string
  dangerMsg: string
  constructor(
    private FarmService: FarmService,
    private HouseService: HouseService,
    private datepipe: DatePipe,
    private VisitService: VisitService,
    private VisitAuditsService: VisitAuditsService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.visitDate = new Date()
    //get all farm by company
    this.farmId = sessionStorage.getItem('farmID')

    this.subs.add(
      this.HouseService.getConsultingCenterbyFarm(this.farmId).subscribe(
        (data) => {
          this.centers = data
        },
      ),
    )
  }
  //get getSelectedfarm
  getFarmId(event) {
    this.farmId = event
  }
  getHouseId(event) {
    this.housesId = event
    this.flocks = new Array()
    //get flock by house id

    this.subs.add(
      this.VisitService.getConsultingFlock(this.housesId).subscribe((data) => {
        for (let element of data) {
          if (element.checkEndOfCycle == false) this.flocks.push(element)
        }

        for (let i of this.flocks) {
          // get breed
          if ((i.breed = i.breedObject.breedID)) {
            this.breeddescription = i.breedObject.description
          }
        }
      }),
    )
  }

  getFlockId(event) {
    this.flockID = event
    this.subs.add(
      this.VisitService.getConsultingFlockbyId(this.flockID).subscribe(
        (data) => {
          this.flocks = data

          for (let i of this.flocks) {
            this.hatchDate = i.hatchDate
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

  getCenterId(event) {
    this.centerId = event

    this.subs.add(
      this.HouseService.getConsultingHouseByCenter(this.centerId).subscribe(
        (data) => {
          this.houses = data
        },
      ),
    )
  }

  

  saveObject(form:NgForm) {
    this.calcluScore()
    let latest_date =this.datepipe.transform(this.visitDate, 'yyyy-MM-dd');
    this.checkReception.visitDate = new Date(latest_date)
    this.checkReception.centerId = this.centerId
    this.checkReception.farmId = this.farmId
    this.checkReception.housesId = this.housesId
    this.checkReception.flockId = this.flockId
    this.checkReception.breed = this.breeddescription
    this.checkReception.hatchDate = this.hatchDate
    this.checkReception.chickPlaced = this.chikedPlaced
    this.checkReception.psOrigin = this.psOrigin
    this.checkReception.psAge = this.ageOfTheFlock
    console.log(this.checkReception)

    //Invoking service
    this.VisitAuditsService.createChickReception(this.checkReception).subscribe(
      (data) => {
        if (data['response'] == 'OK') {
          this.toaster.success('Success', 'ajout avec succés')
          this.opened=true
          form.reset()
        } else {
          this.toaster.error('Error', 'operation echouée')
          this.checkReception = new IchickReception()
          form.reset()
        }
      },
    )
  }

  calcluScore(){
    this.checkReception.totalScore = 0
    if(this.checkReception.navelNotclosedStrungButton==-1){
      this.checkReception.navelNotclosedStrungButton=0
    }
    if(this.checkReception.legsDeshydratedVienProtruding==-1){
      this.checkReception.legsDeshydratedVienProtruding=0
    }
    if(this.checkReception.hocksRedcolorHeavyblushing==-1){
      this.checkReception.hocksRedcolorHeavyblushing=0
    }
    if(this.checkReception.defectsEyeLegsSpraddled==-1){
      this.checkReception.defectsEyeLegsSpraddled=0
    }

    this.checkReception.totalScore=this.checkReception.navelCleanWellHealed+this.checkReception.navelClosedSlightAbrasiveness+this.checkReception.navelNotclosedStrungButton
    +this.checkReception.legsCleanWaxy+this.checkReception.legsDeshydratedVienProtruding+this.checkReception.legsDrynessPale
    +this.checkReception.hocksCleanNoblemishes+this.checkReception.hocksRedcolorHeavyblushing+this.checkReception.hocksSlightBlushing
    +this.checkReception.defectsCleanNodefects+this.checkReception.defectsEyeLegsSpraddled+this.checkReception.defectsMinorDefects

    if(this.checkReception.totalScore>=40){
      this.deviation='execelent'
    }else if(this.checkReception.totalScore>=20 && this.checkReception.totalScore<=39){
      this.deviation='acceptable'
    }
    else if(this.checkReception.totalScore<=19){
      this.deviation='bad'
    }
  }
}
