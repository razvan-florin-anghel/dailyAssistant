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

import { Member } from "../../shared/models/member.model";
import { ModalBoxComponent } from "../../shared/components/modal-box/modal-box.component";
import { Modal } from "src/app/shared/models/modal.model";
import { UtilsService } from "../../shared/services/utils.service";

@Component({
  selector: "app-home",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.less"],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class DashboardComponent implements OnInit {
  team: Array<Member> = [];
  memberTime: number = 0;
  currentMemberId: string = "";
  animationDuration: string = "";
  duplicateNameModalData: Modal = {
    header: { title: "Duplicate team member name" },
    body: { text: "Are you sure you want to add a duplicate name?" },
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

  testConfig: any;
  genericModalData: Modal;
  @ViewChild("genericModal") genericModal: ModalBoxComponent;
  @ViewChild("teamMemberInput") teamMemberInput: ElementRef;

  constructor(
    private countdownTimerService: CountdownTimerService,
    private utilsService: UtilsService
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
  processTeamMember($event) {
    let memberName = $event.target.value;
    if (!memberName) {
      return false;
    }

    let member: Member = { id: uuidv4(), name: memberName };

    if (this.team.length > 29 && !this.teamSizeModalWasDisplayed) {
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
  /**
   *
   */
  startTimer() {
    this.stopTimer();
    let cdate = new Date();
    cdate.setSeconds(cdate.getSeconds() + 900);
    console.log(cdate);
    this.countdownTimerService.startTimer(cdate);
    this.team = this.team.sort(() => 0.5 - Math.random());
    this.calculateTimePerMember();
    this.animationLooper();
  }
  /**
   *
   */
  stopTimer = () => {
    this.countdownTimerService.stopTimer();
  };

  calculateTimePerMember() {
    this.memberTime = 900000 / this.team.length;
  }

  animationLooper() {
    let thiz = this;
    this.currentMemberId = thiz.team[0].id;
    this.animationDuration =
      ((this.memberTime % 60000) / 1000).toFixed(0) + "s";
    for (var i = 1; i < this.team.length; i++) {
      (function (i, thiz) {
        setTimeout(function () {
          console.log(i, thiz.memberTime);
          thiz.currentMemberId = thiz.team[i].id;
        }, thiz.memberTime * i);
      })(i, thiz);
    }
  }
}
