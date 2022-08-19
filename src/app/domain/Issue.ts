import {CommentCreate} from "./Comment";

export class Issue {
  id!: number;
  title!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  issue!: string;
  channelId!: string;
  issueTypeId!: number;
  issueStatus!: string;
  createdAt!: string;
  updatedAt!: string;
  eventNotificationCount!: number;
}

export class IssueStatusChange {
  status!: string;
  comment!: CommentCreate;
}
