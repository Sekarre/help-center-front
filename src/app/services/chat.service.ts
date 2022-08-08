import {Injectable} from '@angular/core';
import {Client, Message, Stomp} from '@stomp/stompjs';
// @ts-ignore
import SockJS from 'sockjs-client';
import {ChatMessage} from "../domain/ChatMessage";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ChatInfo} from "../domain/ChatInfo";
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private BASE_URL: string = environment.baseUrl + ApiPaths.Chat;

  constructor(private authService: AuthService,
              private httpClient: HttpClient) {
  }

   getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + this.authService.getToken()
    };
  }

  getChatList(): Observable<ChatInfo[]> {
    return this.httpClient.get<ChatInfo[]>(this.BASE_URL);
  }

  getChatMessages(channelId: string): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(this.BASE_URL + "/" + channelId);
  }

  joinChat(channelId: string): Observable<any> {
    return this.httpClient.patch<any>(this.BASE_URL + "/" + channelId, null);
  }

  createNewChat(): Observable<ChatInfo> {
    return this.httpClient.post<ChatInfo>(this.BASE_URL, JSON.stringify({}));
  }
}
