import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChatService} from "../../services/chat.service";
import {ChatMessage} from "../../domain/ChatMessage";

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  public chatMessages!: ChatMessage[];
  public channelId: string = "";

  constructor( public dialogRef: MatDialogRef<ChatDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private chatService: ChatService) { }

  ngOnInit(): void {
    this.channelId = this.data.channelId;
    this.getChatLogs();
  }

  getChatLogs() {
    this.chatService.getChatMessages(this.channelId).subscribe((data) => this.chatMessages = data);
  }
}

export interface DialogData {
  channelId: string
}
