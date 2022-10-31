import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visit-audits',
  templateUrl: './visit-audits.component.html',
  styleUrls: ['./visit-audits.component.css']
})
export class VisitAuditsComponent implements OnInit {
  chickRecep:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

}
