import { Component, OnInit } from '@angular/core';
import {Issue} from "../domain/Issue";
import {IssueService} from "../services/issue.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-issue',
  templateUrl: './single-issue.component.html',
  styleUrls: ['./single-issue.component.css']
})
export class SingleIssueComponent implements OnInit {

  public issue!: Issue;
  public issueId!: number;

  constructor(private issueService: IssueService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.issueId = Number(params.get('issueId'));
      this.issueService.getSingleIssue(this.issueId).subscribe((data) => this.issue = data);
    });
  }

}
