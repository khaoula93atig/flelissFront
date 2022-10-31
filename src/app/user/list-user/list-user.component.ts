import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';
import { CompanyService } from '../../services/company.service';
import { FarmService } from '../../services/farm.service';
import { ClrDatagridStringFilterInterface, ClrDatagridFilterInterface, ClrDatagrid } from '@clr/angular';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { SubSink } from 'subsink';
import { NewUserComponent } from '../new-user/new-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  // Layout set up boolean properties
  edit_mode: boolean = false;
  create_mode: boolean = false;
  // Reference to the included DataGrid showing the different sectors
  @ViewChild(ClrDatagrid) dg: ClrDatagrid;
  subs: SubSink = new SubSink();
  roles: any[] = [];
  users: any[] = [];
  userName: any[] = [];
  loading: boolean = true;
  farmID: string;
  companyID: string;
  companies: any[] = [];
  farms: any[] = [];
  role_description: string;
  role: string;
  constructor(private UserService: UserService, private router: Router, private CompanyService: CompanyService, private FarmService: FarmService) { }


  ngOnInit(): void {
    //get user by farm id
    var farmID = sessionStorage.getItem("farmID");
    var companyID = sessionStorage.getItem("companyID");
    this.subs.add(this.UserService.getConsultingUserBycompany(companyID).subscribe(data => {
      this.users = data;
      this.userName = this.userName;
      console.log(this.users);
      this.loading = false;
    }));

    //get farm by company id

    console.log('companyid******' + companyID);
    //get all farm for selected farm
    this.subs.add(this.FarmService.getConsultingFarm(companyID).subscribe(data => {
      this.farms = data;
      console.log("data listof farm" + this.farms);
    }));
    //get Role
    this.subs.add(this.UserService.getConsultingRole().subscribe(data => {
      this.roles = data;
      console.log("data listof role" + this.roles);
    }));

  }
  //update user
  sauvegarder(detail) {

    this.subs.add(this.UserService.save(detail).subscribe(data => {
      console.log('update result ', data);
    }))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @ViewChild(NewUserComponent) modal: NewUserComponent;


  ngAfterViewInit(): void {

  }
  //getSelectedCompany
  getCompanyId(event) {
    console.log("getSelectedCompany");
    console.log(event);
    this.companyID = event;


  }
  //getSelectedFarm
  getFarmId(event) {
    console.log("getSelectedFarm");
    console.log(event);
    this.farmID = event;

  }
  //getSelectedRole
  getRole(event) {
    console.log("getSelectedRole");
    console.log(event);
    this.role_description = event;
    console.log("role" + event);
  }
}
