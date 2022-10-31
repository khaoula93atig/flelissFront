import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FlockReport } from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { FlockService } from '../../services/flock.service'
import jsPDF from 'jspdf'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
import htmlToPdfmake from 'html-to-pdfmake'
import html2canvas from 'html2canvas'
@Component({
  selector: 'app-flock-report',
  templateUrl: './flock-report.component.html',
  styleUrls: ['./flock-report.component.css'],
})
export class FlockReportComponent implements OnInit {
  constructor(private FlockService: FlockService) {}
  open: boolean = false
  subs: SubSink = new SubSink()
  flockReport = new FlockReport()
  totalStarterFeed: number
  starterFeedPerBird: number
  totalGrowerFeed: number
  growerFeedPerBird: number
  totalFinisherFeed: number
  finisherFeedBird: number
  fcr: number
  ageOfTheFlock: number
  ngOnInit(): void {}

  openModel(flockId) {
    this.open = true
    this.subs.add(
      this.FlockService.getFlockReport(flockId).subscribe((data) => {
        this.flockReport = data
        this.totalStarterFeed = this.flockReport.weeklyFeed.totalStarterFeed
        this.starterFeedPerBird = this.flockReport.weeklyFeed.starterFeedPerBird
        this.totalGrowerFeed = this.flockReport.weeklyFeed.totalGrowerFeed
        this.growerFeedPerBird = this.flockReport.weeklyFeed.growerFeedPerBird
        this.totalFinisherFeed = this.flockReport.weeklyFeed.totalFinisherFeed
        this.finisherFeedBird = this.flockReport.weeklyFeed.finisherFeedBird

        this.fcr =
          (this.flockReport.totalFeedConsumption /
            this.flockReport.totalWeight) *
          100
        this.fcr = parseFloat(this.fcr.toFixed(3))
        var date1 = new Date(this.flockReport.startOfCycle)
        var date2 = new Date(this.flockReport.endOfCycle)
        // To calculate the time difference of two dates
        this.ageOfTheFlock = date2.getTime() - date1.getTime()
        this.ageOfTheFlock = Math.floor(this.ageOfTheFlock / (1000 * 3600 * 24))
      }),
    )
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
      pdf.save('HTML-Document.pdf')
    })
  }
}
