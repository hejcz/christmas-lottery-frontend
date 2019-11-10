import { Component, OnInit } from '@angular/core';
import { Gift } from "../gift/gift.model";
import { RestClientService } from '../rest-client-service.service';
import { debounce } from "rxjs/operators";
import { RecipientGift } from '../gift-to-buy/gift.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private _rest: RestClientService) { }

  ngOnInit() {
    this._rest.fetchMyWishes()
      .subscribe(wishes => {
        wishes.sort(this.giftComparator);
        this.myGifts = wishes
      });
    this._rest.fetchMatchedUser()
      .subscribe(recipient => {
        recipient.wishes.sort(this.giftComparator);
        this.recipientGifts = recipient
      });
  }

  recipientGifts: RecipientGift = { firstName: null, lastName: null, wishes: [] }

  myGifts: Gift[] = []

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
      .subscribe(
        _ => {
          this.saveInProgress = false;
          this.lastSaveSuccess = true
        },
        _ => {
          this.saveInProgress = false;
          this.lastSaveSuccess = false
        });
  }

}
