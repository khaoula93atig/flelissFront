import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from './services/auth-guard.guard';


const routes: Routes = [
  { path:'login', component: LoginComponent },
   // home route protected by auth guard
   { path: '', component: AppComponent, canActivate: [AuthGuardGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
