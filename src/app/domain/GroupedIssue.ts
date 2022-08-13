import {Issue} from "./Issue";

export class GroupedIssue {
  pendingIssues: Issue[] = [];
  escalatingIssues: Issue[] = [];
  infoRequiredIssues: Issue[] = [];
  closedIssues: Issue[] = [];
}
