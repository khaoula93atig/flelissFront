import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Toast, ToastrService } from 'ngx-toastr'
import { VisitAuditsService } from 'src/app/services/visit-audits.service'
import { BreedingManagement } from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { HouseService } from '../../services/house.service'

@Component({
  selector: 'app-manager-audit-visit',
  templateUrl: './manager-audit-visit.component.html',
  styleUrls: ['./manager-audit-visit.component.css'],
})
export class ManagerAuditVisitComponent implements OnInit {
  opened=false
  deviation=''
  centers: any[] = []
  centerId: string
  visitDate: Date
  farmId: string
  username: string
  houses: any[] = []
  subs: SubSink = new SubSink()
  breedingManagement = new BreedingManagement()
  conform = 'conform'
  noConform = 'no conform'
  score = 0
  loading: boolean
  storageVaccines = ' '
  constructor(
    private HouseService: HouseService,
    private visitService: VisitAuditsService,
    private toaster: ToastrService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.farmId = sessionStorage.getItem('farmID')
    this.username = sessionStorage.getItem('user')
    console.log('username ' + this.username)
    console.log('farmId ' + this.farmId)
    this.subs.add(
      this.HouseService.getConsultingCenterbyFarm(this.farmId).subscribe(
        (data) => {
          console.log('data house++++++++++' + JSON.stringify(data))
          this.centers = data
        },
      ),
    )
  }
  getCenterId(event) {
    this.centerId = event
  }
  test() {
    console.log(
      'this.breedingManagement.cleanlinessBuild ' +
        this.breedingManagement.cleanlinessBuild,
    )
    this.breedingManagement = new BreedingManagement()
  }
  save(myForm) {
    console.log(this.breedingManagement)
    this.calculScore()
    let latest_date =this.datepipe.transform(this.visitDate, 'yyyy-MM-dd');
    //let visdate = new Date(this.visitDate)
    this.breedingManagement.visitDate = new Date(latest_date)
    this.breedingManagement.centerId = this.centerId
    this.breedingManagement.farmId = this.farmId
    this.breedingManagement.username = this.username
    this.breedingManagement.scoring = this.score
    this.breedingManagement.storageVaccines = this.storageVaccines
    console.log(
      'this.breedingManagement.cleanlinessBuild ' +
        this.breedingManagement.cleanlinessBuild,
    )
    console.log(this.breedingManagement)

    this.visitService
      .createBreedingManagement(this.breedingManagement)
      .subscribe((data) => {
        console.log('data' + data['response'])
        if (data['response'] == 'OK') {
          myForm.reset()
          this.opened=true
          this.toaster.success('Success', 'Successfully added')
        } else {
          this.toaster.error('Error', 'Operation failed')
        }
        myForm.reset()

      })
    
  }
  calculScore() {
    this.score = 0
    if (this.breedingManagement.cleanlinessBuild == this.conform) {
      this.score = this.score + 30
    }
    if (this.breedingManagement.absenceHolesSharpCracks == this.conform) {
      //this.breedingManagement.absenceHolesSharpCracks=this.conform
      this.score = this.score + 10
    }
    if (this.breedingManagement.conditionDoorsWindowsBuilding == this.conform) {
      this.breedingManagement.conditionDoorsWindowsBuilding = this.conform
      this.score = this.score + 10
    }
    if (this.breedingManagement.sealingCeilingBuilding == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.airLeaksBuildings == this.conform) {
      this.score = this.score + 5
    }
    if (this.breedingManagement.cleanlinessHoppers == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.storageVaccines == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.cleanlinessFeeders == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.sufficientNumberFeeders == this.conform) {
      this.score = this.score + 15
    }
    if (
      this.breedingManagement.adjustmentHeightFeedersAccording == this.conform
    ) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.unjustifiedFeedLeaks == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.feedShapeSizeAccordingAge == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.feedTransitionAchieved == this.conform) {
      this.score = this.score + 20
    }
    if (this.breedingManagement.recordingDailFeedConsumption == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.availabilitySufficiencyFeed == this.conform) {
      this.score = this.score + 20
    }

    if (this.breedingManagement.cleanlinessTanksFilters == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.cleanlinessNipples == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.correctOperationWatering == this.conform) {
      this.score = this.score + 10
    }
    if (
      this.breedingManagement.correctOperationPressureRegulator == this.conform
    ) {
      this.score = this.score + 20
    }
    if (this.breedingManagement.sufficientNumberDrinkers == this.conform) {
      this.score = this.score + 20
    }
    if (
      this.breedingManagement.adjustmentHeightDrinkersAccording == this.conform
    ) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.waterLeaks == this.conform) {
      this.score = this.score + 15
    }
    if (
      this.breedingManagement.recordingDailyWaterConsumption == this.conform
    ) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.monitoringPhysicoDw == this.conform) {
      this.score = this.score + 20
    }
    if (this.breedingManagement.monitoringBacteriologicalDw == this.conform) {
      this.score = this.score + 20
    }

    if (this.breedingManagement.dosingPumpCompliant == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.cleanlinessBrooders == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.correctDistributionBrooders == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.availLocationFunct == this.conform) {
      this.score = this.score + 20
    }
    if (this.breedingManagement.observanceHeatingProgram == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.stateCoolingSystem == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.correctOperationCoolingSystem == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.fansMaintained == this.conform) {
      this.score = this.score + 25
    }
    if (this.breedingManagement.properOperationFans == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.hatchOpeningLevel == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.observanceAirFlow == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.dailyRecordMinMaxTemp == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.recordMinmaxDailyHumidity == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.breedingHumidityConfor == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.energySavingLamps == this.conform) {
      this.score = this.score + 5
    }
    if (this.breedingManagement.numberWorkingLamps == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.adequateDistriLamps == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.litterQuality == this.conform) {
      this.score = this.score + 15
    }
    if (
      this.breedingManagement.mechanicalThermostatAlarmFunct == this.conform
    ) {
      this.score = this.score + 20
    }
    if (this.breedingManagement.functionalTechParaDisplaySys == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.numberBirdCageSquareMeter == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.isolationSickSickAnimals == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.compliantWeighingMethod == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.samplingCompliant == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.weighingRecording == this.conform) {
      this.score = this.score + 15
    }
    if (
      this.breedingManagement.evolutionWeightComparedStandard == this.conform
    ) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.complianceVaccinProgram == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.monitoringVaccinationAge == this.conform) {
      this.score = this.score + 15
    }
    if (this.breedingManagement.vaccineDoseControl == this.conform) {
      this.score = this.score + 10
    }
    if (this.breedingManagement.technicalPerformance == this.conform) {
      this.score = this.score + 25
    }
    if(this.score<=800 && this.score>=700){
    this.deviation='execelent'
    }
    else if(this.score<700 && this.score>=600){
      this.deviation='Good'
    }
    else if(this.score<600 && this.score>=500){
      this.deviation='Acceptable'
    }
    else if(this.score<500 ){
      this.deviation='Bad'
    }
  }
  
}
