import { array } from '@amcharts/amcharts5'
import { Component, OnInit, ViewChild } from '@angular/core'
import { AutofocusDirective } from 'src/app/shared/autofocus.directive'
import {
  DynamicGrid,
  WeeklyDynamicGrid,
  WeeklyWeightMeasurement,
} from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { HouseService } from '../../services/house.service'
import { VisitService } from '../../services/visit.service'
import { DashboardService } from '../../services/dashboard.service';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position'

@Component({
  selector: 'app-weekly-weight',
  templateUrl: './weekly-weight.component.html',
  styleUrls: ['./weekly-weight.component.css'],
})
export class WeeklyWeightComponent implements OnInit {
  dynamicArray: Array<WeeklyDynamicGrid> = []
  newDynamic: any = {}
  week: number
  weightcalcul: number
  weightMeasure: number = 0
  nbrbirds: number
  measureWeight: any
  breed: string
  visitDate: string
  farmID: string
  subs: SubSink = new SubSink()
  centers: any[] = []
  centerId: string
  houses: any[] = []
  houseId: string
  flocks: any[] = []
  breeddescription: string
  breedId: number
  flockID: string
  compteur: number = 0
  succesMsg: string = null
  dangerMsg: string = null
  showDeviation: boolean = false
  disabledSave: boolean = true

  options: any;
  options1: any;
  standard:any[]=[]
  exists : any[]=[]
  ageStandard:any[]=[]
  ageExists:any[]=[]
  
  constructor(
    private HouseService: HouseService,
    private VisitService: VisitService,
    private DashboardService: DashboardService,
  ) {}

  ngOnInit(): void {
    this.newDynamic = { week: this.week, weight: 0, nbr: 1 }
    this.dynamicArray.push(this.newDynamic)
    localStorage.setItem('getId', '') //store id
    //get all farm by company
    var companyID = sessionStorage.getItem('companyID')
    this.farmID = sessionStorage.getItem('farmID')
    this.subs.add(
      this.HouseService.getConsultingCenterbyFarm(this.farmID).subscribe(
        (data) => {
          this.centers = data
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

  onSubmit() {
    console.log('ok2')
  }
  // Weight measurement
  addRow(index) {
    this.newDynamic = { week: this.week, weight: 0, nbr: index + 1 }
    this.dynamicArray.push(this.newDynamic)
    this.compteur = index + 1
    return true
  }
  submitWeight(): void {
    for (var i = 0; i < this.dynamicArray.length; i++) {
      //console.log('weight' + this.dynamicArray[i].weight.toString())
      //this.weightcalcul = this.dynamicArray[i].weight * this.dynamicArray[i].nbr;
      //this.weightMeasure += this.dynamicArray[i].weight;
      this.weightMeasure += parseFloat(this.dynamicArray[i].weight.toString())
      /*console.log(
        'this.dynamicArray[i].nbr.toString()' +
          this.dynamicArray[this.dynamicArray.length - 1].nbr.toString(),
      )*/
      this.nbrbirds = parseFloat(
        this.dynamicArray[this.dynamicArray.length-1].nbr.toString(),
      )
    }

    this.weightMeasure = this.weightMeasure / this.nbrbirds
    if (
      this.centerId &&
      this.farmID &&
      this.houseId &&
      this.flockID &&
      this.week != null
    ) {
      for (let object of this.dynamicArray) {
        let weeklyWeightMeasurement: WeeklyWeightMeasurement = new Object() as WeeklyWeightMeasurement
        weeklyWeightMeasurement.centerId = this.centerId
        weeklyWeightMeasurement.farmId = this.farmID
        weeklyWeightMeasurement.houseId = this.houseId
        weeklyWeightMeasurement.flockId = this.flockID
        weeklyWeightMeasurement.flockNbr = object.nbr
        weeklyWeightMeasurement.weight = object.weight
        weeklyWeightMeasurement.average = this.weightMeasure
        weeklyWeightMeasurement.week = this.week
        weeklyWeightMeasurement.breed = this.breedId
        //Invoking service
        this.VisitService.saveWeeklyWeight(weeklyWeightMeasurement).subscribe(
          (data) => {
            if (data['response'] == 'OK') {
              this.succesMsg = data['message']
              this.showDeviation = true
            } else {
              this.dangerMsg = data['message']
            }
          },
        )
      }
      this.initForm()
    }
    // this.Weightclosed = false;
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
  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      return false
    } else {
      this.dynamicArray.splice(index, 1)

      return true
    }
  }
  getHouseId(event) {
    this.houseId = event
    this.flocks = new Array()
    this.subs.add(
      this.VisitService.getConsultingFlock(this.houseId).subscribe((data) => {
        for (let element of data) {
          if (element.checkEndOfCycle == false) this.flocks.push(element)
        }
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

          for (let i of this.flocks) {
            // get breed
            if ((i.breed = i.breedObject.breedID)) {
              this.breeddescription = i.breedObject.description
              this.breedId = i.breedObject.breedID
            }
          }
        },
      ),
    )
  }
  initForm() {
    this.dynamicArray = new Array()
    this.ngOnInit()
    this.breeddescription = ''
    this.week = null
    this.flockID = null
    this.houseId = null
    this.centerId = null
  }

  showButtonSave() {
    
    if (
      this.centerId &&
      this.houseId &&
      this.flockID &&
      this.week != null &&
      this.dynamicArray.length >= 0
    ){
      this.disabledSave = false
      switch(this.breedId) { 
        case 1: { 
           this.breed="Hubbard"
           break; 
        } 
        case 2: { 
          this.breed="Cobb 500" 
           break; 
        } 
        case 3: { 
          this.breed="Ross" 
          break; 
       } 
       case 4: { 
        this.breed="Arbor Acres plus" 
        break; 
     } 
     } 
      this.getweeklyweightbyBreed()
      
    }
  }

getweeklyweightbyBreed(){
 this.standard=[]
  this.exists=[]
    this.DashboardService.getweeklyweightByBreed(this.breedId, this.flockID,this.farmID).subscribe(data=>{console.log(data)
      this.DashboardService.getweeklyweightStandardBybreed(this.breedId).subscribe(data1=>
        {
          for(let w of data1)
          {
            this.standard.push(w.weight)
            this.ageStandard.push(w.age)
          }
          
        
      for(let w of data)
        {
          this.exists.push(w.averge)
          this.ageExists.push(w.week)
        }
      this.options = {
        animationDuration: 100000,
        title: {
          text: 'Weekly weight by breed',
          left: 'center' 
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          right: 15,
          feature: {
            saveAsImage: {title: "Save as Image"}
          }
        },
        legend: {
          orient: 'vertical',
    right: 10,
    top: 'center'

        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [7 , 14 ,21 ,28 ,35 , 42 ,49]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Exist',
            type: 'line',
            data: this.exists
          },
          {
            name: 'Standard',
            type: 'line',
            data: this.standard
          }
        ]
      };
    
    })
  })
  }
}
