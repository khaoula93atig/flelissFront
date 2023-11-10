import {Component, OnInit, ViewChild} from '@angular/core';
import {NewVetVisitComponent} from '../new-vet-visit/new-vet-visit.component';
import {VisitService} from '../../services/visit.service';
import {VisitVeterinarianService} from '../../services/visit-veterinarian.service';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-list-vet-visit',
  templateUrl: './list-vet-visit.component.html',
  styleUrls: ['./list-vet-visit.component.css'],
})
export class ListVetVisitComponent implements OnInit {
  constructor(
    private VisitService: VisitService,
    private VisitVeterinarianService: VisitVeterinarianService,
  ) {
  }

  subs: SubSink = new SubSink();
  visits: any = [];
  // Spinner display visit
  loading: boolean;
  visitId: string;
  /******visitHealthStatus**** */
  visitHealthStatus: any[];
  prostrationMeasure: string;
  anorexiaMeasure: string;
  prostration: string;
  ruffledFeatherMeasure: string;
  dehydratationMeasure: string;
  coughingnMeasure: string;
  nasalExsudateMeasure: string;
  sneezingMeasure: string;
  trachealRalesMeasure: string;
  ocularDischargeMeasure: string;
  conjonctivitisMeasure: string;
  oedemaMeasure: string;
  DiarrhoeaMeasure: string;
  whitishMeasure: string;
  WateryMeasure: string;
  MucoidMeasure: string;
  greenishMeasure: string;
  /********visitNecropsy**** */
  visitNecropsy: any[];
  ExternalComment: string;
  BonesComment: string;
  LegFeetComment: string;
  TracheaComment: string;
  CropComment: string;
  thymusComment: string;
  liverComment: string;
  SpleenComment: string;
  kidneyComment: string;
  heartComment: string;
  lungComment: string;
  gastroIntestinalTractComment: string;
  bursaFabriciusComment: string;
  brainComment: string;
  generalObservation: string;
  respiratoryObservation: string;
  digestiveObservation: string;
  locomotionObservation: string;
  NervousMeasure: string;
  DermatitisMeasure: string;
  otherObservation: string;
  visitDate: string;

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    //get house by farm id
    var userName = localStorage.getItem('user');

    var userName = localStorage.getItem('user');
    var role = localStorage.getItem('role');
    var farmId = localStorage.getItem('farmID');

    if (role == 'Farm Manager') {
      var roleId = 'Farm_Manager';
    }
    this.subs.add(
      this.VisitVeterinarianService.getConsultingVisitvet(
        userName,
        roleId,
        farmId,
      ).subscribe((data) => {
        this.visits = data;
        console.log('visits', this.visits);
        this.loading = false;
      }),
    );
  }

  onDetailOpen(event) {
    if (event != null && event != undefined) {
      this.visitId = event.visitId;
      this.visitDate = event.visitDate;

      this.showHealthStatusResult(this.visitId);
    }
  }

  // open health status & necropsy result
  showHealthStatusResult(id: string): void {
    // heathStatus result by visit ID

    this.subs.add(
      this.VisitVeterinarianService.getConsultingHealthStatusbyId(id).subscribe(
        (data) => {
          this.visitHealthStatus = data;

          for (let healthstatus of this.visitHealthStatus) {
            if (healthstatus.prostration == false) {
              this.prostrationMeasure = 'No';
            } else if (healthstatus.prostration == true) {
              this.prostrationMeasure == 'Yes';
            }
            if (healthstatus.prostration == true) {
              this.prostration = 'Yes';
            } else if (healthstatus.prostration == false) {
              this.prostration = 'No';
            }

            if (healthstatus.anorexia == true) {
              this.anorexiaMeasure = 'Yes';
            } else if (healthstatus.anorexia == false) {
              this.anorexiaMeasure = 'No';
            }
            if (healthstatus.ruffledFeather == true) {
              this.ruffledFeatherMeasure = 'Yes';
            } else if (healthstatus.ruffledFeather == false) {
              this.ruffledFeatherMeasure = 'No';
            }

            if (healthstatus.dehydratation == true) {
              this.dehydratationMeasure = 'Yes';
            } else if (healthstatus.dehydratation == false) {
              this.dehydratationMeasure = 'No';
            }

            if (healthstatus.coughing == true) {
              this.coughingnMeasure = 'Yes';
            } else if (healthstatus.coughing == false) {
              this.coughingnMeasure = 'No';
            }

            if (healthstatus.nasalExsudate == true) {
              this.nasalExsudateMeasure = 'Yes';
            } else if (healthstatus.nasalExsudate == false) {
              this.nasalExsudateMeasure = 'No';
            }

            if (healthstatus.sneezing == true) {
              this.sneezingMeasure = 'Yes';
            } else if (healthstatus.sneezing == false) {
              this.sneezingMeasure = 'No';
            }

            if (healthstatus.trachealRales == true) {
              this.trachealRalesMeasure = 'Yes';
            } else if (healthstatus.trachealRales == false) {
              this.trachealRalesMeasure = 'No';
            }

            if (healthstatus.ocularDischarge == true) {
              this.ocularDischargeMeasure = 'Yes';
            } else if (healthstatus.ocularDischarge == false) {
              this.ocularDischargeMeasure = 'No';
            }
            if (healthstatus.conjonctivitis == true) {
              this.conjonctivitisMeasure = 'Yes';
            } else if (healthstatus.conjonctivitis == false) {
              this.conjonctivitisMeasure = 'No';
            }

            this.generalObservation = healthstatus.generalObservation;
            this.respiratoryObservation = healthstatus.respiratoryObservation;
            this.digestiveObservation = healthstatus.digestiveObservation;
            this.locomotionObservation = healthstatus.locomotionObservation;
            this.otherObservation = healthstatus.otherObservation;
            this.DermatitisMeasure = healthstatus.dermatitis;
            this.NervousMeasure = healthstatus.nervous;
            if (healthstatus.oedema == true) {
              this.oedemaMeasure = 'Yes';
            } else if (healthstatus.oedema == false) {
              this.oedemaMeasure = 'No';
            }

            if (healthstatus.diarrhoea == true) {
              this.DiarrhoeaMeasure = 'Yes';
            } else if (healthstatus.diarrhoea == false) {
              this.DiarrhoeaMeasure = 'No';
            }

            if (healthstatus.whitish == true) {
              this.whitishMeasure = 'Yes';
            } else if (healthstatus.whitish == false) {
              this.whitishMeasure = 'No';
            }

            if (healthstatus.watery == true) {
              this.WateryMeasure = 'Yes';
            } else if (healthstatus.watery == false) {
              this.WateryMeasure = 'No';
            }

            if (healthstatus.mucoid == true) {
              this.MucoidMeasure = 'Yes';
            } else if (healthstatus.mucoid == false) {
              this.MucoidMeasure = 'No';
            }

            if (healthstatus.greenish == true) {
              this.greenishMeasure = 'Yes';
            } else if (healthstatus.greenish == false) {
              this.greenishMeasure = 'No';
            }
          }
        },
      ),
    );
    // necropsy result by visit ID
    this.subs.add(
      this.VisitVeterinarianService.getConsultingNecropsybyId(id).subscribe(
        (data) => {
          this.visitNecropsy = data;
          console.log(
            '  this.visitNecropsy' + JSON.stringify(this.visitNecropsy),
          );
          for (let Necropsy of this.visitNecropsy) {
            this.ExternalComment = Necropsy.externalExamination;
            this.BonesComment = Necropsy.bones;
            this.LegFeetComment = Necropsy.legFeet;
            this.TracheaComment = Necropsy.trachea;
            this.CropComment = Necropsy.crop;
            this.thymusComment = Necropsy.thymus;
            this.liverComment = Necropsy.liver;
            this.SpleenComment = Necropsy.spleen;
            this.kidneyComment = Necropsy.kidney;
            this.heartComment = Necropsy.heart;
            this.lungComment = Necropsy.lung;
            this.gastroIntestinalTractComment = Necropsy.gastroIntestinalTract;
            this.bursaFabriciusComment = Necropsy.bursaFabricius;
            this.brainComment = Necropsy.brain;
          }
        },
      ),
    );
  }

  //substr houseId
  gethouse_id(id: string) {
    return id.substr(10, id.length);
  }

  showAnalyse() {
    this.VisitVeterinarianService.showAnalyse(this.visitDate, this.visitId);
  }

  @ViewChild(NewVetVisitComponent) modal: NewVetVisitComponent;
}
