import {Component, ComponentRef, Input, OnInit, ViewChildren, ViewContainerRef} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChatInfo} from "../domain/ChatInfo";
import {MatSnackBar} from "@angular/material/snack-bar";

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
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getChatList();
  }

  private getChatList() {
    this.chatService.getChatList().subscribe(data => {
      this.chatList = data;
      this.filteredChatList = this.chatList;
      this.setChatFromParam();
    });
  }

  private setChatFromParam() {
    this.route.queryParamMap.subscribe(params => {
      if (params) {
        let paramChannelId = params.get("channelId")!;
        let chat = this.chatList.filter(chat => chat.channelId == paramChannelId)[0];
        this.setChannelAndIssueId(paramChannelId, chat.issueId);
      }
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
