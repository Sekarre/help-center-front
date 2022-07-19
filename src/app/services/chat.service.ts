import {Injectable} from '@angular/core';
import {Client, Message, Stomp} from '@stomp/stompjs';
// @ts-ignore
import SockJS from 'sockjs-client';
import {ChatMessage} from "../domain/ChatMessage";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public isConnected: boolean = false;
  public messages: ChatMessage[] = [];
  public stompClient: any;
  private channelId: string = "Test1";

  constructor(private authService: AuthService) {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/websocket';
    const ws = new SockJS(serverUrl, this.getAuthHeader());
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect(this.getAuthHeader(), (frame: any) => {
      this.isConnected = true;
      this.stompClient.subscribe('/room/private/' + this.channelId,  (message: any) => {
        if (message.body) {
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
}
