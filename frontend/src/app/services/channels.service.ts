import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  constructor(
    private apiService: ApiService,
    private toastService: NgToastService,
  ) { }

  // Zmienne przechowujące odpowiedzi z serwera do których można się zasubskrybować
  channels = new Subject<any>();
  setChannels(newValue: any){
    this.channels.next(newValue)
  }
  channelsEditionActive = new Subject<boolean>();
  setUserEditionActive(newValue: boolean){
    this.channelsEditionActive.next(newValue)
  }

  // API REQUESTS
  // Pobranie obsługiwanych kanałów komunikacji 
  getChannels(){
    this.apiService.getChannels()
    .subscribe(resp => {
      let res = JSON.parse(JSON.stringify(resp))
      console.log(resp)
      if (Object.keys(resp).length != 0) {
        let channels = []
        for(let i=0; i< res.value.length; i++){
          channels[i] = res.value[i]
        }
        this.setChannels(channels)
      } else {
        this.setChannels({})
      }
    },
    (error) => {
      this.setChannels({})
      console.log(error.error)
      console.log(error)
      
    })
  }

  putChannels(payload: any){
    this.apiService.putChannels(payload)
    .subscribe(resp => {
      if(resp.status == 200) {
        console.log(resp.body)
        this.setUserEditionActive(false)
        this.getChannels()
        this.toastService.success({detail: "Success Message", summary: "Channels updated!", duration:5000})
      }
    },
    (error) => {
      console.log(error)
      this.toastService.error({detail: "Failed Message", summary: "Channels updating failed!", duration:10000})
    })
  }

}
