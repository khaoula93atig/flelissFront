import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { environment } from 'src/environments/environment';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user')!=null){
      this.login=true
    }
    this.role = sessionStorage.getItem('role');
    this.company= sessionStorage.getItem('companyID')
    console.log(this.company)
    this.image=environment.url_company+"/image/"+this.company
    console.log(this.router.routerState)
    
  }

  logout() {
    sessionStorage.clear();
    this.login=false;
    this.router.navigateByUrl('');
  }
}
