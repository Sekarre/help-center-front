import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {ChatMessage} from "../domain/ChatMessage";
// @ts-ignore
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import {botId} from "../constants/Properties";
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public input: any;
  @ViewChild('content') content!: ElementRef;
  @ViewChildren('messagesTracker') messagesTracker!: QueryList<any>;
  private isConnected: boolean = false;
  public messages: ChatMessage[] = [];
  private stompClient: any;
  private channelId: string = "";
  private serverUrl: string = environment.baseUrl + ApiPaths.WebSocket;
  private fileBase64!: string | ArrayBuffer | null;

  constructor(public chatService: ChatService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.channelId = String(params.get('channelId'));
      this.subscribeToRouterEvents();
      this.initializeWebSocketConnection();
      this.loadAllMessages();
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
    this.messagesTracker.changes.subscribe(this.scrollToBottom);
  }

  ngOnDestroy(): void {
    console.log('Disconnected');
    this.disconnectStomp();
  }

  initializeWebSocketConnection() {
    this.stompClient = Stomp.over(() => {
      return new SockJS(this.serverUrl, this.chatService.getAuthHeader());
    });
    this.stompClient.debug = () => {};
    this.stompClient.reconnect_delay = 5000;
    this.stompClient.connect(this.chatService.getAuthHeader(), (frame: any) => {
      this.isConnected = true;
      this.stompClient.subscribe(ApiPaths.WebSocketSubscribe + this.channelId, (message: any) => {
        if (message.body) {
          let parsedMessage: ChatMessage = <ChatMessage>JSON.parse(message.body);
          this.messages.push(parsedMessage);
        }
      });
    });
  }

  loadAllMessages() {
    this.chatService.getChatMessages(this.channelId).subscribe(data => {
      this.messages = data;
    });
  }

  getAndSendMessage() {
    if (this.input || this.fileBase64) {
      this.sendMessage(this.input);
      this.input = '';
    }
  }

  sendMessage(message: string) {
    let content = JSON.stringify({'message': message, 'file': this.fileBase64});
    this.stompClient.send(ApiPaths.WebSocketSend + this.channelId, {}, content);
    this.fileBase64 = null;
  }

  scrollToBottom = () => {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  checkIfBotMessage(senderId: number) {
    return senderId == botId;
  }


  onChange(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileBase64 = reader.result;
    };
  }

  subscribeToRouterEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.disconnectStomp();
      }
    })
  }

  private disconnectStomp() {
    this.stompClient.disconnect();
    this.isConnected = false;
  }
}
