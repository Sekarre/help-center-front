import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IssueType} from "../domain/IssueType";
import {IssueService} from "../services/issue.service";
import {Issue} from "../domain/Issue";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {

  issueTypes: IssueType[] = [];

  public newIssueFormGroup: FormGroup;

  constructor(private router: Router, private issueService: IssueService, private formBuilder: FormBuilder) {
    this.newIssueFormGroup = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      issueType: new FormControl('', [Validators.required]),
      issue: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getIssueTypes();
  }

  getIssueTypes() {
    this.issueService.getIssueTypes().subscribe((data) => {
      this.issueTypes = data;
    })
  }

  createNewIssue() {
    if (this.newIssueFormGroup.valid) {
      this.issueService.createNewIssue(this.createNewIssueFromForm()).subscribe(() => {
        this.router.navigateByUrl('/issues');
      });
    }
  }

  private createNewIssueFromForm(): Issue {
    const newIssue = new Issue();
    newIssue.title = this.newIssueFormGroup.get('title')?.value;
    newIssue.issueTypeId = this.newIssueFormGroup.get('issueType')?.value;
    newIssue.issue = this.newIssueFormGroup.get('issue')?.value;
    return newIssue;
  }
}
