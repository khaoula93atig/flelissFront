import { Component, OnInit, ViewChild } from '@angular/core'
import { NewVisitAuditsComponent } from '../new-visit-audits/new-visit-audits.component'
import { VisitService } from '../../services/visit.service'
import { VisitAuditsService } from '../../services/visit-audits.service'
import { SubSink } from 'subsink'
@Component({
  selector: 'app-list-visit-audits',
  templateUrl: './list-visit-audits.component.html',
  styleUrls: ['./list-visit-audits.component.css'],
})
export class ListVisitAuditsComponent implements OnInit {
  visits: any[] = []
  visitAudits: any[] = []
  subs: SubSink = new SubSink()
  // Spinner display visit
  loading: boolean
  visitId: string
  /*********Audits fields */
  Audit1Measure: string
  Audit2Measure: string
  Audit3Measure: string
  Audit4Measure: string
  Audit5Measure: string
  Audit6Measure: string
  Audit7Measure: string
  Audit8Measure: string
  Audit9Measure: string
  Audit10Measure: string
  Audit11Measure: string
  Audit12Measure: string
  Audit13Measure: string
  Audit14Measure: string
  Audit15Measure: string
  Audit16Measure: string
  Audit17Measure: string
  Audit18Measure: string
  Audit19Measure: string
  Audit20Measure: string
  Audit21Measure: string
  Audit22Measure: string
  Audit23Measure: string
  Audit24Measure: string
  Audit25Measure: string
  Audit26Measure: string
  Audit27Measure: string
  Audit28Measure: string
  Audit29Measure: string
  Audit30Measure: string
  Audit31Measure: string
  Audit32Measure: string
  Audit33Measure: string
  Audit34Measure: string
  Audit35Measure: string
  Audit36Measure: string
  Audit37Measure: string
  Audit38Measure: string
  Audit39Measure: string
  Audit40Measure: string
  Audit41Measure: string
  Audit42Measure: string
  Audit43Measure: string
  Audit44Measure: string
  Audit45Measure: string
  Audit46Measure: string
  Audit47Measure: string
  Audit48Measure: string
  Audit49Measure: string
  Audit50Measure: string
  Audit51Measure: string
  Audit52Measure: string
  Audit53Measure: string
  Audit54Measure: string
  Audit55Measure: string
  Audit56Measure: string
  Audit57Measure: string
  Audit58Measure: string
  Audit59Measure: string
  Audit60Measure: string
  Audit61Measure: string
  Audit62Measure: string
  Audit63Measure: string
  Audit64Measure: string
  Audit65Measure: string
  Audit66Measure: string
  Audit67Measure: string
  Audit68Measure: string
  Audit69Measure: string
  Audit70Measure: string
  Audit71Measure: string
  Audit72Measure: string
  Audit73Measure: string
  Audit74Measure: string
  Audit75Measure: string
  Audit76Measure: string
  constructor(
    private VisitService: VisitService,
    private VisitAuditsService: VisitAuditsService,
  ) {}

  //substr houseId
  gethouse_id(id: string) {
    return id.substr(10, id.length)
  }

  ngOnInit(): void {
    this.refresh()
  }
  //refresh list-visit
  refresh(): void {
    //get house by farm id
    var userName = localStorage.getItem('user')

    var userName = localStorage.getItem('user')
    var role = localStorage.getItem('role')
    var farmId = localStorage.getItem('farmID')
    if (role == 'Farm Manager') {
      var roleId = 'Farm_Manager'
    }
    this.subs.add(
      this.VisitService.getConsultingVisit(userName, roleId, farmId).subscribe(
        (data) => {
          this.visits = data
          this.loading = false
        },
      ),
    )
  }

  onDetailOpen(event) {
    if (event != null && event != undefined) {
      this.visitId = event.visitId
      this.showAuditVisitResult(this.visitId)
    }
  }
  // open health status & necropsy result
  showAuditVisitResult(id: string): void {
    // heathStatus result by visit ID
    this.subs.add(
      this.VisitAuditsService.getConsultingAuditVisitbyId(id).subscribe(
        (data) => {
          this.visitAudits = data
          for (let visitAudit of this.visitAudits) {
            if (visitAudit.breedingMnagementId == 1) {
              if (visitAudit.measure == false) {
                this.Audit1Measure = 'No'
              } else if (visitAudit.measure == true) {
                this.Audit1Measure = 'Yes'
              }
            } else if (visitAudit.breedingMnagementId == 2) {
              if (visitAudit.measure == true) {
                this.Audit2Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit2Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 3) {
              if (visitAudit.measure == true) {
                this.Audit3Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit3Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 4) {
              if (visitAudit.measure == true) {
                this.Audit4Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit4Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 5) {
              if (visitAudit.measure == true) {
                this.Audit5Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit5Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 6) {
              if (visitAudit.measure == true) {
                this.Audit6Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit6Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 7) {
              if (visitAudit.measure == true) {
                this.Audit7Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit7Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 8) {
              if (visitAudit.measure == true) {
                this.Audit8Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit8Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 9) {
              if (visitAudit.measure == true) {
                this.Audit9Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit9Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 10) {
              if (visitAudit.measure == true) {
                this.Audit10Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit10Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 11) {
              if (visitAudit.measure == true) {
                this.Audit11Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit11Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 12) {
              if (visitAudit.measure == true) {
                this.Audit12Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit12Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 13) {
              if (visitAudit.measure == true) {
                this.Audit13Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit13Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 14) {
              if (visitAudit.measure == true) {
                this.Audit14Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit14Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 15) {
              if (visitAudit.measure == true) {
                this.Audit15Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit15Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 16) {
              if (visitAudit.measure == true) {
                this.Audit16Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit16Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 17) {
              if (visitAudit.measure == true) {
                this.Audit17Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit17Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 18) {
              if (visitAudit.measure == true) {
                this.Audit18Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit18Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 19) {
              if (visitAudit.measure == true) {
                this.Audit19Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit19Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 20) {
              if (visitAudit.measure == true) {
                this.Audit20Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit20Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 21) {
              if (visitAudit.measure == true) {
                this.Audit21Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit21Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 22) {
              if (visitAudit.measure == true) {
                this.Audit22Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit22Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 23) {
              if (visitAudit.measure == true) {
                this.Audit23Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit23Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 24) {
              if (visitAudit.measure == true) {
                this.Audit24Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit24Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 25) {
              if (visitAudit.measure == true) {
                this.Audit25Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit25Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 26) {
              if (visitAudit.measure == true) {
                this.Audit26Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit26Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 27) {
              if (visitAudit.measure == true) {
                this.Audit27Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit27Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 28) {
              if (visitAudit.measure == true) {
                this.Audit28Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit28Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 29) {
              if (visitAudit.measure == true) {
                this.Audit29Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit29Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 30) {
              if (visitAudit.measure == true) {
                this.Audit30Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit30Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 31) {
              if (visitAudit.measure == true) {
                this.Audit31Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit31Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 32) {
              if (visitAudit.measure == true) {
                this.Audit32Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit32Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 33) {
              if (visitAudit.measure == true) {
                this.Audit33Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit33Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 34) {
              if (visitAudit.measure == true) {
                this.Audit34Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit34Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 35) {
              if (visitAudit.measure == true) {
                this.Audit35Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit35Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 36) {
              if (visitAudit.measure == true) {
                this.Audit36Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit36Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 37) {
              if (visitAudit.measure == true) {
                this.Audit37Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit37Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 38) {
              if (visitAudit.measure == true) {
                this.Audit38Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit38Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 39) {
              if (visitAudit.measure == true) {
                this.Audit39Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit39Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 40) {
              if (visitAudit.measure == true) {
                this.Audit40Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit40Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 41) {
              if (visitAudit.measure == true) {
                this.Audit41Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit41Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 42) {
              if (visitAudit.measure == true) {
                this.Audit42Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit42Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 43) {
              if (visitAudit.measure == true) {
                this.Audit43Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit43Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 44) {
              if (visitAudit.measure == true) {
                this.Audit44Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit44Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 45) {
              if (visitAudit.measure == true) {
                this.Audit45Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit45Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 46) {
              if (visitAudit.measure == true) {
                this.Audit46Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit46Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 47) {
              if (visitAudit.measure == true) {
                this.Audit47Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit47Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 48) {
              if (visitAudit.measure == true) {
                this.Audit48Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit48Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 49) {
              if (visitAudit.measure == true) {
                this.Audit49Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit49Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 50) {
              if (visitAudit.measure == true) {
                this.Audit50Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit50Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 51) {
              if (visitAudit.measure == true) {
                this.Audit51Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit51Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 52) {
              if (visitAudit.measure == true) {
                this.Audit52Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit52Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 53) {
              if (visitAudit.measure == true) {
                this.Audit53Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit53Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 54) {
              if (visitAudit.measure == true) {
                this.Audit54Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit54Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 55) {
              if (visitAudit.measure == true) {
                this.Audit55Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit55Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 56) {
              if (visitAudit.measure == true) {
                this.Audit56Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit56Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 57) {
              if (visitAudit.measure == true) {
                this.Audit57Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit57Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 58) {
              if (visitAudit.measure == true) {
                this.Audit58Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit58Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 59) {
              if (visitAudit.measure == true) {
                this.Audit59Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit59Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 60) {
              if (visitAudit.measure == true) {
                this.Audit60Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit60Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 61) {
              if (visitAudit.measure == true) {
                this.Audit61Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit61Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 62) {
              if (visitAudit.measure == true) {
                this.Audit62Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit62Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 63) {
              if (visitAudit.measure == true) {
                this.Audit63Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit63Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 65) {
              if (visitAudit.measure == true) {
                this.Audit65Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit65Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 66) {
              if (visitAudit.measure == true) {
                this.Audit66Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit66Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 67) {
              if (visitAudit.measure == true) {
                this.Audit67Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit67Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 68) {
              if (visitAudit.measure == true) {
                this.Audit68Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit68Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 69) {
              if (visitAudit.measure == true) {
                this.Audit69Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit69Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 70) {
              if (visitAudit.measure == true) {
                this.Audit70Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit70Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 71) {
              if (visitAudit.measure == true) {
                this.Audit71Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit71Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 72) {
              if (visitAudit.measure == true) {
                this.Audit72Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit72Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 73) {
              if (visitAudit.measure == true) {
                this.Audit73Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit73Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 74) {
              if (visitAudit.measure == true) {
                this.Audit74Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit74Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 75) {
              if (visitAudit.measure == true) {
                this.Audit75Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit75Measure = 'No'
              }
            } else if (visitAudit.breedingMnagementId == 76) {
              if (visitAudit.measure == true) {
                this.Audit76Measure = 'Yes'
              } else if (visitAudit.measure == false) {
                this.Audit76Measure = 'No'
              }
            }
          }
        },
      ),
    )
  }

  @ViewChild(NewVisitAuditsComponent) modal: NewVisitAuditsComponent
}
