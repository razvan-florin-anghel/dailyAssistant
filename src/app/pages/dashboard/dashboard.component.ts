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

import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-home",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class DashboardComponent implements OnInit {
  team: Array<Member> = [];
  testConfig: any;
  modalRef: NgbModalRef;
  @ViewChild("teamMemberInput") teamMemberInput: ElementRef;
  @ViewChild("mymodal", { static: false }) private mymodal;

  constructor(
    private _countdownTimerService: CountdownTimerService,
    private _modalService: NgbModal
  ) {}

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
    let memberName = $event.target.value;
    if (!memberName) {
      return false;
    }

    if (this.isDupe(memberName)) {
      setTimeout(() => {
        this.modalRef = this._modalService.open(this.mymodal);
      }, 100);
    }

    let member: Member = { id: uuidv4(), name: memberName };
    this.team.push(member);
  }

  clearInput() {
    this.teamMemberInput.nativeElement.value = "";
  }

  dismiss() {
    this.modalRef.close();
  }

  /**
   *
   * @param memberName
   */
  isDupe(memberName: string): boolean {
    let dupe = this.team.filter((member) => member.name === memberName);
    return !!dupe.length;
  }

  /**
   *
   */
  removeTeamMember(memberToBeRemoved) {
    this.team = this.team.filter((member) => {
      return member.id !== memberToBeRemoved.id;
    });
  }
  /**
   *
   */
  startTimer() {
    this.stopTimer();
    let cdate = new Date();
    console.log(cdate);
    cdate.setSeconds(cdate.getSeconds() + 900);
    this._countdownTimerService.startTimer(cdate);
  }
  /**
   *
   */
  stopTimer = () => {
    this._countdownTimerService.stopTimer();
  };
}

interface Member {
  id: any;
  name: string;
}
