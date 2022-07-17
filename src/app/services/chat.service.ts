import { Injectable } from '@angular/core';
import { Client, Message, Stomp } from '@stomp/stompjs';
// @ts-ignore
import SockJS from 'sockjs-client';
import {ChatMessage} from "../domain/ChatMessage";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public isConnected: boolean = false;
  public messages: ChatMessage[] = [];
  public stompClient: any;
  private channelId: string = "Test1";

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame: any) => {
      this.isConnected = true;
      this.stompClient.subscribe('/room/private/' + this.channelId, (message: any) => {
        if (message.body) {
          let parsedMessage: ChatMessage = <ChatMessage>JSON.parse(message.body);
          this.messages.push(parsedMessage);
        }
      });
    });
  }

  sendMessage(message: string) {
    this.stompClient.send('/chat-app/private-chat-room/' + this.channelId, {}, JSON.stringify({'message': message}));
  }
}
