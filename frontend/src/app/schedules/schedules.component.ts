import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl,  FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';

import { SchedulesService } from '../services/schedules.service';
import { faAngleRight, faAngleDown, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit, OnChanges {

  constructor(
    private schedulesService: SchedulesService,
    private formBuilder: FormBuilder,
  ) { }
  
  ngOnInit(): void {
    this.schedulesService.schedulesEditionActive.subscribe(schedulesEditionActive => this.schedulesEditionActive = schedulesEditionActive)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Obsługa nieaktywnych / aktywnych subskrypcji dla poszczególnych subskrybentów
    // Utworzenie tablicy z obiektami odpowiadającymi użytkownikowi z eventami które NIE NALEŻĄ do jego subskrypcji
    // Docelowo każdy obiekt tablicy będzie zawierał key, oraz events: eventy dopasowane do klucza
    if(this.schedules){
      // console.log(this.entitiesEvents)
      // // Utworzenie tablicy z każdym subskrybentem z jego aktywnymi subskrypcjami
      // let subsEventsArray: any = [];
      // for(let i=0; i<this.schedules.length; i++){
      //   subsEventsArray.push({
      //     date: this.schedules[i].date,
      //     events: []
      //   })
      //   for(let j=0; j<this.schedules[i].subscriptions.length; j++){
      //     subsEventsArray[i].events.push({
      //       entity: this.schedules[i].subscriptions[j].entity,
      //       event: this.schedules[i].subscriptions[j].event
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
    if(this.schedules){
      console.log(this.schedules)
      // obsługa announcement
      this.schedulesEditForm = this.formBuilder.array([])
      for(let i=0; i<this.schedules.length; i++){
        this.subscriptionsTmp = this.formBuilder.array([])
        this.schedulesEditForm.push(this.createSchedulesEditForm(i))
      }
    }

    // Formularz dodania subskrybenta - wymagane tutaj ze względu na korzystanie z Input dla walidacji
    this.schedulesAddForm = this.formBuilder.group({
      date: [''],
      hour: [''],
      text: [''],
      access: [''],
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
  @Input() schedules: any;
  @Input() entitiesEvents: any;
  @Input() entitiesAllowed: any;
  @Input() validatorSchedules: any;

  entEventsArray: any= [];

  // Zmienne dla wyświetlania error validation message
  isDateFocused = false;
  isHourFocused = false;
  isTextFocused = false;
  isAddDateFocused = false;
  isAddHourFocused = false;
  isAddTextFocused = false;
  
  // Zmienne wskazujące na inputy w schedulesAdd (dla ich resetu po submit lub cancel)
  date: any
  hour: any
  text: any
  access: any

  //Zmienna wskazująca który subskrybent będzie edytowany
  announcementNumber: any = null

  // Tablica eventów które nie należą do subskrypcji
  inactiveSubscriptions: any;

  // Zmienna wyświetlania edycji schedules
  schedulesEditionActive: boolean = false;

  // Zmienne formularza edycji schedules
  schedulesEditForm: any;
  subscriptionsTmp: any;
  schedulesAddForm: any;
  schedulesAddArr: any = this.formBuilder.array([])

  // Obsługa wyświetlania edycji
  schedulesEditionToggle(){
    this.schedulesEditionActive = !this.schedulesEditionActive
    this.schedulesAddForm.get('date').reset()
    this.schedulesAddForm.get('hour').reset()
    this.schedulesAddForm.get('text').reset()
    this.schedulesAddForm.get('access').reset()
    this.schedulesService.getSchedules()
  }
  announcementEditToggle(i: any) {
    this.schedulesEditionActive = !this.schedulesEditionActive
    this.schedulesService.getSchedules()
  }
  schedulesRowClick(i: any){
    if(this.announcementNumber != null && this.announcementNumber == i){
      this.announcementNumber = null
    } else {
      this.announcementNumber = i
    }
    this.schedulesService.getSchedules()
  }

  // Obsługa schedules form
  createSchedulesEditForm(i:any){
    return this.formBuilder.group({
        date: [this.schedules[i].date],
        hour: [this.schedules[i].hour],
        text: [this.schedules[i].text],
        access: [this.schedules[i].access],
    })
  }

  // Obsługa subscriptions form
  createSubscriptionsEditForm(i:any, j: any){
    return this.formBuilder.group({
        by: [this.schedules[i].subscriptions[j].by],
        entity: [this.schedules[i].subscriptions[j].entity],
        event: [this.schedules[i].subscriptions[j].event],
        description: [this.schedules[i].subscriptions[j].description]
    })
  }

  // Obsługa dodania schedules
  schedulesOnAdd() {
    this.schedulesAddArr.value.push(this.schedulesAddForm.value)
    this.date = ''
    this.hour = ''
    this.text = ''
    this.access = ''
    this.schedulesAddForm.reset()
    console.log(this.schedulesAddForm)
    console.log(this.schedulesAddArr.value)
    console.log(this.schedules)
    console.log(this.schedulesEditForm.value)
  }

  // Obsługa usunięcia schedules
  schedulesOnDelete(i: any){
    console.log(i)
    this.schedulesEditForm.value.splice(i, 1)
    this.schedules.splice(i, 1)
    console.log(this.schedulesEditForm.value)
    console.log(this.schedules)
  }
  schedulesAddArrOnDelete(j:any) {
    this.schedulesAddArr.value.splice(j, 1)
  }

  // Obsługa submita dla edycji i dodania subskrybentów
  schedulesOnEdit() {
    this.schedulesEditForm.value.push(...this.schedulesAddArr.value)
    this.schedulesAddArr = this.formBuilder.array([])
    this.schedulesOnSubmit()
  }


  // Obsluga wysłania submit schedules
  schedulesOnSubmit() {
    let formattedValue = [];
    for(let i=0; i<this.schedulesEditForm.value.length; i++){
      formattedValue.push({
        date: this.schedulesEditForm.value[i].date,
        hour: this.schedulesEditForm.value[i].hour,
        text: this.schedulesEditForm.value[i].text,
        access: this.schedulesEditForm.value[i].access,
      })
    }
    let payload = {
      type: "object",
      value: formattedValue
    }
    console.log(this.schedulesEditForm.value)
    console.log(payload)
    this.schedulesService.putSchedules(payload)
  }


}
