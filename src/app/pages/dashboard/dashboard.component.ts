import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  team: Array<string> = [];
  member: string = '';
  constructor() { }

  ngOnInit(): void {
  }


  addTeamMember() {
    console.log(this.member);
    if (!this.member) {
      return false;
    }
    this.team.push(this.member);
    console.log(this.team);
  }

}
