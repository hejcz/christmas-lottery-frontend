import { Component } from '@angular/core';
import { AuthenticatedUserService } from './authenticated-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public _authenticatedUser: AuthenticatedUserService) {
  }

  logout() {
    this._authenticatedUser.logout();
  }

}
