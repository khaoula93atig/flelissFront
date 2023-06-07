import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'
import { ClarityModule, ClrIconModule, ClrSelectModule, ClrWizard } from '@clr/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { VisitComponent } from './Visit.component'
import { ListVisitComponent } from './list-visit/list-visit.component'
import { NewVisitComponent } from './new-visit/new-visit.component'
import { ToastrModule } from 'ngx-toastr'
import { AuthGuardGuard } from '../services/auth-guard.guard'
import { WeeklyWeightComponent } from './weekly-weight/weekly-weight.component'
import { WeeklyFeedComponent } from './weekly-feed/weekly-feed.component'
import { NgxEchartsModule } from 'ngx-echarts'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

const routes: Routes = [
  {
    path: 'Visits',
    component: VisitComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: 'list',
        component: ListVisitComponent,
        canActivate: [AuthGuardGuard],
      },
      {
        path: 'add-new',
        component: NewVisitComponent,
        canActivate: [AuthGuardGuard],
      },
    ],
  },
]

@NgModule({
  declarations: [
    VisitComponent,
    ListVisitComponent,
    NewVisitComponent,
    WeeklyWeightComponent,
    WeeklyFeedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    SharedModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    NgxEchartsModule,
    ClrIconModule,
    FontAwesomeModule,
    ClrSelectModule
    
  ],
})
export class VisitModule {}
