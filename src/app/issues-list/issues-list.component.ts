import {Component, OnInit} from '@angular/core';
import {IssueService} from "../services/issue.service";
import {GroupedIssue} from "../domain/GroupedIssue";
import {EventType} from "../domain/EventType";
import {EventNotificationService} from "../services/event-notification.service";

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent implements OnInit {

  public issueGroup: GroupedIssue = new GroupedIssue();

  constructor(private issueService: IssueService, private eventNotificationService: EventNotificationService) {
  }

  ngOnInit(): void {
    this.getIssuesGrouped();
    this.listenToEventNotification();
  }

  private getIssuesGrouped() {
    this.issueService.getAllIssuesGrouped().subscribe((data) => {
      this.issueGroup = data;
    });
  }

  private listenToEventNotification() {
    this.eventNotificationService.getEventNotification().subscribe(data => {
      if (EventType.NEW_ISSUE === data) {
        this.getIssuesGrouped();
      }
    });
  }
}
