import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  password: string;
  email: string;

  constructor(private authService: AuthService,
              private flashMessages: FlashMessagesService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  onSubmit(){
  this.authService.login(this.email, this.password)
    .then(res => {
      this.flashMessages.show('You are now logged in', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashMessages.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });

  }
}