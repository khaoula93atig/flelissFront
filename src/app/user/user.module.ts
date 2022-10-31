import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ClarityModule ,ClrWizard} from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '../../../node_modules/@angular/platform-browser';
import { UserComponent } from './user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { AuthGuardGuard } from '../services/auth-guard.guard';
const routes: Routes = [

  {
    path: 'Users', component: UserComponent,canActivate: [AuthGuardGuard]  ,
    children: [
      { path: 'list', component: ListUserComponent ,canActivate: [AuthGuardGuard]  },
      { path: 'add-new', component: NewUserComponent ,canActivate: [AuthGuardGuard]   }, 
    ]
  }
  
 
];
@NgModule({
  declarations: [UserComponent,ListUserComponent,NewUserComponent],
  imports: [
    CommonModule, FormsModule, BrowserModule, BrowserAnimationsModule,
    ClarityModule,SharedModule, RouterModule.forRoot(routes)
  ]
})
export class UserModule { }
