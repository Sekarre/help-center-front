import {Component, ComponentRef, OnInit, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import {Issue, IssueStatusChange} from "../domain/Issue";
import {IssueService} from "../services/issue.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChatService} from "../services/chat.service";
import {ChatMessage} from "../domain/ChatMessage";
import {CommentService} from "../services/comment.service";
import {CommentCreate} from "../domain/Comment";
import {MatDialog} from "@angular/material/dialog";
import {CommentDialogComponent} from "../dialogs/comment-dialog/comment-dialog.component";
import {ChatDialogComponent} from "../dialogs/chat-dialog/chat-dialog.component";
import {StickyChatComponent} from "../sticky-chat/sticky-chat.component";

@Component({
  selector: 'app-single-issue',
  templateUrl: './single-issue.component.html',
  styleUrls: ['./single-issue.component.css']
})
export class SingleIssueComponent implements OnInit {

  public issue: Issue = new Issue();
  public issueId!: number;
  public chatMessages: ChatMessage[] = [];
  public status!: string;
  public statusTypes: string[] = [];
  public showChat: boolean = false;

  @ViewChildren('stickyChat', {read: ViewContainerRef}) ref!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(private issueService: IssueService, private chatService: ChatService, private commentService: CommentService,
              private activeRoute: ActivatedRoute, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.issueId = Number(params.get('issueId'));
      this.issueService.getSingleIssue(this.issueId).subscribe((data) => {
        this.issue = data;
        if (this.issue.channelId) {
          this.getChatLogs();
        }
        this.getIssueStatusType()
      });
    });
  }

  getChatLogs() {
    this.chatService.getChatMessages(this.issue.channelId).subscribe((data) => this.chatMessages = data);
  }

  getIssueStatusType() {
    this.issueService.getIssueStatusTypes().subscribe((data) => this.statusTypes = data);
  }

  joinChat() {
    this.showChat = true;
  }

  destroyStickyChat() {
    this.showChat = false;
  }

  openDialogForStatus(): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '700px',
      height: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.toSend) {
        let issueStatusChange = new IssueStatusChange();
        issueStatusChange.comment = new CommentCreate();
        issueStatusChange.comment.content = result.content;
        issueStatusChange.status = this.status;
        this.issueService.changeIssueStatus(this.issueId, issueStatusChange).subscribe(() => {
          this.ngOnInit();
          this.commentService.setResetCommentSection(true);
        });
      }
    });
  }

  openDialogForChatLogs(): void {
    this.dialog.open(ChatDialogComponent, {
      width: '700px',
      height: '400px',
      data: {channelId: this.issue.channelId}
    });
  }
}

