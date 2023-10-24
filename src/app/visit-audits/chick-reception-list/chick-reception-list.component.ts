import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ClrDatagrid} from '@clr/angular';
import {FlockService} from 'src/app/services/flock.service';
import {HouseService} from 'src/app/services/house.service';
import {VisitAuditsService} from 'src/app/services/visit-audits.service';
import {AutofocusDirective} from 'src/app/shared/autofocus.directive';
import {getBase64ImageFromURL} from '../../shared/ImageFromUrl';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
import jsPDF from 'jspdf';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-chick-reception-list',
  templateUrl: './chick-reception-list.component.html',
  styleUrls: ['./chick-reception-list.component.css']
})
export class ChickReceptionListComponent implements OnInit {
  show = false;
  farmId = '';
  visits = [];
  loading = true;
  house: any;
  detail: any;
  variation: any;
  company: string;
  image: string;
  @ViewChild(ClrDatagrid) dg: ClrDatagrid;

  constructor(private visitAuditsService: VisitAuditsService,
              private houseService: HouseService,
              private flockService: FlockService) {
  }

  ngOnInit(): void {
    this.company = localStorage.getItem('companyID');
    console.log(this.company);
    this.image = environment.url_company + '/image/' + this.company;
    this.farmId = localStorage.getItem('farmID');
    this.visitAuditsService.getCheckReceptionByFarm(this.farmId).subscribe(data => {
      this.visits = data;
    });
    this.loading = false;
  }

  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective;
  @Output() refreshList = new EventEmitter();


  open() {
    this.show = true;
    // clone the user (we don't want to modify the original in the dialog)
    console.log('ok');
    setTimeout(() => {
      if (this.autofocus) {
        this.autofocus.setFocus();
      }
    }, 0.1);
  }

  close() {
    this.show = false;
  }

  onDetailOpen(event) {
    console.log(event);
    this.detail = event;
  }

  public async export(): Promise<void> {
  if (this.detail.totalScore >= 40) {
    this.variation = 'Excellent' ;
  }else if (this.detail.totalScore >= 20 && this.detail.totalScore <= 39){
    this.variation = 'Acceptable';
  }
  else if (this.detail.totalScore <= 19){
  this.variation = 'Bad';
  }
    const backgroundImage = await getBase64ImageFromURL('/assets/fleliss-v-negatif.png');
    const logo = await getBase64ImageFromURL(this.image);
    const docDefinition = {
      background: {
        image: backgroundImage,
        width: 595,
        opacity: 0.08,
        verticalAlign: 'middle',
        margin: [0, 180, 0, 0],
        style: 'pageBackground',
      },
      content: [
        {
          columns: [
            {image: backgroundImage , width: 75 , alignment: 'left'},


            {text: 'Chick Reception list', style: 'header'},

            {image: logo , width: 75 , alignment: 'right'},
          ],
          columnGap: 10
        },
        {text: 'Visit date : ' + this.detail.visitDate, style: 'subheader'}, {
          style: 'tableHeader',
          table: {
            headerRows: 1,
            heights: 30,
            widths : ['auto', 200 , 'auto', 100],
            body: [
              ['House :', this.detail.house.houseName, 'Flock :', this.detail.flock.flockName],
              ['Breed :', this.detail.breed, 'Hatch date :', this.detail.hatchDate],
              ['ps Age :', this.detail.psAge, 'ps Origin :', this.detail.psOrigin]
            ],
          },
          layout: 'noBorders',
        },
        {text: 'Total score : ' + this.detail.totalScore + ' ' + this.variation, style: 'subheader'},
        {
          style: 'tableContent',
          table: {
            headerRows: 1,
            body: [
              ['', '', 'Score'],
              [{text: 'Navel', rowSpan: 3}, 'clean and well healed', this.detail.navelCleanWellHealed],
              ['', 'Closed but slight abrasiveness', this.detail.navelClosedSlightAbrasiveness],
              ['', 'Not closed/ strung/ button attached or disclored', this.detail.navelNotclosedStrungButton],
              [{text: 'Legs', rowSpan: 3}, 'clean , waxy legs', this.detail.legsCleanWaxy],
              ['', 'Some dryness / pale', this.detail.legsDrynessPale],
              ['', 'Deshydrated with vein protruding', this.detail.legsDeshydratedVienProtruding],
              [{text: 'Hocks', rowSpan: 3}, 'Clean , no blemishes', this.detail.hocksCleanNoblemishes],
              ['', 'Slight blushing', this.detail.hocksSlightBlushing],
              ['', 'Red color / heavy blushing', this.detail.hocksRedcolorHeavyblushing],
              [{text: 'Defects', rowSpan: 3}, 'clean , no defects', this.detail.defectsCleanNodefects],
              ['', 'Minor defects (yolk staining , feather coloration, ...)', this.detail.defectsMinorDefects],
              ['', 'missing eye / blind , legs with cuts/ abrasions , spraddled legs ,cross beaks , poor feathering , clubbed down', this.detail.defectsEyeLegsSpraddled]
            ],
          }, layout: {
            paddingTop: function (i, node) {
              return 5;
            },
            paddingBottom: function (i, node) {
              return 5;
            }
          }
        }
      ],

      styles: {
        pageBackground: {
          alignment: 'center',
          verticalAlign: 'middle',
          textAlign: 'center',
          display: 'flex'
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 70, 0, 10],
          alignment: 'center',
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableHeader: {
          margin: [0, 5, 0, 15],
          layout: 'noBorders',
          fontSize: 14,
          bold: true,
        },
        tableContent: {
          margin: [20, 5, 0, 10],
        },
        head: {
          bold: true, fillColor: '#EEEEEE'
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('Report-CR-' + this.detail.visitDate + '.pdf');
  }
}
