import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventMessagesService {

  EVENT_MESSAGE_URL = environment.baseUrl + ApiPaths.EventMessages;

  constructor(private authService: AuthService,
              private httpClient: HttpClient) { }

  markAsEventsRead(channelId: string): Observable<any> {
    return this.httpClient.patch(this.EVENT_MESSAGE_URL + '/' + channelId, JSON.stringify({}));
  }
}
