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
      .subscribe(wishes => this.myGifts = wishes);
    this._rest.fetchMatchedUser()
      .subscribe(recipient => this.recipientGifts = recipient);
  }

  recipientGifts: RecipientGift = null

  myGifts: Gift[] = []

  saveInProgress = false

  addWish() {
    this.myGifts.push(new Gift(null, "", 3));
  }

  save() {
    this.myGifts = this.myGifts.filter(it => !it.deleted);
    this.saveInProgress = true
    this._rest.saveMyWishes(this.myGifts)
      .subscribe(_ => this.saveInProgress = false)
  }

}
