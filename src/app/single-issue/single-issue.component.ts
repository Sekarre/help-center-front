import { Component, OnInit } from '@angular/core';
import {Issue} from "../domain/Issue";
import {IssueService} from "../services/issue.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChatService} from "../services/chat.service";
import {ChatMessage} from "../domain/ChatMessage";
import {CommentService} from "../services/comment.service";
import {Comment} from "../domain/Comment";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {StatusType} from "../domain/StatusType";

@Component({
  selector: 'app-single-issue',
  templateUrl: './single-issue.component.html',
  styleUrls: ['./single-issue.component.css']
})
export class SingleIssueComponent implements OnInit {

  public issue!: Issue;
  public issueId!: number;
  public chatMessages!: ChatMessage[];
  public comments!: Comment[];
  public isMouseClick: boolean = false;

  statusTypes: StatusType[] = [
    {id: 1, name: 'Closed'},
    {id: 2, name: 'Rejected'},
  ]

  constructor(private issueService: IssueService, private chatService: ChatService, private commentService: CommentService,
              private activeRoute: ActivatedRoute, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.issueId = Number(params.get('issueId'));
      this.issueService.getSingleIssue(this.issueId).subscribe((data) =>{
        this.issue = data;
        if (this.issue.channelId) {
          this.getChatLogs();
        }
        this.getComments();
      });
    });
  }

  getChatLogs() {
    this.chatService.getChatMessages(this.issue.channelId).subscribe((data) => this.chatMessages = data);
  }

  getComments() {
    this.commentService.getIssueComments(this.issueId).subscribe((data) => this.comments = data);
  }

  joinChat() {
    this.chatService.joinChat(this.issue.channelId).subscribe((data) => {
      this.router.navigateByUrl('/chat/' + this.issue.channelId);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '700px',
      height: '400px',
      data: {}
    });

    dialogRef.backdropClick().subscribe(() => {
      this.isMouseClick = true;
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!this.isMouseClick) {
        let comment = new Comment();
        comment.content = result;
        console.log(comment);
        this.commentService.createNewComment(comment, this.issueId).subscribe(() => this.getComments());
      }
      this.isMouseClick = false;
    });
  }

  changeStatus() {
    //todo
  }
}

