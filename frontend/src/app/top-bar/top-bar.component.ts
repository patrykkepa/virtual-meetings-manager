import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.authService.getAuth();
    this.authService.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn)
    this.authService.authData.subscribe(authData => this.authData = authData)
  }

  // Zmienne subskrypcji
  loggedIn: any;
  authData: any;
  
  // Obsługa wylowowanie
  logOut(): void {
    this.authService.deleteAuth();
  }


}
