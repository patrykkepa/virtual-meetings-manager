import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginViewComponent } from './login-view/login-view.component';

import { MainViewComponent } from './main-view/main-view.component'

const routes: Routes = [
  { path: '', component: MainViewComponent },
  // { path: 'login', component: LoginViewComponent },
  { path: 'changePassword', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
