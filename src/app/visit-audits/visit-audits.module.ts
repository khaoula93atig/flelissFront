import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule, ClrWizard } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { VisitAuditsComponent } from './visit-audits.component';
import { ListVisitAuditsComponent } from './list-visit-audits/list-visit-audits.component';
import { ChickReceptionComponent } from './chick-reception/chick-reception.component';

import { NewVisitAuditsComponent } from './new-visit-audits/new-visit-audits.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuardGuard } from '../services/auth-guard.guard';
import { BroodingCheckListComponent } from './brooding-check-list/brooding-check-list.component';
import { ManagerAuditVisitComponent } from './manager-audit-visit/manager-audit-visit.component';
import { ChickReceptionListComponent } from './chick-reception-list/chick-reception-list.component';
import { ListBroodingCheckListComponent } from './list-brooding-check-list/list-brooding-check-list.component';
import { ListManagerAuditVistComponent } from './list-manager-audit-vist/list-manager-audit-vist.component';



const routes: Routes = [

  {
    path: 'Visits-audits', component: VisitAuditsComponent,canActivate: [AuthGuardGuard],
    children: [
      { path: 'list', component: ListVisitAuditsComponent },
      { path: 'list', component: ListVisitAuditsComponent },
      { path: 'chick_reception', component: ChickReceptionComponent },
      { path: 'brooding-check-list', component: BroodingCheckListComponent },
      { path: 'manager-audit-visit', component: ManagerAuditVisitComponent },
    ]
  }


];

@NgModule({
  declarations: [VisitAuditsComponent, ListVisitAuditsComponent, NewVisitAuditsComponent, ChickReceptionComponent, BroodingCheckListComponent, ManagerAuditVisitComponent, ChickReceptionListComponent, ListBroodingCheckListComponent, ListManagerAuditVistComponent],
  imports: [
    CommonModule, FormsModule, BrowserModule, BrowserAnimationsModule,
    ClarityModule, SharedModule, RouterModule.forRoot(routes)
  ]
})
export class VisitAuditsModule { }
