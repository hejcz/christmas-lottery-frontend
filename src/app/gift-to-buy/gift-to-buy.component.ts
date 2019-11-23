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

  @Input() locked: boolean

  ngOnInit() {
  }

  prepareUrl() {
    const url = this.gift.url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `//${url}`;
  }

}

