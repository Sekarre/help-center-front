export class Comment {
  id!: number;
  fullName!: string;
  content!: string;
  replyCommentId!: string;
  createdAt!: string;
  issueStatus!: string;
}

export class CommentCreate {
  content!: string;
  replyCommentId!: string;
}
