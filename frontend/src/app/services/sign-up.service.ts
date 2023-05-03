import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private apiService: ApiService,
  ) { }

  // Zmienne przechowujące wartości w zależności od odpowiedzi z serwera do których można się zasubskrybować
  signUpSuceed = new Subject<boolean>();
  setSignUpSuceed(newValue: boolean){
    this.signUpSuceed.next(newValue)
  }
  signInFormActive = new Subject<boolean>();
  setSignInFormActive(newValue: boolean){
    this.signInFormActive.next(newValue)
  }

  // API REQUEST
  postSignUp(payload: any) {
    // this.apiService.postSignUp(payload)
    // .subscribe(resp =>{
    //   if(resp.status == 200){
    //     console.log(resp.body)
    //     this.setSignUpSuceed(true)
    //     this.setSignInFormActive(true)
    //   }
    // },
    // (error) => {
    //   console.log("Registration failed")
    //   console.log(error)
    // })
  }
}
