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

  private BASE_URL: string = "http://localhost:8080/api/v1/chat-info";

  constructor(private authService: AuthService,
              private httpClient: HttpClient) {
  }

   getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + this.authService.getToken()
    };
  }

  getChatList(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.BASE_URL);
  }
}
