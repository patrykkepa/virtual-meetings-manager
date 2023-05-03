import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(
    private apiService: ApiService,
    private toastService: NgToastService,
  ) { }

  // Zmienne przechowujące wartości w zależności od odpowiedzi z serwera do których można się zasubskrybować
  schedulesEditionActive = new Subject<boolean>();
  setSchedulesEditionActive(newValue: boolean){
    this.schedulesEditionActive.next(newValue)
  }
  schedules = new Subject<any>();
  setSchedules(newValue: any){
    this.schedules.next(newValue)
  }

  // API REQUESTS
  // Pobranie informacji o subskrybentach (przypisanych do organizacji)
  getSchedules(){
    this.apiService.getSchedules()
    .subscribe(resp => {
      console.log(resp)
      let res = JSON.parse(JSON.stringify(resp))
      if (Object.keys(resp).length != 0) {
        this.setSchedules(res.value)
        console.log(res)
      } else {
        this.setSchedules({})
      }
    },
    (error) => {
      this.setSchedules({})
      console.log(error.error)
      console.log(error)
      
    })
  }

  // Aktualizacja informacji o subskrybentach (cała tablica na raz)
  putSchedules(payload: any){
    this.apiService.putSchedules(payload)
    .subscribe(resp => {
      if(resp.status == 200) {
        console.log(resp.body)
        this.setSchedulesEditionActive(false)
        this.getSchedules()
        this.toastService.success({detail: "Success Message", summary: "Data updated!", duration:2000})
      }
    },
    (error) => {
      console.log(error)
      this.toastService.error({detail: "Failed Message", summary: "Data not updated!", duration:5000})
    })
  }


}
