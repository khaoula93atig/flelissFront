import { array } from '@amcharts/amcharts5';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SubSink } from 'subsink';

import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-mortality',
  templateUrl: './mortality.component.html',
  styleUrls: ['./mortality.component.css']
})
export class MortalityComponent implements OnInit {
  public optionsPie: any;
  public optionsChart: any;
  public optionsChart1: any;

  constructor(private UserService: UserService,
    private dashboardService: DashboardService) { }
  subs: SubSink = new SubSink();
  dataList: any[];
  date= new Date();

  dynamicArrayFlock: Array<FlockWeight> = [];
  dynamicArrayFlock2: Array<FlockWeight> = [];
  newDynamicEcriture: any = {};
  ch: Array<any> = [];
  ageFlock: Array<any> = [];
  weight: Array<any> = [];

  flockID: string;
  HouseID: string;
  centerID: string;
  j: number;

  ngOnInit(): void {
    this.mortalityHouse();
    this.mortalityBreed();
    this.mortalityYear();

    this.subs.add(this.UserService.getWeightByFlock().subscribe(data => {
      this.dataList = data;
      console.log(" this.dataList " + this.dataList);
      let flockWeight: FlockWeight = new Object() as FlockWeight;

      var uniqueArray = this.removeDuplicates(this.dataList, "flockID");
      console.log("uniqueArray is: " + JSON.stringify(uniqueArray));


      //this.ch = this.ch + (this.dataList[0].flockID).toString() + ",";
      this.dynamicArrayFlock.push(this.dataList[0]);
      let age = new Array();
      let weight = new Array();
      for (let index = 0; index < this.dataList.length - 1; index++) {







        //}


      }



      for (let object of this.dynamicArrayFlock2) {
        console.log("this.dynamicArrayFlock" + JSON.stringify(object));
      }

    }));
  }


  removeDuplicates(data, flockID) {
    var newArray = [];
    var lookupObject = {};
    var age = [];
    var weight = [];

    for (var i in data) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let j = index - 1;
        console.log("j" + j)
        if (element.flockID != data[j].flockID) {
          console.log("erreur")
        }

      }

      //    lookupObject[data[index][flockID]] = data[index];
      console.log("lookupObject " + JSON.stringify(lookupObject[data[i][flockID]]));
      console.log(" data[i] " + JSON.stringify(data[i]));
      age.push(data[i].ageFlock);
      weight.push(data[i].weight);
      lookupObject = { HouseID: data[i].houseID, centerID: data[i].centerID, flockID: data[i].flockID, ageFlock: age, weight: weight };
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }


  mortalityBreed() {
    let category:any[]=[]
    let mortality:any[]=[]
    this.dashboardService.getMortalityByBreed().subscribe(data=>{
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
        mortality.push(res.mortality)

      }
      console.log(category)
      console.log(mortality)
    this.optionsChart1 = {
      chart: {
        type: "bar",
        zoomType: "y",
        height: 250,
      },
      title: {
        text: "Mortality by breed"
      },

      xAxis: {
        categories: category,
        type: "category",
        title: {
          text: null
        }
      },
      yAxis: {
        //min: 0,
        //max: 30,
        tickInterval: 10,
        title: {
          text: null
        },
        labels: {
          overflow: "justify",
          format: "{value}%"
        }
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
          color: "#a5d6a7",
          borderColor: '#60A465',
          data: mortality
        }
      ]
    }
    console.log(this.optionsChart1.series)
    console.log(this.optionsChart1.xAxis.categories)
    Highcharts.chart('chartBarCenterMortality', this.optionsChart1);
  })
  }

  mortalityHouse() {
    this.optionsChart = {
      chart: {
        type: "bar",
        zoomType: "y",
        height: 250,
      },
      title: {
        text: "Mortality by breed"
      },

      xAxis: {
        categories: [
          "House 1",
          "House 2",
          "House 3",

        ],
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        max: 30,
        tickInterval: 10,
        title: {
          text: null
        },
        labels: {
          overflow: "justify",
          format: "{value}%"
        }
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
          color: "#6BAFC0",
          borderColor: '#046288',
          data: [24.1, 20.6, 20.3]
        }
      ]
    }
    Highcharts.chart('chartBreedMortality', this.optionsChart);

  }

  mortalityYear() {
    this.optionsPie = {
      chart: {
        height: 510,
      },
      title: {
        text: 'Mortality by month'
      },

      /*subtitle: {
        text: 'Source: thesolarfoundation.com'
      },*/

      yAxis: {
        title: {
          text: 'Number of Employees'
        }
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017'
        }
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2012
        }
      },

      series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }


      ],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }

    }
    Highcharts.chart('chartBarYearMortality', this.optionsPie);

  }





}
export interface FlockWeight {

  ageFlock: Array<number>;
  weight: Array<number>;
  flockID: string;
  HouseID: string;
  centerID: string;
}