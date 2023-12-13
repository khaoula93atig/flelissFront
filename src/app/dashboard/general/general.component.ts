import {Component, OnInit} from '@angular/core';
import {DashboardService} from 'src/app/services/dashboard.service';
import {FarmService} from 'src/app/services/farm.service';
import {UserService} from '../../services/user.service';
import * as Highcharts from 'highcharts';
import {Router} from '@angular/router';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {DatePipe} from '@angular/common';
import Drilldown from 'highcharts-drilldown';


declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

Drilldown(Highcharts);


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

  date = new Date();
  companyId: string;
  donnes: any[] = [];
  donnes1: any[] = [];
  donnes2: any[] = [];
  farms: any[] = [];
  weeklyWeightFarm: any[] = [];
  moratlityCompany: number = 0;
  survivalCompany: number = 0;
  self = this;


  constructor(private UserService: UserService,
              private dashboardService: DashboardService,
              private farmService: FarmService,
              private router: Router) {
  }

  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);
    this.companyId = localStorage.getItem('companyID');
    this.getMortalityByCompany();
    this.getSurvivalByCompany();
    this.getFarms();
    this.mortalityByFarm();
    this.mortalityBreed();
    this.getFeedConsumTotalBycompany();
    this.getBodyWeightbyfarm35jours();
    this.getBodyWeightOfFarms();
  }

  getFarms() {
    this.farmService.getConsultingFarm(this.companyId).subscribe(data => {
      this.farms = data;
    });
  }

  getMortalityByCompany() {
    this.dashboardService.getMortalityByCompany(this.companyId).subscribe(res => this.moratlityCompany = res);
  }

  getSurvivalByCompany() {
    this.dashboardService.getSurvivalByCompany(this.companyId).subscribe(res => this.survivalCompany = res);
  }


  mortalityByFarm() {
    this.dashboardService.getGeneralMortalityByFarm(this.companyId).subscribe(data2 => {
      // this.donnes1 = data2;
      for (let d of data2) {
        this.donnes1.push({y: d.percentage, name: d.farmName});
      }
      console.log('mor', this.donnes1);
      this.donnes1 = this.donnes1.sort(((a, b) => a.percentage - b.percentage));
      this.optionsChart2 = {
        chart: {
          type: 'bar',
          zoomType: 'y',
          height: 250,
        },
        title: {
          text: 'Mortality by farm'
        },
        subtitle: {
          text: 'Overall'
        },

        xAxis: {
          type: 'category'
        },
        yAxis: {
          labels: {
            overflow: 'justify',
            format: '{value}%'
          },
          title: {
            text: null
          },
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              format: '{y}%'
            },
          },
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: (event) => {
                  console.log(event);
                  const category = event.point.name;
                  const value = event.point.y;
                  console.log('Category: ' + category + ', Value: ' + value);
                  let selectedFarm = this.farms.find(farm => farm.farmName == event.point.name);
                  console.log(this.farms.find(farm => farm.farmName == event.point.name));
                  this.router.navigate(['/Dashboard/details', {farmID: selectedFarm.farmId}]);
                }
              }
            }
          }
        },
        tooltip: {
          valueSuffix: '%'
        },
        legend: {
          enabled: false
        },
        series: [
          {
            name: 'Mortality',
            colorByPoint: true,
            data: this.donnes1
          }
        ],
        colors: [
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#1F7D77'],
              [1, '#18534F']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#FEEAA1'],
              [1, '#FFD849']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#D6955B'],
              [1, '#D07627']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#B64201'],
              [1, '#B64201']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#64605C'],
              [1, '#392E2C']
            ]
          }

        ],
      };
      Highcharts.chart('chartGeneralMortalityByFarm', this.optionsChart2);
    });


  }


  mortalityBreed() {
    let category: any[] = [];
    let mortality: any[] = [];
    this.dashboardService.getMortalityByBreed(this.companyId).subscribe(data => {
      console.log(data);
      for (let res of data) {
        switch (res.breed) {
          case 1: {
            category.push('Hubbard');
            break;
          }
          case 2: {
            category.push('Cobb 500');
            break;
          }
          case 3: {
            category.push('Ross');
            break;
          }
          case 4: {
            category.push('Arbor Acres plus');
            break;
          }
        }
        mortality.push(res.percentage);

      }
      console.log(mortality);
      this.optionsChart3 = {
        chart: {
          type: 'column',
          zoomType: 'y',
          height: 250,
        },
        title: {
          text: 'Mortality by breed'
        },
        subtitle: {
          text: 'Overall'
        },

        xAxis: {
          categories: category,
          type: 'category',
        },
        yAxis: {
          labels: {
            overflow: 'justify',
            format: '{value}%'
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
          valueSuffix: '%'
        },
        legend: {
          enabled: false
        },
        colors: [
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#1F7D77'],
              [1, '#18534F']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#FEEAA1'],
              [1, '#FFD849']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#D6955B'],
              [1, '#D07627']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#B64201'],
              [1, '#B64201']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#64605C'],
              [1, '#392E2C']
            ]
          }

        ],
        series: [
          {
            name: 'Mortality',
            colorByPoint: true,
            data: mortality
          }
        ]
      };
      Highcharts.chart('chartMortalityByBreed', this.optionsChart3);
    });
  }

  getBodyWeightbyfarm35jours() {
    this.chart = am4core.create('chartdiv', am4charts.XYChart);
    this.chart.colors.list = [
      am4core.color('#1F7D77'),
      am4core.color('#64605C'),
      am4core.color('#ECF8F6'),
      am4core.color('#D6955B'),
      am4core.color('#FEEAA1'),
      am4core.color('#392E2C'),
      am4core.color('#B64201'),
      am4core.color('#D07627'),
      am4core.color('#FFD849'),
    ];

    this.dashboardService.getResultOutFlocks(this.companyId).subscribe(res => {
      console.log(res);
      this.chart.data = res;
      console.log('data', this.chart.data);
      let farms = [];
      for (let r of res) {
        if (farms.includes(r.farm) == false) {
          farms.push(r.farm);
        }

      }
      console.log('farm', farms);


      // Create axes
      const yAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
      yAxis.dataFields.category = 'house';
      yAxis.renderer.grid.template.location = 0;
      yAxis.renderer.labels.template.fontSize = 10;
      yAxis.renderer.minGridDistance = 10;

      const xAxis = this.chart.xAxes.push(new am4charts.ValueAxis());
      xAxis.renderer.labels.template.fontSize = 10;
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
              return this.chart.colors.getIndex(index);
            }
          }
        }
        return fill;
      });

      let axisBreaks = {};
      let legendData = [];

      // title
      const title = this.chart.titles.create();
      title.text = 'Body weight of outgoing flocks';
      title.fontSize = 15;
      title.padding(0,0,20,0);
      // title.fontWeight = "bold";

// Add ranges
      function addRange(label, start, end, color) {
        let range = yAxis.axisRanges.create();
        range.category = start;
        range.endCategory = end;
        range.label.text = label;
        range.label.disabled = false;
        range.label.fill = color;
        range.label.location = 0;
        range.label.dx = -130;
        range.label.dy = 12;
        range.label.fontWeight = 'bold';
        range.label.fontSize = 11;
        range.label.horizontalCenter = 'left';
        range.label.inside = true;

        range.grid.stroke = am4core.color('#396478');
        range.grid.strokeOpacity = 1;
        range.tick.length = 200;
        range.tick.disabled = false;
        range.tick.strokeOpacity = 0.6;
        range.tick.stroke = am4core.color('#396478');
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

        legendData.push({name: label, fill: color});
      }

      farms.forEach((data1, index) => {
        let max = 0;
        let min = 0;
        let maxHouse = '';
        let minHouse = '';
        for (let r of res) {
          if (r.farm == data1) {
            if (max < r.weight) {
              maxHouse = r.house;
            }
            if (min > r.weight) {
              minHouse = r.house;
            }
          }
        }
        addRange(data1, maxHouse, minHouse, this.chart.colors.getIndex(index));

      });

      this.chart.cursor = new am4charts.XYCursor();


      let legend = new am4charts.Legend();
      legend.position = 'bottom';
      legend.scrollable = true;
      legend.valign = 'top';
      legend.reverseOrder = true;

      this.chart.legend = legend;
      legend.data = legendData;

      legend.itemContainers.template.events.on('toggled', (event) => {
        const region = event.target.dataItem['dataContext']['farm'];
        let name = event.target.dataItem['dataContext']['name'];
        let axisBreak = axisBreaks[name];
        if (event.target.isActive) {
          axisBreak.animate({property: 'breakSize', to: 0}, 1000, am4core.ease.cubicOut);
          yAxis.dataItems.each(function(dataItem) {
            if (region == name) {
              dataItem.hide(1000, 500);
            }
          });
          series.dataItems.each(function(dataItem) {
            if (region == name) {
              dataItem.hide(1000, 0, 0, ['valueX']);
            }
          });
        } else {
          axisBreak.animate({property: 'breakSize', to: 1}, 1000, am4core.ease.cubicOut);
          yAxis.dataItems.each(function(dataItem) {
            if (region == name) {
              dataItem.show(1000);
            }
          });
          series.dataItems.each(function(dataItem) {
            if (region == name) {
              dataItem.show(1000, 0, ['valueX']);
            }
          });
        }
      });
    });
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }


  getFeedConsumTotalBycompany() {
    let date1 = new Date();
    const datepipe: DatePipe = new DatePipe('en-Fr');
    let formatedDate = datepipe.transform(date1, 'yyyy-MM-dd');
    this.dashboardService.getfeedConsumTotalByCompany(this.companyId, formatedDate).subscribe(data => {
      console.log(data);
      for (let d of data) {
        this.donnes2.push({y: d.percentage, name: d.farmName});
      }
      this.donnes2 = this.donnes2.sort(((a, b) => a.y - b.y));
      this.optionsChart5 = {
        chart: {
          type: 'column',
          zoomType: 'y',
          height: 250,
        },
        title: {
          text: 'Feed intake by farm'
        },
        subtitle: {
          text: 'Overall'
        },

        xAxis: {
          type: 'category',
        },
        yAxis: {
          labels: {
            overflow: 'justify',
            format: '{value}g'
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
                click: (event) => {
                  const category = event.point.farmName;
                  const value = event.point.percentage;
                  console.log('Category: ' + category + ', Value: ' + value);
                  let selectedFarm = this.farms.find(farm => farm.farmName == event.point.name);
                  console.log(this.farms.find(farm => farm.farmName == event.point.name));
                  this.router.navigate(['/Dashboard/details', {farmID: selectedFarm.farmId}]);
                }
              }
            }
          }
        },
        tooltip: {
          valueSuffix: 'g'
        },
        legend: {
          enabled: false
        },
        colors: [
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#1F7D77'],
              [1, '#18534F']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#FEEAA1'],
              [1, '#FFD849']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#D6955B'],
              [1, '#D07627']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#ECF8F6'],
              [1, '#A0FBEC']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#64605C'],
              [1, '#392E2C']
            ]
          }

        ],
        series: [
          {
            name: 'Feed',
            colorByPoint: true,
            data: this.donnes2
          }
        ]
      };
      console.log(this.optionsChart5.series);
      Highcharts.chart('chartFeedConsumByfarm', this.optionsChart5);
    });
  }

  getBodyWeightOfFarms() {
    let houseWeight = [];
    this.dashboardService.getWeeklyWeightByfarm(this.companyId).subscribe(data => {
      console.log('weightFarm', data);
      let farms = data.map(el => el.farmId);
      farms = farms.filter((x, i) => farms.indexOf(x) === i);
      console.log(farms );
      let i = 0;
      for ( let f of farms){
        this.dashboardService.getWeeklyWeightByHouse(this.companyId,f).subscribe(datahouse => {
          console.log(f);
          console.log('datahouse', datahouse);
          if(datahouse.length != 0){
            let d0 = datahouse.filter(el => el.week == 0);
            if (d0 != []){
              houseWeight.push({id: 'd0'+ f , name : 'D0', data: []});
              for ( let d of d0){
                houseWeight[i].data.push({
                  name: d.houseId,
                  y: d.average
                });
              }
            }
            i++;
          let d7 = datahouse.filter(el => el.week == 7);
          if (d7 != []){
            houseWeight.push({id: 'd7'+ f , name : 'D7', data: []});
            for ( let d of d7){
              houseWeight[i].data.push({
                name: d.houseId,
                y: d.average
              });
            }
          }
            i++;
          let d14 = datahouse.filter(el => el.week == 14);
          if (d14 != []){
            houseWeight.push({id: 'd14'+ f , name : 'D14', data: []});
            for ( let d of d14){
              houseWeight[i].data.push({
                name: d.houseId,
                y: d.average
              });
            }
          }
            i++;
          let d21 = datahouse.filter(el => el.week == 21);
          if (d21 != []){
            houseWeight.push({id: 'd21'+ f , name : 'D21', data: []});
            for ( let d of d21){
              houseWeight[i].data.push({
                name: d.houseId,
                y: d.average
              });
            }
          }
            i++;
          let d28 = datahouse.filter(el => el.week == 28);
          if (d28 != []){
            houseWeight.push({id: 'd28'+ f , name : 'D28', data: []});
            for ( let d of d28){
              houseWeight[i].data.push({
                name: d.houseId,
                y: d.average
              });
            }
          }
            i++;
          let d35 = datahouse.filter(el => el.week == 35);
          if (d35 != []){
            houseWeight.push({id: 'd35'+ f , name : 'D35', data: []});
            for ( let d of d35){
              houseWeight[i].data.push({
                name: d.houseId,
                y: d.average
              });
            }
          }
            i++;
          let d42 = datahouse.filter(el => el.week == 42);
          if (d42 != []){
            houseWeight.push({id: 'd42'+ f , name : 'D42', data: []});
            for ( let d of d42){
              houseWeight[i].data.push({
                name: d.houseId,
                y: d.average
              });
            }
          }
            i++;
          }
          console.log(houseWeight);
        });
      }
      let d0 = data.filter(el => el.week == 0);
      if (d0 != []){
        this.weeklyWeightFarm.push({name: 'D0' , data: []});
        for ( let d of d0){
          this.weeklyWeightFarm[0].data.push({
            name: d.farmId,
            y: d.average,
            drilldown: 'd0' + d.farmId
          });
        }
      }
      let d7 = data.filter(el => el.week == 7);
      if (d7 != []){
        this.weeklyWeightFarm.push({name: 'D7' , data: []});
        for(let d of d7){
          this.weeklyWeightFarm[1].data.push({
            name: d.farmId,
            y: d.average,
            drilldown: 'd7' + d.farmId
          });
        }
      }
      let d14 = data.filter(el => el.week == 14);
      if (d14 != []){
        this.weeklyWeightFarm.push({name: 'D14' , data: []});
        for(let d of d14){
          this.weeklyWeightFarm[2].data.push({
            name: d.farmId,
            y: d.average,
            drilldown: 'd14' + d.farmId
          });
        }
      }
      let d21 = data.filter(el => el.week == 21);
      if (d21 != []){
        this.weeklyWeightFarm.push({name: 'D21' , data: []});
        for(let d of d21){
          this.weeklyWeightFarm[3].data.push({
            name: d.farmId,
            y: d.average,
            drilldown: 'd21' + d.farmId
          });
        }
      }
      let d28 = data.filter(el => el.week == 28);
      if (d28 != []){
        this.weeklyWeightFarm.push({name: 'D28' , data: []});
        for(let d of d28){
          this.weeklyWeightFarm[4].data.push({
            name: d.farmId,
            y: d.average,
            drilldown: 'd28' + d.farmId
          });
        }
      }
      let d35 = data.filter(el => el.week == 35);
      if (d35 != []){
        this.weeklyWeightFarm.push({name: 'D35' , data: []});
        for(let d of d35){
          this.weeklyWeightFarm[5].data.push({
            name: d.farmId,
            y: d.average,
            drilldown: 'd35' + d.farmId
          });
        }
      }
      let d42 = data.filter(el => el.week == 42);
      if (d42 != []){
        this.weeklyWeightFarm.push({name: 'D42' , data: []});
        for(let d of d42){
          this.weeklyWeightFarm[6].data.push({
            name: d.farmId,
            y: d.average,
            drilldown: 'd42' + d.farmId
          });
        }
      }
    this.optionsChart4 = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Average body weight by farm'
      },
      lang: {
        drillUpText: '<< back to farms'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: null
        },
        labels: {
          format: '{value}'
        }},
      colors: [
        {
          linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
          stops: [
            [0, '#1F7D77'],
            [1, '#18534F']
          ]
        },
        {
          linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
          stops: [
            [0, '#FEEAA1'],
            [1, '#FFD849']
          ]
        },
        {
          linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
          stops: [
            [0, '#D6955B'],
            [1, '#D07627']
          ]
        },
        {
          linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
          stops: [
            [0, '#B64201'],
            [1, '#B64201']
          ]
        },
        {
          linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
          stops: [
            [0, '#64605C'],
            [1, '#392E2C']
          ]
        }

      ],
      series: this.weeklyWeightFarm ,
      drilldown: {
        ' allowPointDrilldown ': false,
        series: houseWeight
      }
    };
    console.log(this.optionsChart4.series);
    Highcharts.chart('chartBodyWeightByfarm', this.optionsChart4);
    });
  }


}
