import {Component, OnInit} from '@angular/core';
import {Router} from '../../../../node_modules/@angular/router';
import {environment} from 'src/environments/environment';
import {AuthService} from 'src/app/services/auth.service';
import {CompanyService} from '../../services/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role: string;
  login = false;
  company: string;
  image: any;

  constructor(private router: Router,
              private authService: AuthService,
              private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.company = localStorage.getItem('companyID');
    console.log(this.company);
    // this.companyService.getCompanyById(this.company).subscribe(data => this.image = data[0].logo);
    this.image = environment.url_company + '/image/' + this.company;
    // console.log(this.image);
    console.log(this.router.routerState);

  }

  logout() {
    this.authService.logout();
  }
}
