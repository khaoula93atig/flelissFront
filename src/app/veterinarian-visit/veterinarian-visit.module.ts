import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from '../shared/shared.module';
import { ClarityModule ,ClrWizard} from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { VeterinarianVisitComponent } from './veterinarian-visit.component';
import { ListVetVisitComponent } from './list-vet-visit/list-vet-visit.component';
import { NewVetVisitComponent } from './new-vet-visit/new-vet-visit.component';
import { AuthGuardGuard } from '../services/auth-guard.guard';

const routes: Routes = [

  {
    path: 'veterinarianVisit', component: VeterinarianVisitComponent ,canActivate: [AuthGuardGuard] ,
    children: [
      { path: 'list', component: ListVetVisitComponent,canActivate: [AuthGuardGuard]  }
    ]
  }
  
 
];

@NgModule({
  declarations: [VeterinarianVisitComponent,ListVetVisitComponent, NewVetVisitComponent],
  imports: [
    CommonModule, FormsModule, BrowserModule, BrowserAnimationsModule, 
    ClarityModule,SharedModule, RouterModule.forRoot(routes)
  ]
})
export class VeterinarianVisitModule { }
