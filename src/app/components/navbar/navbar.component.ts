import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  subscription = new Subscription();

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
        } else {
        this.isLoggedIn = false;
      }
    });

    this.subscription = this.settingsService.settings.subscribe(res => this.showRegister = res.allowRegistration);

  }

  onLogout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.flashMessage.show('You are now logged out', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
