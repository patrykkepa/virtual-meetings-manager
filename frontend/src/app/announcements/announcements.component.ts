import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl,  FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';

import { AnnouncementsService } from '../services/announcements.service';
import { faAngleRight, faAngleDown, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit, OnChanges {

  constructor(
    private announcementsService: AnnouncementsService,
    private formBuilder: FormBuilder,
  ) { }
  
  ngOnInit(): void {
    this.announcementsService.announcementsEditionActive.subscribe(announcementsEditionActive => this.announcementsEditionActive = announcementsEditionActive)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Obsługa nieaktywnych / aktywnych subskrypcji dla poszczególnych subskrybentów
    // Utworzenie tablicy z obiektami odpowiadającymi użytkownikowi z eventami które NIE NALEŻĄ do jego subskrypcji
    // Docelowo każdy obiekt tablicy będzie zawierał key, oraz events: eventy dopasowane do klucza
    if(this.announcements){
      // console.log(this.entitiesEvents)
      // // Utworzenie tablicy z każdym subskrybentem z jego aktywnymi subskrypcjami
      // let subsEventsArray: any = [];
      // for(let i=0; i<this.announcements.length; i++){
      //   subsEventsArray.push({
      //     date: this.announcements[i].date,
      //     events: []
      //   })
      //   for(let j=0; j<this.announcements[i].subscriptions.length; j++){
      //     subsEventsArray[i].events.push({
      //       entity: this.announcements[i].subscriptions[j].entity,
      //       event: this.announcements[i].subscriptions[j].event
      //     })
      //   }
      // }
      // Utworzenie tablicy z każdym dostępnym entities z jego eventami
      // this.entEventsArray = [];
      // this.inactiveSubscriptions = []
      // for(let k=0; k<this.entitiesEvents.length; k++){
      //   for(let i=0;i< this.entitiesEvents[k].events.length; i++){
      //     this.entEventsArray.push({
      //       entity: this.entitiesEvents[k].key,
      //       event: this.entitiesEvents[k].events[i].date,
      //       description: this.entitiesEvents[k].events[i].description,
      //       by: []
      //     })
      //   }
      // }
      // Porównanie eventów na każdym entities z aktwnymi subskrypcjami użytkownika i utworzenie tablicy nieaktywnych eventów  edbaf640-959e-497f-ad10-e05ac52542df
      // for(let i=0; i<subsEventsArray.length; i++){
      //   let subEv = subsEventsArray[i].events
      //   let inactiveEvents = this.entEventsArray.filter((evE: any) => !subEv.find((evS: any) => evE.entity === evS.entity && evE.event === evS.event))

      //   if(inactiveEvents){
      //     this.inactiveSubscriptions.push({
      //       date: subsEventsArray[i].date,
      //       events: inactiveEvents
      //     })
      //   }
      // }


      // console.log(this.entEventsArray)
      // console.log(subsEventsArray)
      // console.log(this.inactiveSubscriptions)
      // console.log(this.entitiesAllowed)
    }

    // Obsługa wyswietlania formularza edycji
    if(this.announcements){
      console.log(this.announcements)
      // obsługa announcement
      this.announcementsEditForm = this.formBuilder.array([])
      for(let i=0; i<this.announcements.length; i++){
        this.subscriptionsTmp = this.formBuilder.array([])
        this.announcementsEditForm.push(this.createAnnouncementsEditForm(i))
      }
    }

    // Formularz dodania subskrybenta - wymagane tutaj ze względu na korzystanie z Input dla walidacji
    this.announcementsAddForm = this.formBuilder.group({
      date: [''],
      hour: [''],
      text: ['']
    })
  }

  // Zmienne icon
  faAngleRight = faAngleRight;
  faAngleDown = faAngleDown;
  faXmark = faXmark;
  faPlus = faPlus;
  faInfo = faQuestionCircle;

  // Inputy od rodzica main-view
  @Input() channels: any;
  @Input() announcements: any;
  @Input() entitiesEvents: any;
  @Input() entitiesAllowed: any;
  @Input() validatorAnnouncements: any;

  entEventsArray: any= [];

  // Zmienne dla wyświetlania error validation message
  isDateFocused = false;
  isHourFocused = false;
  isTextFocused = false;
  isAddDateFocused = false;
  isAddHourFocused = false;
  isAddTextFocused = false;
  
  // Zmienne wskazujące na inputy w announcementsAdd (dla ich resetu po submit lub cancel)
  date: any
  hour: any
  text: any

  //Zmienna wskazująca który subskrybent będzie edytowany
  announcementNumber: any = null

  // Tablica eventów które nie należą do subskrypcji
  inactiveSubscriptions: any;

  // Zmienna wyświetlania edycji announcements
  announcementsEditionActive: boolean = false;

  // Zmienne formularza edycji announcements
  announcementsEditForm: any;
  subscriptionsTmp: any;
  announcementsAddForm: any;
  announcementsAddArr: any = this.formBuilder.array([])

  // Obsługa wyświetlania edycji
  announcementsEditionToggle(){
    this.announcementsEditionActive = !this.announcementsEditionActive
    this.announcementsAddForm.get('date').reset()
    this.announcementsAddForm.get('hour').reset()
    this.announcementsAddForm.get('text').reset()
    this.announcementsService.getAnnouncements()
  }
  announcementEditToggle(i: any) {
    this.announcementsEditionActive = !this.announcementsEditionActive
    this.announcementsService.getAnnouncements()
  }
  announcementsRowClick(i: any){
    if(this.announcementNumber != null && this.announcementNumber == i){
      this.announcementNumber = null
    } else {
      this.announcementNumber = i
    }
    this.announcementsService.getAnnouncements()
  }

  // Obsługa announcements form
  createAnnouncementsEditForm(i:any){
    return this.formBuilder.group({
        date: [this.announcements[i].date],
        hour: [this.announcements[i].hour],
        text: [this.announcements[i].text]
    })
  }

  // Obsługa subscriptions form
  createSubscriptionsEditForm(i:any, j: any){
    return this.formBuilder.group({
        by: [this.announcements[i].subscriptions[j].by],
        entity: [this.announcements[i].subscriptions[j].entity],
        event: [this.announcements[i].subscriptions[j].event],
        description: [this.announcements[i].subscriptions[j].description]
    })
  }

  // Obsługa dodania announcements
  announcementsOnAdd() {
    this.announcementsAddArr.value.push(this.announcementsAddForm.value)
    this.date = ''
    this.hour = ''
    this.text = ''
    this.announcementsAddForm.reset()
    console.log(this.announcementsAddForm)
    console.log(this.announcementsAddArr.value)
    console.log(this.announcements)
    console.log(this.announcementsEditForm.value)
  }

  // Obsługa usunięcia announcements
  announcementsOnDelete(i: any){
    console.log(i)
    this.announcementsEditForm.value.splice(i, 1)
    this.announcements.splice(i, 1)
    console.log(this.announcementsEditForm.value)
    console.log(this.announcements)
  }
  announcementsAddArrOnDelete(j:any) {
    this.announcementsAddArr.value.splice(j, 1)
  }

  // Obsługa submita dla edycji i dodania subskrybentów
  announcementsOnEdit() {
    this.announcementsEditForm.value.push(...this.announcementsAddArr.value)
    this.announcementsAddArr = this.formBuilder.array([])
    this.announcementsOnSubmit()
  }


  // Obsluga wysłania submit announcements
  announcementsOnSubmit() {
    let formattedValue = [];
    for(let i=0; i<this.announcementsEditForm.value.length; i++){
      formattedValue.push({
        date: this.announcementsEditForm.value[i].date,
        hour: this.announcementsEditForm.value[i].hour,
        text: this.announcementsEditForm.value[i].text
      })
    }
    let payload = {
      type: "object",
      value: formattedValue
    }
    console.log(this.announcementsEditForm.value)
    console.log(payload)
    this.announcementsService.putAnnouncements(payload)
  }


}
