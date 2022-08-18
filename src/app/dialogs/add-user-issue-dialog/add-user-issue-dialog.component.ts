import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {User} from "../../domain/User";
import {RoleNames} from "../../domain/RoleNames";

@Component({
  selector: 'app-add-user-issue-dialog',
  templateUrl: './add-user-issue-dialog.component.html',
  styleUrls: ['./add-user-issue-dialog.component.css']
})
export class AddUserIssueDialogComponent implements OnInit {

  selectedUsers: User[] = [];
  users: User[] = [];
  issueId: number = -1;

  constructor(public dialogRef: MatDialogRef<AddUserIssueDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogInput, private userService: UserService) {
    this.issueId = data.issueId;
  }

  ngOnInit(): void {
    this.userService.getUsersForIssue(RoleNames.SUPPORT, this.issueId).subscribe((data) => {
      this.users = data;
    });
  }

  onSendPressed() {
    let usersId: number[] = this.selectedUsers.map((user) => user.id);
    let reply: DialogReply = {
      toSend: true,
      usersId: usersId
    }
    this.dialogRef.close(reply);
  }
}

export interface DialogReply {
  toSend: boolean;
  usersId: number[];
}

export interface DialogInput {
  issueId: number
}
