import {Component, OnInit} from '@angular/core';
import {IssueService} from "../services/issue.service";
import {GroupedIssue} from "../domain/GroupedIssue";
import {EventType} from "../domain/EventType";
import {EventNotificationListenerService} from "../services/listeners/event-notification-listener.service";
import {EventNotificationService} from "../services/event-notification.service";
import {Issue} from "../domain/Issue";

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent implements OnInit {

  public issueGroup: GroupedIssue = new GroupedIssue();

  constructor(private issueService: IssueService, private eventNotificationListenerService: EventNotificationListenerService,
              private eventNotificationService: EventNotificationService) {
  }

  ngOnInit(): void {
    this.getIssuesGrouped();
    this.listenToEventNotification();
  }

  private getIssuesGrouped() {
    this.issueService.getAllIssuesGrouped().subscribe((data) => {
      this.issueGroup = data;
      this.loadEventNotificationCount(data);
    });
  }

  private listenToEventNotification() {
    this.eventNotificationListenerService.getEventNotification().subscribe(data => {
      if (EventType.NEW_ISSUE === data) {
        this.getIssuesGrouped();
      }
    });
  }

  private loadEventNotificationCount(groupedIssue: GroupedIssue) {
    this.setIssueEventNotificationCount(groupedIssue.pendingIssues);
    this.setIssueEventNotificationCount(groupedIssue.escalatingIssues);
    this.setIssueEventNotificationCount(groupedIssue.infoRequiredIssues);
    this.setIssueEventNotificationCount(groupedIssue.closedIssues);
  }

  private setIssueEventNotificationCount(issues: Issue[]) {
    issues.forEach(issue => {
      this.eventNotificationService.getEventNotificationCount(issue.id.toString(), EventType.NEW_ISSUE_COMMENT).subscribe((data) => {
        issue.eventNotificationCount = data;
      });
    });
  }
}
