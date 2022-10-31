import { Component, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { AutofocusDirective } from 'src/app/shared/autofocus.directive'
import { WeeklyFeed } from 'src/app/shared/registration'
import { SubSink } from 'subsink'
import { HouseService } from '../../services/house.service'
import { VisitService } from '../../services/visit.service'
@Component({
  selector: 'app-weekly-feed',
  templateUrl: './weekly-feed.component.html',
  styleUrls: ['./weekly-feed.component.css'],
})
export class WeeklyFeedComponent implements OnInit {
  week: number = null
  nbrbirds: number
  breed: number
  visitDate: string
  farmID: string
  centers: any[] = []
  centerId: string = null
  houses: any[] = []
  houseId: string = null
  flocks: any[] = []
  breeddescription: string
  breedId: number
  flockID: string = null
  compteur: number = 0
  succesMsg: string = null
  dangerMsg: string = null
  showDeviation: boolean = false
  subs: SubSink = new SubSink()
  weeklyFeed = new WeeklyFeed()
  disabledSave: Boolean = true

  constructor(
    private HouseService: HouseService,
    private VisitService: VisitService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.centers = []
    this.houses = []
    this.flocks = []

    localStorage.setItem('getId', '') //store id
    //get all farm by company
    var companyID = sessionStorage.getItem('companyID')
    this.farmID = sessionStorage.getItem('farmID')
    this.weeklyFeed.farmId = this.farmID
    this.subs.add(
      this.HouseService.getConsultingCenterbyFarm(this.farmID).subscribe(
        (data) => {
          console.log('data centers ******* ' + JSON.stringify(data))
          this.centers = data
        },
      ),
    )
    if (
      this.centerId &&
      this.houseId &&
      this.flockID &&
      this.week &&
      this.weeklyFeed.starterFeedPerBird &&
      this.weeklyFeed.growerFeedPerBird &&
      this.weeklyFeed.finisherFeedBird != null
    ) {
      this.disabledSave = false
    }
  }
  clearForm() {
    this.weeklyFeed = new WeeklyFeed()
    this.breeddescription = ''
    this.disabledSave = true
    this.show = false
    this.ngOnInit()
  }
  @ViewChild(AutofocusDirective) autofocus: AutofocusDirective
  show = false
  //open Dialog Results
  open() {
    this.show = true

    // clone the user (we don't want to modify the original in the dialog)

    setTimeout(() => {
      if (this.autofocus) {
        this.autofocus.setFocus()
      }
    }, 0.1)
  }

  close() {
    this.show = false
  }

  onSubmit() {
    console.log('ok2')
  }

  getCenterId(event) {
    this.centerId = event
    this.weeklyFeed.centerId = event
    this.subs.add(
      this.HouseService.getConsultingHouseByCenter(this.centerId).subscribe(
        (data) => {
          console.log('' + JSON.stringify(data))
          this.houses = data
        },
      ),
    )
  }

  getHouseId(event) {
    console.log(event)
    this.houseId = event
    this.weeklyFeed.houseId = event
    console.log('this.weeklyFeed.houseId ' + this.weeklyFeed.houseId)
    this.flocks = new Array()
    //get flock by house id
    console.log('house++++++++++++' + this.houseId)
    this.subs.add(
      this.VisitService.getConsultingFlock(this.houseId).subscribe((data) => {
        console.log('data flock' + data)
        for (let element of data) {
          if (element.checkEndOfCycle == false) this.flocks.push(element)
        }
      }),
    )
  }
  //get getSelectedFlock
  getflockID(event) {
    console.log('getSelectedflock')
    console.log(event)
    this.flockID = event
    this.subs.add(
      this.VisitService.getConsultingFlockbyId(this.flockID).subscribe(
        (data) => {
          console.log('data flock' + data)
          this.flocks = data

          for (let i of this.flocks) {
            // get breed
            if ((i.breed = i.breedObject.breedID)) {
              this.breeddescription = i.breedObject.description
              this.weeklyFeed.breed = i.breedObject.breedID
              this.nbrbirds = i.flockNumber
            }
          }
        },
      ),
    )
  }

  calculStarterFeedPerBird(event) {
    console.log('event ' + event)
    this.weeklyFeed.starterFeedPerBird = parseFloat(
      (parseFloat(event) / this.nbrbirds).toFixed(3),
    )
    console.log(
      ' this.weeklyFeed.starterFeedPerBird ' +
        this.weeklyFeed.starterFeedPerBird,
    )
    this.showButtonSave()
  }
  calculGrowerFeedPerBird(event2) {
    console.log('event ' + event2)
    this.weeklyFeed.growerFeedPerBird = parseFloat(
      (parseFloat(event2) / this.nbrbirds).toFixed(3),
    )
    console.log(
      ' this.weeklyFeed.growerFeedPerBird ' + this.weeklyFeed.growerFeedPerBird,
    )
    this.showButtonSave()
  }
  calculFinisherFeedBird(event3) {
    console.log('event ' + event3)
    this.weeklyFeed.finisherFeedBird = parseFloat(
      (parseFloat(event3) / this.nbrbirds).toFixed(3),
    )
    console.log(
      ' this.weeklyFeed.finisherFeedBird ' + this.weeklyFeed.finisherFeedBird,
    )
    this.showButtonSave()
  }
  showButtonSave() {
    console.log('showButtonSave')
    console.log(
      'this.weeklyFeed.centerId  ' +
        this.weeklyFeed.centerId +
        this.weeklyFeed.houseId +
        this.weeklyFeed.flockId +
        this.weeklyFeed.week +
        this.weeklyFeed.starterFeedPerBird +
        this.weeklyFeed.growerFeedPerBird +
        this.weeklyFeed.finisherFeedBird,
    )
    if (
      this.weeklyFeed.centerId &&
      this.weeklyFeed.houseId &&
      this.weeklyFeed.flockId &&
      this.weeklyFeed.week &&
      this.weeklyFeed.starterFeedPerBird &&
      this.weeklyFeed.growerFeedPerBird &&
      this.weeklyFeed.finisherFeedBird != null
    ) {
      console.log('disabledSave')
      this.disabledSave = false
    }
  }

  save() {
    console.log('weeklyFeed ' + JSON.stringify(this.weeklyFeed))

    //Invoking service
    this.VisitService.saveWeeklyFeed(this.weeklyFeed).subscribe((data) => {
      console.log('weeklyFeed ' + JSON.stringify(this.weeklyFeed))
      console.log("data['response']  " + data['response'])
      if (data['response'] == 'OK') {
        this.toastr.success('Success', 'Successfully added')
        this.clearForm()
      } else {
        this.toastr.error('Error', 'Operation failed')
      }
    })
  }
}
