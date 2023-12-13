import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FlockReport } from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { FlockService } from '../../services/flock.service'
import jsPDF from 'jspdf'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
import htmlToPdfmake from 'html-to-pdfmake'
import html2canvas from 'html2canvas'
import { DashboardService } from 'src/app/services/dashboard.service'
import * as Highcharts from 'highcharts'

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
  selector: 'app-flock-report',
  templateUrl: './flock-report.component.html',
  styleUrls: ['./flock-report.component.css'],
})
export class FlockReportComponent implements OnInit {
  constructor(private FlockService: FlockService,
    private dashboardService: DashboardService) {}
  open: boolean = false
  subs: SubSink = new SubSink()
  flockReport = new FlockReport()
  totalStarterFeed: number
  starterFeedPerBird: number
  totalGrowerFeed: number
  growerFeedPerBird: number
  totalFinisherFeed: number
  finisherFeedBird: number
  fcr: number
  ageOfTheFlock: number
  breed:number
  flockBreed:string
  mortality=[]
  Weight=[]
  fcrweekly=[]
  epefWeek=[]
  public optionsChartMortality:any;
  public optionsChartFcr:any;
  public optionsChartEpef:any;
  public optionsChartWeight:any;

  ngOnInit(): void {}

  openModel(flockId) {
    console.log(flockId)
    this.open = true
    this.subs.add(
      this.FlockService.getFlockReport(flockId).subscribe((data) => {
        console.log(data)
        this.flockReport = data
        this.flockBreed=this.flockReport.breed
        this.totalStarterFeed = this.flockReport.weeklyFeed.totalStarterFeed
        this.starterFeedPerBird = this.flockReport.weeklyFeed.starterFeedPerBird
        this.totalGrowerFeed = this.flockReport.weeklyFeed.totalGrowerFeed
        this.growerFeedPerBird = this.flockReport.weeklyFeed.growerFeedPerBird
        this.totalFinisherFeed = this.flockReport.weeklyFeed.totalFinisherFeed
        this.finisherFeedBird = this.flockReport.weeklyFeed.finisherFeedBird

        this.fcr =
          (this.flockReport.totalFeedConsumption /
            this.flockReport.totalWeight) *
          100
        this.fcr = parseFloat(this.fcr.toFixed(3))
        var date1 = new Date(this.flockReport.startOfCycle)
        var date2 = new Date(this.flockReport.endOfCycle)
        // To calculate the time difference of two dates
        this.ageOfTheFlock = date2.getTime() - date1.getTime()
        this.ageOfTheFlock = Math.floor(this.ageOfTheFlock / (1000 * 3600 * 24))
        this.getStandardWeight(this.flockBreed,flockId)
        this.getMortality(flockId)
      }),
    )
  }

  generatePdf(data) {
    html2canvas(data, { allowTaint: true }).then((canvas) => {
      let HTML_Width = canvas.width
      let HTML_Height = canvas.height
      let top_left_margin = 15
      let PDF_Width = HTML_Width + top_left_margin * 2
      let PDF_Height = PDF_Width * 1.5 + top_left_margin * 2
      let canvas_image_width = HTML_Width
      let canvas_image_height = HTML_Height
      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1
      canvas.getContext('2d')
      let imgData = canvas.toDataURL('image/jpeg', 1.0)
      let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height])
      pdf.addImage(
        imgData,
        'JPG',
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height,
      )
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height], 'p')
        pdf.addImage(
          imgData,
          'JPG',
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height,
        )
      }
      pdf.save('HTML-Document.pdf')
    })
  }

  getStandardWeight(res,flockId){
    this.Weight=[]
    switch(res) {
      case "Hubbard": {
         this.breed=1
         break;
      }
      case "Cobb 500": {
        this.breed=2
         break;
      }
      case "Ross": {
        this.breed=3
        break;
     }
     case "Arbor Acres plus": {
      this.breed=4
      break;
   }
   }
   console.log('breed',this.breed)
    this.dashboardService.getweeklyweightStandardBybreed(this.breed).subscribe(data=>{
      for(let d of data){
        this.Weight.push({age:d.age, actual:0, standard:d.weight})
      }


      this.dashboardService.getweeklyweightByBreed(this.breed,flockId,localStorage.getItem("farmID")).subscribe(data1=>{
        this.fcrweekly=[]
        for(let d1 of data1){
          for(let s of this.Weight){
            if(d1.week==s.age){
              s.actual=d1.averge

            }

          }
        }
        //chart of weight
        this.optionsChartWeight = {
          chart: {
            type: "spline",
            backgroundColor: "rgba(0, 0, 0, 0)",
         },
         title: {
          text: 'Average body weight'
        },
         xAxis:{
            categories:this.Weight.map(p => p.age)
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
               name: 'Actual',
               data: this.Weight.map(p => p.actual),
               color:"#00567a"
             },
             {
               name: 'Target',
               data: this.Weight.map(p => p.standard),
               color:"black"
             }
           ]
         };
         Highcharts.chart('chartWeightByStandard', this.optionsChartWeight);
        for(let s of this.Weight){
          let calculFcr=0
          if(s.actual==0){
          this.fcrweekly.push({age:s.age,actual:calculFcr,standard:0})
          }else{
            calculFcr=Math.round(((s.standard-s.actual)/4500) * 100) / 100
            this.fcrweekly.push({age:s.age, actual:calculFcr,standard:0})
          }
        }
        let fcrStand = [0, 0.845, 1.074, 1.216, 1.3, 1.489, 0];
          for(let i of this.fcrweekly) {
              let j = fcrStand.shift();
              i.standard=j
          }
//chart of fcr
          this.optionsChartFcr = {
            chart: {
              type: "spline",
              backgroundColor: "rgba(0, 0, 0, 0)",
           },
           title: {
            text: 'FCR'
          },

           xAxis:{
              categories:this.fcrweekly.map(p => p.age)
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
                 name: 'Actual',
                 data: this.fcrweekly.map(p => p.actual),
                 color:"#405d3a"
               },
               {
                 name: 'Target',
                 data: this.fcrweekly.map(p => p.standard),
                 color:"black"
               }
             ]
           };
           Highcharts.chart('chartFcrByStandard', this.optionsChartFcr);
        this.getEPEF()
        console.log('fcr',this.fcrweekly)
        console.log('wa',this.Weight)


      })
    })

  }

  getMortality(flock){
    this.mortality=[]
    let jValues = [0, 0.7, 1.3, 1.8, 2.3, 3, 0];
for(let i = 0; i <= 42; i += 7) {
    let j = jValues.shift();
    this.mortality.push({age: i, actual: 0, standard: j});
}
    console.log(this.mortality)
    this.dashboardService.getMortalityByage(flock).subscribe(data=>{console.log("mor",data)
  for(let d of data){
    for(let m of this.mortality){
      if(d.age==m.age){
        m.actual=Math.round(((d.weight/this.flockReport.flockNumber)*100) * 100) / 100
      }
    }
  }
  console.log(this.mortality.map(p => p.actual))
  //chart of details
  this.optionsChartMortality = {
    chart: {
      type: "spline",
      backgroundColor: "rgba(0, 0, 0, 0)",
   },
   title: {
    text: 'Mortality'
  },
   xAxis:{
      categories:this.mortality.map(p => p.age)
   },
   yAxis: {
      title:{
         text:"bird"
      }
   },
   tooltip: {
      valueSuffix:"bird"
   },
     series: [
       {
         name: 'Actual',
         data: this.mortality.map(p => p.actual),
         color:"#ad0003"
       },
       {
         name: 'Target',
         data: this.mortality.map(p => p.standard),
         color:"black"
       }
     ]
   };
   Highcharts.chart('chartMortalityByStandard', this.optionsChartMortality);
})
  }

  getEPEF(){
    this.epefWeek=[]
    let jValues = [0, 357.58, 349.87, 389.17, 428.73, 427.35, 0];
    //chat of epef
    this.optionsChartEpef = {
      chart: {
        type: "spline",
        backgroundColor: "rgba(0, 0, 0, 0)",
     },
     title: {
      text: 'EPEF'
    },
     xAxis:{
        categories:this.Weight.map(p => p.age)
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
           name: 'Actual',
           data: [],
           color:"#bc3901"
         },
         {
           name: 'Target',
           data: jValues,
           color:"black"
         }
       ]
     };
     console.log("chart",this.optionsChartEpef)
     Highcharts.chart('chartEpefByStandard', this.optionsChartEpef);

    for(let i=0;i<=7;i++){
      let j = jValues.shift();
      let epef=((100-this.mortality[i].actual)*this.Weight[i].actual*100)/(this.Weight[i].age*this.fcrweekly[i].actual)
      console.log('epef',epef)
      if(Number.isNaN(epef)){
        this.epefWeek.push({age:this.Weight[i].age, actual:0, standard:j})
        this.optionsChartEpef.series[0].data.push(0)
      }else{
        epef=Math.round(((epef)) * 100) / 100
        this.epefWeek.push({age:this.Weight[i].age, actual:epef, standard:j})
        this.optionsChartEpef.series[0].data.push(epef)
      }

    }
    console.log('epef',this.epefWeek)
    this.optionsChartEpef.series[0].data=this.epefWeek.map(p => p.actual)
//chat of epef
    this.optionsChartEpef = {
      chart: {
        type: "spline",
        backgroundColor: "rgba(0, 0, 0, 0)",
     },
     title: {
      text: 'EPEF'
    },
     xAxis:{
        categories:this.Weight.map(p => p.age)
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
           name: 'Actual',
           data: this.Weight.map(p => p.actual),
           color:"#bc3901"
         },
         {
           name: 'Target',
           data: this.Weight.map(p => p.standard),
           color:"black"
         }
       ]
     };
     console.log(this.optionsChartEpef)
     Highcharts.chart('chartEpefByStandard', this.optionsChartEpef);
  }

  close(){
    this.flockReport=new FlockReport()
    this.Weight=[]
    this.fcrweekly=[]
    this.mortality=[]
    this.ageOfTheFlock=0
    this.fcr=0
  }
}
