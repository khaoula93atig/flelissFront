import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  access_failed: boolean = false;
  login: string = '';
  password: string = '';

  id: string = '';
  company_id: string = '';
  alldata: any[] = [];


  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';
  // Http option header
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: 'response',
    })
  };
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
  protected aFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
     private router: Router,
      private http: HttpClient,
    private headerComponent:HeaderComponent,
    private toaster : ToastrService) { }


  code: any;
  inputCode: any

  onGenerateCode(code) {

  }

  verify() {

  }

  ngOnInit() {


  }





  authenticate() {
    this.http.post<any>("/farmApi/user/authenticate",
      { 'username': this.login, 'password': this.password }, this.httpOptions).subscribe(
        data => {
          console.log(data)
          this.alldata = data
          if (data.length !== 0) {
            for (let data of this.alldata) {
              this.id = data.farmID;
              this.company_id = data.companyID;
            }
            console.log("********" + JSON.stringify(data));
            for (var object of data) {
              //  console.log("******** role " + object.roleObject.roleID);
              sessionStorage.setItem('role', object.role);
              sessionStorage.setItem('roleID', object.roleObject.roleID);
            }

            console.log("********id" + this.id);
            this.access_failed = false
            // Store the login in the storage
            sessionStorage.setItem('user', this.login);
            sessionStorage.setItem('password', this.password);
            sessionStorage.setItem('farmID', this.id);
            sessionStorage.setItem('companyID', this.company_id);

            console.log("id " + this.id);
            console.log("id company " + this.company_id);
            this.headerComponent.login=true
            this.headerComponent.role=sessionStorage.getItem("role")
            this.router.navigateByUrl('/Dashboard/general');
            this.toaster.success("","Welcome")
          }
          else{
            this.toaster.error("wrong password or login","Error")
          }
        },
        error => {
          this.access_failed = true;
        }
      );
    //}


  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
