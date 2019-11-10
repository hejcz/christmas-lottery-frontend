import { Component, OnInit, Input } from '@angular/core';
import { Gift } from './gift.model';
import { RestClientService } from '../rest-client-service.service';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css', '../gift.shared.css']
})
export class GiftComponent implements OnInit {

  constructor(private _rest: RestClientService) { }

  @Input() gift: Gift

  tempPower: number

  initialLocked: boolean

  ngOnInit() {
    this.tempPower = this.gift.power;
    this.initialLocked = this.gift.locked;
  }

  lockItem() {
    this._rest.lockWish(this.gift.id)
      .subscribe(() => this.gift.locked = true);
  }

  unlockItem() {
    if (!this.initialLocked) {
      this.gift.locked = false;
    }
  }

  highlightPower(ordinal: number) {
    this.tempPower = ordinal;
  }

  unhighlightPower() {
    this.tempPower = this.gift.power;
  }

  changePower(ordinal: number) {
    this.tempPower = ordinal;
    this.gift.power = ordinal;
  }

  delete() {
    this.gift.deleted = true;
  }

  prepareUrl() {
    const url = this.gift.url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `//${url}`;
  }

}
