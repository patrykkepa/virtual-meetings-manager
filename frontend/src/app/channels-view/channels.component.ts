import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl,  FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

import { ChannelsService } from '../services/channels.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit, OnChanges {

  constructor(
    private channelsService: ChannelsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.channelsService.channelsEditionActive.subscribe(channelsEditionActive => this.channelsEditionActive = channelsEditionActive)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Obsługa inputów edycji profilu
    if(this.channels){
      this.channelsEditForm = this.formBuilder.group({
        email: [this.channels[0].value],
        server: [this.channels[1].value]
      })
    }
    
  }

  // Inputy od rodzica main-view
  @Input() authData: any;
  @Input() channels: any;
  @Input() validatorChannels: any;

  //Zmienne wyświetlania walidacji
  isNameFocused = false;
  isMailFocused = false;

  // Zmienne wwyświetlania edycji personal data
  channelsEditionActive: boolean = false;

  // Zmienna formularza edycji profilu
  channelsEditForm: any;

  faInfo = faQuestionCircle;
  

  // Obsługa wyświetlania edycji personal data
  editionActiveToggle(){
    this.channelsEditionActive = !this.channelsEditionActive
    this.channelsService.getChannels()
  }

  // Obsługa wysłania danych do edycji
  channelsOnSubmit(){
    let payload = {
      type: "object",
      // value: this.channelsEditForm.value,
      value: [
        {
          name: "mail",
          type: "mail",
          value: this.channelsEditForm.value.email
        },
        {
          name: "server",
          type: "server",
          value: this.channelsEditForm.value.server
        }
      ]
    }
    this.channelsService.putChannels(payload)
  }

}
