import {Component, OnInit, ViewChild} from '@angular/core';
import {NewVisitComponent} from '../new-visit/new-visit.component';
import {VisitService} from '../../services/visit.service';
import {SubSink} from 'subsink';
import {WeeklyWeightComponent} from '../weekly-weight/weekly-weight.component';
import {WeeklyFeedComponent} from '../weekly-feed/weekly-feed.component';
import {MotalityVisitComponent} from '../motality-visit/motality-visit.component';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-list-visit',
  templateUrl: './list-visit.component.html',
  styleUrls: ['./list-visit.component.css'],
})
export class ListVisitComponent implements OnInit {
  constructor(private visitService: VisitService,
              private userService: UserService) {
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
  user: string;

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
      this.userService.getUserByUserName(event.username).subscribe(data => {
        console.log('user', data);
        this.user = data[0].name;
      } );
      this.showTaskResult(this.visitId);
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
          for (let i = 0; i < data.length; i++) {
            if (data[i].taskId == 9) {
              if (data[i].measure == 0) {
                data[i].measure = 'aerate';
              } else if (data[i].measure == 1) {
                data[i].measure = 'not aerate';
              } else {
                data[i].measure = 'humid';
              }
            }
          }
          this.visittasks = data;
          this.visittasks.forEach((element) => {
          });
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
