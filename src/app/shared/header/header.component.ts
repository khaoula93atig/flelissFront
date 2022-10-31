import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
}
