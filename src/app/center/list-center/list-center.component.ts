import { DatePipe } from '@angular/common'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { ClrDatagrid } from '@clr/angular'
import {
  IRegistrationFarms,
  IRegistrationFlocks,
  IRegistrationHouses,
} from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { NewCenterComponent } from '../new-center/new-center.component'
import { FlockService } from '../../services/flock.service'
import { FarmService } from '../../services/farm.service'
@Component({
  selector: 'app-list-center',
  templateUrl: './list-center.component.html',
  styleUrls: ['./list-center.component.css'],
})
export class ListCenterComponent implements OnInit {
  ID: string = ''
  // Layout set up boolean properties
  edit_mode: boolean = false
  create_mode: boolean = false
  // Reference to the included DataGrid showing the different sectors
  @ViewChild(ClrDatagrid) dg: ClrDatagrid
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef
  files = []
  subs: SubSink = new SubSink()
  id: any[] = []
  centers: any[] = []
  farm: any[] = []
  agreement: any[] = []
  loading: boolean = true
  urlAgreement: string = ''
  // alert messages
  succesMsg: string = null
  dangerMsg: string = null
  role: string
  farmIdUser: string
  companyIdUser: string
  roleID: string
  constructor(private FarmService: FarmService, private router: Router) {}

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')
    this.roleID = sessionStorage.getItem('roleID')
    this.companyIdUser = sessionStorage.getItem('companyID')
    this.farmIdUser = sessionStorage.getItem('farmID')

    this.subs.add(
      this.FarmService.getConsultingALLCentersByRoleUser(
        this.roleID,
        this.farmIdUser,
        this.companyIdUser,
      ).subscribe((data) => {
        this.centers = data
        for (let farm of this.centers) {
        }
        this.loading = false
      }),
    )
  }

  sauvegarder(detail) {
    this.subs.add(
      this.FarmService.updateCenter(detail).subscribe((data) => {
        if (data['response'] == 'OK') {
          this.succesMsg = 'Center updated'
          setTimeout((_) => (this.succesMsg = null), 10000)
        } else {
          this.succesMsg = 'Erreur'
          setTimeout((_) => (this.succesMsg = null), 10000)
        }
      }),
    )
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

  @ViewChild(NewCenterComponent) modal: NewCenterComponent

  ngAfterViewInit(): void {}
}
function NewHouseComponent(NewHouseComponent: any) {
  throw new Error('Function not implemented.')
}
