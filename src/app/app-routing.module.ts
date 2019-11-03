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

@Injectable()
export class DefaultRedirect implements CanActivate {
  constructor(private _router: Router, private _authenticatedUserService: AuthenticatedUserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authenticatedUserService.isAdmin()) {
      this._router.navigateByUrl("/admin/dashboard");
      return false;
    } else if (this._authenticatedUserService.isUser()) {
      this._router.navigateByUrl("/dashboard");
      return false;
    } else {
      this._router.navigateByUrl("/");
      return false;
    }
  }
}

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent, canActivate: [MustNotBeLogged] },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [LoginIfNotLoggedIn, MustBeUser] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [LoginIfNotLoggedIn, MustBeAdmin] },
  // it should redirect to '' but canActivate is not called on redirect so dummy component is called
  // https://github.com/angular/angular/issues/18605
  { path: '**', component: LoginComponent, canActivate: [DefaultRedirect] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginIfNotLoggedIn, MustBeUser, MustBeAdmin, MustNotBeLogged, DefaultRedirect]
})
export class AppRoutingModule { }
