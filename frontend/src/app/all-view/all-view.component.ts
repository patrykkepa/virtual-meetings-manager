import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AllService } from '../services/all.service';

@Component({
  selector: 'app-all-view',
  templateUrl: './all-view.component.html',
  styleUrls: ['./all-view.component.css']
})
export class AllViewComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private allService: AllService,
    ) { }

  ngOnInit(): void {
    this.allService.getAll();
    this.allService.organizations.subscribe(organizations => this.organizations = organizations)

  }

  // Zmienne subskrypcji
  organizations: any = []

  // Zmienna wyświetlania signIn
  signInActive: boolean = false;

  // Obsługa wyświetlenia signIn
  signInActiveToggle(){
    this.signInActive = !this.signInActive
  }

  searchOrganizationForm = this.formBuilder.group({
    name: ['']
  })
  
  searchOrganizationOnSubmit() {
      let payload = {
        name: this.searchOrganizationForm.value.name
      }
      
      this.allService.putSearch(payload)
      this.searchOrganizationForm.reset()
    }

  



}