import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FarmService} from 'src/app/services/farm.service';
import {HouseService} from 'src/app/services/house.service';
import {VisitAuditsService} from 'src/app/services/visit-audits.service';
import {AutofocusDirective} from 'src/app/shared/autofocus.directive';
import {getBase64ImageFromURL} from '../../shared/ImageFromUrl';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {environment} from '../../../environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-manager-audit-vist',
  templateUrl: './list-manager-audit-vist.component.html',
  styleUrls: ['./list-manager-audit-vist.component.css']
})
export class ListManagerAuditVistComponent implements OnInit {
  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective;
  @Output() refreshList = new EventEmitter();
  show = false;
  farmId = '';
  visits = [];
  loading = true;
  deviation = '';
  breedingDetail: any;
  company: string;
  image: string;

  constructor(
    private visitAuditsService: VisitAuditsService,
    private houseService: HouseService,
    private farmService: FarmService
  ) {
  }

  ngOnInit(): void {
    this.farmId = localStorage.getItem('farmID');
    this.visitAuditsService.getBreedingManagementByFarm(this.farmId).subscribe(data => {
      console.log(data);
      this.visits = data;
    });

    this.loading = false;
    this.company = localStorage.getItem('companyID');
    console.log(this.company);
    this.image = environment.url_company + '/image/' + this.company;
  }

  open() {
    this.show = true;
    // clone the user (we don't want to modify the original in the dialog)
    console.log('ok');
    setTimeout(() => {
      if (this.autofocus) {
        this.autofocus.setFocus();
      }
    }, 0.1);
  }

  onDetailOpen(event) {
    console.log(event);
    this.breedingDetail = event;
  }


  public async export(): Promise<void> {
    const backgroundImage = await getBase64ImageFromURL('/assets/fleliss-v-negatif.png');
    const logo = await getBase64ImageFromURL(this.image);

    const docDefinition = {
      background: {
        image: backgroundImage,
        width: 595,
        opacity: 0.08,
        verticalAlign: 'middle',
        margin: [0, 180, 0, 0],
        style: 'pageBackground',
      },
      content: [{
          columns: [
            {image: backgroundImage , width: 75 , alignment: 'left'},

            {text: 'Breeding management', style: 'header'},

            {image: logo , width: 75 , alignment: 'right'},
          ],
          columnGap: 10
        },
        {text: 'Visit date : ' + this.breedingDetail.visitDate, style: 'subheader'},
        {
          text:
            'Center : ' + this.breedingDetail.center.centerName,
          style: 'subheader'
        },
        {
          text:
            'Scoring : ' + this.breedingDetail.scoring,
          style: 'subheader'
        },
        {
          style: 'tableExample',
          table: {
            widths: [400, 'auto'],
            margin: [10, 10 , 10 , 10],
            // heights: 30,
            headerRows: 1,
            body: [['', 'Status'],
              ['Cleanliness of buildings', this.breedingDetail.cleanlinessBuild],
              ['Absence of holes and sharp cracks in buildings', this.breedingDetail.absenceHolesSharpCracks],
              ['Condition of doors and windows at building level (cleanliness and tightness)', this.breedingDetail.conditionDoorsWindowsBuilding],
              ['Sealing of the ceiling at building level', this.breedingDetail.sealingCeilingBuilding],
              ['No air leaks in buildings', this.breedingDetail.airLeaksBuildings],
              ['Storage of vaccines', this.breedingDetail.storageVaccines],
              ['Cleanliness of feeders', this.breedingDetail.cleanlinessFeeders],
              ['Sufficient number of feeders', this.breedingDetail.sufficientNumberFeeders],
              ['Adjustment of the height of the feeders according to age', this.breedingDetail.adjustmentHeightFeedersAccording],
              ['No unjustified feed leaks', this.breedingDetail.unjustifiedFeedLeaks],
              ['Feed shape and size according to age', this.breedingDetail.feedShapeSizeAccordingAge],
              ['Feed transition achieved', this.breedingDetail.feedTransitionAchieved],
              ['Recording of daily feed consumption', this.breedingDetail.recordingDailFeedConsumption],
              ['Availability and sufficiency of feed', this.breedingDetail.availabilitySufficiencyFeed],
              ['Cleanliness of tanks and filters', this.breedingDetail.cleanlinessTanksFilters],
              ['Cleanliness of nipples', this.breedingDetail.cleanlinessNipples],
              ['Correct operation of the watering lines', this.breedingDetail.correctOperationWatering],
              ['Correct operation of pressure regulator', this.breedingDetail.correctOperationPressureRegulator],
              ['Sufficient number of drinkers', this.breedingDetail.sufficientNumberDrinkers],
              ['Adjustment of height of drinkers according to growth', this.breedingDetail.adjustmentHeightDrinkersAccording],
              ['No water leaks', this.breedingDetail.waterLeaks],
              ['Recording of daily water consumption', this.breedingDetail.recordingDailyWaterConsumption],
              ['Monitoring the physico-chemical quality of drinking water', this.breedingDetail.monitoringPhysicoDw],
              ['Monitoring the bacteriological quality of drinking water', this.breedingDetail.monitoringBacteriologicalDw],
              ['Dosing pump compliant', this.breedingDetail.dosingPumpCompliant],
              ['Cleanliness of brooders', this.breedingDetail.cleanlinessBrooders],
              ['Correct distribution of brooders', this.breedingDetail.correctDistributionBrooders],
              ['Availability, location and functionality (thermometers and sonsors)', this.breedingDetail.availLocationFunct],
              ['Observance of the heating program', this.breedingDetail.observanceHeatingProgram],
              ['State of the cooling system (pad cooling)', this.breedingDetail.stateCoolingSystem],
              ['Correct operation of the cooling system', this.breedingDetail.correctOperationCoolingSystem],
              ['Fans maintained', this.breedingDetail.fansMaintained],
              ['Proper operation of fans', this.breedingDetail.properOperationFans],
              ['Hatch opening level', this.breedingDetail.hatchOpeningLevel],
              ['Observance of air flow', this.breedingDetail.observanceAirFlow],
              ['Daily recording of minimum and maximum temperatures', this.breedingDetail.dailyRecordMinMaxTemp],
              ['Recording of minimum and maximum daily humidity', this.breedingDetail.recordMinmaxDailyHumidity],
              ['Breeding humidity conforms', this.breedingDetail.breedingHumidityConfor],
              ['Energy saving lamps', this.breedingDetail.energySavingLamps],
              ['Number of working lamps', this.breedingDetail.numberWorkingLamps],
              ['Adequate distribution of lamps', this.breedingDetail.adequateDistriLamps],
              ['Litter quality', this.breedingDetail.litterQuality],
              ['Mechanical thermostat and alarm functional', this.breedingDetail.mechanicalThermostatAlarmFunct],
              ['Functional technical parameter display system', this.breedingDetail.functionalTechParaDisplaySys],
              ['Number of birds per cage or square meter', this.breedingDetail.numberBirdCageSquareMeter],
              ['Isolation of sick sick animals', this.breedingDetail.isolationSickSickAnimals],
              ['Compliant weighing method', this.breedingDetail.compliantWeighingMethod],
              ['Sampling compliant', this.breedingDetail.samplingCompliant],
              ['Weighing recording', this.breedingDetail.weighingRecording],
              ['Evolution of the weight compared to standard', this.breedingDetail.evolutionWeightComparedStandard],
              ['Compliance with the vaccination program', this.breedingDetail.complianceVaccinProgram],
              ['Monitoring of vaccination age', this.breedingDetail.monitoringVaccinationAge],
              ['Vaccine dose control', this.breedingDetail.vaccineDoseControl],
              ['Technical performance', this.breedingDetail.technicalPerformance],
            ]
          },layout: {
            paddingTop: function (i, node) {
              return 5;
            },
            paddingBottom: function (i, node) {
              return 5;
            }
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
          margin: [0, 70, 0, 10],
          alignment: 'center',
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [20, 5, 0, 10],
        },
        head: {
          bold: true, fillColor: '#EEEEEE'
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('breedingManagement' + '-' + this.breedingDetail.visitDate + '.pdf');
  }

}
