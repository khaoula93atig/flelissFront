import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role: string;
  login=true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user')!=null){
      this.login=true
    }
    this.role = sessionStorage.getItem('role');
    console.log(this.router.routerState)
    
  }

  logout() {
    sessionStorage.clear();
    this.login=false;
    this.router.navigateByUrl('');
  }
}
