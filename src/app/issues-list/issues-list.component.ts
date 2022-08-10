import { Component, OnInit } from '@angular/core';
import {IssueService} from "../services/issue.service";
import {Issue} from "../domain/Issue";

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent implements OnInit {

  issues: Issue[] = [];


  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
    this.issueService.getAllIssuesWithStatus('PENDING').subscribe((data) => {
      this.issues = data;
    })
  }
}
