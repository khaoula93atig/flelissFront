import {Component, OnInit, ViewChild} from '@angular/core';
import {NewVisitComponent} from '../new-visit/new-visit.component';
import {VisitService} from '../../services/visit.service';
import {SubSink} from 'subsink';
import {WeeklyWeightComponent} from '../weekly-weight/weekly-weight.component';
import {WeeklyFeedComponent} from '../weekly-feed/weekly-feed.component';
import {MotalityVisitComponent} from '../motality-visit/motality-visit.component';

@Component({
  selector: 'app-list-visit',
  templateUrl: './list-visit.component.html',
  styleUrls: ['./list-visit.component.css'],
})
export class ListVisitComponent implements OnInit {
  constructor(private visitService: VisitService) {
  }

  @ViewChild(WeeklyWeightComponent) modal2: WeeklyWeightComponent;
  @ViewChild(WeeklyFeedComponent) modal3: WeeklyFeedComponent;
  @ViewChild(MotalityVisitComponent) modal1: MotalityVisitComponent;

  @ViewChild(NewVisitComponent) modal: NewVisitComponent;

  // Spinner display visit
  loading: boolean;
  subs: SubSink = new SubSink();
  visits: any = [];
  visitId: string;
  visittasks: any = [];

  // humidity fields
  measureHumResult: string;
  standardHumResult: string;
  deviationHumResult: string;
  descritptionTemResult: string;
  // temperature fields
  measureTemResult: string;
  standardTemResult: string;
  deviationTemResult: string;
  descritptionHumResult: string;
  // airSpeedTask fields
  measureAirSResult: string;
  standardAirSResult: string;
  deviationAirSResult: string;
  descritptionAirSResult: string;
  // amoniacTask fields
  measureAmoResult: string;
  standardAmoResult: string;
  deviationAmoResult: string;
  descritptionAmoResult: string;
  // lightIntensityTask fields
  measureLighIResult: string;
  standardLighIResult: string;
  deviationLighIResult: string;
  descritptionLighIResult: string;
  // feedConsumptionTask fields
  measureFeedCResult: string;
  percentageFeedCResult: string;
  standardFeedCResult: string;
  deviationFeedCResult: string;
  descritptionFeedCResult: string;
  // waterConsumptionTask fields
  measureWatCResult: string;
  standardWatCResult: string;
  percentageWatCResult: string;
  deviationWatCResult: string;
  descritptionWatCResult: string;
  // mortalityTask fields
  measureMortResult: string;
  standardMortResult: string;
  deviationMortResult: string;
  descritptionMortResult: string;
  percentageMortResult: string;
  // litterConditionTask fields
  measureLittCResult: string;
  standardLittCResult: string;
  deviationLittCResult: string;
  descritptionLittCResult: string;
  // densityTask fields
  measureDensResult: string;
  standardDensResult: string;
  deviationDensResult: string;
  descritptionDensResult: string;
  // weightTask fields
  measureWeightResult: string;
  standardWeightResult: string;
  deviationWeightResult: string;
  descritptionWeightResult: string;
  // homogeneityFlockTask fields
  measureHomogResult: string;
  standardHomogResult: string;
  deviationHomogResult: string;
  descritptionHomogResult: string;
  role: string;

  onDetailOpen(event) {
    console.log(event);
    if (event != null && event != undefined) {
      this.visitId = event.visitId;
      console.log(this.visitId);
      this.showTaskResult(this.visitId)
      /*this.visitService.getConsultingvisitID(this.visitId).subscribe(data => {
        this.visittasks = data;
        for (let i = 0; i < this.visittasks.length; i++) {
          if (this.visittasks[i].taskId == 8) {
            this.visittasks[i].measure = this.visittasks[i].percentage.toFixed(2);
          }
        }
        console.log(data);
      });*/
    }
  }

  // open tasks result
  showTaskResult(id: string): void {
    this.subs.add(
      this.visitService.getConsultingvisitID(id).subscribe(
        (data) => {
          console.log(data);
          this.visittasks=data;
          this.visittasks.forEach((element) => {
          });
          for (let i = 0; i < data.length; i++) {
            if (data[i].taskId == 1) {

              this.measureTemResult = data[i].measure;
              this.standardTemResult = data[i].standard;
              this.deviationTemResult = data[i].deviation;
              this.descritptionTemResult = data[i].task.description;
            } else if (data[i].taskId == 2) {
              this.measureHumResult = data[i].measure;
              this.standardHumResult = data[i].standard;
              this.deviationHumResult = data[i].deviation;
              this.descritptionHumResult = data[i].task.description;
            } else if (data[i].taskId == 3) {
              this.measureAirSResult = data[i].measure;
              this.standardAirSResult = data[i].standard;
              this.deviationAirSResult = data[i].deviation;
              this.descritptionAirSResult = data[i].task.description;
            } else if (data[i].taskId == 4) {
              this.measureAmoResult = data[i].measure;
              this.standardAmoResult = '< ' + data[i].standard;
              this.deviationAmoResult = data[i].deviation;
              this.descritptionAmoResult = data[i].task.description;
            } else if (data[i].taskId == 5) {
              this.measureLighIResult = data[i].measure;
              this.standardLighIResult = data[i].standard;
              this.deviationLighIResult = data[i].deviation;
              this.descritptionLighIResult = data[i].task.description;
            } else if (data[i].taskId == 6) {
              this.measureFeedCResult = data[i].measure;
              this.percentageFeedCResult = data[i].percentage.toFixed(2);
              this.standardFeedCResult = data[i].standard;
              this.deviationFeedCResult = data[i].deviation;
              this.descritptionFeedCResult = data[i].task.description;
            } else if (data[i].taskId == 7) {
              this.measureWatCResult = data[i].measure;
              this.percentageWatCResult = data[i].percentage.toFixed(2);
              this.standardWatCResult = data[i].standard;
              this.deviationWatCResult = data[i].deviation;
              this.descritptionWatCResult = data[i].task.description;
            } else if (data[i].taskId == 8) {
              this.measureMortResult = data[i].measure;
              this.standardMortResult = data[i].standard;
              this.deviationMortResult = data[i].deviation;
              this.descritptionMortResult = data[i].task.description;
              this.percentageMortResult = data[i].percentage.toFixed(2);
            } else if (data[i].taskId == 9) {
              this.measureLittCResult = data[i].measure;
              this.standardLittCResult = data[i].standard;
              this.deviationLittCResult = data[i].deviation;
              this.descritptionLittCResult = data[i].task.description;
            } else if (data[i].taskId == 10) {
              this.measureDensResult = data[i].measure;
              this.standardDensResult = data[i].standard;
              this.deviationDensResult = data[i].deviation;
              this.descritptionDensResult = data[i].task.description;
            } else if (data[i].taskId == 11) {
              this.measureWeightResult = data[i].measure;
              this.standardWeightResult = data[i].standard;
              this.deviationWeightResult = data[i].deviation;
              this.descritptionWeightResult = data[i].task.description;
            } else if (data[i].taskId == 12) {
              this.measureHomogResult = data[i].measure;
              this.standardHomogResult = data[i].standard;
              this.deviationHomogResult = data[i].deviation;
              this.descritptionHomogResult = data[i].task.description;
            }
          }
        },
      ),
    );
  }

  ngOnInit(): void {
    this.refresh();
    this.role = localStorage.getItem('role');
  }

  // refresh list-visit
  refresh(): void {
    // get house by farm id
    var userName = localStorage.getItem('user');
    var role = localStorage.getItem('role');
    var farmId = localStorage.getItem('farmID');
    if (role == 'Farm Manager') {
      var roleId = 'Farm_Manager';
    }
    this.subs.add(
      this.visitService.getConsultingVisit(userName, roleId, farmId).subscribe(
        (data) => {
          this.visits = data;
          this.loading = false;
        },
      ),
    );
  }

  /* get by company id
  getCompanyId(detail) {
    this.visitId = detail;
  }

  // substr houseId
  gethouse_id(id: string) {
    return id.substr(10, id.length);
  }*/

}
