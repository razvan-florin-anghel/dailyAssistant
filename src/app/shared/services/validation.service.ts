import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private maxTeamSize: number = 9;
  private errorModalsList: { teamSizeError: string, duplicateMemberNameError: string } = {
    "teamSizeError": "showTeamSizeErrorModal",
    "duplicateMemberNameError": "showDuplicateMemberErrorModal"
  }
  constructor(private utilsService: UtilsService) { }

  /**
   * 
   * @param validationParams 
   */
  public check(validationParams): { modalToShow: string }[] {
    let validationReplay = [];

    if (this.checkTeamSize(validationParams.team.length)) {
      console.log(this);
      validationReplay.push({ modalToShow: this.errorModalsList.teamSizeError });
    }

    if (this.utilsService.memberIsDuplicated(validationParams.memberName, validationParams.team)) {
      validationReplay.push({ modalToShow: this.errorModalsList.duplicateMemberNameError });
    }

    return validationReplay;
  }

  /**
   * 
   * @param teamSize 
   */
  private checkTeamSize(teamSize: number): boolean {
    return teamSize > this.maxTeamSize;
  }

}
