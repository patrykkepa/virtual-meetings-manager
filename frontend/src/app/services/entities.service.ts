import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor(
    private apiService: ApiService,
  ) { }

  // Zmienne przechowujące odpowiedzi z serwera do których można się zasubskrybować
  entitiesAllowed = new Subject<any>();
  setEntitiesAllowed(newValue: any){
    this.entitiesAllowed.next(newValue)
  }
  entitiesEvents = new Subject<any[]>();
  setEntitiesEvents(newValue: any){
    this.entitiesEvents.next(newValue)
  }


  // API REQUESTS
  // Pobranie informacji o tym jakie entities są dostępne dla użytkownika
  getEntitiesAllowed(){
    this.apiService.getEntities()
    .subscribe(resp => {
      let res = JSON.parse(JSON.stringify(resp))
      console.log(res.value)
      if (Object.keys(resp).length != 0) {
        this.setEntitiesAllowed(res)
        this.getEntitiesEvents(res.value)
      } else {
        this.setEntitiesAllowed(undefined)
      }
    },
    (error) => {
      this.setEntitiesAllowed(undefined)
      console.log(error.error)
      console.log(error)
      
    })
  }

  // Korzystajc z dostępnego(dostępnych) entities wysłanie zapytania o to jakie eventy są na nim(nich) dostępne
  getEntitiesEvents(key: any){
    let entEventsArray: any = []
    for(let i=0; i<key.length; i++){
      this.apiService.getEntitieData(key[i])
      .subscribe(resp => {
        let res = JSON.parse(JSON.stringify(resp))
        console.log(res.value)
        if (Object.keys(resp).length != 0) {
          console.log(res.value.events)
          let myResp = {
            key: res.value.key,
            events: ['']
          }
          for(let i=0; i<res.value.events.length; i++){
              myResp.events[i] = res.value.events[i]
  
          }
          console.log(myResp)
          entEventsArray.push(myResp) 
        }
      },
      (error) => {
        console.log(error.error)
        console.log(error)
        
      })
      this.setEntitiesEvents(entEventsArray) 
    }

  }
}
