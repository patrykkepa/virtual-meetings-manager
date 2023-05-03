import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // Zmienne przechowujące endpointy
  authUrl = "/auth";
  validatePasswordUrl = "/rest/validatePassword"
  changePasswordUrl = "/rest/changePassword"
  profileUrl = "/rest/profile";
  entitiesUrl = "/rest/entities";
  channelsUrl = "/rest/channels";
  announcementsUrl = "/rest/announcements";
  schedulesUrl = "/rest/schedule";
  allUrl = "/site"

  // Konfiguracja zapytań api
  getAuth(){
    return this.http.get(this.authUrl);
  }
  postAuth(payload: any) {
    return this.http.post(this.authUrl, payload, {observe: 'response'})
  }
  deleteAuth() {
    return this.http.delete(this.authUrl, {observe: 'response'})
  }
  postValidatePassword(payload: any){
    return this.http.post(this.validatePasswordUrl, payload, {observe: 'response'})
  }
  putChangePassword(payload: any){
    return this.http.put(this.changePasswordUrl, payload, {observe: 'response'})
  }
  postChangePassword(payload: any){
    return this.http.post(this.changePasswordUrl, payload)
  }
  getProfile() {
    return this.http.get(this.profileUrl, {observe: 'response'});
  }
  putProfile(payload: any) {
    return this.http.put(this.profileUrl, payload, {observe: 'response'});
  }
  getValidators(alias: any){
    const url = `/rest/getValidator?alias=${alias}`
    return this.http.get(url)
  }
  getEntitieData(key: any) {
    const url = `/rest/${key}` 
    return this.http.get(url);
  }
  getEntities() {
    return this.http.get(this.entitiesUrl);
  }
  getChannels() {
    return this.http.get(this.channelsUrl);
  }
  putChannels(payload: any) {
    return this.http.put(this.channelsUrl, payload, {observe: 'response'});
  }
  getAnnouncements() {
    return this.http.get(this.announcementsUrl);
  }
  putAnnouncements(payload: any) {
    return this.http.put(this.announcementsUrl, payload, {observe: 'response'});
  }
  getSchedules() {
    return this.http.get(this.schedulesUrl);
  }
  putSchedules(payload: any) {
    return this.http.put(this.schedulesUrl, payload, {observe: 'response'});
  }
  getAll() {
    return this.http.get(this.allUrl)
  }
  putSearch(payload: any) {
    return this.http.put(this.allUrl, payload, {observe: 'response'})
  }

}
