export interface IRegistrationFarms {
  farmName: string
  adress: string
  housesNumber: number
  typeProduction: string
  area: string
  country: string
  town: string
  telNumber: string
  productionDensity: string
  email: string
  breed: string
  agreement: File
  id: string
  address: string
  zone: string
  farmManageName: string
  farmManageEmail: string
  farmManageTel
  bridsNumberPerCenter: number
  numberCenter: number
  result: string
  avMortalityRate: number
  fcr: number
  epef: number
  avLayRate: number
  rotation: number
  manager: IRegistrationUsers
  company: IRegistrationCompany
  companyID: string
  companyName: string

  // Broilers     Pullets   Laying hens   breeders
}
export interface IRegistrationCompany {
  companyId: String
  name: String
  integration: boolean
  farmsNumber: string
  agreement: String
  address: String
  country: String
  zone: String
  generalManageName: String
  generalManageEmail: String
  generalManageTel: String
  annualProduction: String
  creationDate: String
}
export interface IRegistrationHouses {
  houseId: String
  birdsNumber: string
  address: string
  farmID: string
  Farm: IRegistrationFarms
  ventilation: string
  density: BigInteger
  waterSource: string
  area: BigInteger
  feeder: string
  nbrCyclesPerYear: BigInteger
  durationOfRotation: BigInteger
  houseName: string
  centerId: string
}

export interface IRegistrationUsers {
  username: string
  password: string
  name: string
  firstName: string
  role: string
  email: string
  job: string
  farmID: string
  telNumber: string
  companyID: string
}
export interface Center {
  centerId: String
  centerName: String
  address: String
  breed: String
  productionDensity: String
  zone: String
  centerManagerName: String
  housesNumber: number
  centerManagerEmail: String
  centerManagerTel: String
  centerMultiage: String
  nutritionSupervisor: String
  sanitarySupervisor: String
  bridsNumberPerHouse: number
  avMortalityPerFlock: number
  avWaterConsumption: number
  avFeedConsumption: number
  eggProduction: number
  avFcr: number
  avEef: number
  mainDiseases: String
  species: String
  String: String
  farmId: String
}
export interface IRegistrationVisitTasks {
  taskId: string
  visitId: string
  measure: any
  creationDate: Date
  standard: string
  deviation: string
  actionPlan: string
  ageFlock: number
  percentage: number
  breedId: number
}

export interface IRegistrationTask {
  taskId: string
  description: string
  category: string
  creationDate: Date
  measureUnit: string
  Unit: string
}
export interface IRegistrationVisits {
  visitId: string
  username: string
  visitdateString: String

  houseID: string
  frequency: string
  flockID: string
  ageFlock: number
  creationDate: Date

  morbidity: number
  mortality: number
  dwg: number
  eep: number
  total_water_consumption: number
  total_feed_consumption: number
  fcr: number
  typeVisit: string
  statusSave: string
  centerID: string
  farmId: string
}
export class DynamicGrid {
  weight: number
  nbr: number
}
export class WeeklyDynamicGrid {
  weight: number
  nbr: number
  week
}
export class Morbidity {
  nbrMorbidity: number
  nbrTotal: number
}

export class IRegistrationFlocks {
  flockID: string
  houseId: string
  farmId:string
  breed: number
  cycle: number

  chikedPlaced: number
  psOrigin: string
  hatchDateString: String
  startOfCycleString: String
  flockNumber: number
  checkEndOfCycle: boolean
  endOfCycle: Date = new Date()
  flockName: string
  restFlockNumber:number
}
export class IRegistrationHealthStatus {
  health_status_id: number
  description: string
  category: string
}
export class IRegistrationVisitHealthStatus {
  healthStatusId: number
  visitId: string
  measure: boolean
  creationDate: Date
}
export class VisitHealthStatus {
  visitId: String
  prostration: boolean
  anorexia: boolean
  ruffledFeather: boolean
  dehydratation: boolean
  generalObservation: String
  coughing: boolean
  nasalExsudate: boolean
  sneezing: boolean
  trachealRales: boolean
  ocularDischarge: boolean
  conjonctivitis: boolean
  oedema: boolean
  respiratoryObservation: String
  diarrhoea: boolean
  whitish: boolean
  watery: boolean
  mucoid: boolean
  greenish: boolean
  digestiveObservation: String
  locomotionObservation: String
  nervous: String
  dermatitis: String
  otherObservation: String
}
export class VisitNecropsy {
  visitNecropsyObservationId: String
  visitId: String
  externalExamination: String
  bones: String
  legFeet: String
  trachea: String
  thymus: String
  crop: String
  visitthymusId: String
  liver: String
  spleen: String
  kidney: String
  heart: String
  lung: String
  gastroIntestinalTract: String
  bursaFabricius: String
  brain: String
}
export class IRegistrationVisitNecropsy {
  necropsyObservationId: number
  visitId: string
  comment: string
}
export class IRegistrationVisitAudits {
  breedingMnagementId: number
  visitId: string
  measure: boolean
  creationDate: Date
}
export class IchickReception {
  visitDate: Date
  chicReceptionId: string
  centerId: string
  farmId: string
  housesId: string
  flockId: String
  breed: String
  hatchDate: Date
  chickPlaced: String
  psOrigin: String
  psAge: number
  navelNotclosedStrungButton: number
	navelCleanWellHealed : number
	navelClosedSlightAbrasiveness: number
	legsCleanWaxy: number
	legsDrynessPale: number
	legsDeshydratedVienProtruding: number
	hocksCleanNoblemishes: number
	hocksSlightBlushing: number
	hocksRedcolorHeavyblushing: number
	defectsCleanNodefects: number
	defectsMinorDefects: number
	defectsEyeLegsSpraddled: number
	totalScore: number
	creationDate:Date
}
export interface CheckList {
  broodingCheckId: String
  litterDepth: String
  farmId: String
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
  username: String
  date: Date
}
export class WeeklyWeightMeasurement {
  breed: number
  farmId: string
  centerId: string
  houseId: string
  flockId: string
  weight: number
  week: number
  flockNbr: number
  average: number
  cv : number
  uniformity : number
}
export class WeeklyFeed {
  breed: number
  farmId: string
  centerId: string
  houseId: string
  flockId: string
  week: number
  totalStarterFeed: number
  starterFeedPerBird: number
  totalGrowerFeed: number
  growerFeedPerBird: number
  totalFinisherFeed: number
  finisherFeedBird: number
}

export class FlockReport {
  farmName: string
  houseArea: number
  startOfCycle: Date
  endOfCycle: Date
  flockNumber: number
  cycle: number
  restFlockNumber: number
  centerName: string
  breed: string
  houseName: string
  totalMortality: number
  mortaality1Week: number
  totalWeight: number
  totalFeedConsumption: number
  averageDailyGain: number
  fcr: number
  pef: number
  weeklyFeed: WeeklyFeed
}
export class BreedingManagement {
  breedingManagementId: string
  creationDate: Date
  username: string
  farmId: string
  centerId: string
  visitDate: Date
  cleanlinessBuild: string
  absenceHolesSharpCracks: string
  conditionDoorsWindowsBuilding: string
  sealingCeilingBuilding: string
  airLeaksBuildings: string
  cleanlinessHoppers: string
  availabilityWireMeshHopper: string
  cleanlinessFeeders: string
  sufficientNumberFeeders: string
  adjustmentHeightFeedersAccording: string
  unjustifiedFeedLeaks: string
  feedShapeSizeAccordingAge: string
  feedTransitionAchieved: string
  recordingDailFeedConsumption: string
  availabilitySufficiencyFeed: string
  cleanlinessTanksFilters: string
  cleanlinessNipples: string
  correctOperationWatering: string
  correctOperationPressureRegulator: string
  sufficientNumberDrinkers: string
  adjustmentHeightDrinkersAccording: string
  waterLeaks: string
  recordingDailyWaterConsumption: string
  monitoringPhysicoDw: string
  monitoringBacteriologicalDw: string
  dosingPumpCompliant: string
  cleanlinessBrooders: string
  correctDistributionBrooders: string
  availLocationFunct: string
  observanceHeatingProgram: string
  stateCoolingSystem: string
  correctOperationCoolingSystem: string
  fansMaintained: string
  properOperationFans: string
  hatchOpeningLevel: string
  observanceAirFlow: string
  dailyRecordMinMaxTemp: string
  recordMinmaxDailyHumidity: string
  breedingHumidityConfor: string
  energySavingLamps: string
  numberWorkingLamps: string
  adequateDistriLamps: string
  litterQuality: string
  mechanicalThermostatAlarmFunct: string
  functionalTechParaDisplaySys: string
  numberBirdCageSquareMeter: string
  isolationSickSickAnimals: string
  compliantWeighingMethod: string
  samplingCompliant: string
  weighingRecording: string
  evolutionWeightComparedStandard: string
  complianceVaccinProgram: string
  monitoringVaccinationAge: string
  vaccineDoseControl: string
  technicalPerformance: string
  scoring: number
}
