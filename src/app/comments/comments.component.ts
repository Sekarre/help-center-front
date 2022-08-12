import {Component, OnInit} from '@angular/core';
import {CommentService} from "../services/comment.service";
import {ActivatedRoute} from "@angular/router";
import {Comment, CommentCreate} from "../domain/Comment";
import {CommentDialogComponent, DialogData} from "../dialogs/comment-dialog/comment-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  issueId: number = -1;
  comments: Comment[] = [];

  constructor(private commentService: CommentService, private activeRoute: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
        this.issueId = Number(params.get('issueId'));
        this.getComments();
      }
    );

    this.commentService.getResetCommentSection().subscribe(value => {
      if (value) {
        this.getComments();
        this.commentService.setResetCommentSection(false);
      }
    })
  }

  getComments() {
    this.commentService.getIssueComments(this.issueId).subscribe((data) => {
      this.comments = data;
    });
  }

  replyToComment(cmt: Comment) {

    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '700px',
      height: '400px',
      data: {
        replyComment: {
          id: cmt.id,
          createdAt: cmt.createdAt,
          content: cmt.content,
          fullName: cmt.fullName
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.toSend) {
        let comment = new CommentCreate();
        comment.content = result.content;
        if (result.replyComment) {
          comment.replyCommentId = result.replyComment.id;
        }
        this.commentService.createNewComment(comment, this.issueId).subscribe(() => this.getComments());
      }
    });
  }

  openDialogForComment(): void {
    this.createDialog();
  }

  private createDialog() {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '700px',
      height: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.toSend) {
        let comment = new CommentCreate();
        comment.content = result.content;
        this.commentService.createNewComment(comment, this.issueId).subscribe(() => this.getComments());
      }
    });
  }
}
