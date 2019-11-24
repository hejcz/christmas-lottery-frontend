import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserService {
    
  constructor(private _util: UtilService) {
    if (localStorage.getItem("auth") !== null && localStorage.getItem("roles") !== null) {
      this.basicAuthorization = localStorage.getItem("auth");
      this.roles = JSON.parse(localStorage.getItem("roles"));
    }
   }

  private roles = [];

  private basicAuthorization: string

  logout() {
    this.basicAuthorization = null;
    this.roles = [];
    localStorage.clear();
  }

  saveLoginData(login: string, password: string) {
    this.basicAuthorization = this._util.b64EncodeUnicode(login + ":" + password);
  }

  saveRoles(roles: string[]) {
    this.roles = roles;
    localStorage.setItem("auth", this.basicAuthorization);
    localStorage.setItem("roles", JSON.stringify(this.roles));
  }

  isLoggedIn() {
    return this.roles.length !== 0;
  }

  isUser() {
    return this.roles.includes("USER");
  }

  isAdmin() {
    return this.roles.includes("ADMIN");
  }

  basicAuthHeader() {
    return this.basicAuthorization;
  }
}
