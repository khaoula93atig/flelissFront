import { Component, OnInit } from '@angular/core'
import { IchickReception } from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { FarmService } from '../../services/farm.service'
import { HouseService } from '../../services/house.service'
import { VisitService } from '../../services/visit.service'
import { VisitAuditsService } from '../../services/visit-audits.service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-chick-reception',
  templateUrl: './chick-reception.component.html',
  styleUrls: ['./chick-reception.component.css'],
})
export class ChickReceptionComponent implements OnInit {
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
  eyesClearBright: String
  bodyDryWet: String
  bodyTemp: String
  crossBeaks: String
  feetPropFormed: String
  legsCleanRedHocks: String

  signsGaspingHeavy: String
  stringyNavels: String
  blackButtons: String
  navelsProperlyHealed: String
  developedLegsSkin: String
  thickFatBellies: String
  largeAmountGrowth: String
  fairlyEvenWingFeather: String
  nonstressful: String

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

  getEyes_clear_bright(event) {
    this.eyesClearBright = event
  }
  getBody_dry_wet(event) {
    this.bodyDryWet = event
  }
  getBody_temp(event) {
    this.bodyTemp = event
  }
  getCross_beaks(event) {
    this.crossBeaks = event
  }
  getFeet_prop_formed(event) {
    this.feetPropFormed = event
  }
  getLegs_clean_red_hocks(event) {
    this.legsCleanRedHocks = event
  }
  getBlack_buttons(event) {
    this.blackButtons = event
  }
  getLarge_amount_growth(event) {
    this.largeAmountGrowth = event
  }
  getSigns_gasping_heavy(event) {
    this.signsGaspingHeavy = event
  }
  getStringy_navels(event) {
    this.signsGaspingHeavy = event
  }
  getNavels_properly_healed(event) {
    this.navelsProperlyHealed = event
  }
  getDeveloped_legs_skin(event) {
    this.developedLegsSkin = event
  }
  getThick_fat_bellies(event) {
    this.thickFatBellies = event
  }
  getFairly_even_wing_feather(event) {
    this.fairlyEvenWingFeather = event
  }
  getNon_stressful(event) {
    this.nonstressful = event
  }

  saveObject() {
    let chickReception: IchickReception = new Object() as IchickReception
    chickReception.visitDate = this.visitDate
    chickReception.chicReceptionId = this.chicReceptionId
    chickReception.centerId = this.centerId
    chickReception.farmId = this.farmId
    chickReception.housesId = this.housesId
    chickReception.flockId = this.flockId
    chickReception.breed = this.breeddescription
    chickReception.hatchDate = this.hatchDate
    chickReception.chickPlaced = this.chikedPlaced
    chickReception.psOrigin = this.psOrigin
    chickReception.psAge = this.ageOfTheFlock
    chickReception.eyesClearBright = this.eyesClearBright
    chickReception.bodyDryWet = this.bodyDryWet
    chickReception.bodyTemp = this.bodyTemp
    chickReception.crossBeaks = this.crossBeaks
    chickReception.feetPropFormed = this.feetPropFormed
    chickReception.legsCleanRedHocks = this.legsCleanRedHocks
    chickReception.signsGaspingHeavy = this.signsGaspingHeavy
    chickReception.stringyNavels = this.stringyNavels
    chickReception.blackButtons = this.blackButtons
    chickReception.navelsProperlyHealed = this.navelsProperlyHealed
    chickReception.developedLegsSkin = this.developedLegsSkin
    chickReception.thickFatBellies = this.thickFatBellies
    chickReception.largeAmountGrowth = this.largeAmountGrowth
    chickReception.fairlyEvenWingFeather = this.fairlyEvenWingFeather
    chickReception.nonstressful = this.nonstressful

    //Invoking service
    this.VisitAuditsService.createChickReception(chickReception).subscribe(
      (data) => {
        if (data['response'] == 'OK') {
          this.succesMsg = data['message']
          setTimeout((_) => (this.succesMsg = null), 30000)
        } else {
        }
      },
    )
  }
}
