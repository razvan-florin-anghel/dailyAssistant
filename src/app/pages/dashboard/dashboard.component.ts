import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  slideInUpOnEnterAnimation,
  fadeInUpAnimation,
} from "angular-animations";

import { v4 as uuidv4 } from "uuid";
import {
  countDownTimerConfigModel,
  CountdownTimerService,
  countDownTimerTexts,
} from "ngx-timer";

import { Member } from "../../shared/models/member.model";
import { ModalBoxComponent } from "../../shared/components/modal-box/modal-box.component";
import { Modal } from "src/app/shared/models/modal.model";
import { UtilsService } from "../../shared/services/utils.service";
import { OrderPipe } from "ngx-order-pipe";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    slideInUpOnEnterAnimation(),
    fadeInUpAnimation(),
  ],
})
export class DashboardComponent implements OnInit {
  team: Array<Member> = [];
  memberTime: number = 0;
  currentMemberId: string = "";
  animationDuration: string = "";
  duplicateNameModalData: Modal = {
    header: { title: "Duplicate team member name" },
    body: { text: "Are you sure you want to add a duplicate name?" }
  };
  duplicateNameModalWasDisplayed = false;

  teamSizeModalData: Modal = {
    header: { title: "The team is too big" },
    body: {
      text:
        "I don't know what you're doing but this isn't SCRUM! Are you sure you want to add this team member?",
    },
  };
  teamSizeModalWasDisplayed = false;

  finishModal: Modal = {
    header: { title: "The daily meeting is done!" },
    body: { text: "Have a great day!" },
    buttons: {
      yes: { enabled: false },
      close: { enabled: true, text: "Close" },
    },
  };

  testConfig: any;
  genericModalData: Modal;
  order: string = "timeExpired";
  buttonText: string = "START";
  counterTime: number = 900;

  @ViewChild("genericModal") genericModal: ModalBoxComponent;
  @ViewChild("teamMemberInput") teamMemberInput: ElementRef;

  constructor(
    private countdownTimerService: CountdownTimerService,
    private utilsService: UtilsService,
    private orderPipe: OrderPipe
  ) {}

  ngOnInit(): void {
    this.testConfig = new countDownTimerConfigModel();
    this.testConfig.timerClass = "countdown-timer";
    this.testConfig.timerTexts = new countDownTimerTexts();
    let team = JSON.parse(localStorage.getItem("team"));
    if (team && team.length) {
      this.team = team;
    }
  }
  /**
   *
   * @param $event
   */
  processTeamMember($event) {
    let memberName = $event.target.value;
    if (!memberName) {
      return false;
    }

    let member: Member = { id: uuidv4(), name: memberName, timeExpired: 0 };

    if (this.team.length > 9 && !this.teamSizeModalWasDisplayed) {
      this.showTeamSizeErrorModal(member);
      return false;
    }

    if (
      this.utilsService.memberIsDuplicated(memberName, this.team) &&
      !this.duplicateNameModalWasDisplayed
    ) {
      this.showDuplicateMemberErrorModal(member);
      return false;
    }
    this.team.push(member);
    localStorage.setItem("team", JSON.stringify(this.team));
  }
  /**
   *
   * @param member
   */
  showTeamSizeErrorModal(member: Member): void {
    setTimeout(() => {
      this.genericModalData = this.teamSizeModalData;
      this.genericModal.openModal().then((data) => {
        if (data === "confirm") {
          this.team.push(member);
          this.duplicateNameModalWasDisplayed = true;
        }
      });
    }, 100);
  }

  /**
   *
   * @param member
   */
  showDuplicateMemberErrorModal(member: Member): void {
    setTimeout(() => {
      this.genericModalData = this.duplicateNameModalData;
      this.genericModal.openModal().then((data) => {
        if (data === "confirm") {
          this.team.push(member);
          this.duplicateNameModalWasDisplayed = true;
        }
      });
    }, 100);
  }
  /**
   *
   */
  showFinishModal(): void {
    setTimeout(() => {
      this.genericModalData = this.finishModal;
      this.genericModal.openModal();
    }, 100);
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

  setAction(action) {
    if (action === "START") {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  resetAllMembersExpiredTimes() {
    this.team = this.team.map((member) => {
      member.timeExpired = 0;
      return member;
    });
  }

  /**
   *
   */
  startTimer() {
    this.stopTimer();
    this.buttonText = "STOP";
    let cdate = new Date();
    cdate.setSeconds(cdate.getSeconds() + 900);
    this.countdownTimerService.startTimer(cdate);
    this.team = this.team.sort(() => 0.5 - Math.random());
    this.calculateTimePerMember();
    this.animationLooper();
  }
  /**
   *
   */
  stopTimer = () => {
    this.buttonText = "START";
    this.currentMemberId = "";
    this.animationDuration = "";
    this.memberTime = 0;
    this.resetAllMembersExpiredTimes();
    this.countdownTimerService.stopTimer();
  };

  calculateTimePerMember() {
    this.memberTime = this.counterTime / this.team.length;
  }

  animationLooper() {
    let thiz = this;
    this.currentMemberId = thiz.team[0].id;
    this.animationDuration = this.memberTime + "ms";
    for (var i = 1; i <= this.team.length; i++) {
      (function (i, thiz) {
        setTimeout(function () {
          if (i < thiz.team.length) {
            thiz.currentMemberId = thiz.team[i].id;
            thiz.team[i - 1].timeExpired = 1;
          } else {
            thiz.stopTimer();
            thiz.showFinishModal();
          }
        }, thiz.memberTime * i);
      })(i, thiz);
    }
  }
}
