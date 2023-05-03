import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl,  FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';

import { SubscribersService } from '../services/subscribers.service';
import { faAngleRight, faAngleDown, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit, OnChanges {

  constructor(
    private subscribersService: SubscribersService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.subscribersService.subscribersEditionActive.subscribe(subscribersEditionActive => this.subscribersEditionActive = subscribersEditionActive)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Obsługa nieaktywnych / aktywnych subskrypcji dla poszczególnych subskrybentów
    // Utworzenie tablicy z obiektami odpowiadającymi użytkownikowi z eventami które NIE NALEŻĄ do jego subskrypcji
    // Docelowo każdy obiekt tablicy będzie zawierał key, oraz events: eventy dopasowane do klucza
    if(this.subscribers && this.entitiesEvents){
      console.log(this.entitiesEvents)
      // Utworzenie tablicy z każdym subskrybentem z jego aktywnymi subskrypcjami
      let subsEventsArray: any = [];
      for(let i=0; i<this.subscribers.length; i++){
        subsEventsArray.push({
          name: this.subscribers[i].name,
          events: []
        })
        for(let j=0; j<this.subscribers[i].subscriptions.length; j++){
          subsEventsArray[i].events.push({
            entity: this.subscribers[i].subscriptions[j].entity,
            event: this.subscribers[i].subscriptions[j].event
          })
        }
      }
      // Utworzenie tablicy z każdym dostępnym entities z jego eventami
      this.entEventsArray = [];
      this.inactiveSubscriptions = []
      for(let k=0; k<this.entitiesEvents.length; k++){
        for(let i=0;i< this.entitiesEvents[k].events.length; i++){
          this.entEventsArray.push({
            entity: this.entitiesEvents[k].key,
            event: this.entitiesEvents[k].events[i].name,
            description: this.entitiesEvents[k].events[i].description,
            by: []
          })
        }
      }
      // Porównanie eventów na każdym entities z aktwnymi subskrypcjami użytkownika i utworzenie tablicy nieaktywnych eventów  edbaf640-959e-497f-ad10-e05ac52542df
      for(let i=0; i<subsEventsArray.length; i++){
        let subEv = subsEventsArray[i].events
        let inactiveEvents = this.entEventsArray.filter((evE: any) => !subEv.find((evS: any) => evE.entity === evS.entity && evE.event === evS.event))

        if(inactiveEvents){
          this.inactiveSubscriptions.push({
            name: subsEventsArray[i].name,
            events: inactiveEvents
          })
        }
      }


      console.log(this.entEventsArray)
      console.log(subsEventsArray)
      console.log(this.inactiveSubscriptions)
      console.log(this.entitiesAllowed)
    }

    // Obsługa wyswietlania formularza edycji
    if(this.subscribers){
      console.log(this.subscribers)
      // obsługa subscriber
      this.subscribersEditForm = this.formBuilder.array([])
      for(let i=0; i<this.subscribers.length; i++){
        this.subscriptionsTmp = this.formBuilder.array([])
        for(let j=0; j<this.subscribers[i].subscriptions.length; j++){
          this.subscriptionsTmp.push(this.createSubscriptionsEditForm(i, j))
        }
        this.subscribersEditForm.push(this.createSubscribersEditForm(i))
      }
    }

    // Formularz dodania subskrybenta - wymagane tutaj ze względu na korzystanie z Input dla walidacji
    this.subscribersAddForm = this.formBuilder.group({
      name: ['', [
        this.validatorSubscribers?.items.required.includes('name') ? Validators.required : Validators.nullValidator,
        Validators.pattern(this.validatorSubscribers?.items.properties.name.pattern)
      ]],
      sms: ['', [
        this.validatorSubscribers?.items.properties.to.required.includes('sms') ? Validators.required : Validators.nullValidator,
        Validators.pattern(this.validatorSubscribers?.items.properties.to.properties.sms.pattern)
      ]],
      mail: ['', [
        this.validatorSubscribers?.items.properties.to.required.includes('email') ? Validators.required : Validators.nullValidator,
        Validators.email
      ]],
      pushover: ['', [
        Validators.pattern(this.validatorSubscribers?.items.properties.to.properties.pushover.pattern)
      ]],
      subscriptions: [this.entEventsArray]
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
  @Input() subscribers: any;
  @Input() entitiesEvents: any;
  @Input() entitiesAllowed: any;
  @Input() validatorSubscribers: any;

  entEventsArray: any= [];

  // Zmienne dla wyświetlania error validation message
  isNameFocused = false;
  isPhoneFocused = false;
  isMailFocused = false;
  isPushoverFocused = false;
  isAddNameFocused = false;
  isAddPhoneFocused = false;
  isAddMailFocused = false;
  isAddPushoverFocused = false;
  
  // Zmienne wskazujące na inputy w subscribersAdd (dla ich resetu po submit lub cancel)
  name: any
  sms: any
  mail: any
  pushover: any

  //Zmienna wskazująca który subskrybent będzie edytowany
  subscriberNumber: any = null

  // Tablica eventów które nie należą do subskrypcji
  inactiveSubscriptions: any;

  // Zmienna wyświetlania edycji subscribers
  subscribersEditionActive: boolean = false;

  // Zmienne formularza edycji subscribers
  subscribersEditForm: any;
  subscriptionsTmp: any;
  subscribersAddForm: any;
  subscribersAddArr: any = this.formBuilder.array([])

  // Obsługa wyświetlania edycji
  subscribersEditionToggle(){
    this.subscribersEditionActive = !this.subscribersEditionActive
    this.subscribersAddForm.get('name').reset()
    this.subscribersAddForm.get('sms').reset()
    this.subscribersAddForm.get('mail').reset()
    this.subscribersAddForm.get('pushover').reset()
    this.subscribersService.getSubscribers()
  }
  subscriberEditToggle(i: any) {
    this.subscribersEditionActive = !this.subscribersEditionActive
    this.subscribersService.getSubscribers()
  }
  subscribersRowClick(i: any){
    if(this.subscriberNumber != null && this.subscriberNumber == i){
      this.subscriberNumber = null
    } else {
      this.subscriberNumber = i
    }
    this.subscribersService.getSubscribers()
  }

  // Obsługa subscribers form
  createSubscribersEditForm(i:any){
    return this.formBuilder.group({
        name: [this.subscribers[i].name, [
          this.validatorSubscribers?.items.required.includes('name') ? Validators.required : Validators.nullValidator,
          Validators.pattern(this.validatorSubscribers?.items.properties.name.pattern)
        ]],
        sms: [this.subscribers[i].to.sms, [
          this.validatorSubscribers?.items.properties.to.required.includes('sms') ? Validators.required : Validators.nullValidator,
          Validators.pattern(this.validatorSubscribers?.items.properties.to.properties.sms.pattern)
        ]],
        mail: [this.subscribers[i].to.mail, [
          this.validatorSubscribers?.items.properties.to.required.includes('email') ? Validators.required : Validators.nullValidator,
          Validators.email
        ]],
        pushover: [this.subscribers[i].to.pushover, [
          Validators.pattern(this.validatorSubscribers?.items.properties.to.properties.pushover.pattern)
        ]],
        subscriptions: this.subscriptionsTmp
    })
  }

  // Obsługa subscriptions form
  createSubscriptionsEditForm(i:any, j: any){
    return this.formBuilder.group({
        by: [this.subscribers[i].subscriptions[j].by],
        entity: [this.subscribers[i].subscriptions[j].entity],
        event: [this.subscribers[i].subscriptions[j].event],
        description: [this.subscribers[i].subscriptions[j].description]
    })
  }

  // Obsługa dodania subscribers
  subscribersOnAdd() {
    this.subscribersAddArr.value.push(this.subscribersAddForm.value)
    this.name = ''
    this.sms = ''
    this.mail = ''
    this.pushover = ''
    this.subscribersAddForm.reset()
    this.subscribersAddForm.controls['subscriptions'].setValue(this.entEventsArray)
    console.log(this.subscribersAddForm)
    console.log(this.subscribersAddArr.value)
    console.log(this.subscribers)
    console.log(this.subscribersEditForm.value)
  }

  // Obsługa usunięcia subscribers
  subscribersOnDelete(i: any){
    console.log(i)
    this.subscribersEditForm.value.splice(i, 1)
    this.subscribers.splice(i, 1)
    console.log(this.subscribersEditForm.value)
    console.log(this.subscribers)
  }
  subscribersAddArrOnDelete(j:any) {
    this.subscribersAddArr.value.splice(j, 1)
  }

  // Obsługa submita dla edycji i dodania subskrybentów
  subscribersOnEdit() {
    this.subscribersEditForm.value.push(...this.subscribersAddArr.value)
    this.subscribersAddArr = this.formBuilder.array([])
    this.subscribersOnSubmit()
  }

  // Obsługa dodania/usunięcia destination dla subskrybenta
  destinationOnSelect(i: any, j: any, event: any){
    this.subscribersEditForm.value[i].subscriptions[j].by.push(event)
    console.log(this.subscribersEditForm.value[i].subscriptions[j].by)
    this.subscribersOnSubmit()
  }
  destinationOnDelete(i: any, j: any, event: any) {
    let index = this.subscribersEditForm.value[i].subscriptions[j].by.indexOf(event)
    if(index !== -1){
      this.subscribersEditForm.value[i].subscriptions[j].by.splice(index, 1)
    }
    console.log(this.subscribersEditForm.value[i].subscriptions[j].by)
    this.subscribersOnSubmit()
  }

  // Obsługa dodania subskrypcji
  subscriptionsOnAdd(item: any, i: any, j: any) {
    console.log(item)
    // this.subscribers[i].subscriptions.push(item)
    this.inactiveSubscriptions[i].events.splice(j, 1)
    this.subscribersEditForm.value[i].subscriptions.push(item)

    this.subscribersOnSubmit()

    console.log(this.inactiveSubscriptions)
    console.log(this.subscribersEditForm.value)
    console.log(this.subscribers)
  }

  // Obsługa usunięcia subskrypcji
  subscriptionsOnDelete(item:any, i: any, j: any){
    console.log(item)
    console.log(this.subscribersEditForm.value[i].subscriptions[j])
    this.subscribersEditForm.value[i].subscriptions.splice(j, 1)
    this.inactiveSubscriptions[i].events.push(this.subscribers[i].subscriptions[j])
    this.subscribers[i].subscriptions.splice(j, 1)

    this.subscribersOnSubmit()

    console.log(this.inactiveSubscriptions[i].events)
    console.log(this.inactiveSubscriptions)
    console.log(this.subscribersEditForm.value)
    console.log(this.subscribers)

  }

  // Obsluga wysłania submit subscribers
  subscribersOnSubmit() {
    let formattedValue = [];
    for(let i=0; i<this.subscribersEditForm.value.length; i++){
      formattedValue.push({
        name: this.subscribersEditForm.value[i].name,
        to: {
          ...(this.subscribersEditForm.value[i].sms && {sms: this.subscribersEditForm.value[i].sms}),
          ...(this.subscribersEditForm.value[i].mail && {mail: this.subscribersEditForm.value[i].mail}),
          ...(this.subscribersEditForm.value[i].pushover && {pushover: this.subscribersEditForm.value[i].pushover})
        },
        subscriptions: this.subscribersEditForm.value[i].subscriptions
        
      })
    }
    let payload = {
      type: "object",
      value: formattedValue
    }
    console.log(this.subscribersEditForm.value)
    console.log(payload)
    this.subscribersService.putSubscribers(payload)
  }


}
