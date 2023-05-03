import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  constructor(
    private apiService: ApiService,
    private toastService: NgToastService,
  ) { }

  // Zmienne przechowujące wartości w zależności od odpowiedzi z serwera do których można się zasubskrybować
  announcementsEditionActive = new Subject<boolean>();
  setAnnouncementsEditionActive(newValue: boolean){
    this.announcementsEditionActive.next(newValue)
  }
  announcements = new Subject<any>();
  setAnnouncements(newValue: any){
    this.announcements.next(newValue)
  }

  // API REQUESTS
  // Pobranie informacji o subskrybentach (przypisanych do organizacji)
  getAnnouncements(){
    this.apiService.getAnnouncements()
    .subscribe(resp => {
      console.log(resp)
      let res = JSON.parse(JSON.stringify(resp))
      if (Object.keys(resp).length != 0) {
        this.setAnnouncements(res.value)
        console.log(res)
      } else {
        this.setAnnouncements({})
      }
    },
    (error) => {
      this.setAnnouncements({})
      console.log(error.error)
      console.log(error)
      
    })
  }

  // Aktualizacja informacji o subskrybentach (cała tablica na raz)
  putAnnouncements(payload: any){
    this.apiService.putAnnouncements(payload)
    .subscribe(resp => {
      if(resp.status == 200) {
        console.log(resp.body)
        this.setAnnouncementsEditionActive(false)
        this.getAnnouncements()
        this.toastService.success({detail: "Success Message", summary: "Data updated!", duration:2000})
      }
    },
    (error) => {
      console.log(error)
      this.toastService.error({detail: "Failed Message", summary: "Data not updated!", duration:5000})
    })
  }


}
