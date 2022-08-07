import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {AuthService} from "../services/auth.service";
import {SseEventMessage} from "../domain/SseEventMessage";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  private serverUrl: string = environment.baseUrl + ApiPaths.SSE;
  private source: EventSource | undefined;
  public events: SseEventMessage[] = [];

  constructor(private authService: AuthService) { }

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
      this.events.push(eventMessage)
    });
  }

  disconnect() {
    console.log('SSe closed');
    this.source?.close();
  }

  parseEventJson(message: MessageEvent): SseEventMessage {
    console.log('parsing json');
    let parsedJson = JSON.parse(message.data);
    return new SseEventMessage(parsedJson[0].data, parsedJson[1].data);
  }
}

