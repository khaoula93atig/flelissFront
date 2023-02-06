import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule, ClrWizard } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FarmComponent } from '../farm/farm.component';
import { NewfarmComponent } from '../farm/newfarm/newfarm.component';

import { BrowserModule } from '../../../node_modules/@angular/platform-browser';
import { ListFarmComponent } from './list-farm/list-farm.component';
import { AuthGuardGuard } from '../services/auth-guard.guard';


const routes: Routes = [

  {
    path: 'Farms', component: FarmComponent,canActivate: [AuthGuardGuard],
    
    children: [
      { path: 'List-farm', component: ListFarmComponent },
      { path: 'Add-farm', component: NewfarmComponent }

    ]
  }


];
@NgModule({
  declarations: [FarmComponent, NewfarmComponent, ListFarmComponent],
  imports: [
    CommonModule, FormsModule, BrowserModule, BrowserAnimationsModule,
    ClarityModule, SharedModule, RouterModule.forRoot(routes)
  ],
  providers: [],
})
export class FarmModule { }
