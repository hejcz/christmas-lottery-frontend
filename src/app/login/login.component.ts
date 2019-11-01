import { Component, OnInit, NgZone } from '@angular/core';
import { AuthenticatedUserService } from '../authenticated-user.service';
import { Router } from '@angular/router';
import { RestClientService } from '../rest-client-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthenticatedUserService,
    private _rest: RestClientService
  ) { }

  ngOnInit() {
  }

  login: string
  password: string
  lastLoginUnsuccessful = false

  tryToLogin() {
    this._authService.saveLoginData(this.login, this.password)
    this._rest.fetchRoles()
      .subscribe(
        response => {
          this._authService.saveRoles(response as string[]);
          this.afterSuccessfulLogin()
        },
        _ => {
          this.lastLoginUnsuccessful = true;
        }
      );
  }

  afterSuccessfulLogin() {
    if (this._authService.isAdmin()) {
      this._router.navigateByUrl("/admin/dashboard");
    } else if (this._authService.isUser()) {
      this._router.navigateByUrl("/dashboard");
    }
  }

}
