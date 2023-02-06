import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule, ClrWizard } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '../../../node_modules/@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';
import { MortalityComponent } from './mortality/mortality.component';
import { WeightComponent } from './weight/weight.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { GeneralComponent } from './general/general.component';
import { AuthGuardGuard } from '../services/auth-guard.guard';
import { FlocksComponent } from './flocks/flocks.component';


const routes: Routes = [

  {
    path: 'Dashboard', component: DashboardComponent,canActivate: [AuthGuardGuard],
    children: [
      { path: 'mortality', component: MortalityComponent },
      { path: 'weight', component: WeightComponent },
      { path:'general', component:GeneralComponent},
      { path:'flock',component:FlocksComponent}


    ]
  }


];


@NgModule({
  declarations: [MortalityComponent, WeightComponent, GeneralComponent, FlocksComponent],
  imports: [
    CommonModule, FormsModule, BrowserModule, BrowserAnimationsModule,
    ClarityModule, SharedModule, RouterModule.forRoot(routes),
    NgxEchartsModule
  ]
})
export class DashboardModule { }
