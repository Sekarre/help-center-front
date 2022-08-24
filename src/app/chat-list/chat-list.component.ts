import {Component, OnInit} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {Router} from "@angular/router";
import {ChatInfo} from "../domain/ChatInfo";
import {MatSnackBar} from "@angular/material/snack-bar";
import {snackBarDuration} from "../constants/Properties";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  chatList: ChatInfo[] = [];

  constructor(private chatService: ChatService, private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.chatService.getChatList().subscribe(data => this.chatList = data);
  }

  createNewChat() {
    this.chatService.createNewChat().subscribe(data => {
      this.chatList.push(data);
    }, error => {
        this.snackBar.open('Couldn\'t load issues, try again later.', 'Ok', {
          duration: snackBarDuration
        });
      }
    )
  }

  joinChat(channelId: string) {
    this.chatService.joinChat(channelId).subscribe(data => {
      this.router.navigateByUrl('/chat/' + channelId);
    });
  }
}
