import {Issue} from "./Issue";

export interface GroupedIssue {
  pendingIssues: Issue[],
  escalatingIssues: Issue[],
  infoRequiredIssues: Issue[],
  closedIssues: Issue[]
}
