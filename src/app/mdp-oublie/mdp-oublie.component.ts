import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ResetPassword} from '../shared/ResetPassword';
import { TokenStorgeService } from '../services/token-storge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch} from '../shared/MustMatch'

@Component({
  selector: 'app-mdp-oublie',
  templateUrl: './mdp-oublie.component.html',
  styleUrls: ['./mdp-oublie.component.css']
})
export class MdpOublieComponent implements OnInit {
  
  mdpForm: FormGroup;
  password = new FormControl(null, [Validators.required, Validators.minLength(8)])
  confirmPassword = new FormControl(null, [Validators.required, Validators.minLength(8)]);
  /*mdpForm = new FormGroup({
    password : new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword : new FormControl(null, [Validators.required, Validators.minLength(8) ])
 })*/
 
  resetpassword = new ResetPassword();
  confirmation: any;
  token : string;
  constructor(
    private tokenService : TokenStorgeService,
    private route: ActivatedRoute,
    private userService : AuthService,
    private router: Router,
    private toastr: ToastrService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.checkToken();
    this.mdpForm = this.fb.group({
      password: this.password,
        confirmPassword: this.confirmPassword
    },
      {
         validators: this.checkPasswords 
      });
  }
  checkPasswords(group: FormGroup) {
    return group.controls.password.value === group.controls.confirmPassword.value ? null : { passwordMissmatch: true };
  }
  
  checkToken() {
    if (this.tokenService.getExprirationDate(this.token) < new Date()) {
      window.alert("URL Expired");
      window.close();

    }
  }

  confirmer(){
    this.resetpassword.token = this.token;
      console.log(this.token);
      this.resetpassword.password = this.mdpForm.get("password").value;
      this.userService.resetPassword(this.resetpassword).subscribe(next => {
        this.toastr.success("password succssefuly updated")
        setTimeout(() => {
            this.router.navigateByUrl("/");
          }
          , 5000);

      });
    }

}
