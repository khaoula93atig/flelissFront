import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'
import { ClarityModule, ClrWizard } from '@clr/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Routes, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '../../../node_modules/@angular/platform-browser'
import { HouseComponent } from './house.component'
import { ListHouseComponent } from './list-house/list-house.component'
import { NewHouseComponent } from './new-house/new-house.component'
import { AuthGuardGuard } from '../services/auth-guard.guard'
import { FlockReportComponent } from './flock-report/flock-report.component'

const routes: Routes = [
  {
    path: 'Houses',
    component: HouseComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: 'list',
        component: ListHouseComponent,
        canActivate: [AuthGuardGuard],
      },
      {
        path: 'add-new',
        component: NewHouseComponent,
        canActivate: [AuthGuardGuard],
      },
    ],
  },
]
@NgModule({
  declarations: [
    HouseComponent,
    ListHouseComponent,
    NewHouseComponent,
    FlockReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
})
export class HouseModule {}
