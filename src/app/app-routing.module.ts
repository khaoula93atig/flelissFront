import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { AfterGuardGuard } from './services/after-guard.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


const routes: Routes = [
  { path:'login', component: LoginComponent,canActivate: [AfterGuardGuard] },
   // home route protected by auth guard
   { path: '', component: AppComponent, canActivate: [AuthGuardGuard] },
   { path: '**', pathMatch: 'full', 
        component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
