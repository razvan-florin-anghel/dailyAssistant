import { Injectable } from "@angular/core";
import { Member } from "../models/member.model";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  constructor() {}
  /**
   *
   * @param memberName
   * @param team
   */
  public memberIsDuplicated(memberName: string, team: Array<Member>): boolean {
    let dupe = team.filter((member) => member.name === memberName);
    return !!dupe.length;
  }
}
