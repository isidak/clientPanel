import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Validators} from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';
import {SettingsService} from '../../services/settings.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit, OnDestroy {
  disableBalanceOnAdd: boolean;
  addClientForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    balance: [{value: '0', disabled: this.disableBalanceOnAdd}]
  });

  subscription = new Subscription();


  constructor(private fb: FormBuilder,
              private flashMessage: FlashMessagesService,
              private clientService: ClientService,
              private router: Router,
              private settingsService: SettingsService
              ) { }

  ngOnInit(): void {
    this.subscription = this.settingsService.settings.subscribe(res => this.disableBalanceOnAdd = res.disableBalanceOnAdd);

    if (this.disableBalanceOnAdd){
      this.addClientForm.get('balance').disable();
    }
  }

  get firstName(){
    return this.addClientForm.get('firstName');
  }

  get lastName(){
    return this.addClientForm.get('lastName');
  }

  get email(){
    return this.addClientForm.get('email');
  }

  get phone(){
    return this.addClientForm.get('phone');
  }


  onSubmit(){
    if (this.addClientForm.valid){
      if (this.disableBalanceOnAdd){
        this.addClientForm.value.balance = 0;
      }
      const client = this.addClientForm.value;
     // Add new client
      this.clientService.newClient(client);
    //  Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 2000
      });
    //  Redirect to dashboard
      this.router.navigate(['/']);
    } else {
    //  Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 2000
      });
      // const errmessage = document.createElement('div');
      // errmessage.innerText = 'Please fill out the form correctly';
      // errmessage.className = 'alert alert-danger';
      // document.forms[0].append(errmessage);
      // setTimeout(()=>{
      //   errmessage.remove();
      // }, 2000);


    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
