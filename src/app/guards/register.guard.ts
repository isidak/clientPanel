import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {SettingsService} from '../services/settings.service';


@Injectable()

  export class RegisterGuard implements CanActivate {
  allowRegistration: boolean;
    constructor (
      private router: Router,
      private settingsService: SettingsService
    ){}

    canActivate(): boolean  {
      this.settingsService.settings.subscribe(res => this.allowRegistration = res.allowRegistration);
      if (this.allowRegistration){
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }

