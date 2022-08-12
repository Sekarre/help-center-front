import { Component, OnInit } from '@angular/core';
import {IssueService} from "../services/issue.service";
import {GroupedIssue} from "../domain/GroupedIssue";

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent implements OnInit {

  public issueGroup!: GroupedIssue;

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
    this.issueService.getAllIssuesGrouped().subscribe((data) => {
      this.issueGroup = data;
    })
  }
}
