import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ){}

  ngOnInit(){
    // Aktywacja spinnera ładowania strony
    setTimeout(() => {
      this.spinner.show();
    }, 500);

    this.authService.getAuth();
    this.authService.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn)

  }

  loggedIn: any = null;


} 
