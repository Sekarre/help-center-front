import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {Observable} from "rxjs";
import {EventNotification} from "../domain/EventNotification";
import {EventType} from "../domain/EventType";

@Injectable({
  providedIn: 'root'
})
export class EventNotificationService {

  EVENT_MESSAGE_URL = environment.baseUrl + ApiPaths.EventMessages;

  constructor(private authService: AuthService,
              private httpClient: HttpClient) { }

  markEventNotificationAsRead(destinationId: string, eventType: string): Observable<any> {
  let params = new HttpParams().set('eventType', eventType);

  return this.httpClient.patch(this.EVENT_MESSAGE_URL + '/' + destinationId, JSON.stringify({}), {params: params});
  }

  getAllUnreadEventNotifications(): Observable<EventNotification[]>  {
    return this.httpClient.get<EventNotification[]>(this.EVENT_MESSAGE_URL);
  }

  getEventNotificationCount(destinationId: string, eventType: EventType): Observable<number> {
    let params = new HttpParams().set('eventType', eventType);
    return this.httpClient.get<number>(this.EVENT_MESSAGE_URL + "/" + destinationId + "/count", {params: params})
  }
}
