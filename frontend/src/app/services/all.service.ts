import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor(
    private apiService: ApiService,
    private toastService: NgToastService,
  ) { }

  // Zmienne przechowujące odpowiedzi z serwera do których można się zasubskrybować
  organizations = new Subject<any>();
  setAll(newValue: any){
    this.organizations.next(newValue)
  }

  // API REQUESTS
  // Pobranie obsługiwanych kanałów komunikacji 
  getAll(){
    this.apiService.getAll()
    .subscribe(resp => {
      let res = JSON.parse(JSON.stringify(resp))
      console.log(resp)
      if (Object.keys(resp).length != 0) {
        let organizations = []
        for(let i=0; i< res.value.length; i++){
          organizations[i] = res.value[i]
        }
        this.setAll(organizations)
        console.log(organizations)
      } else {
        this.setAll({})
      }
    },
    (error) => {
      this.setAll({})
      console.log(error.error)
      console.log(error)
      
    })
  }
  putSearch(payload: any){
    this.apiService.putSearch(payload)
    .subscribe(resp => {
      if(resp.status == 200) {
        console.log(resp.body)
        let res = JSON.parse(JSON.stringify(resp.body))
        if (Object.keys(res).length != 0) {
          let organizations = []
          for(let i=0; i< res.value.length; i++){
            organizations[i] = res.value[i]
          }
          this.setAll(organizations)
          console.log(organizations)
          if(organizations.length ==0) {
            this.getAll()
          }
        } else {
          this.getAll()
        }
      }
    },
    (error) => {
      this.getAll()
      console.log(error.error)
      console.log(error)
    })
  }

}
