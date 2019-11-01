import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthenticatedUserService } from './authenticated-user.service';
import { LoginComponent } from './login/login.component';


@Injectable()
export class LoginIfNotLoggedIn implements CanActivate {
  constructor(private _router: Router, private _authenticatedUserService: AuthenticatedUserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this._authenticatedUserService.isLoggedIn()) {
      this._router.navigateByUrl("/");
      return false;
    }
    return true;
  }
}

@Injectable()
export class MustBeAdmin implements CanActivate {
  constructor(private _authenticatedUserService: AuthenticatedUserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this._authenticatedUserService.isAdmin();
  }
}

@Injectable()
export class MustBeUser implements CanActivate {
  constructor(private _authenticatedUserService: AuthenticatedUserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this._authenticatedUserService.isUser();
  }
}

@Injectable()
export class MustNotBeLogged implements CanActivate {
  constructor(private _authenticatedUserService: AuthenticatedUserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this._authenticatedUserService.isLoggedIn();
  }
}

const routes: Routes = [
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [LoginIfNotLoggedIn, MustBeUser] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [LoginIfNotLoggedIn, MustBeAdmin] },
  { path: '', component: LoginComponent, canActivate: [MustNotBeLogged] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginIfNotLoggedIn, MustBeUser, MustBeAdmin, MustNotBeLogged]
})
export class AppRoutingModule { }
