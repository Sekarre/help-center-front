import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  replyComment!: ReplyComment;

  constructor(public dialogRef: MatDialogRef<CommentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (data.replyComment) {
      this.replyComment = data.replyComment;
    }
  }

  ngOnInit(): void {
  }

  onSendPressed(): void {
    let msg = this.replyComment ? {
        content: this.data.content,
        toSend: true,
        replyComment: {
          id: this.replyComment.id
        }
      } : {
        content: this.data.content,
        toSend: true,
      }
    this.dialogRef.close(msg);
  }
}

export interface DialogData {
  content: string,
  toSend: boolean
  replyComment: ReplyComment
}

export interface ReplyComment {
  id: number,
  createdAt: string,
  content: string,
  fullName: string,
}
