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
import { ToastrService } from 'ngx-toastr'
import * as echarts from 'echarts/lib/echarts'
import * as Highcharts from 'highcharts';
import { FlockService } from 'src/app/services/flock.service'

@Component({
  selector: 'app-weekly-weight',
  templateUrl: './weekly-weight.component.html',
  styleUrls: ['./weekly-weight.component.css'],
})
export class WeeklyWeightComponent implements OnInit {

  public optionsChart: any;
  dynamicArray: Array<WeeklyDynamicGrid> = []
  newDynamic: any = {}
  week: number
  weightcalcul: number
  weightMeasure: number = 0
  flockName:string
  
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
  showDeviation: boolean = false
  disabledSave: boolean = true

  maxWeight=0
  minWeight=0
  cv : number=0
  uniformity : number=0
  average: number=0
  bornInf:number =0
  bornSup:number =0
  outOff:number=0
  standardWeightResult:number=0
  exist=false
  weeklyWeightOfFlock:any[]=[]

  options: any;
  weights:any[]=[]
  beards: any[]=[]
  counts=[{'value':'0-0.2' , 'count':0},{'value':'0.2-0.4' , 'count':0},{'value':'0.4-0.6' , 'count':0},{'value':'0.6-0.8' , 'count':0},{'value':'0.8-1' , 'count':0},{'value':'1-1.2' , 'count':0},{'value':'1.2-1.4' , 'count':0}
   ,{'value':'1.4-1.6' , 'count':0},{'value':'1.8-2' , 'count':0},{'value':'2-2.2' , 'count':0},{'value':'2.2-2.4' , 'count':0},
   {'value':'2.4-2.6' , 'count':0},{'value':'2.6-2.8' , 'count':0},{'value':'2.8-3' , 'count':0},{'value':'>3' , 'count':0}
  ]

  constructor(
    private HouseService: HouseService,
    private VisitService: VisitService,
    private DashboardService: DashboardService,
    private toaster: ToastrService,
    private flockService: FlockService
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
  addRow() {
    this.newDynamic = { week: this.week, weight: 0, nbr: this.dynamicArray.length+1}
    this.dynamicArray.push(this.newDynamic)
    this.compteur = this.dynamicArray.length
    return true
  }
  submitWeight(): void {
    this.maxWeight=this.dynamicArray[0].weight
    this.minWeight=this.dynamicArray[0].weight
    this.weightMeasure=0
    this.cv=0
    //calcul average 
    for (var i = 0; i < this.dynamicArray.length; i++) {
      this.weightMeasure=this.weightMeasure+this.dynamicArray[i].weight
      if(this.maxWeight<this.dynamicArray[i].weight){
        this.maxWeight=this.dynamicArray[i].weight
      }
      if(this.minWeight>this.dynamicArray[i].weight){
        this.minWeight=this.dynamicArray[i].weight
      }
    }

    console.log('max',this.maxWeight)
    console.log('min',this.minWeight)

    this.average = parseFloat((this.weightMeasure / this.dynamicArray.length).toFixed(2))

    //calclul range of weight
    this.bornSup = parseFloat((this.average+((this.average/100)*10)).toFixed(2))
    this.bornInf = parseFloat((this.average-((this.average/100)*10)).toFixed(2))

//calcul uniformity
    for (var i = 0; i < this.dynamicArray.length; i++) {
      if(this.dynamicArray[i].weight>this.bornSup || this.dynamicArray[i].weight<this.bornInf)
      this.outOff++
    }
    this.uniformity= parseFloat((((this.dynamicArray.length-this.outOff)/this.dynamicArray.length)*100).toFixed(2))

    //calcul cv
    this.cv = ((this.maxWeight-this.minWeight) / this.average) * 100
    this.cv = parseFloat(this.cv.toFixed(3))
    console.log(this.cv)
    
    //creation objet weekly weight mesurement
    if (
      this.centerId &&
      this.farmID &&
      this.houseId &&
      this.flockID &&
      this.week != null
    ) {
      let weeklyWeightMeasurement: WeeklyWeightMeasurement = new Object() as WeeklyWeightMeasurement
      for (let object of this.dynamicArray) {
        
        weeklyWeightMeasurement.centerId = this.centerId
        weeklyWeightMeasurement.farmId = this.farmID
        weeklyWeightMeasurement.houseId = this.houseId
        weeklyWeightMeasurement.flockId = this.flockID
        weeklyWeightMeasurement.flockNbr = object.nbr
        weeklyWeightMeasurement.weight = object.weight
        weeklyWeightMeasurement.average = this.average
        weeklyWeightMeasurement.week = this.week
        weeklyWeightMeasurement.breed = this.breedId
        weeklyWeightMeasurement.cv=this.cv
        weeklyWeightMeasurement.uniformity=this.uniformity
        //Invoking service
        this.VisitService.saveWeeklyWeight(weeklyWeightMeasurement).subscribe(
          (data) => {
            if (data['response'] == 'OK') {
              //this.toaster.success('Success', 'ajout avec succés')
              //affichage des mesures du flock 
              this.VisitService.getweeklyWeightOfFlock(this.flockID).subscribe(data=>{
                this.weeklyWeightOfFlock=data
                this.showDeviation = true
                Highcharts.chart('container', this.optionsChart);
                //this.getweeklyweightbyBreed()
                })
            } else {
              this.toaster.error('Error', 'operation echouée')
            }
          },
        )
      }
      
    
      //this.initForm()
      
     
    }
  
    // this.Weightclosed = false;
  }
  getCenterId(event) {
    this.centerId = event
    this.houses=[]
    this.flocks=[]
    this.flockName=null
    this.houseId=null
    this.flockID=null
    this.breedId=0
    this.breed=null
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
      for(let i=index; i<this.dynamicArray.length ;i++){
        this.dynamicArray[i].nbr=this.dynamicArray[i].nbr-1
      }

      return true
    }
  }
  getHouseId(event) {
    this.houseId = event
    this.flocks = []
    this.flockID=null
    this.flockName=null
    this.flockService.getFlockExisitsByHouse(this.houseId).subscribe(data=>{
      this.flocks=data
      console.log('flock',this.flocks)
      this.flockID=this.flocks[0].flockID
      this.flockName=this.flocks[0].flockName
      this.breedId=this.flocks[0].breed
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
          this.breed="Ross 308" 
          break; 
       } 
       case 4: { 
        this.breed="Arbor Acres plus" 
        break; 
     } 
     }
    })
  }
  initForm() {
    this.dynamicArray = []
    this.centers=[]
    this.breed=null
    this.ngOnInit()
    this.breeddescription = ''
    this.week = null
    this.flockID = null
    this.houseId = null
    this.centerId = null
    this.flockName=null
    this.average=0
    this.uniformity=0
    this.bornInf=0
    this.bornSup=0
    this.outOff=0
    this.weightMeasure=0
    //console.log(this.dynamicArray)
  }

  showButtonSave() {
    
    if (
      this.centerId &&
      this.houseId &&
      this.flockID &&
      this.week != null
    ){
      this.disabledSave = false
     this.getweeklyweightbyBreed()
    }
  }

  verification(){
    this.VisitService.getweeklyWeightByFlockAndAge(this.week, this.flockID).subscribe(data=>
      {
        console.log('exist',data)
        
        if(data.length!=0){
          this.exist=true
          this.weightMeasure=data[0].average
          console.log(this.exist)
        }
        else{
          this.exist=false
        }
      })
    this.VisitService.getVisitTasksVerification(this.flockID , this.week, 11).subscribe(data=>{
      console.log('exist',data)
        
        if(data.length!=0){
          this.exist=true
          this.weightMeasure=data[0].measure
          console.log(this.exist)
        }
        else{
          this.exist=false
        }
    })  
  }

getweeklyweightbyBreed(){
  /*this. counts=[{'value':'0-0.6' , 'count':0},{'value':'0.6-0.67' , 'count':0},{'value':'0.67-0.74' , 'count':0},{'value':'0.74-0.81' , 'count':0},{'value':'0.81-0.88' , 'count':0}
    ,{'value':'0.88-0.95' , 'count':0},{'value':'0.95-0.1.02' , 'count':0},{'value':'1.02-1.09' , 'count':0},{'value':'1.09-1.16' , 'count':0},
    {'value':'1.16-1.23' , 'count':0},{'value':'1.23-1.3' , 'count':0},{'value':'>1.3' , 'count':0}
   ]*/
   this.counts=[{'value':'0-0.2' , 'count':0},{'value':'0.2-0.4' , 'count':0},{'value':'0.4-0.6' , 'count':0},{'value':'0.6-0.8' , 'count':0},{'value':'0.8-1' , 'count':0},{'value':'1-1.2' , 'count':0},{'value':'1.2-1.4' , 'count':0}
   ,{'value':'1.4-1.6' , 'count':0},{'value':'1.8-2' , 'count':0},{'value':'2-2.2' , 'count':0},{'value':'2.2-2.4' , 'count':0},
   {'value':'2.4-2.6' , 'count':0},{'value':'2.6-2.8' , 'count':0},{'value':'2.8-3' , 'count':0},{'value':'>3' , 'count':0}
  ]
   for(let w of this.dynamicArray)
   {
     if((w.weight>=0) && (w.weight<=200)){
       this.counts[0].count=(this.counts[0].count)+1  
     }
     else if((w.weight>=200) && (w.weight<=400)){
      this.counts[1].count=(this.counts[1].count)+1  
    }
    else if((w.weight>=400) && (w.weight<=600)){
      this.counts[2].count=(this.counts[2].count)+1  
    }
     else if((w.weight>600) && (w.weight<=800)){
       this.counts[3].count=(this.counts[3].count)+1  
     }
     else if(w.weight>800 && w.weight<1000){
       this.counts[4].count=(this.counts[4].count)+1  
     }
     else if(w.weight>1000 && w.weight<1200){
       this.counts[5].count=(this.counts[5].count)+1  
     }
     else if(w.weight>1200 && w.weight<1400){
       this.counts[6].count=(this.counts[6].count)+1  
     }
     else if(w.weight>1400 && w.weight<1600){
       this.counts[7].count=(this.counts[7].count)+1  
     }
     else if(w.weight>1600 && w.weight<1800){
       this.counts[8].count=(this.counts[8].count)+1  
     }
     else if(w.weight>1800 && w.weight<2000){
       this.counts[9].count=(this.counts[9].count)+1  
     }
     else if(w.weight>2000 && w.weight<2200){
       this.counts[10].count=(this.counts[10].count)+1  
     }
     else if(w.weight>2200 && w.weight<2400){
       this.counts[11].count=(this.counts[11].count)+1  
     }
     else if(w.weight>2400 && w.weight<2600){
       this.counts[12].count=(this.counts[12].count)+1  
     }
     else if(w.weight>2600 && w.weight<2800){
      this.counts[13].count=(this.counts[13].count)+1  
    }
    else if(w.weight>2800 && w.weight<3000){
      this.counts[14].count=(this.counts[14].count)+1  
    }
     else if(w.weight>3000){
       this.counts[15].count=(this.counts[15].count)+1  
     }
  
     
   }
   
   console.log(this.counts)
   this.weights=[]
    this.beards=[]
   for(let c of this.counts){
    this.weights.push(c.value)
    this.beards.push(c.count)
   }
   
   this.optionsChart={
    chart: {
      type: 'column',
      height: 350
    },
    title: {
      align: 'center',
      text: 'Number of birds by body weight range'
    },
    xAxis: {
      type: 'category',
      categories: this.weights,
      title: {
        text: 'Body Weight Range'
      }
    },
    yAxis: {
      title: {
        text: 'Number of birds'
      }
  
    },
    plotOptions: {
      series: {
        borderWidth: 0,
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: "Number of birds",
        color: "#02675c",
        data: this.beards
      }
    ]
   }
  }
}