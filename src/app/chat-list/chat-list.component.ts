import { Component, OnInit } from '@angular/core';
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  chatList: string[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getChatList().subscribe(data => this.chatList = data);
  }



}
