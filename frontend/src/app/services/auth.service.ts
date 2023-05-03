import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router'
import { NgToastService } from 'ng-angular-popup';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService,
    private toastService: NgToastService,
  ) { }

  // Zmienne przechowujące odpowiedzi z serwera do których można się zasubskrybować
  loggedIn = new Subject<boolean>();
  setLoggedIn(newValue: boolean){
    this.loggedIn.next(newValue)
  }
  authData = new Subject<any>();
  setAuthData(newValue: any){
    this.authData.next(newValue)
  }
  // Niewykorzystane
  signInFailed = new Subject<boolean>();
  setSignInFailed(newValue: boolean){
    this.signInFailed.next(newValue)
  }
  signOutFailed = new Subject<boolean>();
  setSignOutFailed(newValue: boolean){
    this.signOutFailed.next(newValue)
  }



  // API REQUESTS
  // Pobranie informacji
  getAuth() {
    this.apiService.getAuth()
    .subscribe(resp => {
      console.log('getAuth resp: ', resp)
      if (Object.keys(resp).length != 0) {
        this.setLoggedIn(true);
        this.setAuthData(resp);
      } else {
        this.setLoggedIn(false)
        this.setAuthData(undefined);
      }
    },
    (error) => {
      this.setLoggedIn(false);
      this.setAuthData(undefined);
      console.log(error.error)
      console.log(error)
    })
  }

  // Logowanie
  postAuth(payload: any){
    this.apiService.postAuth(payload)
    .subscribe(resp => {
      if(resp.status == 200) {
        console.log(resp.body)
        this.getAuth()
        this.toastService.success({detail: "Success Message", summary: "Loging in succeed!", duration:5000})
      }
    },
    (error) => {
      console.log("Loging in failed")
      console.log(error)
      this.toastService.error({detail: "Failed Message", summary: "Loging in failed!", duration:5000})
      this.setSignInFailed(true)
    })
  }

  // Wylogowanie
  deleteAuth() {
    this.apiService.deleteAuth()
    .subscribe(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.setLoggedIn(false)
        this.setAuthData(undefined)
        this.getAuth()
      }
    },
    (error) => {
      console.log("Logout failed")
      console.log(error)
      this.setSignOutFailed(true)
    })
  }
}
