import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './shared/header/header.component';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from './services/auth.service';
import {TokenStorgeService} from './services/token-storge.service';
import {map} from 'rxjs/operators';
import {UserService} from './services/user.service';

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

  isLoggedIn = false;
  isLoginFailed = false;
  mdpForm: FormGroup;
  basic = false;
  email = '';
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
  @ViewChild('recaptcha', {static: true}) recaptchaElement: ElementRef;
  protected aFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private headerComponent: HeaderComponent,
              private toaster: ToastrService,
              private authService: AuthService,
              private tokenStorage: TokenStorgeService,
              private userService: UserService) {
  }


  code: any;
  inputCode: any;

  onGenerateCode(code) {

  }

  verify() {

  }

  ngOnInit() {
    this.mdpForm = new FormGroup({
      login: new FormControl('', [Validators.required])
    });


  }


  authenticate() {
    this.authService.login({'username': this.login, 'password': this.password}).subscribe((data: any) => {
      console.log(data);
      if (data == null) {

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        localStorage.setItem('farmID', this.authService.currentUserValue.user.farmID);
        localStorage.setItem('user', this.login);
        localStorage.setItem('companyID', this.authService.currentUserValue.user.companyID);
        localStorage.setItem('role', this.authService.currentUserValue.user.role);
        this.userService.getConsultingRole().subscribe(res => {
          console.log(res);
          let roles = res.find(({description}) => description === this.authService.currentUserValue.user.role);
          localStorage.setItem('roleID', roles.roleID);
        });
        this.headerComponent.login = true;
        this.headerComponent.role = localStorage.getItem('role');
        this.router.navigateByUrl('/Dashboard/general');
        this.toaster.success('', 'Welcome');

      }
    }, (error) => {
      this.toaster.error('wrong password or login', 'Error');
    });

  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  sendEmail() {
    if (this.mdpForm.invalid) {
      this.basic = false;
      this.toaster.warning('veuillez vérifier votre login');
      return;
    }
    console.log(this.mdpForm.value.login);
    this.authService
      .resetpassword(this.mdpForm.value.login)
      .subscribe(
        (data: any) => {
          this.toaster.success('un email est envoyé à votre adresse');
          this.basic = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }


}
