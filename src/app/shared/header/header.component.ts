import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role: string;
  login=false;
  company:string
  image:any

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')!=null){
      this.login=true
    }
    this.role = localStorage.getItem('role');
    this.company= localStorage.getItem('companyID')
    console.log(this.company)
    this.image=environment.url_company+"/image/"+this.company
    console.log(this.router.routerState)
    
  }

  logout() {
    
    this.login=false;
    this.authService.logout()
  }
}
