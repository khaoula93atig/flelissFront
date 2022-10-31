import { Component, OnInit } from '@angular/core'
import { CheckList, IRegistrationVisitTasks } from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { HouseService } from '../../services/house.service'
import { VisitAuditsService } from '../../services/visit-audits.service'
@Component({
  selector: 'app-brooding-check-list',
  templateUrl: './brooding-check-list.component.html',
  styleUrls: ['./brooding-check-list.component.css'],
})
export class BroodingCheckListComponent implements OnInit {
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
  constructor(
    private HouseService: HouseService,
    private VisitAuditsService: VisitAuditsService,
  ) {}
  getHouseId(event) {
    this.housesId = event
    //get flock by house id
  }
  ngOnInit(): void {
    this.farmId = sessionStorage.getItem('farmID')
    this.username = sessionStorage.getItem('user')

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
  getPositionSuppDrink(event) {
    this.positionSuppDrink = event
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
    checkList.litterDepth = this.litterDepth
    //checkList.temperature = this.temperature;
    checkList.preHeatLeast = this.preHeatLeast
    checkList.airTemperature = this.airTemperature
    checkList.realtiveHumidity = this.realtiveHumidity
    checkList.airSpeed = this.airSpeed
    checkList.positionSuppDrink = this.positionSuppDrink
    checkList.deliveryVehiTemp = this.deliveryVehiTemp
    checkList.deliveryVehiHumi = this.deliveryVehiHumi
    checkList.deliveryVehicleHygiene = this.deliveryVehicleHygiene
    checkList.chickConfort = this.chickConfort
    checkList.externalEnvCond = this.externalEnvCond
    checkList.transitTime = this.transitTime
    checkList.deliveryVehicleAirExch = this.deliveryVehicleAirExch
    checkList.internalChickTemp = this.internalChickTemp
    checkList.weighSampleChick = this.weighSampleChick
    checkList.placeChicksQuickly = this.placeChicksQuickly
    checkList.ensureFeedWater = this.ensureFeedWater
    checkList.lightIntensity = this.lightIntensity
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
    this.VisitAuditsService.createBroodingCheck(
      checkList,
    ).subscribe((data) => {})
  }
}
