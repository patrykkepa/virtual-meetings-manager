import { identifierName, ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHA256, enc } from 'crypto-js';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import { ChangePasswordService} from '../services/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private changePasswordService: ChangePasswordService,
  ) { }

  ngOnInit(): void {
    this.changePasswordService.oldPasswordCorrect.subscribe(oldPasswordCorrect => this.oldPasswordCorrect = oldPasswordCorrect)
    this.changePasswordService.passwordStrength.subscribe(passwordStrength => this.passwordStrength = passwordStrength)
    this.changePasswordService.passwordTooWeak.subscribe(passwordTooWeak => this.passwordTooWeak = passwordTooWeak)
  }

  // Zmienne icon
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  @Input() profile: any

  // Zmienne password strength i show/hide
  oldPasswordCorrect: any = true;
  passwordStrength : any;
  passwordTooWeak : any;
  showOldPassword: boolean = false;
  showPassword: boolean = false;
  showPasswordRepeat: boolean = false;

  // Zmienne wyświetlania error message walidacji
  isOldPasswordFocused = false;
  isPasswordFocused = false;
  isRepeatPasswordFocused = false;

  // Zmienne formularza zmiany hasła
  changePasswordForm = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    password: ['', [
      Validators.required, 
      this.noSpaceAllowed,
      this.wrongPassword
    ]],
    passwordRepeat: ['', [
      Validators.required, 
      this.noSpaceAllowed,
      this.wrongPasswordRepeat
    ]]
  })

  // Validacja
  noSpaceAllowed(control: FormControl) {
    if(control.value != null && control.value.indexOf(' ') != -1) {
      return {noSpaceAllowed: true}
    }
    return null;
  }
  wrongPassword(control: FormControl) {
    if(control.parent){
      if(control.parent.value['passwordRepeat'] != ''){
        if(control.value != control.parent.value['passwordRepeat']){
           console.log(control.root.get('passwordRepeat'))
           control.root.get('passwordRepeat')?.setErrors({wrongPasswordRepeat: true})
        } else {
          return null
        }
      }
    }
    return null
  }
  wrongPasswordRepeat(control: FormControl) {
    if(control.parent){
      if(control.value != control.parent.value['password']){
        return {wrongPasswordRepeat: true}
      } else {
        return null
      }
    }
    return null
  }

  //Obsługa sprawdzenia siły hasła
  checkPasswordStrength() {
    let payload = {
      password: this.changePasswordForm.value.password
    }
    this.changePasswordService.postChangePassword(payload)
  }
  
  // Obsługa pokazywania i ukrywania hasła
  togglePassword(item:any){
    if(item == 'password'){
      this.showPassword = !this.showPassword
    } else if(item == 'passwordRepeat'){
      this.showPasswordRepeat = !this.showPasswordRepeat
    } else if(item == 'oldPassword'){
      this.showOldPassword = !this.showOldPassword
    }
  }

  // Obsługa submit changePassword
  changePasswordOnSubmit() {
    if(this.changePasswordForm.valid) {
      let oldPassword = {
        password: this.changePasswordForm.value.oldPassword
      }
      let hashPassword = SHA256(this.changePasswordForm.value.password as string).toString(enc.Hex)
      let payload = {
        password: this.changePasswordForm.value.password
      }
      console.log(payload)
      
      this.changePasswordService.postValidatePassword(oldPassword, payload)
      this.changePasswordForm.reset()
    }

  }

}
