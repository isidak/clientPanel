import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {FormBuilder, Validators} from '@angular/forms';
import {SettingsService} from '../../services/settings.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {
  id: string;
  disableBalanceOnEdit: boolean;
  addClientForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    balance: [{value: '0', disabled: this.disableBalanceOnEdit}],
    id: ['']
  });
  subscription = new Subscription();



  constructor(private clientService: ClientService,
              private router: Router,
              private route: ActivatedRoute,
              private flashMessage: FlashMessagesService,
              private fb: FormBuilder,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.subscription = this.settingsService.settings.subscribe(res => this.disableBalanceOnEdit = res.disableBalanceOnEdit);
    this.id = this.route.snapshot.params.id;
    this.clientService.getClient(this.id).subscribe(client => {
      this.addClientForm.patchValue({
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        phone: client.phone,
        balance: client.balance
      });
      if(this.disableBalanceOnEdit){
      this.addClientForm.get('balance').disable(); }
    });


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
    if (!this.addClientForm.valid){
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else{
      this.addClientForm.patchValue({
        id: this.id
      });
      this.clientService.updateClient(this.addClientForm.value);
      this.router.navigate(['/client/'+this.id]);
    }
    this.flashMessage.show('Client successfully updated', {
      cssClass: 'alert-success', timeout: 4000
    });

    }

    ngOnDestroy(){
    this.subscription.unsubscribe();
    }
}
