import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FarmService} from 'src/app/services/farm.service';
import {HouseService} from 'src/app/services/house.service';
import {VisitAuditsService} from 'src/app/services/visit-audits.service';
import {AutofocusDirective} from 'src/app/shared/autofocus.directive';
import {getBase64ImageFromURL} from '../../shared/ImageFromUrl';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-list-brooding-check-list',
  templateUrl: './list-brooding-check-list.component.html',
  styleUrls: ['./list-brooding-check-list.component.css']
})
export class ListBroodingCheckListComponent implements OnInit {


  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective;
  @Output() refreshList = new EventEmitter();
  show = false;
  farmId = '';
  visits = [];
  loading = true;
  breedingDetail: any;

  constructor(private visitAuditsService: VisitAuditsService,
              private houseService: HouseService,
              private farmService: FarmService) {
  }

  ngOnInit(): void {
    this.farmId = localStorage.getItem('farmID');
    this.visitAuditsService.getBroodingCheckByFarm(this.farmId).subscribe(data => {
      console.log(data);
      this.visits = data;
    });

    this.loading = false;
  }

  open() {
    this.show = true;
    console.log('ok');
    setTimeout(() => {
      if (this.autofocus) {
        this.autofocus.setFocus();
      }
    }, 0.1);
  }


  public async export(): Promise<void>{
    const backgroundImage = await getBase64ImageFromURL('/assets/fleliss-v-negatif.png');
    const docDefinition = {
      background: {
        image: backgroundImage,
        width: 595,
        opacity: 0.08,
        verticalAlign: 'middle',
        margin: [0, 180, 0, 0],
        style: 'pageBackground',
      },
      content: [
        {text: 'Brooding check list', style: 'header'},
        {text: 'Visit date : ' + this.breedingDetail.creationDate, style: 'subheader'},
        {
          text:
            'Center : ' + this.breedingDetail.center.centerName,
          style: 'subheader'
        },
        {
          text:
            'House : ' + this.breedingDetail.house.houseName,
          style: 'subheader'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [['', '', 'Status'],
              [{text: 'Before Arrival', bold: true, rowSpan: 15}, 'Litter depth : (2-4 cm)', this.breedingDetail.litterDepth],
              ['', 'litter temperature : (28-30°C)', this.breedingDetail.temperature],
              ['', 'Pre-heat at least : 24 h ( 48h in winter )', this.breedingDetail.preHeatLeast],
              ['', 'Air temperature : (30°C/86°F)', this.breedingDetail.airTemperature],
              ['', 'Floor temperature : (28-30°C)', this.breedingDetail.floorTemperature],
              ['', 'Spot brooding: (32°C under brooder / 29° at brooderedge)', this.breedingDetail.spotBrooding],
              ['', 'Realtive humidity: (60-70%)', this.breedingDetail.realtiveHumidity],
              ['', 'Distance to access water: (No more than 1meter/3.3 feet)', this.breedingDetail.distanceAccessWater],
              ['', 'Air speed : (<0,15 m/s) ', this.breedingDetail.airSpeed],
              ['', 'Check feed form: (Crumble / pellet 2mm)', this.breedingDetail.checkFeed],
              ['', 'Feed on paper : (80% of brooding area)', this.breedingDetail.feedOnPaper],
              ['', 'Feeders Trays : (1/100 chicks)', this.breedingDetail.feedersTrays],
              ['', 'Drinkers Nipple lines : (12 birds/nipple)', this.breedingDetail.drinkersNippleLines],
              ['', 'Drinkers (bell drinkers) : (6/1000 birds)', this.breedingDetail.drinkersBell],
              ['', 'Drinkers supplementary : (10/1000 chicks)', this.breedingDetail.drinkersSupp],
              [{
                text: 'Check delivery',
                bold: true,
                rowSpan: 7
              }, 'Delivery vehicle temperature (chick box :32°C outside chickbox : 24°C)', this.breedingDetail.deliveryVehiTemp],
              ['', 'Delivery vehicle humidity: (60-70%)', this.breedingDetail.deliveryVehiHumi],
              ['', 'Chick confort ( rectal temperature ):(39.5-40.5 °C)', this.breedingDetail.deliveryVehiTemp],
              ['', 'External environmental conditions ( Temperature , Humidity )', this.breedingDetail.externalEnvCond],
              ['', 'Transit time ( hatchery- farm ): (short / long)', this.breedingDetail.transitTime],
              ['', 'Delivery vehicle : air exchange', this.breedingDetail.deliveryVehicleAirExch],
              ['', 'Delivery vehicle : hygiene (disinfected)', this.breedingDetail.deliveryVehicleHygiene],
              [{
                text: 'The arrival',
                bold: true,
                rowSpan: 5
              }, 'Internal chick temperature : (40°C-41°C)', this.breedingDetail.internalChickTemp],
              ['', 'Weigh a sample of chick record average live weight and CV% /uniformity : (Average 36-45g)', this.breedingDetail.weighSampleChick],
              ['', 'Light intensity :(30-40 lux)', this.breedingDetail.lightIntensity],
              ['', 'Ensure feed and water is available', this.breedingDetail.ensureFeedWater],
              ['', 'Water temperature :(18-21 °C)', this.breedingDetail.waterTemperature],
              [{
                text: 'After installation',
                bold: true,
                rowSpan: 4
              }, 'Check chick behavior after 1-2 hours', this.breedingDetail.checkChickBehavior],
              ['', 'Check chick water supply ( fresh & clean water )', this.breedingDetail.checkChickWaterSupply],
              ['', 'Check feed supply ( small & frequent )', this.breedingDetail.checkFeedSupply],
              ['', 'Check chick crop fill', this.breedingDetail.checkChickCropFill],
              [{text: '', rowSpan: 3}, 'Distribution of day old chicks', this.breedingDetail.distributionDayOldChicks],
              ['', 'Daily purges piping', this.breedingDetail.dailyPurgesPiping],
              ['', 'Air quality', this.breedingDetail.airQuality],
            ]
          }
        }
      ],

      styles: {
        pageBackground: {
          alignment: 'center',
          verticalAlign: 'middle',
          textAlign: 'center',
          display: 'flex'
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center',
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        head: {
          bold: true, fillColor: '#EEEEEE'
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('report-BC-' + this.breedingDetail.creationDate + '.pdf');
  }

  onDetailOpen(event) {
    console.log(event);
    this.breedingDetail = event;
  }


}
