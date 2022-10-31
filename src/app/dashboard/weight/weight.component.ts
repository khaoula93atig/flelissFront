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
  ageStandard:any[]=[]
  ageExists:any[]=[]
  farmId:string
  flocks:any[]=[]
  flock:string
  breed: string
  breedId:number
  constructor(private DashboardService: DashboardService, 
    private HouseService: HouseService,
    private flockService:FlockService) { }

  ngOnInit(): void {
    this.options = {
      title: {
        text: 'Stacked Line'
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
    this.farmId = sessionStorage.getItem('farmID')
    this.getflockbyfarmid()
  }

  getflockbyfarmid(){
    this.flockService.findbyFarm(this.farmId).subscribe(data=>
      this.flocks=data)
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
  


}
