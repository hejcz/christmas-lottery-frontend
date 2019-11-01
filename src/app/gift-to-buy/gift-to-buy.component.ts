import { Component, OnInit, Input } from '@angular/core';
import { RestClientService } from '../rest-client-service.service';
import { Gift } from '../gift/gift.model';

@Component({
  selector: 'app-gift-to-buy',
  templateUrl: './gift-to-buy.component.html',
  styleUrls: ['./gift-to-buy.component.css', '../gift.shared.css']
})
export class GiftToBuyComponent implements OnInit {

  constructor(private _rest: RestClientService) { }

  @Input() gift: Gift

  ngOnInit() {
  }

  lockItem() {
    this._rest.lockWish(this.gift.id)
      .subscribe(() => this.gift.locked = true);
  }

  unlockItem() {
    this._rest.unlockWish(this.gift.id)
      .subscribe(() => this.gift.locked = false);
  }

}

