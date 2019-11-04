import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gift } from './gift/gift.model';
import { AuthenticatedUserService } from './authenticated-user.service';
import { Observable } from 'rxjs';
import { RecipientGift } from './gift-to-buy/gift.model';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {
 
  constructor(private _http: HttpClient, private _authenticatedUserService: AuthenticatedUserService) { }

  fetchRoles() {
    return this.get(`${environment.apiUrl}/users/current/roles`);
  }

  resetPassword(email: string) {
    return this.anonymousPut(`${environment.apiUrl}/passwords/recovery`, email);
  }

  newPassword(password: any) {
    return this.anonymousPut(`${environment.apiUrl}/passwords`, password);
  }

  fetchMyWishes(): Observable<Gift[]> {
    return this.get(`${environment.apiUrl}/users/current/wish-list`);
  }

  saveMyWishes(gifts: Gift[]) {
    return this.put(`${environment.apiUrl}/users/current/wish-list`, gifts);
  }

  fetchUsers(): Observable<LotteryParticipant[]> {
    return this.get(`${environment.apiUrl}/users`);
  }

  fetchMatchedUser(): Observable<RecipientGift> {
    return this.get(`${environment.apiUrl}/lottery`);
  }

  startLottery(participantsIds: number[]) {
    return this.put(`${environment.apiUrl}/lottery`, participantsIds);
  }

  resetLottery() {
    return this.delete(`${environment.apiUrl}/lottery`);
  }

  lockWish(id: number) {
    return this.put(`${environment.apiUrl}/lottery/wishes/${id}/lock`, null);
  }

  unlockWish(id: number) {
    return this.delete(`${environment.apiUrl}/lottery/wishes/${id}/lock`);
  }

  private put(url: string, payload: any) {
    return this._http.put(url, payload, this.options());
  }

  private anonymousPut(url: string, payload: any) {
    return this._http.put(url, payload);
  }

  private get<T>(url: string) {
    return this._http.get<T>(url, this.options());
  }

  private delete(url: string) {
    return this._http.delete(url, this.options());
  }

  private options() {
    return {
      "headers": new HttpHeaders()
        .append("Authorization", `Basic ${this._authenticatedUserService.basicAuthHeader()}`)
    }
  };
}
