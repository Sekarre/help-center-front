export class Comment {
  id!: number;
  fullName!: string;
  content!: string;
  replyComment!: Comment;
  createdAt!: string;
  issueStatus!: string;
}

export class CommentCreate {
  content!: string;
  replyCommentId!: string;
}
