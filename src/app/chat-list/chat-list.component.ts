import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {Router} from "@angular/router";
import {ChatInfo} from "../domain/ChatInfo";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  chatList: ChatInfo[] = [];

  constructor(private chatService: ChatService,
              private router: Router) { }

  ngOnInit(): void {
    this.chatService.getChatList().subscribe(data => this.chatList = data);
  }

  createNewChat() {
    this.chatService.createNewChat().subscribe(data => {
      this.chatList.push(data);
    } )
  }

  joinChat(channelId: string) {
    this.chatService.joinChat(channelId).subscribe(data => {
      this.router.navigateByUrl('/chat/' + channelId);
    });
  }
}
