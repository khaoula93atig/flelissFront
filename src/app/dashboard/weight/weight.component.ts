import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FlockService } from 'src/app/services/flock.service';
import { SubSink } from 'subsink';
import { DashboardService } from '../../services/dashboard.service';
import { HouseService } from '../../services/house.service';
@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent implements OnInit {

  options: any;
  options1: any;
  standard:any[]=[]
  exists : any[]=[]
  date=new Date();
  beards:any[]=[]
 counts=[{'value':'0-0.6' , 'count':0},{'value':'0.6-0.67' , 'count':0},{'value':'0.67-0.74' , 'count':0},{'value':'0.74-0.81' , 'count':0},{'value':'0.81-0.88' , 'count':0}
 ,{'value':'0.88-0.95' , 'count':0},{'value':'0.95-0.1.02' , 'count':0},{'value':'1.02-1.09' , 'count':0},{'value':'1.09-1.16' , 'count':0},
 {'value':'1.16-1.23' , 'count':0},{'value':'1.23-1.3' , 'count':0},{'value':'>1.3' , 'count':0}
]
 weights:any[]=[]
  ageStandard:any[]=[]
  ageExists:any[]=[]
  farmId:string
  flocks:any[]=[]
  flock:string
  breed: string
  breedId:number
  day=7
  constructor(private DashboardService: DashboardService, 
    private HouseService: HouseService,
    private flockService:FlockService) { }

  ngOnInit(): void {
    
    this.farmId = sessionStorage.getItem('farmID')
    this.getflockbyfarmid()
    
    
  }

  getflockbyfarmid(){
    this.flockService.findbyFarm(this.farmId).subscribe(data=>{
      this.flocks=data,
       this.flock=this.flocks[0].flockID,
       this.getflockbyid()
       this.getweeklyweightbyBreed()
    this.getweeklyweightnbreOfOiseaux()
       console.log(this.flock+' '+this.breedId)})
  }
  getflockbyid(){
    for(let f of this.flocks){
      if(this.flock==f.flockID){
        this.breedId=f.breed
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
      }
    }
  }
 

  getweeklyweightbyBreed(){
 console.log('test')
  this.standard=[]
  this.exists=[]
    this.DashboardService.getweeklyweightByBreed(this.breedId, this.flock,this.farmId).subscribe(data=>{console.log(data)
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
        title: {
          text: 'Weekly weight by breed'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Standard', 'Exist']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
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

  getweeklyweightnbreOfOiseaux(){
    this.weights=[]
    this.beards=[]
    this. counts=[{'value':'0-0.6' , 'count':0},{'value':'0.6-0.67' , 'count':0},{'value':'0.67-0.74' , 'count':0},{'value':'0.74-0.81' , 'count':0},{'value':'0.81-0.88' , 'count':0}
    ,{'value':'0.88-0.95' , 'count':0},{'value':'0.95-0.1.02' , 'count':0},{'value':'1.02-1.09' , 'count':0},{'value':'1.09-1.16' , 'count':0},
    {'value':'1.16-1.23' , 'count':0},{'value':'1.23-1.3' , 'count':0},{'value':'>1.3' , 'count':0}
   ]
    this.DashboardService.getweeklyWeightByNombreOfOieaux(this.breedId, this.flock,this.farmId, this.day).subscribe(data=>{
      
      console.log(data)
      this.DashboardService.getstandardweeklyWeightByBreedAndage(this.breedId,this.day).subscribe(data1=>
        {
          console.log('oiseaux',data1)
      for(let w of data)
        {


          if((w.weight>=0) && (w.weight<=600)){
            this.counts[0].count=(this.counts[0].count)+1  
          }
          else if((w.weight>600) && (w.weight<=670)){
            this.counts[1].count=(this.counts[1].count)+1  
          }
          else if(w.weight>670 && w.weight<740){
            this.counts[2].count=(this.counts[2].count)+1  
          }
          else if(w.weight>740 && w.weight<810){
            this.counts[3].count=(this.counts[3].count)+1  
          }
          else if(w.weight>810 && w.weight<880){
            this.counts[4].count=(this.counts[4].count)+1  
          }
          else if(w.weight>880 && w.weight<950){
            this.counts[5].count=(this.counts[5].count)+1  
          }
          else if(w.weight>950 && w.weight<1020){
            this.counts[6].count=(this.counts[6].count)+1  
          }
          else if(w.weight>1020 && w.weight<1090){
            this.counts[7].count=(this.counts[7].count)+1  
          }
          else if(w.weight>1090 && w.weight<1160){
            this.counts[8].count=(this.counts[8].count)+1  
          }
          else if(w.weight>1160 && w.weight<1230){
            this.counts[9].count=(this.counts[9].count)+1  
          }
          else if(w.weight>1230 && w.weight<1300){
            this.counts[10].count=(this.counts[10].count)+1  
          }
          else if(w.weight>1300){
            this.counts[11].count=(this.counts[11].count)+1  
          }
       
          
        }
        for(let c of this.counts){
          this.weights.push(c.value)
          this.beards.push(c.count)
        }
        console.log(this.counts)
      this.options1 = {
        title: {
          text: 'weight of flocks'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Standard', 'Exist']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          data: this.weights 
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Exist',
            type: 'bar',
            data: this.beards
          }/*,
          {
            name: 'Standard',
            type: 'bar',
            data: [data1]
          }*/
        ]
      };
    
    })
  })
  }
  


}
