import { Injectable } from '@angular/core';
import {Settings} from '../models/Settings';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>({
    allowRegistration: false,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  });

  constructor() {
    if (localStorage.getItem('settings') != null){
      this.settings.next(JSON.parse(localStorage.getItem('settings')));
    };
  }

  getSettings(){
    return this.settings;
  }

  changeSettings(settings: Settings){
      localStorage.setItem('settings', JSON.stringify(settings));
  }
}
