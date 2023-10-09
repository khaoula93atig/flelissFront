import { Component, OnInit, ViewChild } from '@angular/core'
import { CheckList, IRegistrationVisitTasks } from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { HouseService } from '../../services/house.service'
import { VisitAuditsService } from '../../services/visit-audits.service'
import { ListBroodingCheckListComponent } from '../list-brooding-check-list/list-brooding-check-list.component'
@Component({
  selector: 'app-brooding-check-list',
  templateUrl: './brooding-check-list.component.html',
  styleUrls: ['./brooding-check-list.component.css'],
})
export class BroodingCheckListComponent implements OnInit {
  @ViewChild(ListBroodingCheckListComponent) modal: ListBroodingCheckListComponent
  broodingCheckId: String
  litterDepth: String

  farmId: string
  housesId: String
  centerID: String
  temperature: String
  preHeatLeast: String
  airTemperature: String
  realtiveHumidity: String
  airSpeed: String
  positionSuppDrink: String
  deliveryVehiTemp: String
  deliveryVehiHumi: String
  deliveryVehicleHygiene: String
  chickConfort: String
  externalEnvCond: String
  transitTime: String
  deliveryVehicleAirExch: String
  internalChickTemp: String
  weighSampleChick: String
  placeChicksQuickly: String
  ensureFeedWater: String
  lightIntensity: String
  checkChickBehavior: String
  checkChickWaterSupply: String
  checkFeedSupply: String
  checkChickCropFill: String
  distributionDayOldChicks: String
  dailyPurgesPiping: String
  airQuality: String
  creationDate: String
  username: String
  houses: any[] = []
  flocks: any[] = []
  centers: any[] = []
  centerId: string
  subs: SubSink = new SubSink()
  visitDate: Date
  floorTemperature:string
  spotBrooding:string
  distanceAccessWater:string
  checkFeedForm:string
  feedOnPaper:string
  feedersTrays:string
  drinkersNipple:string
  drinker:string
  drinkersSupp:string
  waterTemperature:string


  constructor(
    private HouseService: HouseService,
    private VisitAuditsService: VisitAuditsService,
  ) {}


  getHouseId(event) {
    this.housesId = event
    //get flock by house id
  }
  ngOnInit(): void {
    this.farmId = localStorage.getItem('farmID')
    this.username = localStorage.getItem('user')

    this.subs.add(
      this.HouseService.getConsultingCenterbyFarm(this.farmId).subscribe(
        (data) => {
          this.centers = data
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
  getlitterDepth(event) {
    this.litterDepth = event
  }
  getTemperature(event) {
    this.temperature = event
  }
  getfloorTemperature(event) {
    this.floorTemperature = event
  }
  getPreHeatLeast(event) {
    this.preHeatLeast = event
  }
  getAirTemperature(event) {
    this.airTemperature = event
  }
  getRealtiveHumidity(event) {
    this.realtiveHumidity = event
  }

  getAirSpeed(event) {
    this.airSpeed = event
  }
  getDistance(event) {
    this.distanceAccessWater = event
  }
  getPositionSuppDrink(event) {
    this.positionSuppDrink = event
  }
  getSpotBrooding(event) {
    this.spotBrooding = event
  }
  getCheckFeed(event) {
    this.checkFeedForm = event
  }
  getfeedOnPaper(event) {
    this.feedOnPaper = event
  }
  getfeedTrays(event) {
    this.feedersTrays = event
  }
  getDrinkersNipple(event) {
    this.drinkersNipple = event
  }

  getDrinkers(event) {
    this.drinker = event
  }
  getDrinkerSupp(event) {
    this.drinkersSupp = event
  }


  getDeliveryVehiTemp(event) {
    this.deliveryVehiTemp = event
  }
  getDeliveryVehiHumi(event) {
    this.deliveryVehiHumi = event
  }
  getChickConfort(event) {
    this.chickConfort = event
  }
  getExternalEnvCond(event) {
    this.externalEnvCond = event
  }
  getTransitTime(event) {
    this.transitTime = event
  }
  getDeliveryVehicleAirExch(event) {
    this.deliveryVehicleAirExch = event
  }
  getDeliveryVehicleHygiene(event) {
    this.deliveryVehicleHygiene = event
  }
  getInternalChickTemp(event) {
    this.internalChickTemp = event
  }
  getWeighSampleChick(event) {
    this.weighSampleChick = event
  }
  getPlaceChicksQuickly(event) {
    this.placeChicksQuickly = event
  }
  getEnsureFeedWater(event) {
    this.ensureFeedWater = event
  }
  getLightIntensity(event) {
    this.lightIntensity = event
  }
  getwaterTemperature(event) {
    this.waterTemperature = event
  }
  getCheckChickBehavior(event) {
    this.checkChickBehavior = event
  }
  getCheckChickWaterSupply(event) {
    this.checkChickWaterSupply = event
  }
  getCheckFeedSupply(event) {
    this.checkFeedSupply = event
  }
  getCheckChickCropFill(event) {
    this.checkChickCropFill = event
  }

  getDistributionDayOldChicks(event) {
    this.distributionDayOldChicks = event
  }
  getDailyPurgesPiping(event) {
    this.dailyPurgesPiping = event
  }
  getAirQuality(event) {
    this.airQuality = event
  }

  save() {
    let checkList: CheckList = new Object() as CheckList
    //before arrival
    checkList.litterDepth = this.litterDepth
    checkList.temperature = this.temperature;
    checkList.preHeatLeast = this.preHeatLeast
    checkList.airTemperature = this.airTemperature
    checkList.floorTemperature = this.floorTemperature
    checkList.spotBrooding=this.spotBrooding
    checkList.realtiveHumidity = this.realtiveHumidity
    checkList.distanceAccessWater=this.distanceAccessWater
    checkList.airSpeed = this.airSpeed
    checkList.checkFeed=this.checkFeedForm
    checkList.feedOnPaper=this.feedOnPaper
    checkList.feedersTrays=this.feedersTrays
    checkList.drinkersNippleLines=this.drinkersNipple
    checkList.drinkersBell=this.drinker
    checkList.drinkersSupp=this.drinkersSupp
    //checkList.positionSuppDrink = this.positionSuppDrink

    //checkdelivery
    checkList.deliveryVehiTemp = this.deliveryVehiTemp
    checkList.deliveryVehiHumi = this.deliveryVehiHumi
    checkList.deliveryVehicleHygiene = this.deliveryVehicleHygiene
    checkList.chickConfort = this.chickConfort
    checkList.externalEnvCond = this.externalEnvCond
    checkList.transitTime = this.transitTime
    checkList.deliveryVehicleAirExch = this.deliveryVehicleAirExch

    //the arrival
    checkList.internalChickTemp = this.internalChickTemp
    checkList.weighSampleChick = this.weighSampleChick
    //checkList.placeChicksQuickly = this.placeChicksQuickly
    //checkList.ensureFeedWater = this.ensureFeedWater
    checkList.lightIntensity = this.lightIntensity
    checkList.waterTemperature= this.waterTemperature
    checkList.checkChickBehavior = this.checkChickBehavior
    checkList.checkChickWaterSupply = this.checkChickWaterSupply
    checkList.checkFeedSupply = this.checkFeedSupply
    checkList.checkChickCropFill = this.checkChickCropFill
    checkList.distributionDayOldChicks = this.distributionDayOldChicks
    checkList.dailyPurgesPiping = this.dailyPurgesPiping
    checkList.airQuality = this.airQuality
    checkList.date = this.visitDate
    checkList.centerID = this.centerId
    checkList.housesId = this.housesId
    checkList.farmId = this.farmId
    checkList.username = this.username
    console.log('test')
    console.log(checkList)
    this.VisitAuditsService.createBroodingCheck(
      checkList,
    ).subscribe((data) => {})
  }
}
