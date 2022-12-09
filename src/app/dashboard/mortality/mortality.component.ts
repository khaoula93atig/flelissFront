import { array } from '@amcharts/amcharts5';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FarmService } from 'src/app/services/farm.service';
import { HouseService } from 'src/app/services/house.service';
import { SubSink } from 'subsink';

import { UserService } from '../../services/user.service';
import Drilldown from 'highcharts/modules/drilldown';
import { ClrDatagrid, ClrIfDetail } from '@clr/angular';
import { DatePipe } from '@angular/common';
Drilldown(Highcharts);

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);



@Component({
  selector: 'app-mortality',
  templateUrl: './mortality.component.html',
  styleUrls: ['./mortality.component.css']
})
export class MortalityComponent implements OnInit {
  public optionsPie: any;
  public optionsChart: any;
  public optionsChart1: any;
  public optionsChart4: any;

  constructor(private UserService: UserService,
    private dashboardService: DashboardService,
    private farmService:FarmService,
    private houseService:HouseService,
    public datepipe: DatePipe) { }
  
  farms:any[]=[]  
  farmId:string
  farmName:string
  centers:any[]=[]
  centerID: string;
  categories:any[]=[]
  details:any[]=[]
  weeklyWeightcenter:any[]=[]
  weeklyWeighthouse:any[]=[]
  categories2:any[]=[]
  details2:any[]=[]
  totalAlert:number
  detailsAlert=false
  alerts:any[]=[]
  alerts1:any[]=[]
  find=false
  find2=false
  mortalityFarm:number=0
  survivalByFarm:number=0
  



  subs: SubSink = new SubSink();
  dataList: any[];
  date= new Date();
  visitDate=this.datepipe.transform(this.date, 'MM-dd-yyyy')

  dynamicArrayFlock: Array<FlockWeight> = [];
  dynamicArrayFlock2: Array<FlockWeight> = [];
  newDynamicEcriture: any = {};
  ch: Array<any> = [];
  ageFlock: Array<any> = [];
  weight: Array<any> = [];

  companyId:string;
  flockID: string;
  HouseID: string;
  
  j: number;

  ngOnInit(): void {

    this.companyId = sessionStorage.getItem('companyID')
    console.log(this.companyId)
    this.getAllFarms()
    this.mortalityHouse();
    this.getweeklyWeightMesurementbyFarm(this.farmId)
  }

  getAllFarms(){
    this.farmService.getConsultingFarm(this.companyId).subscribe(data=>{
      console.log(data)
      this.farms=data
      this.farmId=this.farms[0].farmId
      this.farmName=this.farms[0].farmName
      this.getAllCentersByFarm(this.farmId)
      this.getweeklyWeightMesurementbyFarm(this.farmId)
      this.getAlertByFarm(this.date,this.farmId)
      this.getSurvivalByFarm(this.farmId)
    })
  }
  getSurvivalByFarm(event){
    this.dashboardService.getSurvivalByFarm(event).subscribe(res=>this.survivalByFarm=res)
  }

  getAlertByFarm(date,farmId){
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(date, 'yyyy-MM-dd')
    this.dashboardService.getalertByFarm(formattedDate,farmId).subscribe(data=>{
      this.totalAlert=data.length
     this.alerts=data
     this.alerts1=[]
     if(data.length!=0){
     this.alerts1=[{'centerName':this.alerts[0].centerName,'houseName':[{'house':this.alerts[0].houseName,'alert':[]}]}]
     
     for (let d of data){
      this.find=false
        for(let a1 of this.alerts1){
          if(a1.centerName==d.centerName){
            this.find=true
          }
        }
        if(this.find==true){
          for(let a of this.alerts1){
            this.find2=false
              if(a.centerName==d.centerName){
                for(let h of a.houseName){
                  if(h.house==d.houseName){
                    this.find2=true
                  }
                }
                if(this.find2==true){
                  for(let h1 of a.houseName){
                    if(h1.house==d.houseName){
                      h1.alert.push({'dev':[d.description,d.mesures,d.deviation]})
                    }
                  }
                }else if(this.find2==false){
                  a.houseName.push({'house':d.houseName,'alert':[{'dev':[d.description,d.mesures,d.deviation]}]})
                }
              }
            }
        }else if(this.find==false){
            this.alerts1.push({'centerName':d.centerName,'houseName':[{'house':d.houseName,'alert':[{'deviation':d.deviation}]}]})
          } 
     }
    }
      
    })
  }

  getAllCentersByFarm(event){
    this.categories=[]
    this.houseService.getConsultingCenterbyFarm(event).subscribe(
      (data) => {
        this.centers = data
        for(let center of data){
          this.houseService.getConsultingHouseByCenter(center.centerId).subscribe(data2=>{
            if(data2.length==0){
              this.categories.push({"y": 0,"name": center.centerName,"drilldown": null})
            }
            else{
              this.categories.push({"y": 0,"name": center.centerName,"drilldown": center.centerId})
              this.details.push( {name: center.centerId ,id: center.centerId,data:[]})
            }
    })}
    this.farmService.findById(event).subscribe(data0=>{
      this.farmName=data0[0].farmName})

        this.dashboardService.getMortalityByCenter(event).subscribe(data1=>{
          for(let center of data){
            if(data1.length>0){
              for(let d of data1){
                if(center.centerId==d.centerId){
                  this.getAllHousesByCenter(d.centerId)
                  for(let cat of this.categories){
                    if(cat.name==center.centerName){
                      cat.y=d.percentage
                    }

                  }
                }
              }
            }
            
          }
        this.mortalityHouse()
        })
       
      }
    )
    
  }
  getAllHousesByCenter(centerId){
    this.houseService.getConsultingHouseByCenter(centerId).subscribe(data2=>{
      for(let d2 of data2){
        for(let detail of this.details){
          if(detail.id==centerId){
            detail.data.push([d2.houseName,0])
          }
        }
        this.dashboardService.getMortalityByHouse(centerId).subscribe(data3=>{
          for(let detail of this.details){
            if(detail.id==centerId){
              for(let d3 of data3 ){
                this.houseService.gethouse(d3.houseId).subscribe(data4=>{
                  for(let d of detail.data){
                    if(data4[0].houseName==d[0]){
                       d[1]=d3.percentage
                      
                    }
                  }
      })
              }
              
            }
          }
        })
        }
    })
  }
  

  mortalityHouse() {
    this.optionsChart = {
      chart: {
        type: "bar",
        zoomType: "y",
      },
      title: {
        align: 'left',
        text: 'Mortality by center'
      },
      subtitle: {
        align: 'left',
        text: 'Click the columns to view details.'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Total percent mortality'
        }
    
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },
    
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.data[0].name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
    
      series: [
        {
          name: "Centers",
          colorByPoint: true,
          data:this.categories}],
      drilldown: {
        breadcrumbs: {
          position: {
            align: 'right'
          }
        },
        series: this.details
      }}
    Highcharts.chart('chartBreedMortality', this.optionsChart);

  }

  gethousesofcenter(centerId){
    this.houseService.getConsultingHouseByCenter(centerId).subscribe(data2=>{
      for(let h of data2){
        this.weeklyWeighthouse.push({'center':centerId,'house':h.houseId,'houseName':h.houseName,'excellent':0,'average':0 , 'poor':0})
      }
      this.dashboardService.getweeklyweightbyCenterforHouse(centerId).subscribe(res=>{
        for(let d of res){
          for(let w1 of this.weeklyWeighthouse){
            if(w1.house==d.houseId){
              if(d.uniformity>=80){
                w1.excellent=w1.excellent+1
              }else if(d.uniformity<80 && d.uniformity>=68){
                w1.average=w1.average+1
              }else if(d.uniformity<68){
                w1.poor=w1.poor+1
              }
              
            }
          }

        }
        for(let wei of this.weeklyWeighthouse){
          for(let d of this.details2){
            if(d.id=='excellent'+wei.center){
              let exist=false
              for(let d1 of d.data){
              if(d1[0]==wei.houseName){
                d1[1]=wei.excellent
                exist=true
              }
            }
            if(exist==false){
               d.data.push([wei.houseName,wei.excellent])
              }
             
            }else if(d.id=='average'+wei.center){
              let exist1=false
              for(let d1 of d.data){
              if(d1[0]==wei.houseName){
                d1[1]=wei.average
                exist1=true
              }
            }
            if(exist1==false){
               d.data.push([wei.houseName,wei.average])
              }
            }else if(d.id=='poor'+wei.center){
              let exist2=false
              for(let d1 of d.data){
              if(d1[0]==wei.houseName){
                d1[1]=wei.poor
                exist2=true
              }
            }
            if(exist2==false){
               d.data.push([wei.houseName,wei.poor])
              }
            }

          }
        }
      })
        
      
  })

  }

getweeklyWeightMesurementbyFarm(event){
this.weeklyWeightcenter=[]
this.weeklyWeighthouse=[]
this.categories2=[{name:'excellent', color:'#02675c', data:[]},
{name:'average',color:'#ffd100',data:[]},
{name:'poor',color:'#FF3300',data:[]}]
this.details2=[]
    this.dashboardService.getweeklyweightbyFarmforcenter(event).subscribe(data=>{
      this.houseService.getConsultingCenterbyFarm(event).subscribe(
        (data1) => {
      for(let c of data1){
        this.weeklyWeightcenter.push({'center':c.centerId,'centerName':c.centerName,'excellent':0,'average':0 , 'poor':0})
        this.details2.push({name:'excellent', id:'excellent'+c.centerId, data:[]},
        {name:'average', id:'average'+c.centerId, data:[]},
        {name:'poor', id:'poor'+c.centerId, data:[]})
        this.gethousesofcenter(c.centerId)
      }
      for(let d of data){
        for(let w of this.weeklyWeightcenter){
          if(w.center==d.centerId){
            if(d.uniformity>=80){
              w.excellent=w.excellent+1
            }else if(d.uniformity<80 && d.uniformity>=68){
              w.average=w.average+1
            }else if(d.uniformity<68){
              w.poor=w.poor+1
            }
            
          }
          
        }
        
      }
      
    
    
    for(let wei of this.weeklyWeightcenter){
      this.categories2[0].data.push({name: wei.centerName, y: wei.excellent,drilldown: 'excellent'+wei.center})
      this.categories2[1].data.push({name: wei.centerName, y: wei.average,drilldown: 'average'+wei.center})
      this.categories2[2].data.push({name: wei.centerName, y: wei.poor,drilldown: 'poor'+wei.center})
    }
    this.weeklyWeightByhouse()
        })
    })

   }

   weeklyWeightByhouse(){
    this.optionsChart4 = {
      chart: {
        type: 'bar'
      },
      title: {
        align: 'left',
        text: 'Uniformity by centers'
      },
      subtitle: {
        align: 'left',
        text: 'Click the columns to view details.'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total percent uniformity'
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
          series: {
            stacking: 'normal',
            //borderWidth: 0,
            dataLabels: {
              enabled: true,
              inside:true,
              //format: '{point.y}',
          
            }
          }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
      },
      series: this.categories2,
    drilldown: {
      breadcrumbs: {
        position: {
          align: 'right'
        }
      },
      series:this.details2
    }
    }
    Highcharts.chart('chartweeklyweightByFarmUniformity', this.optionsChart4);
   }







}
export interface FlockWeight {

  ageFlock: Array<number>;
  weight: Array<number>;
  flockID: string;
  HouseID: string;
  centerID: string;
}