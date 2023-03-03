import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FarmService } from 'src/app/services/farm.service';
import { UserService } from '../../services/user.service';
import * as Highcharts from 'highcharts';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  public optionsChart1: any;
  public optionsChart2: any;
  public optionsChart3: any;
  public optionsChart4: any;
  public optionsChart5: any;

  date= new Date();
  companyId:string
  donnes:any[]=[]
  donnes1:any[]=[]
  donnes2:any[]=[]
  farms:any[]=[]
  weeklyWeightFarm:any[]=[]
  moratlityCompany:number=0
  survivalCompany:number=0


  

  constructor(private UserService: UserService,
    private dashboardService: DashboardService,
    private farmService: FarmService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getData()
    this.companyId = sessionStorage.getItem('companyID')
    this.getMortalityByCompany()
    this.getSurvivalByCompany()
    this.getFarms()
    this.dailyMortalityByFarm()
    this.mortalityByFarm()
    this.mortalityBreed()
    this.getweeklyWeightMesurementbyCompany()
    this.getFeedConsumTotalBycompany()
  }
  getData() {
    return this.http.get('https://www.biat.tn/biat/Fr/cours-de-change_66_127').subscribe(data=>console.log('donees site',data));
  }

  getFarms(){
    this.farmService.getConsultingFarm(this.companyId).subscribe(data=>{this.farms=data})
  }
  getMortalityByCompany(){
    this.dashboardService.getMortalityByCompany(this.companyId).subscribe(res=>this.moratlityCompany=res)
  }
  getSurvivalByCompany(){
    this.dashboardService.getSurvivalByCompany(this.companyId).subscribe(res=>this.survivalCompany=res)
  }

  dailyMortalityByFarm() {
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(this.date, 'yyyy-MM-dd')
      this.dashboardService.getMortalityByFarm(8,'2023-01-13' ,this.companyId).subscribe(data1=>{
        for(let farm of this.farms){
          this.donnes.push({
            "y": 0,
            "name": farm.farmName
        })}
        for(let farm of this.farms){
          if(data1.length>0){
            console.log('test2')
            for(let res of data1){
              if(farm.farmId==res.farmId){
                for(let d of this.donnes){
                  if(d.name==farm.farmName){
                    d.y=res.percentage
                  }
                }
              }
            }
          }
        }
        this.donnes=this.donnes.sort(((a,b) => a.y - b.y) )
        this.optionsChart1 = {
          chart: {
            type: "bar",
            zoomType: "y",
            height: 250,
          },
          title: {
            text: "Daily mortality by farm"
          },
    
          xAxis: {
            //categories: category,
            type: "category",
          },
          yAxis: {
            labels: {
              overflow: "justify",
              format: "{value}%"
            },
            title: {
              text: null
            },
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true,
                format: "{y}%"
              }
            }
          },
          tooltip: {
            valueSuffix: "%"
          },
          legend: {
            enabled: false
          },
          series: [
            {
              name: "Mortality",
              color: {
                linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
                stops: [
                    [0, '#02b5a2'],
                    [1, '#02675c']
                ]
            },
              data: this.donnes
            }
          ]
        }
        Highcharts.chart('chartDailyMortalityByFarm', this.optionsChart1);
      })
     
    
    
   
  }

  mortalityByFarm() {
      this.dashboardService.getGeneralMortalityByFarm(this.companyId).subscribe(data2=>{
        for(let farm of this.farms){
          this.donnes1.push({
            "y": 0,
            "name": farm.farmName
        })}
        for(let farm of this.farms){
          if(data2.length>0){
            for(let res of data2){
              if(farm.farmId==res.farmId){
                for(let d of this.donnes1){
                  if(d.name==farm.farmName){
                    d.y=res.percentage
                  }
                }
              }
            }
          }
        }
        this.donnes1=this.donnes1.sort(((a,b) => a.y - b.y) )
        this.optionsChart2 = {
          chart: {
            type: "bar",
            zoomType: "y",
            height: 250,
          },
          title: {
            text: "Mortality by farm"
          },
          subtitle: {
            text: 'Overall'
          },
    
          xAxis: {
            //categories: category,
            type: "category"
          },
          yAxis: {
            labels: {
              overflow: "justify",
              format: "{value}%"
            },
            title: {
              text: null
            },
          },
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: true,
                format: "{y}%"
              }
            }
          },
          tooltip: {
            valueSuffix: "%"
          },
          legend: {
            enabled: false
          },
          series: [
            {
              name: "Mortality",
              color: {
                linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
                stops: [
                    [0, '#FEEAA1'],
                  [1, '#FFD849']
                ]
            },
              //color: "#ffd100",
              //borderColor: '#60A465',
              data: this.donnes1
            }
          ]
        }
        Highcharts.chart('chartGeneralMortalityByFarm', this.optionsChart2);
      })
    
   
  }
  

  mortalityBreed() {
    let category:any[]=[]
     let mortality:any[]=[]
     this.dashboardService.getMortalityByBreed(this.companyId).subscribe(data=>{
      console.log(data)
       for(let res of data){
         switch(res.breed) { 
           case 1: { 
              category.push("Hubbard")
              break; 
           } 
           case 2: { 
             category.push("Cobb 500") 
              break; 
           } 
           case 3: { 
             category.push("Ross") 
             break; 
          } 
          case 4: { 
           category.push("Arbor Acres plus") 
           break; 
        } 
        } 
         mortality.push(res.percentage)
 
       }
       console.log(mortality)
     this.optionsChart3 = {
       chart: {
         type: "column",
         zoomType: "y",
         height: 250,
       },
       title: {
         text: "Mortality by breed"
       },
       subtitle: {
        text: 'Overall'
      },
 
       xAxis: {
         categories: category,
         type: "category",
       },
       yAxis: {
         labels: {
           overflow: "justify",
           format: "{value}%"
         },
         title: {
          text: null
        },
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
         valueSuffix: "%"
       },
       legend: {
         enabled: false
       },
       colors: [
        {
          linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
          stops: [
              [0, '#1F7D77'],
              [1, '#18534F']
          ]
        },
        {
          linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
          stops: [
              [0, '#FEEAA1'],
              [1, '#FFD849']
          ]
      },
        {
          linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
          stops: [
              [0, '#D6955B'],
              [1, '#D07627']
          ]
        },
        {
          linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
          stops: [
              [0, '#ECF8F6'],
              [1, '#A0FBEC']
          ]
      },
      {
        linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
        stops: [
            [0, '#64605C'],
            [1, '#392E2C']
        ]
      }
      
    ],
       series: [
         {
           name: "Mortality",
           colorByPoint: true,
           data: mortality
         }
       ]
     }
     Highcharts.chart('chartMortalityByBreed', this.optionsChart3);
   })
   }

   getweeklyWeightMesurementbyCompany(){

    this.dashboardService.getweeklyweightbycompanyforfarms(this.companyId).subscribe(data=>{
      for(let f of this.farms){
        this.weeklyWeightFarm.push({'farm':f.farmId,'farmname':f.farmName,'excellent':0,'average':0 , 'poor':0})
      }
      for(let d of data){
        for(let w of this.weeklyWeightFarm){
          if(w.farm==d.farmId){
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
    this.optionsChart4 = {
      chart: {
        type: "bar",
        height:250
      },
      title: {
        text: 'Weekly weight by farm'
      },
      subtitle: {
        text: 'cv'
      },
      tooltip: {
        outside: true
      },
      xAxis: {
        categories:[]
      },
      yAxis: {
        title: {
          text: 'CV'
        }
      },
      /*legend: {
        reversed: true
      },*/  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 20,
    floating: true,
    borderWidth: 1,
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
    shadow: true
  },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [{name:'Excellent', color:'#02675c', data:[]},
      {name:'Average',color:'#ffd100',data:[]},
      {name:'Poor',color:'#D07627',data:[]}
    ]
    }
    for(let wei of this.weeklyWeightFarm){
      this.optionsChart4.xAxis.categories.push(wei.farmname)
      this.optionsChart4.series[0].data.push(wei.excellent)
      this.optionsChart4.series[1].data.push(wei.average)
      this.optionsChart4.series[2].data.push(wei.poor)
    }
  Highcharts.chart('chartweeklyweightByFarmUniformity', this.optionsChart4);
    })

   }

   getFeedConsumTotalBycompany(){
    this.dashboardService.getfeedConsumTotalByCompany(this.companyId).subscribe(data=>{console.log(data)
      for(let farm of this.farms){
        this.donnes2.push({
          "y": 0,
          "name": farm.farmName
      })}
      for(let farm of this.farms){
        if(data.length>0){
          for(let res of data){
            if(farm.farmId==res.farmId){
              for(let d of this.donnes2){
                if(d.name==farm.farmName){
                  d.y=res.percentage
                }
              }
            }
          }
        }
      }
      this.donnes2=this.donnes2.sort(((a,b) => a.y - b.y) )
      this.optionsChart5 = {
        chart: {
          type: "column",
          zoomType: "y",
          height: 250,
        },
        title: {
          text: "Feed intake by farm"
        },
        subtitle: {
          text: 'Overall'
        },
  
        xAxis: {
          type: "category",
        },
        yAxis: {
          labels: {
            overflow: "justify",
            format: "{value}g"
          },
          title: {
           text: null
         },
        },
        plotOptions: {
         series: {
           borderWidth: 0,
           dataLabels: {
             enabled: true,
             format: '{point.y:.1f}g'
           }
         }
       },
        tooltip: {
          valueSuffix: "g"
        },
        legend: {
          enabled: false
        },
        colors: [
         {
           linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
           stops: [
               [0, '#1F7D77'],
               [1, '#18534F']
           ]
         },
         {
           linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
           stops: [
               [0, '#FEEAA1'],
               [1, '#FFD849']
           ]
       },
         {
           linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
           stops: [
               [0, '#D6955B'],
               [1, '#D07627']
           ]
         },
         {
           linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
           stops: [
               [0, '#ECF8F6'],
               [1, '#A0FBEC']
           ]
       },
       {
         linearGradient: { x1: 0, x2: 1, y1: 0, y2: 1 },
         stops: [
             [0, '#64605C'],
             [1, '#392E2C']
         ]
       }
       
     ],
        series: [
          {
            name: "Feed",
            colorByPoint: true,
            data: this.donnes2
          }
        ]
      }
      console.log(this.optionsChart5.series)
      Highcharts.chart('chartFeedConsumByfarm', this.optionsChart5);
    })
   }

 
  


}
