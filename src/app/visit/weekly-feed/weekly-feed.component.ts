import { Component, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { FlockService } from 'src/app/services/flock.service'
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
  breed: string
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
  flockName:string
  exist=false
  totalfeed=0
  

  constructor(
    private HouseService: HouseService,
    private VisitService: VisitService,
    private toastr: ToastrService,
    private flockService: FlockService
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

  verfication(){
    this.VisitService.getweeklyfeedByFlockAndAge(this.weeklyFeed.week, this.flockID).subscribe(data=>
      {
        console.log('exist',data)
        
        if(data.length!=0){
          this.exist=true
          this.totalfeed=data[0]
          console.log(this.exist)
        }
        else{
          this.exist=false
        }
      })
      this.VisitService.getVisitTasksVerification(this.flockID , this.weeklyFeed.week, 6).subscribe(data=>{
        console.log('exist',data)
          
          if(data.length!=0){
            this.exist=true
            this.totalfeed=data[0].measure
            console.log(this.exist)
          }
          else{
            this.exist=false
          }
      })    
  }

  getCenterId(event) {
    this.centerId = event
    this.weeklyFeed.centerId = event
    this.weeklyFeed.houseId=' '
    console.log('weeklyFeed',this.weeklyFeed)
    this.houses=[]
    this.houseId=''
    this.flockName=''
    this.flockID=''
    this.breed=''
    this.subs.add(
      this.HouseService.getConsultingHouseByCenter(this.centerId).subscribe(
        (data) => {
          this.houses = data
        },
      ),
    )
  }

  getHouseId(event) {
    console.log(event)
    this.houseId = event
    this.weeklyFeed.houseId = event
    this.flockName=''
    this.flockID=''
    this.breed=''
    console.log('this.weeklyFeed.houseId ' + this.weeklyFeed.houseId)
    this.flocks = []
    //get flock by house id
    this.flockService.getFlockExisitsByHouse(this.houseId).subscribe(data=>{
      this.flocks=data
      console.log('flock',this.flocks)
      this.flockID=this.flocks[0].flockID
      this.flockName=this.flocks[0].flockName
      this.breedId=this.flocks[0].breed
      this.nbrbirds= this.flocks[0].restFlockNumber
      switch(this.breedId) { 
        case 1: { 
           this.breed="Hubbard"
           break; 
        } 
        case 2: { 
          this.breed="Cobb 500" 
           break; 
        } 
        case 3: { 
          this.breed="Ross 308" 
          break; 
       } 
       case 4: { 
        this.breed="Arbor Acres plus" 
        break; 
     } 
     }
    })
    
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
