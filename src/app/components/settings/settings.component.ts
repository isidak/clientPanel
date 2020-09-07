import {Component, OnDestroy, OnInit} from '@angular/core';
import {Settings} from '../../models/Settings';
import {SettingsService} from '../../services/settings.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  settings;
  subscription = new Subscription();


  constructor(private settingsService: SettingsService,
              private router: Router,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.subscription = this.settingsService.settings.subscribe(res => this.settings = res);
  }

  onSubmit(){
  this.settingsService.settings.next(this.settings);
  this.settingsService.changeSettings(this.settings);
  this.flashMessages.show('Settings saved', {
    cssClass: 'alert-success', timeout: 4000
  });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
