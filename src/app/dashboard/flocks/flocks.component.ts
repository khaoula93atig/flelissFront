import {DatePipe} from '@angular/common';
import {identifierModuleUrl, isFormattedError} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DashboardService} from 'src/app/services/dashboard.service';
import {FarmService} from 'src/app/services/farm.service';
import {HouseService} from 'src/app/services/house.service';

@Component({
  selector: 'app-flocks',
  templateUrl: './flocks.component.html',
  styleUrls: ['./flocks.component.css']
})
export class FlocksComponent implements OnInit {

  public optionsChartMortality: any;
  public optionsChartWeight: any;
  public optionsChartFeed: any;
  public optionsChartFcr: any;
  public optionsChartWater: any;
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

  ];

  date = new Date();
  flocks: any[] = [];
  farms: any[] = [];
  centers: any[] = [];
  houses: any[] = [];
  companyId: string;
  farmId: string;
  centerId: string;
  farmName: string;
  houseId: string;
  find = false;

  constructor(private dashService: DashboardService,
              private farmService: FarmService,
              private houseService: HouseService,
              public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.companyId = localStorage.getItem('companyID');
    this.getAllFarms();
  }

  getFlocksByHouseAndYear(event) {
    let category = [];
    this.dashService.getFlocksByHouseandYear(event, this.date.getFullYear()).subscribe(data => {
      this.flocks = data;
      console.log(this.flocks);

    });

  }

  getAllFarms() {
    this.farmService.getConsultingFarm(this.companyId).subscribe(data => {
      console.log(data);
      this.farms = data;
      this.farmId = this.farms[0].farmId;
      this.farmName = this.farms[0].farmName;
      this.getAllCentersByFarm(this.farmId);
    });
  }

  getAllCentersByFarm(event) {
    this.houseService.getConsultingCenterbyFarm(event).subscribe(
      (data) => {
        this.centers = data;
        this.centerId = data[0].centerId;
        this.getAllhouseByCenter(this.centerId);
      });
  }

  getAllhouseByCenter(event) {
    this.houseService.getConsultingHouseByCenter(event).subscribe(data => {
      this.houses = data;
      this.houseId = data[0].houseId;
      this.getFlocksByHouseAndYear(this.houseId);
      this.getMortalitybyFlock(this.houseId);
      this.getWeightByFlock(this.houseId);
      this.getFeedByFlock(this.houseId);
      this.getFcrByFlock(this.houseId);
      this.getWaterByFlocks(this.houseId);

    });
  }

  getMortalitybyFlock(event) {
    let donnes = [];
    this.dashService.getMortalityByFlocksAndYear(event, this.date.getFullYear()).subscribe(data => {
      for (let d of data) {
        donnes.push({y: d.percentage, name: d.flockName});
      }

      this.optionsChartMortality = {
        chart: {
          type: 'column',
          zoomType: 'y',
          height: 250,
        },
        title: {
          text: 'Mortality by flock'
        },

        xAxis: {
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
              [0, '#D6955B'],
              [1, '#D07627']
            ]
          },
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#FF0000'],
              [1, '#6E0C07']
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
            name: 'Mortality',
            colorByPoint: true,
            data: donnes
          }
        ]
      };
      Highcharts.chart('chartdeathflocksComparaison', this.optionsChartMortality);
    });
  }

  getWeightByFlock(event) {
    let series = [{
      name: '',
      data: [{week: 0, weight: null}, {week: 7, weight: null}, {week: 14, weight: null}, {week: 21, weight: null}, {week: 28, weight: null}, {
        week: 35,
        weight: null
      }, {week: 42, weight: null},]
    }];
    this.dashService.getWeightFlocksByHouseandYear(event, this.date.getFullYear()).subscribe(data => {
      console.log('Weight', data);
      for (let d of data) {
        if ((series.length == 1) && (series[0].name == '')) {
          series[0].name = d.flockId;
          for (let w of series[0].data) {
            if (w.week == d.week) {
              w.weight = d.average;
            }
          }
        } else {
          if (series.find(x => x.name === d.flockId)) {
            for (let s of series) {
              if (s.name == d.flockId) {
                for (let w of s.data) {
                  if (w.week == d.week) {
                    w.weight = d.average;
                  }
                }
              }
            }
          } else {
            series.push({
              name: d.flockId,
              data: [{week: 0, weight: null},{week: 7, weight: null}, {week: 14, weight: null}, {week: 21, weight: null}, {week: 28, weight: null}, {
                week: 35,
                weight: null
              }, {week: 42, weight: null},]
            });
            for (let w of series[series.length - 1].data) {
              if (w.week == d.week) {
                w.weight = d.average;
              }
            }
          }
        }

      }
      let SerieWeight = series;
      for (let s of SerieWeight) {
        let tab = [];
        for (let f of this.flocks) {
          if (s.name == f.flockID) {
            s.name = f.flockName;
          }
        }
        for (let d of s.data) {
          tab.push(d.weight);
        }
        s.data = tab;
      }

      console.log('serie', SerieWeight);
      this.optionsChartWeight = {
        chart: {
          type: 'areaspline',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        title: {
          text: 'Weekly weight by flock'
        },
        xAxis: {
          categories: ['D0', 'D7', 'D14', 'D21', 'D28', 'D35', 'D42', 'D49']
        },
        yAxis: {
          title: {
            text: 'g/day'
          },
          labels: {
            format: '{value}'
          }
        },
        tooltip: {
          valueSuffix: 'g'
        },
        plotOptions: {
          areaspline: {
            color: '#02897A',
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, '#02897A94'],
                [1, '#FFFFFF00']
              ]
            },
            threshold: null,

          }
        },
        series: SerieWeight
      };

      Highcharts.chart('chartWeightFlock', this.optionsChartWeight);

    });

  }

  getFeedByFlock(event) {
    let series = [{
      name: '',
      data: [{week: 0, feed: null}, {week: 7, feed: null}, {week: 14, feed: null}, {week: 21, feed: null},
        {week: 28, feed: null}, {week: 35, feed: null}, {week: 42, feed: null},]
    }];
    this.dashService.getFeedFlocksByHouseandYear(event, this.date.getFullYear()).subscribe(data => {
      for (let d of data) {
        if ((series.length == 1) && (series[0].name == '')) {
          series[0].name = d.flockId;
          for (let w of series[0].data) {
            if (w.week == d.week) {
              w.feed = d.average;
            }
          }
        } else {
          if (series.find(x => x.name === d.flockId)) {
            for (let s of series) {
              if (s.name == d.flockId) {
                for (let w of s.data) {
                  if (w.week == d.week) {
                    w.feed = d.average;
                  }
                }
              }
            }
          } else {
            series.push({
              name: d.flockId,
              data: [{week: 0, feed: null}, {week: 7, feed: null}, {week: 14, feed: null}, {week: 21, feed: null},
                {week: 28, feed: null}, {week: 35, feed: null}, {week: 42, feed: null}]
            });
            for (let w of series[series.length - 1].data) {
              if (w.week == d.week) {
                w.feed = d.average;
              }
            }
          }
        }

      }
      let SerieFeed = series;
      for (let s of SerieFeed) {
        let tab = [];
        for (let f of this.flocks) {
          if (s.name == f.flockID) {
            s.name = f.flockName;
          }
        }
        for (let d of s.data) {
          tab.push(d.feed);
        }
        s.data = tab;
      }
      console.log('seriefeed', series);
      this.optionsChartFeed = {
        chart: {
          type: 'areaspline',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        title: {
          text: 'Measure of feed'
        },
        xAxis: {
          categories: ['D0', 'D7', 'D14', 'D21', 'D28', 'D35', 'D42', 'D49']
        }, lang: {
          numericSymbols: ['']
        },
        yAxis: {
          title: {
            text: 'g/day'
          },
          labels: {
            format: '{value}'
          }
        },
        tooltip: {
          valueSuffix: 'g/day'
        },
        plotOptions: {
          areaspline: {
            color: '#02897A',
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, '#02897A94'],
                [1, '#FFFFFF00']
              ]
            },
            threshold: null,

          }
        },
        series: SerieFeed
      };

      Highcharts.chart('chartFeedFlock', this.optionsChartFeed);

    });
  }

  getFcrByFlock(event) {
    let series = [{
      name: '',
      data: [{week: 0, fcr: null},{week: 7, fcr: null}, {week: 14, fcr: null}, {week: 21, fcr: null}, {week: 28, fcr: null}, {
        week: 35,
        fcr: null
      }, {week: 42, fcr: null}]
    }];
    this.dashService.getFcrFlocksByHouse(event).subscribe(data => {
      for (let d of data) {
        if ((series.length == 1) && (series[0].name == '')) {
          series[0].name = d.flockId;
          for (let w of series[0].data) {
            if (w.week == d.week) {
              w.fcr = d.average;
            }
          }
        } else {
          if (series.find(x => x.name === d.flockId)) {
            for (let s of series) {
              if (s.name == d.flockId) {
                for (let w of s.data) {
                  if (w.week == d.week) {
                    w.fcr = d.average;
                  }
                }
              }
            }
          } else {
            series.push({
              name: d.flockId,
              data: [{week: 0, fcr: null},{week: 7, fcr: null}, {week: 14, fcr: null}, {week: 21, fcr: null}, {week: 28, fcr: null}, {
                week: 35,
                fcr: null
              }, {week: 42, fcr: null}]
            });
            for (let w of series[series.length - 1].data) {
              if (w.week == d.week) {
                w.fcr = d.average;
              }
            }
          }
        }

      }
      let SerieFcr = series;
      for (let s of SerieFcr) {
        let tab = [];
        for (let f of this.flocks) {
          if (s.name == f.flockID) {
            s.name = f.flockName;
          }
        }
        for (let d of s.data) {
          tab.push(d.fcr);
        }
        s.data = tab;
      }
      console.log('SerieFcr', series);
      this.optionsChartFcr = {
        chart: {
          type: 'areaspline',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        title: {
          text: 'Measure of FCR'
        },
        xAxis: {
          categories: ['D0', 'D7', 'D14', 'D21', 'D28', 'D35', 'D42', 'D49'],
        },
        yAxis: {
          title: {
            text: null
          }},
        tooltip: {
          tooltip: {
            pointFormat: 'D {point.x}: <br>' +
              'Fcr: <b> {point.y} </b><br>'
          },
        },
        plotOptions: {
          areaspline: {
            color: '#02897A',
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, '#02897A94'],
                [1, '#FFFFFF00']
              ]
            },
            threshold: null,

          }
        },
        series: SerieFcr
      };

      Highcharts.chart('chartFcrFlock', this.optionsChartFcr);

    });
  }

  getWaterByFlocks(event) {
    let donneWater = [];
    let date1 = new Date();
    const datepipe: DatePipe = new DatePipe('en-Fr');
    let formatedDate = datepipe.transform(date1, 'yyyy-MM-dd');
    this.dashService.getWaterFlocksByHouseandYear(event, formatedDate, this.date.getFullYear()).subscribe(data => {
      console.log('water', data);
      for (let d of data) {
        donneWater.push({y: d.percentage, name: d.flockName});
      }

      this.optionsChartWater = {
        chart: {
          type: 'column',
          zoomType: 'y',
          height: 250,
        },
        title: {
          text: 'Water consumption'
        },

        xAxis: {
          type: 'category',
        },
        yAxis: {
          labels: {
            overflow: 'justify',
            format: '{value}ml'
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
              format: '{point.y:.1f} ml/bird'
            }
          }
        },
        tooltip: {
          valueSuffix: 'ml'
        },
        legend: {
          enabled: false
        },
        colors: [
          {
            linearGradient: {x1: 0, x2: 1, y1: 0, y2: 1},
            stops: [
              [0, '#7BB4EC'],
              [1, '#407AA9']
            ]
          },
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
              [0, '#64605C'],
              [1, '#392E2C']
            ]
          }

        ],
        series: [
          {
            name: 'Water',
            colorByPoint: true,
            data: donneWater
          }
        ]
      };
      Highcharts.chart('chartWaterflocksComparaison', this.optionsChartWater);
    });
  }

}
