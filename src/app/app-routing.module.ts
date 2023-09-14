import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { AfterGuardGuard } from './services/after-guard.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MdpOublieComponent } from './mdp-oublie/mdp-oublie.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';


const routes: Routes = [
  { path:'', component: LoginComponent,canActivate: [AfterGuardGuard] },
  { path:'forgetpassword', component: MdpOublieComponent,canActivate: [AfterGuardGuard] },
  {path: 'forgetpassword/:token', component: MdpOublieComponent},
   // home route protected by auth guard
   //{ path: '', component: AppComponent, canActivate: [AuthGuardGuard] },
   { path: '**', pathMatch: 'full', 
        component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
