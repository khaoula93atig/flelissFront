import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ClrDatagrid } from '@clr/angular';
import { FlockService } from 'src/app/services/flock.service';
import { HouseService } from 'src/app/services/house.service';
import { VisitAuditsService } from 'src/app/services/visit-audits.service';
import { AutofocusDirective } from 'src/app/shared/autofocus.directive';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-chick-reception-list',
  templateUrl: './chick-reception-list.component.html',
  styleUrls: ['./chick-reception-list.component.css']
})
export class ChickReceptionListComponent implements OnInit {
  show = false
  farmId =''
  visits=[]
  loading = true 
  house:any
  @ViewChild(ClrDatagrid) dg: ClrDatagrid
  constructor( private visitAuditsService : VisitAuditsService,
    private houseService : HouseService,
    private flockService : FlockService) { }

  ngOnInit(): void {
    this.farmId = localStorage.getItem('farmID');
    this.visitAuditsService.getCheckReceptionByFarm(this.farmId).subscribe(data=>{//console.log(data)
      this.visits=data
      /*let res:any[];
      res=data;
      
      {res.map((i)=>{this.houseService.gethouse(i.housesId).subscribe(data1=>{
        i.house=data1 ;
         });
          this.flockService.findById(i.flockId).subscribe(data2=>{i.flock=data2})
         return i ;
      });
      this.visits=res
      }
      console.log(this.visits)*/
  })
    this.loading = false
  }
  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective
  @Output() refreshList = new EventEmitter();

 

  open() {
    this.show = true
    // clone the user (we don't want to modify the original in the dialog)
    console.log('ok')
    /*let res:any[];
      res=this.visits;
      
      {res.map((i)=>{this.houseService.gethouse(i.housesId).subscribe(data1=>{
        i.house=data1 ;
         });
          this.flockService.findById(i.flockId).subscribe(data2=>{i.flock=data2})
         return i ;
      });
      this.visits=res
      }
      console.log(this.visits)*/
    setTimeout(() => {
      if (this.autofocus) {
        this.autofocus.setFocus()
      }
    }, 0.1)
  }

  close() {
    this.show = false
  }

  getHouseById(event){
    console.log(event)
    this.houseService.gethouse(event).subscribe(data=>{
this.house=data
    })
  }
  onDetailOpen(event) {
    console.log(event)
    /*this.houseService.gethouse(event.housesId).subscribe(data=>{
      this.house=data})
    if (event != null && event != undefined) {
      this.getHouseById(event)
      /*this.houseService.gethouse(event.housesId).subscribe(data=>{
        console.log(data)
      this.house=data})
    }*/
  }
  generatePdf(data) {
    html2canvas(data, { allowTaint: true }).then((canvas) => {
      let HTML_Width = canvas.width
      let HTML_Height = canvas.height
      let top_left_margin = 15
      let PDF_Width = HTML_Width + top_left_margin * 2
      let PDF_Height = PDF_Width * 1.5 + top_left_margin * 2
      let canvas_image_width = HTML_Width
      let canvas_image_height = HTML_Height
      let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1
      canvas.getContext('2d')
      let imgData = canvas.toDataURL('image/jpeg', 1.0)
      let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height])
      pdf.addImage(
        imgData,
        'JPG',
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height,
      )
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height], 'p')
        pdf.addImage(
          imgData,
          'JPG',
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height,
        )
      }
      pdf.save('Report-chick-Reception.pdf')
    })
  }
}
