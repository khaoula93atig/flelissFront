import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FarmService } from 'src/app/services/farm.service';
import { HouseService } from 'src/app/services/house.service';
import { VisitAuditsService } from 'src/app/services/visit-audits.service';
import { AutofocusDirective } from 'src/app/shared/autofocus.directive';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-manager-audit-vist',
  templateUrl: './list-manager-audit-vist.component.html',
  styleUrls: ['./list-manager-audit-vist.component.css']
})
export class ListManagerAuditVistComponent implements OnInit {
  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective
  @Output() refreshList = new EventEmitter();
  show = false
  farmId =''
  visits=[]
  loading = true 
  deviation = ''
  breedingDetail :any
  constructor(
    private visitAuditsService : VisitAuditsService,
    private houseService : HouseService,
    private farmService: FarmService
  ) { }

  ngOnInit(): void {
    this.farmId = localStorage.getItem('farmID');
    this.visitAuditsService.getBreedingManagementByFarm(this.farmId).subscribe(data=>{console.log(data)
      this.visits=data
    })
  
    this.loading = false
  }

  open() {
    this.show = true
    // clone the user (we don't want to modify the original in the dialog)
    console.log('ok')
    setTimeout(() => {
      if (this.autofocus) {
        this.autofocus.setFocus()
      }
    }, 0.1)
  }

  onDetailOpen(event) {
    console.log(event)
    this.breedingDetail=event
  }

  
  public async export(): Promise<void> {
const backgroundImage =await this.getBase64ImageFromURL("/assets/fleliss-v-negatif.png")

    const docDefinition = {
    background: {
      image: backgroundImage,
      width: 595, // Largeur de la page (A4)
      opacity: 0.05,
      alignment:"center",
      verticalAlign: "middle",
      //height: 842, // Hauteur de la page (A4)
      style: "pageBackground",
    },
      content: [
        {text: "Breeding management", style: "header" },
        { text: "Visit date : "+this.breedingDetail.visitDate, style: "subheader" },
        {
          text:
            "Center : "+this.breedingDetail.center.centerName,
          style: "subheader"
        },
        {
          text:
            "Scoring : "+this.breedingDetail.scoring,
          style: "subheader"
        },
        {
          style: "tableExample",
          table: {headerRows:1,
            body: [["", "Status"],
              ["Cleanliness of buildings",this.breedingDetail.cleanlinessBuild],
              ["Absence of holes and sharp cracks in buildings",this.breedingDetail.absenceHolesSharpCracks],
              ["Condition of doors and windows at building level (cleanliness and tightness)",this.breedingDetail.conditionDoorsWindowsBuilding],
              ["Sealing of the ceiling at building level",this.breedingDetail.sealingCeilingBuilding],
              ["No air leaks in buildings",this.breedingDetail.airLeaksBuildings],
              ["Storage of vaccines",this.breedingDetail.storageVaccines],
              ["Cleanliness of feeders",this.breedingDetail.cleanlinessFeeders],
              ["Sufficient number of feeders",this.breedingDetail.sufficientNumberFeeders],
              ["Adjustment of the height of the feeders according to age",this.breedingDetail.adjustmentHeightFeedersAccording],
              ["No unjustified feed leaks",this.breedingDetail.unjustifiedFeedLeaks],
              ["Feed shape and size according to age",this.breedingDetail.feedShapeSizeAccordingAge],
              ["Feed transition achieved",this.breedingDetail.feedTransitionAchieved],
              ["Recording of daily feed consumption",this.breedingDetail.recordingDailFeedConsumption],
              ["Availability and sufficiency of feed",this.breedingDetail.availabilitySufficiencyFeed],
              ["Cleanliness of tanks and filters",this.breedingDetail.cleanlinessTanksFilters],
              ["Cleanliness of nipples",this.breedingDetail.cleanlinessNipples],
              ["Correct operation of the watering lines",this.breedingDetail.correctOperationWatering],
              ["Correct operation of pressure regulator",this.breedingDetail.correctOperationPressureRegulator],
              ["Sufficient number of drinkers",this.breedingDetail.sufficientNumberDrinkers],
              ["Adjustment of height of drinkers according to growth",this.breedingDetail.adjustmentHeightDrinkersAccording],
              ["No water leaks",this.breedingDetail.waterLeaks],
              ["Recording of daily water consumption",this.breedingDetail.recordingDailyWaterConsumption],
              ["Monitoring the physico-chemical quality of drinking water",this.breedingDetail.monitoringPhysicoDw],
              ["Monitoring the bacteriological quality of drinking water",this.breedingDetail.monitoringBacteriologicalDw],
              ["Dosing pump compliant",this.breedingDetail.dosingPumpCompliant],
              ["Cleanliness of brooders",this.breedingDetail.cleanlinessBrooders],
              ["Correct distribution of brooders",this.breedingDetail.correctDistributionBrooders],
              ["Availability, location and functionality (thermometers and sonsors)",this.breedingDetail.availLocationFunct],
              ["Observance of the heating program",this.breedingDetail.observanceHeatingProgram],
              ["State of the cooling system (pad cooling)",this.breedingDetail.stateCoolingSystem],
              ["Correct operation of the cooling system",this.breedingDetail.correctOperationCoolingSystem],
              ["Fans maintained",this.breedingDetail.fansMaintained],
              ["Proper operation of fans",this.breedingDetail.properOperationFans],
              ["Hatch opening level",this.breedingDetail.hatchOpeningLevel],
              ["Observance of air flow",this.breedingDetail.observanceAirFlow],
              ["Daily recording of minimum and maximum temperatures",this.breedingDetail.dailyRecordMinMaxTemp],
              ["Recording of minimum and maximum daily humidity",this.breedingDetail.recordMinmaxDailyHumidity],
              ["Breeding humidity conforms",this.breedingDetail.breedingHumidityConfor],
              ["Energy saving lamps",this.breedingDetail.energySavingLamps],
              ["Number of working lamps",this.breedingDetail.numberWorkingLamps],
              ["Adequate distribution of lamps",this.breedingDetail.adequateDistriLamps],
              ["Litter quality",this.breedingDetail.litterQuality],
              ["Mechanical thermostat and alarm functional",this.breedingDetail.mechanicalThermostatAlarmFunct],
              ["Functional technical parameter display system",this.breedingDetail.functionalTechParaDisplaySys],
              ["Number of birds per cage or square meter",this.breedingDetail.numberBirdCageSquareMeter],
              ["Isolation of sick sick animals",this.breedingDetail.isolationSickSickAnimals],
              ["Compliant weighing method",this.breedingDetail.compliantWeighingMethod],
              ["Sampling compliant",this.breedingDetail.samplingCompliant],
              ["Weighing recording",this.breedingDetail.weighingRecording],
              ["Evolution of the weight compared to standard",this.breedingDetail.evolutionWeightComparedStandard],
              ["Compliance with the vaccination program",this.breedingDetail.complianceVaccinProgram],
              ["Monitoring of vaccination age",this.breedingDetail.monitoringVaccinationAge],
              ["Vaccine dose control",this.breedingDetail.vaccineDoseControl],
              ["Technical performance",this.breedingDetail.technicalPerformance],
            ]
          }
        }
    ],

      styles: {
        pageBackground: {
          alignment: 'center',
          verticalAlign: "middle",
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
          margin: [0, 5, 0, 15],
        },
        head:{
          bold:true, fillColor:'#EEEEEE'
        }
      }
    };

    pdfMake.createPdf(docDefinition).download("breedingManagement"+"-"+this.breedingDetail.visitDate+".pdf");
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

}
