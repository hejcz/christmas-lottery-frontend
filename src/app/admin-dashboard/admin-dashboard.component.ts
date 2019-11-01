import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { RestClientService } from '../rest-client-service.service';
import { __rest } from 'tslib';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private _rest: RestClientService) { }

  ngOnInit() {
    this._rest.fetchUsers()
      .subscribe(users => {
        users.forEach(u => u.participates = true);
        this.users = users;
      });
  }

  users: LotteryParticipant[] = []

  lotteryStarted: boolean

  handleChange(event: MatCheckboxChange, user: LotteryParticipant) {
    user.participates = event.checked;
  }

  startLottery() {
    this._rest.startLottery(this.users.filter(it => it.participates).map(it => it.id))
      .subscribe(_ => this.lotteryStarted = true);
  }

  resetLottery() {
    this._rest.resetLottery().subscribe(_ => this.lotteryStarted = false);
  }

}
