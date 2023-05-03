import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor(
    private apiService: ApiService,
  ) { }

  // Zmienne przechowujące wartości w zależności od odpowiedzi z serwera do których można się zasubskrybować
  validatorProfile = new Subject<any>();
  setValidatorProfile(newValue: any) {
    this.validatorProfile.next(newValue)
  }
  validatorAnnouncements = new Subject<any>();
  setValidatorAnnouncements(newValue: any) {
    this.validatorAnnouncements.next(newValue)
  }
  validatorSchedules = new Subject<any>();
  setValidatorSchedules(newValue: any) {
    this.validatorAnnouncements.next(newValue)
  }

  // API REQUESTS
  // Pobranie validatora edycji profilu
  getValidatorProfile(){
    const alias = "profile"
    this.apiService.getValidators(alias)
    .subscribe(resp => {
      console.log(resp)
      if (Object.keys(resp).length != 0) {
        this.setValidatorProfile(resp)
      }
    },
    (error) => {
      this.setValidatorProfile(undefined)
      console.log(error)
    })
  }

  // Pobranie validatora edycji subskrybentów
  getValidatorAnnouncements(){
    const alias = "announcements"
    // this.apiService.getValidators(alias)
    // .subscribe(resp => {
    //   console.log(resp)
    //   if (Object.keys(resp).length != 0) {
    //     this.setValidatorAnnouncements(resp)
    //   }
    // },
    // (error) => {
    //   this.setValidatorAnnouncements(undefined)
    //   console.log(error)
    // })
  }

}


