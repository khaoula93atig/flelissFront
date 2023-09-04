import { array } from '@amcharts/amcharts5';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FarmService } from 'src/app/services/farm.service';
import { HouseService } from 'src/app/services/house.service';
import { SubSink } from 'subsink';

import { UserService } from '../../services/user.service';
import Drilldown from 'highcharts/modules/drilldown';
import { DatePipe } from '@angular/common';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { FlockService } from 'src/app/services/flock.service';
import { ActivatedRoute } from '@angular/router';
am4core.useTheme(am4themes_animated);
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
  public optionsChart3: any;
  public chart :any;
  public optionsChart2 :any;
  public optionsChart5 :any;
  public optionsChart6 :any;
  public optionsChart7 :any;
  public optionsChart8 :any;

  constructor(private UserService: UserService,
    private dashboardService: DashboardService,
    private farmService:FarmService,
    private houseService:HouseService,
    private flockService:FlockService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    ) { }
  
  farms:any[]=[]  
  farmId:string
  farmName:string
  centers:any[]=[]
  centerID: string;
  houses:any[]=[]
  houseId:string
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
  mortalityByHousedaily:number=0
  mortalityByHouseyestarday:number=0
  survivalByhouse:number=0
  decreaseMortality=0
  feedhousedaily=0
  feedhouseYestrday=0
  decreasefeed=0
  totalFeed=0
  waterConsm=0
  waterConsumTotal=0
  weightdaily=0
  cv=0

  date= new Date();
  visitDate=this.datepipe.transform(this.date, 'MM-dd-yyyy')
  companyId:string;
  ageofflock:number
  standard:any[]=[]
  exists : any[]=[]
  ageStandard:any[]=[]
  ageExists:any[]=[]
  breed:number
  flockId:string
  

  ngOnInit(): void {

    
    this.companyId = localStorage.getItem('companyID')
    console.log(this.companyId)
    this.getDetailsAlertsByHouse()
    this.getAllFarms()
    this.mortalityHouse();
    this.getweeklyWeightMesurementbyFarm(this.farmId)
    
  }

  getAllFarms(){
    this.farmService.getConsultingFarm(this.companyId).subscribe(data=>{
      console.log(data)
      this.farms=data
      this.farmId=this.route.snapshot.paramMap.get('farmID')
      if(this.farmId==null){
      this.farmId=this.farms[0].farmId
      this.farmName=this.farms[0].farmName}
      this.getAllCentersByFarm(this.farmId)
      this.getweeklyWeightMesurementbyFarm(this.farmId)
      this.getAlertByFarm(this.date,this.farmId)
      this.getSurvivalByFarm(this.farmId)
      this.getMortalityByFarm(this.farmId)
    })
  }
  getSurvivalByFarm(event){
    this.dashboardService.getSurvivalByFarm(event).subscribe(res=>this.survivalByFarm=res)
  }

  getMortalityByFarm(event){
    this.dashboardService.getMortalityCountByFarm(event).subscribe(res=>this.mortalityFarm=res)
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
    this.details=[]
    this.houseService.getConsultingCenterbyFarm(event).subscribe(
      (data) => {
        this.centers = data
        if(data.length!=0){
          this.centerID= data[0].centerId
          this.getAllhouseByCenterFordetails(this.centerID)
          console.log(this.centerID)
        for(let center of data){
          this.houseService.getConsultingHouseByCenter(center.centerId).subscribe(data2=>{
            if(data2.length==0){
              this.categories.push({"name": center.centerName,"y": 0,"drilldown": null})
            }
            else{
              this.categories.push({"name": center.centerName,"y": 0,"drilldown": center.centerId})
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
          console.log('cat1',this.categories)
        this.mortalityHouse()
        })
       
      }
      else{
        this.mortalityHouse()
      }
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
      colors: ['#004C50', '#00939C', '#10ABB4', '#9C3E00', '#502000',
      '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
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
this.categories2=[{name:'Excellent', color:'#04A794', data:[]},
{name:'Average',color:'#FBB94F',data:[]},
{name:'Poor',color:'#FC7878',data:[]}]
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
            dataLabels: {
              enabled: true,
              inside:true,
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
    Highcharts.chart('chartweeklyweightByFarmUniformity1', this.optionsChart4);
   }

   getAlertbyhouse(event){
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(this.date, 'yyyy-MM-dd')
   this.dashboardService.getalertByhouse('2023-01-12',event).subscribe(data=>{
    console.log('house',data)
    this.getDetailsAlertsByHouse()
    this.chart.data = data
  })
}

getDetailsAlertsByHouse(){
  this.chart = am4core.create("chartDetailsAlerts", am4charts.PieChart)
  
  // Add and configure Series
  let pieSeries = this.chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "count";
  pieSeries.dataFields.category = "description";
  this.chart.innerRadius = am4core.percent(50);
  pieSeries.colors.list = [
    am4core.color("#e81a22"),
    am4core.color("#ba2324"),
    am4core.color("#ea4f54"),
    am4core.color("#b03b3f"),
    am4core.color("#f2686d"),
    am4core.color("#f59a9d"),
    am4core.color("#fab3b6"),
    am4core.color("#faccce"),
    am4core.color("#fce7e9"),
  ];

// Disable ticks and labels
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

// Disable tooltips
pieSeries.slices.template.tooltipText = "{category}";
pieSeries.tooltip.label.interactionsEnabled = true;
pieSeries.tooltip.keepTargetHover = true;


var label = pieSeries.createChild(am4core.Label);
label.text = "[fontSize:18px]Total alerts[/]:\n[bold fontSize:40px]{values.value.sum}[/] ";
label.horizontalCenter = "middle";
label.verticalCenter = "middle";
label.textAlign = "middle";
label.fontSize = 22;





 
}

getMortalityByhouseDaily(house){
  this.mortalityByHousedaily=0
  this.mortalityByHouseyestarday=0
  this.decreaseMortality=0
  let date1 = new Date()
  const datepipe: DatePipe = new DatePipe('en-Fr')
  let formatedDate = datepipe.transform(date1, 'yyyy-MM-dd')
  this.dashboardService.getMortalityCountByHouse(house,'2023-01-12').subscribe(data=>{
    console.log('todya',data)
    this.mortalityByHousedaily=data
  })
  date1.setDate(date1.getDate() - 1)
  let formatedDate1 = datepipe.transform(date1, 'yyyy-MM-dd')
  this.dashboardService.getMortalityCountByHouse(house,'2023-01-12').subscribe(data=>{
    console.log('yest',data)
    this.mortalityByHouseyestarday=data
    this.decreaseMortality=this.mortalityByHousedaily-this.mortalityByHouseyestarday
    console.log(this.decreaseMortality)
  })
  
}

getSurvivalByHouse(house){
  this.survivalByhouse=0
  this.dashboardService.getSurvivalByhouse(house).subscribe(data=>{
    console.log(data)
    this.survivalByhouse=data
  })
}

getWaterConsumpDaily(house){
  this.waterConsm=0
  let date1 = new Date()
  const datepipe: DatePipe = new DatePipe('en-Fr')
  let formatedDate = datepipe.transform(date1, 'yyyy-MM-dd')
  this.dashboardService.getwaterconsumptionByHouseDaily('2023-01-12',house).subscribe(data=>{
    this.waterConsm=data
    console.log('waterConsm',data)
  })

}

getWeightDaily(house){
  this.weightdaily=0
  let date1 = new Date()
  const datepipe: DatePipe = new DatePipe('en-Fr')
  let formatedDate = datepipe.transform(date1, 'yyyy-MM-dd')
  this.dashboardService.getweightByHouseDaily('2023-01-12',house).subscribe(data=>{
    this.weightdaily=data
    console.log('weight',data)
  })

}

getCV(house){
  this.cv=0
  let date1 = new Date()
  const datepipe: DatePipe = new DatePipe('en-Fr')
  let formatedDate = datepipe.transform(date1, 'yyyy-MM-dd')
  this.dashboardService.getcvByHouseDaily('2023-01-12',house).subscribe(data=>{
    this.cv=data
    console.log('cv',data)
  })

}
getBreedOfHouse(house){
  this.houseService.getbreedofhouse(house).subscribe(data=>{
    this.breed=data
    console.log('breed',this.breed)
    this.flockService.getFlockExisitsByHouse(house).subscribe(data=>{
      this.flockId=data[0].flockID
      this.getweeklyweightbyBreed()
      console.log('flock',this.flockId)})
  })
  
}

getWaterTotal(house){
  this.waterConsumTotal=0
  let date1 = new Date()
  const datepipe: DatePipe = new DatePipe('en-Fr')
  let formatedDate = datepipe.transform(date1, 'yyyy-MM-dd')
  this.dashboardService.getwaterconsumptionTotalByHouse('2023-01-12',house).subscribe(data=>{
    this.waterConsumTotal=data
    console.log('waterConsmTotal',data)
  })

}

getfeedByhouseDaily(house){
  this.feedhousedaily=0
  this.feedhouseYestrday=0
  this.decreasefeed=0
  let date1 = new Date()
  const datepipe: DatePipe = new DatePipe('en-Fr')
  let formatedDate = datepipe.transform(date1, 'yyyy-MM-dd')
  this.dashboardService.getfeedByhouse('2023-01-12',house).subscribe(data=>{
    this.feedhousedaily=data
    console.log('todyafeed',data)
  })

  date1.setDate(date1.getDate() - 1)
  let formatedDate1 = datepipe.transform(date1, 'yyyy-MM-dd')
  this.dashboardService.getfeedByhouse('2023-01-12',house).subscribe(data=>{
    this.feedhouseYestrday=data
    console.log('yestfeed',data)
    this.feedhouseYestrday=data
    this.decreasefeed=this.feedhousedaily-this.feedhouseYestrday
    console.log(this.decreasefeed)
  })
}
getTotalFood(house){
  this.totalFeed=0
  const datepipe: DatePipe = new DatePipe('en-Fr')
  let formatedDate = datepipe.transform(this.date, 'yyyy-MM-dd')
  this.dashboardService.gettotalFeedByhouse('2023-01-12',house).subscribe(data=>{
    this.totalFeed=data
  })
}

getAllhouseByCenterFordetails(event){
  this.mortalityByHousedaily=0
  this.mortalityByHouseyestarday=0
  this.survivalByhouse=0
  this.decreaseMortality=0
  this.feedhousedaily=0
  this.feedhouseYestrday=0
  this.decreasefeed=0
  this.totalFeed=0
  this.cv=0
  this.waterConsm=0
  this.waterConsumTotal=0
  this.weightdaily=0
  this.houseService.getConsultingHouseByCenter(event).subscribe(data=>{
    this.houses=data
    this.houseId=data[0].houseId
    this.getAlertbyhouse(this.houseId)
    this.getMortalityByhouseDaily(this.houseId)
    this.getSurvivalByHouse(this.houseId)
    this.getfeedByhouseDaily(this.houseId)
    this.getTotalFood(this.houseId)
    this.getageofflock(this.houseId)
    this.getFeedByHouseofLastDays(this.houseId)
    this.getMortalityByHouseofLastDays(this.houseId)
    this.getWeightByHouseofLastDays(this.houseId)
    this.getwaterByHouseofLastDays(this.houseId)
    this.getWaterConsumpDaily(this.houseId)
    this.getWaterTotal(this.houseId)
    this.getWeightDaily(this.houseId)
    this.getCV(this.houseId)
    this.getBreedOfHouse(this.houseId)
  })

}

getageofflock(event){
  let date1 = new Date()
  const datepipe: DatePipe = new DatePipe('en-Fr')
  let formatedDate = datepipe.transform(date1, 'yyyy-MM-dd')
  this.dashboardService.getAgeFlock(event,'2023-01-12').subscribe(res=>this.ageofflock=res)
}
getFeedByHouseofLastDays(event){
  let categories=[]
  let data=[]
  this.dashboardService.getFeedByHouseOfLastDays(event).subscribe(res=>{
    console.log("feed",res)
    for(let r of res){
      categories.push(r.date)
      data.push(r.mesure)
    }
    this.optionsChart2 = {   
      chart: {
         type: "spline",
         backgroundColor: "rgba(0, 0, 0, 0)",
      },
      title: {
         text: "Measure of feed"
      },
      xAxis:{
         categories:categories
      },
      yAxis: {          
         title:{
            text:"g/brid/day"
         } 
      },
      tooltip: {
         valueSuffix:"g/brid/day"
      },
      series: [{
         name: 'feed',
         data: data,
         color:'#01897a'
      }]
   };
   Highcharts.chart('chartfeedByhouseofLastDays', this.optionsChart2);
  })
}

getMortalityByHouseofLastDays(event){
  let categories=[]
  let data=[]
  this.dashboardService.getMortalityByHouseOfLastDays(event).subscribe(res=>{
    console.log("Mortality",res)
    for(let r of res){
      categories.push(r.date)
      data.push(r.mesure)
    }
    this.optionsChart5 = {   
      chart: {
         type: "spline",
         backgroundColor: "rgba(0, 0, 0, 0)",
      },
      title: {
         text: "Measure of Motality"
      },
      xAxis:{
         categories:categories
      },
      yAxis: {          
         title:{
            text:"brid/day"
         } 
      },
      tooltip: {
         valueSuffix:"brid/day"
      },
      series: [{
         name: 'Mortality',
         data: data,
         color:"red"
      }]
   };
   Highcharts.chart('chartMortalityByhouseofLastDays', this.optionsChart5);
  })
}

getWeightByHouseofLastDays(event){
  let categories=[]
  let data=[]
  this.dashboardService.getWeightByHouseOfLastDays(event).subscribe(res=>{
    console.log("Mortality",res)
    for(let r of res){
      categories.push(r.date)
      data.push(r.mesure)
    }
    this.optionsChart6 = {   
      chart: {
         type: "spline",
         backgroundColor: "rgba(0, 0, 0, 0)",
      },
      title: {
         text: "Measure of Weight"
      },
      xAxis:{
         categories:categories
      },
      yAxis: {          
         title:{
            text:"g"
         } 
      },
      tooltip: {
         valueSuffix:"g"
      },
      series: [{
         name: 'Weight',
         data: data,
         color:"hsl(49deg 100% 50%)"
      }]
   };
   Highcharts.chart('chartWeightByhouseofLastDays', this.optionsChart6);
  })
}

getwaterByHouseofLastDays(event){
  let categories=[]
  let data=[]
  this.dashboardService.getwaterByHouseOfLastDays(event).subscribe(res=>{
    console.log("Mortality",res)
    for(let r of res){
      categories.push(r.date)
      data.push(r.mesure)
    }
    this.optionsChart7 = {   
      chart: {
         type: "spline",
         backgroundColor: "rgba(0, 0, 0, 0)",
      },
      title: {
         text: "Measure of Water"
      },
      xAxis:{
         categories:categories
      },
      yAxis: {          
         title:{
            text:"ml/brid/day"
         } 
      },
      tooltip: {
         valueSuffix:"ml/brid/day"
      },
      series: [{
         name: 'Water',
         data: data,
      }]
   };
   console.log(this.optionsChart7.xAxis.categories)
   console.log(this.optionsChart7.series[0].data)
   Highcharts.chart('chartWaterByhouseofLastDays', this.optionsChart7);
  })
}

getweeklyweightbyBreed(){
  console.log('test')
   this.standard=[]
   this.exists=[]
     this.dashboardService.getweeklyweightByBreed(this.breed, this.flockId,this.farmId).subscribe(data=>{console.log(data)
       this.dashboardService.getweeklyweightStandardBybreed(this.breed).subscribe(data1=>
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
       this.optionsChart8 = {
        chart: {
          type: "spline",
          backgroundColor: "rgba(0, 0, 0, 0)",
       },
       title: {
          text: "Weekly weight"
       },
       xAxis:{
          categories:[7 , 14 ,21 ,28 ,35 , 42 ,49]
       },
       yAxis: {          
          title:{
             text:"g"
          } 
       },
       tooltip: {
          valueSuffix:"g"
       },
         series: [
           {
             name: 'Exist',
             data: this.exists,
             color:"hsl(49deg 100% 50%)"
           },
           {
             name: 'Standard',
             data: this.standard,
             color:"black"
           }
         ]
       };
       Highcharts.chart('chartWeightByStandard', this.optionsChart8);
     })
   })
   
   }
 

  





}
