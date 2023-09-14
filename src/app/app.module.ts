import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { HouseModule } from './house/house.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { VisitModule } from './visit/visit.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { VeterinarianVisitModule } from './veterinarian-visit/veterinarian-visit.module';
import { CaptchaModule } from 'ng-captcha';;
import { VisitAuditsModule } from './visit-audits/visit-audits.module';
import { FarmModule } from './farm/farm.module';
import {JwtInterceptor} from './services/jwtInterceptor';
import { CenterModule } from './center/center.module';
import { MdpOublieComponent } from './mdp-oublie/mdp-oublie.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MdpOublieComponent,

  ],
  imports: [
    HouseModule,
    FarmModule,
    UserModule,
    VisitModule,
    VeterinarianVisitModule,
    VisitAuditsModule,
    DashboardModule,

    CenterModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot(),
    FormsModule,
    CaptchaModule,
    ReactiveFormsModule


  ],
  providers: [DatePipe ,HeaderComponent,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
