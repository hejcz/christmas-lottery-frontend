import { Component, OnInit } from '@angular/core';
import { Gift } from "../gift/gift.model";
import { RestClientService } from '../rest-client-service.service';
import { catchError, tap, delay } from "rxjs/operators";
import { RecipientGift } from '../gift-to-buy/gift.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private _rest: RestClientService) { }

  ngOnInit() {
    this._rest.fetchMyWishes()
      .subscribe(wishlist => {
        wishlist.wishes = Array.from(wishlist.wishes);
        wishlist.wishes.sort(this.giftComparator);
        this.myGifts = wishlist.wishes
        this.locked = wishlist.locked
      });
    this._rest.fetchMatchedUser()
      .subscribe(recipient => {
        recipient.wishes = Array.from(recipient.wishes);
        recipient.wishes.sort(this.giftComparator);
        this.recipientGifts = recipient
      });
  }

  recipientGifts: RecipientGift = { firstName: null, lastName: null, wishes: [], locked: false }

  myGifts: Gift[] = []

  locked: boolean = false

  saveInProgress = false

  lastSaveSuccess: boolean = null

  addWish() {
    this.myGifts.push(new Gift(null, "", 3));
  }

  giftComparator(first: Gift, second: Gift) {
    if (first.power < second.power) {
      return 1;
    }
    if (first.power > second.power) {
      return -1;
    }
    if (first.title < second.title) {
      return -1;
    }
    return 1;
  }

  save() {
    this.myGifts = this.myGifts.filter(it => !it.deleted);
    this.myGifts.sort(this.giftComparator);
    this.saveInProgress = true
    this._rest.saveMyWishes(this.myGifts)
      .pipe(
        tap(_ => {
          this.saveInProgress = false;
          this.lastSaveSuccess = true
        }),
        catchError(_ => {
          this.saveInProgress = false;
          this.lastSaveSuccess = false;
          return of("delay response")
        }),
        delay(2000)
      )
      .subscribe(
        _ => this.lastSaveSuccess = null
      );
  }

  lockWishlist() {
    this._rest.lockWishlist()
      .subscribe(_ => this.recipientGifts.locked = true);
  }

  unlockWishlist() {
    this._rest.unlockWishlist()
      .subscribe(_ => this.recipientGifts.locked = false);
  }

}
