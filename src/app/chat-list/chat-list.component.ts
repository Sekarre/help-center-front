import {Component, ComponentRef, Input, OnInit, ViewChildren, ViewContainerRef} from '@angular/core';
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
  filteredChatList: ChatInfo[] = [];
  public channelId: string = '';
  public issueId: number = -1;
  public showChat: boolean = false;
  public selectedChannelId: string = '';
  public searchText: string = '';

  @ViewChildren('chat', {read: ViewContainerRef}) ref!: ViewContainerRef;
  private componentRef!: ComponentRef<any>;

  constructor(private chatService: ChatService, private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.chatService.getChatList().subscribe(data => {
      this.chatList = data;
      this.filteredChatList = this.chatList;
    });
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

  setChannelAndIssueId(channelId: string, issueId: number) {
    this.channelId = channelId;
    this.issueId = issueId;
    this.showChat = false;
    this.selectedChannelId = channelId;
    setTimeout(() => {
      this.showChat = true
    }, 100);
  }

  destroyStickyChat() {
    this.showChat = false;
  }

  filterChats(event: KeyboardEvent) {
    if (this.chatList && this.searchText != '') {
      this.filteredChatList = this.chatList.filter(x => x.channelName.toLowerCase().includes(this.searchText.toLowerCase().toLowerCase()));
    } else if (this.searchText == '') {
      this.filteredChatList = this.chatList;
    }
  }
}
