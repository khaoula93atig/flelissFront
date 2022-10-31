import { Component, OnInit, ViewChild } from '@angular/core'
import { NewVisitComponent } from './new-visit/new-visit.component'
import { WeeklyFeedComponent } from './weekly-feed/weekly-feed.component'
import { WeeklyWeightComponent } from './weekly-weight/weekly-weight.component'

@Component({
  selector: 'app-Visit',
  templateUrl: './Visit.component.html',
  styleUrls: ['./Visit.component.css'],
})
export class VisitComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @ViewChild(WeeklyWeightComponent) modal2: WeeklyWeightComponent
  @ViewChild(WeeklyFeedComponent) modal3: WeeklyFeedComponent
}
