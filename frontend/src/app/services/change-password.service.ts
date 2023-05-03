import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(
    private router : Router,
    private apiService: ApiService,
    private toastService: NgToastService,
  ) { }

    // Zmienne przechowujące odpowiedzi z serwera do których można się zasubskrybować
  changePasswordActive = new Subject<boolean>();
  setChangePasswordActive(newValue: boolean){
    this.changePasswordActive.next(newValue)
  }
  oldPasswordCorrect = new Subject<boolean>();
  setOldPasswordCorrect(newValue: any){
    this.oldPasswordCorrect.next(newValue)
  }
  passwordStrength = new Subject<any>();
  setPasswordStrength(newValue: any){
    this.passwordStrength.next(newValue)
  }
  passwordTooWeak = new Subject<any>();
  setPasswordTooWeak(newValue: any){
    this.passwordTooWeak.next(newValue)
  }

  // API REQUESTS
  // Sprawdzenie poprawności podanego starego hasła
  postValidatePassword(oldPassword: any, payload: any){
    console.log(oldPassword)
    this.apiService.postValidatePassword(oldPassword)
    .subscribe(resp => {
      if(resp.status === 200){
        console.log(resp.body)
        this.setOldPasswordCorrect(true)
        this.putChangePassword(payload)
        this.router.navigateByUrl('')
      }
    }, (error) => {
      console.log(error.error)
      this.setOldPasswordCorrect(false)
      this.setPasswordStrength({})
    })
  }

  // Sprawdzenie siły hasła
  postChangePassword(payload: any){
    console.log(payload)
    this.apiService.postChangePassword(payload)
    .subscribe(resp => {
      let res = JSON.parse(JSON.stringify(resp))
      console.log(resp)
      if(Object.keys(resp).length != 0) {
        this.setPasswordStrength(resp)
        const val = (res.id < res.required) ? true : false;
        this.setPasswordTooWeak(val)
        console.log(val)
      }
    },
    (error) => {
      console.log(error)
      this.setPasswordStrength({})
    })
  }

  // Zmiana hasła
  putChangePassword(payload: any){
    console.log(payload)
    this.apiService.putChangePassword(payload)
    .subscribe(resp => {
      console.log(resp)
      if(resp.status == 200) {
        this.apiService.getAuth()
        console.log('Change password suceed')
        this.toastService.success({detail: "Success Message", summary: "Password change succeed!", duration:5000})
      }
    },
    (error) => {
      console.log("Change password failed")
      console.log(error)
      this.toastService.error({detail: "Failed Message", summary: "Password change failed!", duration:10000})
    })
  }


}
