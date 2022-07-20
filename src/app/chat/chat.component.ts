import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {ActivatedRoute} from "@angular/router";
import {ChatMessage} from "../domain/ChatMessage";
// @ts-ignore
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  input: any;
  @ViewChild('content') content!: ElementRef;
  @ViewChildren('messagesTracker') messagessTracker!: QueryList<any>;
  private isConnected: boolean = false;
  public messages: ChatMessage[] = [];
  private stompClient: any;
  private channelId: string = "";
  private serverUrl: string = 'http://localhost:8080/websocket';

  constructor(public chatService: ChatService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params);
      this.initializeWebSocketConnection(String(params.get('channelId')));
    })
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messagessTracker.changes.subscribe(this.scrollToBottom);
  }

  initializeWebSocketConnection(channelId: string) {
    this.channelId = channelId;
    const ws = new SockJS(this.serverUrl, this.chatService.getAuthHeader());
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect(this.chatService.getAuthHeader(), (frame: any) => {
      this.isConnected = true;
      this.stompClient.subscribe('/room/private/' + this.channelId,  (message: any) => {
        if (message.body) {
          console.log(this.messages);
          let parsedMessage: ChatMessage = <ChatMessage>JSON.parse(message.body);
          this.messages.push(parsedMessage);
        }
      });
    });
  }

  getAndSendMessage() {
    if (this.input) {
      this.sendMessage(this.input);
      this.input = '';
    }
  }

  sendMessage(message: string) {
    this.stompClient.send('/chat-app/private-chat-room/' + this.channelId, {}, JSON.stringify({'message': message}));
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
