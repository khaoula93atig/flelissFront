import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core'

import { FarmService } from '../../services/farm.service'
import { CompanyService } from '../../services/company.service'
import {
  ClrDatagridStringFilterInterface,
  ClrDatagridFilterInterface,
  ClrDatagrid,
} from '@clr/angular'
import { Subject } from 'rxjs'
import { Router } from '@angular/router'
import { SubSink } from 'subsink'
import { environment } from '../../../environments/environment'
import { NewfarmComponent } from '../newfarm/newfarm.component'
import { IRegistrationCompany } from 'src/app/shared/registration'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-list-farm',
  templateUrl: './list-farm.component.html',
  styleUrls: ['./list-farm.component.css'],
})
export class ListFarmComponent implements OnInit, OnDestroy {
  ID: string = ''
  // Layout set up boolean properties
  edit_mode: boolean = false
  create_mode: boolean = false
  // Reference to the included DataGrid showing the different sectors
  @ViewChild(ClrDatagrid) dg: ClrDatagrid
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef
  @ViewChild(NewfarmComponent) modal: NewfarmComponent
  files = []
  subs: SubSink = new SubSink()
  id: any[] = []
  farms: any[] = []
  farm: any[] = []
  agreement: any[] = []
  loading: boolean = true
  urlAgreement: string = ''
  companies: IRegistrationCompany[]
  companyId:string
  constructor(
    private FarmService: FarmService,
    private router: Router,
    private CompanyService: CompanyService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.companyId=localStorage.getItem("companyID")
    this.refresh()
    this.subs.add(
      this.FarmService.getConsultingFarm(this.companyId).subscribe((data) => {
        this.farms = data
        console.log(data)
        this.loading = false
      }),
    )
  }
  refresh() {
    //get house by farm id
    this.subs.add(
      this.FarmService.getConsultingFarm(this.companyId).subscribe((data) => {
        this.farms = data
        this.loading = false
      }),
    )
  }

  sauvegarder(detail) {
    this.subs.add(this.FarmService.save(detail).subscribe((data) => {
      if (data['response'] == 'OK') {
        this.toaster.success('Success', 'Successfully updated')

      } else {
        this.toaster.error('Error', 'Operation failed')
      }}))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  showCreatePanel() {
    // We display editor panel with the selected Sector
    this.create_mode = true
    this.edit_mode = false
    setTimeout(() => this.dg.resize())
  }
  hideCreatePanel() {
    // We hide the editor panel
    this.create_mode = false
    setTimeout(() => this.dg.resize())
  }



  ngAfterViewInit(): void {}
}
