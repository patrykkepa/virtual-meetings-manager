import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms"; 

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { UserComponent } from './user/user.component';
import { ChannelsComponent } from './channels-view/channels.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { AllViewComponent } from './all-view/all-view.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgToastModule } from 'ng-angular-popup';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    AllViewComponent,
    TopBarComponent,
    MainViewComponent,
    UserComponent,
    ChannelsComponent,
    AnnouncementsComponent,
    SchedulesComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgToastModule,
    LoadingBarHttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
