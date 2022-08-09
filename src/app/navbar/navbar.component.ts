import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {SseEventMessage} from "../domain/SseEventMessage";
import {AuthService} from "../services/auth.service";
import {EventMessagesService} from "../services/event-messages.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private serverUrl: string = environment.baseUrl + ApiPaths.SSE;
  private source: EventSource | undefined;
  public events: Map<string, SseEventMessage[]> = new Map<string, SseEventMessage[]>();
  public allEventsCount: number = 0;

  constructor(private authService: AuthService,
              private eventMessagesService: EventMessagesService) { }

  ngOnInit(): void {
    this.connect();
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  connect(): void {
    this.source = new EventSource(this.serverUrl + "?token=Bearer " + this.authService.getToken());
    console.log('Connecting to eventSource');
    this.source.addEventListener('message', message => {
      let eventMessage = this.parseEventJson(message);
      console.log(eventMessage);
      this.allEventsCount++;
      this.updateEventMap(eventMessage);
    });
  }

  disconnect() {
    console.log('SSe closed');
    this.source?.close();
  }

  parseEventJson(message: MessageEvent): SseEventMessage {
    let parsedJson = JSON.parse(message.data);
    return new SseEventMessage(parsedJson[0].data, parsedJson[1].data);
  }


  updateEventMap(eventMessage: SseEventMessage) {
    let sseEventMessages = this.events.get(eventMessage.data);
    if (sseEventMessages == undefined) {
      sseEventMessages = [];
    }
    sseEventMessages.push(eventMessage);
    this.events.set(eventMessage.data, sseEventMessages);
  }

  setEventAsRead(channelId: string) {
    this.eventMessagesService.markAsEventsRead(channelId).subscribe((data) => {
      this.allEventsCount -= this.events.get(channelId)!.length;
      this.events.delete(channelId)}
    );
  }
}
