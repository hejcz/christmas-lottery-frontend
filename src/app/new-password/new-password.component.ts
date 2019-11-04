import { Component, OnInit } from '@angular/core';
import { RestClientService } from '../rest-client-service.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor(private _rest: RestClientService, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  password = ""
  repeatedPassword = ""
  passwordsAreDifferent = false
  canLogin = false

  recover() {
    if (this.password !== this.repeatedPassword) {
      this.passwordsAreDifferent = true
      return
    }
    this.passwordsAreDifferent = false
    this._route.queryParams
      .pipe(
        map(params => params["token"]),
        switchMap(token => this._rest.newPassword({ "newPassword": this.password, "token": token }))
      ).subscribe(
        _ => this.canLogin = true,
        _ => {
          this.password = ""
          this.repeatedPassword = ""
        }
      )
  }

}
