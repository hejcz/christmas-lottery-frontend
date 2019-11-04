import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest-client-service.service';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.css']
})
export class RemindPasswordComponent implements OnInit {

  constructor(private _rest: RestClientService) { }

  ngOnInit() {
  }

  emailSent = false

  email = ""

  resetDisabled = false

  sendResetLink() {
    this.resetDisabled = true
    this._rest.resetPassword(this.email)
      .subscribe(
        _ => this.emailSent = true,
        _ => this.resetDisabled = false
      );
  }

}
