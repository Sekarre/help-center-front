import {Component, ComponentRef, OnInit, ViewChildren, ViewContainerRef} from '@angular/core';
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
import {AddUserIssueDialogComponent} from "../dialogs/add-user-issue-dialog/add-user-issue-dialog.component";
import {ShowParticipantsDialogComponent} from "../dialogs/show-participants-dialog/show-participants-dialog.component";
import {NavbarListenerService} from "../services/listeners/navbar-listener.service";
import {EventType} from "../domain/EventType";

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
              private navbarListenerService: NavbarListenerService,
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
        this.getIssueStatusType();
        this.navbarListenerService.setNavbarRemoveNotifications(this.issueId.toString(), EventType.NEW_ISSUE_COMMENT);
        this.navbarListenerService.setNavbarRemoveNotifications(this.issueId.toString(), EventType.ASSIGNED_TO_ISSUE);
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

  openDialogForPersonAdd() {
    const dialogRef = this.dialog.open(AddUserIssueDialogComponent, {
      width: '700px',
      height: '350px',
      data: {issueId: this.issueId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.toSend) {
        let usersId = result.usersId;
        this.issueService.addUsersToIssue(usersId, this.issueId).subscribe(() => {
          //todo: alert info
          console.log("users added");
        });
      }
    });
  }

  openDialogForParticipants() {
    this.dialog.open(ShowParticipantsDialogComponent, {
      width: '700px',
      height: '350px',
      data: {issueId: this.issueId}
    });
  }
}

