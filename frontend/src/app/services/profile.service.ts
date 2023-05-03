import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private toastService: NgToastService,
  ) { }

  // Zmienne przechowujące wartości w zależności od odpowiedzi z serwera do których można się zasubskrybować
  userEditionActive = new Subject<boolean>();
  setUserEditionActive(newValue: boolean){
    this.userEditionActive.next(newValue)
  }
  profile = new Subject<any>();
  setProfile(newValue: any){
    this.profile.next(newValue)
  }

  

  // API REQUEST
  // Pobranie informacji o właścicielu konta
  getProfile(){
    this.apiService.getProfile()
    .subscribe(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.setProfile(resp.body);
      } else {
        this.setProfile({})
      }
    },
    (error) => {
      this.setProfile({});
    })
  }
  
  // Edycja informacji o właścicielu konta
  putProfile(payload: any){
    this.apiService.putProfile(payload)
    .subscribe(resp => {
      if(resp.status == 200) {
        console.log(resp.body)
        this.setUserEditionActive(false)
        this.getProfile()
        this.toastService.success({detail: "Success Message", summary: "Profile updated!", duration:5000})
      }
    },
    (error) => {
      console.log(error)
      this.toastService.error({detail: "Failed Message", summary: "Profile updating failed!", duration:10000})
    })
  }
}

