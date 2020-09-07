import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  password: string;
  email: string;

  constructor(private authService: AuthService,
              private flashMessages: FlashMessagesService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.register(this.email, this.password)
      .then(res => {
        this.flashMessages.show('You are now registered', {
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
