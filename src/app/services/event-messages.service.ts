import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {Observable} from "rxjs";
import {EventNotification} from "../domain/EventNotification";

@Injectable({
  providedIn: 'root'
})
export class EventMessagesService {

  EVENT_MESSAGE_URL = environment.baseUrl + ApiPaths.EventMessages;

  constructor(private authService: AuthService,
              private httpClient: HttpClient) { }

  markAsEventsRead(channelId: string, eventType: string): Observable<any> {
  let params = new HttpParams().set('eventType', eventType);

  return this.httpClient.patch(this.EVENT_MESSAGE_URL + '/' + channelId, JSON.stringify({}), {params: params});
  }

  getAllUnreadEventNotifications(): Observable<EventNotification[]>  {
    return this.httpClient.get<EventNotification[]>(this.EVENT_MESSAGE_URL);
  }
}
