import { Component, OnInit, ViewChild } from '@angular/core';
import { FarmService } from '../../services/farm.service';
import { IRegistrationFarms, IRegistrationUsers } from '../../shared/registration';
import { UserService } from '../../services/user.service';
import { AutofocusDirective } from 'src/app/shared/autofocus.directive';
import { CompanyService } from '../../services/company.service';

import { SubSink } from 'subsink';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  constructor(private UserService: UserService, private CompanyService: CompanyService, private FarmService: FarmService) { }

  subs: SubSink = new SubSink();
  companies: any[] = [];
  farms: any[] = [];
  roles: any[] = [];
  // Properties user to Form Fields
  username: string;
  password: string;
  name: string;
  firstName: string;
  role_description: string;
  role: string;
  email: string;
  job: string;
  farmID: string;
  companyID: string;
  telNumber: string;
  // Spinner display user
  loading: boolean;
  User = new Object() as IRegistrationUsers[];


  ngOnInit() {
    var companyID = localStorage.getItem("companyID");
    this.subs.add(this.FarmService.getConsultingFarm(companyID).subscribe(data => {
      this.farms = data;
      console.log("data listof farm" + this.farms);
    }));
    this.subs.add(this.UserService.getConsultingRole().subscribe(data => {
      this.roles = data;
      console.log("data listof role" + this.roles);
    }));
  }

  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective;

  show = false;


  open() {
    this.show = true;
    // clone the user (we don't want to modify the original in the dialog)
    console.log('ok');
    setTimeout(() => {
      if (this.autofocus) {
        this.autofocus.setFocus();
      }
    }, 0.1);
    var companyID = localStorage.getItem("companyID");
    console.log("company id " + companyID);
  }

  close() {
    this.show = false;
  }

  onKeyPress(event) {
    console.log('ok3');
    if (event.keyCode === 13) {
    }
  }

  onSubmit() {
    console.log('ok2');
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

  // user  creation
  submit(): void {

    // Show the spinner for loading process ....
    setTimeout(_ => this.loading = true);
    var newCompanyId = localStorage.getItem("companyID");
    let registrationUser: IRegistrationUsers = new Object() as IRegistrationUsers;
    registrationUser.username = this.username;
    registrationUser.password = this.password;
    registrationUser.name = this.name;
    registrationUser.firstName = this.firstName;
    registrationUser.role = this.role_description;
    registrationUser.email = this.email;
    registrationUser.job = this.job;
    registrationUser.farmID = this.farmID;
    registrationUser.telNumber = this.telNumber;
    registrationUser.companyID = newCompanyId;
    console.log("id company " + registrationUser.companyID);

    // Invoking service
    this.UserService.createRegistrationUsers(registrationUser).subscribe(data => {
      console.log("data user" + data["response"]);
      console.log("data role" + data.role);

      setTimeout(_ => this.loading = false);
      this.UserService.askForReload(true);
      // We clear the form!
      this.clearTheForm();
      window.location.reload();
    });
  }


  // Reset the form after 'Annuler' Button clicked
  @ViewChild('myForm') formValues;
  clearTheForm() {
    this.formValues.resetForm();
  }
}
