import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
} from "angular-animations";

import { v4 as uuidv4 } from "uuid";
import {
  countDownTimerConfigModel,
  CountdownTimerService,
  countDownTimerTexts,
} from "ngx-timer";

@Component({
  selector: "app-home",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class DashboardComponent implements OnInit {
  team: Array<Member> = [];
  testConfig: any;
  @ViewChild("teamMemberInput") teamMemberInput: ElementRef;

  constructor(private _countdownTimerService: CountdownTimerService) {}

  ngOnInit(): void {
    this.testConfig = new countDownTimerConfigModel();
    this.testConfig.timerClass = "test_Timer_class";
    this.testConfig.timerTexts = new countDownTimerTexts();
    this.testConfig.timerTexts.hourText = "hh";
    this.testConfig.timerTexts.minuteText = "mm";
    this.testConfig.timerTexts.secondsText = "ss";
  }
  /**
   *
   * @param $event
   */
  addTeamMember($event) {
    if (!$event.target.value) {
      return false;
    }
    let member: Member = { id: uuidv4(), name: $event.target.value };
    this.team.push(member);
  }

  clearInput() {
    this.teamMemberInput.nativeElement.value = "";
  }

  /**
   *
   */
  removeTeamMember(memberToBeRemoved) {
    this.team = this.team.filter((member) => {
      return member.id !== memberToBeRemoved.id;
    });
  }

  startTimer() {
    this.stopTimer();
    let cdate = new Date();
    console.log(cdate)
    cdate.setSeconds(cdate.getSeconds() + 900);
    this._countdownTimerService.startTimer(cdate);
  }

  stopTimer = () => {
    this._countdownTimerService.stopTimer();
  };
}

interface Member {
  id: any;
  name: string;
}
