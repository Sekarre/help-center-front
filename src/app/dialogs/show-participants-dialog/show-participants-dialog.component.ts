import {Component, Inject, OnInit} from '@angular/core';
import {ChatMessage} from "../../domain/ChatMessage";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChatService} from "../../services/chat.service";
import {IssueService} from "../../services/issue.service";
import {User} from "../../domain/User";

@Component({
  selector: 'app-show-participants-dialog',
  templateUrl: './show-participants-dialog.component.html',
  styleUrls: ['./show-participants-dialog.component.css']
})
export class ShowParticipantsDialogComponent implements OnInit {

  public participants!: User[];
  public issueId: number = -1;

  constructor( public dialogRef: MatDialogRef<ShowParticipantsDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private issueService: IssueService) { }

  ngOnInit(): void {
    this.issueId = this.data.issueId;
    this.getIssueParticipants();
  }

  getIssueParticipants() {
    this.issueService.getIssueParticipants(this.issueId).subscribe((data) => this.participants = data);
  }
}

export interface DialogData {
  issueId: number
}

