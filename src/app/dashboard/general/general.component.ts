import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FarmService } from 'src/app/services/farm.service';
import { UserService } from '../../services/user.service';
import * as Highcharts from 'highcharts';
import { Router } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


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
  private chart: am4charts.XYChart;

  date= new Date();
  companyId:string
  donnes:any[]=[]
  donnes1:any[]=[]
  donnes2:any[]=[]
  farms:any[]=[]
  weeklyWeightFarm:any[]=[]
  moratlityCompany:number=0
  survivalCompany:number=0
  self = this;

  constructor(private UserService: UserService,
    private dashboardService: DashboardService,
    private farmService: FarmService,
    private router: Router) { }

  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);
    this.companyId = localStorage.getItem('companyID')
    this.getMortalityByCompany()
    this.getSurvivalByCompany()
    this.getFarms()
    this.mortalityByFarm()
    this.mortalityBreed()
    this.getFeedConsumTotalBycompany()
    this.getBodyWeightbyfarm35jours()
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
              },
            },
            series: {
              cursor: 'pointer',
              point: {
                events: {
                  click:(event) => {
                    const category = event.point.category;
                    const value = event.point.y;
                    console.log('Category: ' + category + ', Value: ' + value);
                    let selectedFarm=this.farms.find(farm => farm.farmName == event.point.name)
                    console.log(this.farms.find(farm => farm.farmName == event.point.name))
                    this.router.navigate(['/Dashboard/mortality',{farmID:selectedFarm.farmId}]);
                  }
                }
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

   getBodyWeightbyfarm35jours(){
    this.chart = am4core.create('chartdiv', am4charts.XYChart);
    this.chart.colors.list = [
      am4core.color("#1F7D77"),
      am4core.color("#64605C"),
      am4core.color("#ECF8F6"),
      am4core.color("#D6955B"),
      am4core.color("#FEEAA1"),
      am4core.color("#392E2C"),
      am4core.color("#A0FBEC"),
      am4core.color("#D07627"),
      am4core.color("#FFD849"),
    ];
  
    this.dashboardService.getResultOutFlocks(this.companyId).subscribe(res=>{console.log(res)
      this.chart.data=res
      console.log('data',this.chart.data)
    let farms=[]
    for(let r of res){
      if(farms.includes(r.farm)==false){
        farms.push(r.farm)
      }
      
    }
    console.log("farm",farms)
    

    // Create axes
    const yAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = 'house';
    yAxis.renderer.grid.template.location = 0;
    yAxis.renderer.labels.template.fontSize = 10;
    yAxis.renderer.minGridDistance = 10;

    const xAxis = this.chart.xAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = this.chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = 'weight';
    series.dataFields.categoryY = 'house';
    series.columns.template.tooltipText = '{categoryY}: [bold]{valueX}[/]';
    series.columns.template.strokeWidth = 0;
    series.columns.template.adapter.add('fill', (fill, target) => {
      if (target.dataItem) {
        const farm = target.dataItem['dataContext']['farm'];
        if (farm) {
          const index = farms.indexOf(farm);
          if (index !== -1) {
            return this.chart.colors.getIndex(index);;
          }
        }
      }
      return fill;
    });

    let axisBreaks = {};
let legendData = [];

//title
const title = this.chart.titles.create();
title.text ='Body weight of outgoing flocks'

// Add ranges
function addRange(label,start,end, color) {
  let range = yAxis.axisRanges.create();
  range.category = start;
  range.endCategory = end;
  range.label.text = label;
  range.label.disabled = false;
  range.label.fill = color;
  range.label.location = 0;
  range.label.dx = -130;
  range.label.dy = 12;
  range.label.fontWeight = "bold";
  range.label.fontSize = 12;
  range.label.horizontalCenter = "left"
  range.label.inside = true;
  
  range.grid.stroke = am4core.color("#396478");
  range.grid.strokeOpacity = 1;
  range.tick.length = 200;
  range.tick.disabled = false;
  range.tick.strokeOpacity = 0.6;
  range.tick.stroke = am4core.color("#396478");
  range.tick.location = 0;
  
  range.locations.category = 1;
  let axisBreak = yAxis.axisBreaks.create();
  axisBreak.startCategory = start;
  axisBreak.endCategory = end;
  axisBreak.breakSize = 1;
  axisBreak.fillShape.disabled = true;
  axisBreak.startLine.disabled = true;
  axisBreak.endLine.disabled = true;
  axisBreaks[label] = axisBreak;  

  legendData.push({name:label, fill:color});
}
farms.forEach((data1, index)=>{
  let max =0
  let min =0
  let maxHouse=''
  let minHouse=''
  for (let r of res){
    if(r.farm==data1){
      if(max<r.weight){
        maxHouse=r.house
      }
      if(min>r.weight){
        minHouse=r.house
      }
    }
  }
  addRange(data1, maxHouse, minHouse, this.chart.colors.getIndex(index));

});
/*addRange("Central", "Texas", "North Dakota", this.chart.colors.getIndex(0));
addRange("East", "New York", "West Virginia", this.chart.colors.getIndex(1));
addRange("South", "Florida", "South Carolina", this.chart.colors.getIndex(2));
addRange("West", "California", "Wyoming", this.chart.colors.getIndex(3));*/

this.chart.cursor = new am4charts.XYCursor();


let legend = new am4charts.Legend();
legend.position = "right";
legend.scrollable = true;
legend.valign = "top";
legend.reverseOrder = true;

this.chart.legend = legend;
legend.data = legendData;

legend.itemContainers.template.events.on("toggled", (event) =>{
  const region = event.target.dataItem['dataContext']['farm'];
  let name = event.target.dataItem['dataContext']['name'];
  let axisBreak = axisBreaks[name];
  if(event.target.isActive){
    axisBreak.animate({property:"breakSize", to:0}, 1000, am4core.ease.cubicOut);
    yAxis.dataItems.each(function(dataItem){
      if(region == name){
        dataItem.hide(1000, 500);
      }
    })
    series.dataItems.each(function(dataItem){
      if(region == name){
        dataItem.hide(1000, 0, 0, ["valueX"]);
      }
    })    
  }
  else{
    axisBreak.animate({property:"breakSize", to:1}, 1000, am4core.ease.cubicOut);
    yAxis.dataItems.each(function(dataItem){
      if(region == name ){
        dataItem.show(1000);
      }
    })  

    series.dataItems.each(function(dataItem){
      if(region == name){
        dataItem.show(1000, 0, ["valueX"]);
      }
    })        
  }
  })
})
   }
  private destroyChart(): void {
    if (this.chart) {
      this.chart.dispose();
    }
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
           },
              cursor: 'pointer',
              point: {
                events: {
                  click:(event) => {
                    const category = event.point.category;
                    const value = event.point.y;
                    console.log('Category: ' + category + ', Value: ' + value);
                    let selectedFarm=this.farms.find(farm => farm.farmName == event.point.name)
                    console.log(this.farms.find(farm => farm.farmName == event.point.name))
                    this.router.navigate(['/Dashboard/mortality',{farmID:selectedFarm.farmId}]);
                  }
                }
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
