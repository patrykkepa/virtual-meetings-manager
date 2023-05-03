import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../services/auth.service';
import { SignUpService } from '../services/sign-up.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private signUpService: SignUpService,
    private toastService: NgToastService,
  ) { }

  ngOnInit(): void {
    this.authService.signInFailed.subscribe(signInFailed => this.signInFailedMsg = signInFailed)
    this.signUpService.signUpSuceed.subscribe(signUpSuceed => this.signUpSuceedMsg = signUpSuceed)
    this.signUpService.signInFormActive.subscribe(signInFormActive => this.signInFormActive = signInFormActive)
  }
  
  // Zmienne icon
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  // Zmienna show/hide password
  showPassword: boolean = false;

  // Niewykorzystane
  signInFailedMsg: any;
  signUpSuceedMsg: any;

  // Zmienna wyświetlania signIn
  signInActive: boolean = false;

  // Wyswietlanie formularzy logowania i rejestracji 
  signInFormActive: boolean = true;
  signInFormActiveToggle() {
    this.signInFormActive = !this.signInFormActive;
    this.signInFailedMsg = false;
    return (this.signInFormActive, this.signInFailedMsg)
  }

  signInActiveToggle(){
    this.signInActive = !this.signInActive
  }

  // Obsługa pokazywania i ukrywania hasła
  togglePassword(item:any){
    if(item == 'password'){
      this.showPassword = !this.showPassword
    }
  }

  // Formularz logowania
  signInForm = this.formBuilder.group({
    username: '',
    password: ''
  });
  signInOnSubmit(): void {
    console.warn('Dane z formularza logowania: ', this.signInForm.value);
    this.signUpSuceedMsg = false;
    this.authService.postAuth(this.signInForm.value)
    this.signInForm.reset();
  }
  
  // Formularz rejestracji
  signUpForm = this.formBuilder.group({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone:'',
    email:''
  });
  signUpOnSubmit(): void {
    console.warn('Dane z formularza rejestracji: ', this.signUpForm.value);
    // this.signUpService.postSignUp(this.signUpForm.value)
    this.signUpForm.reset();
  }
}
