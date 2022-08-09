import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IssueType} from "../domain/IssueType";
import {IssueService} from "../services/issue.service";
import {NewIssue} from "../domain/NewIssue";

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {

  issueTypes: IssueType[] = [
    {value: 'game-0', viewValue: 'Game issues'},
    {value: 'client-1', viewValue: 'Client issues'},
    {value: 'other-2', viewValue: 'Other'},
  ];

  public newIssueFormGroup: FormGroup;

  constructor(private issueService: IssueService,
              private formBuilder: FormBuilder) {
    this.newIssueFormGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      issueType: new FormControl('', [Validators.required]),
      issue: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    // this.getIssueTypes();

  }

  getIssueTypes() {
    this.issueService.getIssueTypes().subscribe((data) => {
      this.issueTypes = data;
    })
  }

  createNewIssue() {
    if (this.newIssueFormGroup.valid) {
      this.issueService.createNewIssue(this.createNewIssueFromForm()).subscribe(() => {});
    }
  }

  private createNewIssueFromForm(): NewIssue {
    const newIssue = new NewIssue();
    newIssue.email = this.newIssueFormGroup.get('email')?.value;
    newIssue.firstName = this.newIssueFormGroup.get('firstName')?.value;
    newIssue.lastName = this.newIssueFormGroup.get('lastName')?.value;
    newIssue.issueType = this.newIssueFormGroup.get('issueType')?.value;
    newIssue.issue = this.newIssueFormGroup.get('issue')?.value;
    return newIssue;
  }
}
