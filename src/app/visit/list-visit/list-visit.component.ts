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
      this.visitService.getConsultingvisitID(this.visitId).subscribe(data => {
        this.visittasks = data;
        for (let i = 0; i < this.visittasks.length; i++) {
          if (this.visittasks[i].taskId == 8) {
            this.visittasks[i].measure = this.visittasks[i].percentage.toFixed(2);
          }
        }
        console.log(data);
      });
    }
  }

  // open tasks result
  showTaskResult(id: string): void {
    this.subs.add(
      this.visitService.getConsultingvisitID(id).subscribe(
        (visittasks) => {
          console.log(visittasks);
          this.visittasks.forEach((element) => {
          });
          for (let i = 0; i < visittasks.length; i++) {
            if (visittasks[i].taskId == 1) {

              this.measureTemResult = visittasks[i].measure;
              this.standardTemResult = visittasks[i].standard;
              this.deviationTemResult = visittasks[i].deviation;
              this.descritptionTemResult = visittasks[i].task.description;
            } else if (visittasks[i].taskId == 2) {
              this.measureHumResult = visittasks[i].measure;
              this.standardHumResult = visittasks[i].standard;
              this.deviationHumResult = visittasks[i].deviation;
              this.descritptionHumResult = visittasks[i].task.description;
            } else if (visittasks[i].taskId == 3) {
              this.measureAirSResult = visittasks[i].measure;
              this.standardAirSResult = visittasks[i].standard;
              this.deviationAirSResult = visittasks[i].deviation;
              this.descritptionAirSResult = visittasks[i].task.description;
            } else if (visittasks[i].taskId == 4) {
              this.measureAmoResult = visittasks[i].measure;
              this.standardAmoResult = '< ' + visittasks[i].standard;
              this.deviationAmoResult = visittasks[i].deviation;
              this.descritptionAmoResult = visittasks[i].task.description;
            } else if (visittasks[i].taskId == 5) {
              this.measureLighIResult = visittasks[i].measure;
              this.standardLighIResult = visittasks[i].standard;
              this.deviationLighIResult = visittasks[i].deviation;
              this.descritptionLighIResult = visittasks[i].task.description;
            } else if (visittasks[i].taskId == 6) {
              this.measureFeedCResult = visittasks[i].measure;
              this.percentageFeedCResult = visittasks[i].percentage.toFixed(2);
              this.standardFeedCResult = visittasks[i].standard;
              this.deviationFeedCResult = visittasks[i].deviation;
              this.descritptionFeedCResult = visittasks[i].task.description;
            } else if (visittasks[i].taskId == 7) {
              this.measureWatCResult = visittasks[i].measure;
              this.percentageWatCResult = visittasks[i].percentage.toFixed(2);
              this.standardWatCResult = visittasks[i].standard;
              this.deviationWatCResult = visittasks[i].deviation;
              this.descritptionWatCResult = visittasks[i].task.description;
            } else if (visittasks[i].taskId == 8) {
              this.measureMortResult = visittasks[i].measure;
              this.standardMortResult = visittasks[i].standard;
              this.deviationMortResult = visittasks[i].deviation;
              this.descritptionMortResult = visittasks[i].task.description;
              this.percentageMortResult = visittasks[i].percentage.toFixed(2);
            } else if (visittasks[i].taskId == 9) {
              this.measureLittCResult = visittasks[i].measure;
              this.standardLittCResult = visittasks[i].standard;
              this.deviationLittCResult = visittasks[i].deviation;
              this.descritptionLittCResult = visittasks[i].task.description;
            } else if (visittasks[i].taskId == 10) {
              this.measureDensResult = visittasks[i].measure;
              this.standardDensResult = visittasks[i].standard;
              this.deviationDensResult = visittasks[i].deviation;
              this.descritptionDensResult = visittasks[i].task.description;
            } else if (visittasks[i].taskId == 11) {
              this.measureWeightResult = visittasks[i].measure;
              this.standardWeightResult = visittasks[i].standard;
              this.deviationWeightResult = visittasks[i].deviation;
              this.descritptionWeightResult = visittasks[i].task.description;
            } else if (visittasks[i].taskId == 12) {
              this.measureHomogResult = visittasks[i].measure;
              this.standardHomogResult = visittasks[i].standard;
              this.deviationHomogResult = visittasks[i].deviation;
              this.descritptionHomogResult = visittasks[i].task.description;
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

  // get by company id
  getCompanyId(detail) {
    this.visitId = detail;
  }

  // substr houseId
  gethouse_id(id: string) {
    return id.substr(10, id.length);
  }

}
