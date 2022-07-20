import {Injectable} from '@angular/core';
import {Client, Message, Stomp} from '@stomp/stompjs';
// @ts-ignore
import SockJS from 'sockjs-client';
import {ChatMessage} from "../domain/ChatMessage";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public isConnected: boolean = false;
  public messages: ChatMessage[] = [];
  public stompClient: any;
  private channelId: string = "";
  private BASE_URL: string = "http://localhost:8080/api/v1/chat-info";
  private serverUrl: string = 'http://localhost:8080/websocket';

  constructor(private authService: AuthService,
              private httpClient: HttpClient) {
  }


  initializeWebSocketConnection(channelId: string) {
    this.channelId = channelId;
    const ws = new SockJS(this.serverUrl, this.getAuthHeader());
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect(this.getAuthHeader(), (frame: any) => {
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

  private getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + this.authService.getToken()
    };
  }

  sendMessage(message: string) {
    this.stompClient.send('/chat-app/private-chat-room/' + this.channelId, {}, JSON.stringify({'message': message}));
  }

  getChatList(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.BASE_URL);
  }
}
