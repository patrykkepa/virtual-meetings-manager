import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl,  FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges {

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.profileService.userEditionActive.subscribe(userEditionActive => this.userEditionActive = userEditionActive)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Obsługa inputów edycji profilu
    if(this.profile){
      this.profileEditForm = this.formBuilder.group({
        fullName: [this.profile.value.fullName, [
          this.validatorProfile?.required.includes('fullName') ? Validators.required : Validators.nullValidator,
          Validators.pattern(this.validatorProfile?.properties.fullName.pattern)
        ]],
        email: [this.profile.value.email, [
          this.validatorProfile?.required.includes('email') ? Validators.required : Validators.nullValidator,
          Validators.email
        ]]
      })
    }
    
  }

  // Inputy od rodzica main-view
  @Input() authData: any;
  @Input() profile: any;
  @Input() validatorProfile: any;

  //Zmienne wyświetlania walidacji
  isNameFocused = false;
  isAddMailFocused = false;

  // Zmienne wwyświetlania edycji personal data
  userEditionActive: boolean = false;

  // Zmienna wyświetlania changePassword
  changePasswordActive: boolean = false;

  // Zmienna formularza edycji profilu
  profileEditForm: any;

  faInfo = faQuestionCircle;
  
  // Validacja
  fullNameValidator(contro: FormControl) {

  }

  // Obsługa wyświetlania edycji personal data
  editionActiveToggle(){
    this.userEditionActive = !this.userEditionActive
    this.profileService.getProfile()
  }

  // Obsługa wyświetlenia change password
  changePasswordActiveToggle(){
    this.changePasswordActive = !this.changePasswordActive
  }

  // Obsługa wysłania danych do edycji
  profileOnSubmit(){
    let payload = {
      type: "object",
      value: this.profileEditForm.value
    }
    this.profileService.putProfile(payload)
  }

}
