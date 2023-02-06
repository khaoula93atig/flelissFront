import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListCenterComponent } from './list-center/list-center.component';
import { NewCenterComponent } from './new-center/new-center.component';
import { CenterComponent } from './center.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule } from '@clr/angular';
import { AuthGuardGuard } from '../services/auth-guard.guard';




const routes: Routes = [

  {
    path: 'Center', component: CenterComponent,canActivate: [AuthGuardGuard],
    children: [
      { path: 'List-center', component: ListCenterComponent },
      { path: 'Add-center', component: NewCenterComponent }
    ]
  }


];

@NgModule({
  declarations: [CenterComponent, NewCenterComponent, ListCenterComponent],
  imports: [
    CommonModule, FormsModule, BrowserModule, BrowserAnimationsModule,
    ClarityModule, SharedModule, RouterModule.forRoot(routes)
  ]
})


export class CenterModule { }
