import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {AuthService} from "../services/auth.service";
import {EventMessagesService} from "../services/event-messages.service";
import {EventNotification} from "../domain/EventNotification";
import {Router} from "@angular/router";
import {EventNotificationPathResolver} from "../util/EventNotificationPathResolver";
import {EventNotificationMessageFactory} from "../util/EventNotificationMessageFactory";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private serverUrl: string = environment.baseUrl + ApiPaths.SSE;
  private source: EventSource | undefined;
  public events: Map<string, EventNotification[]> = new Map<string, EventNotification[]>();
  public allEventsCount: number = 0;

  constructor(private authService: AuthService,
              private eventMessagesService: EventMessagesService, private router: Router) { }

  ngOnInit(): void {
    this.connect();
    this.getAllUnreadEventNotifications();
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
      this.updateEventMap(eventMessage);
    });
  }

  disconnect() {
    console.log('SSe closed');
    this.source?.close();
  }

  getAllUnreadEventNotifications() {
    this.eventMessagesService.getAllUnreadEventNotifications().subscribe(data => {
      data.forEach(elem => this.updateEventMap(elem));
    });
  }


  parseEventJson(message: MessageEvent): EventNotification {
    let parsedJson = JSON.parse(message.data);
    return new EventNotification(parsedJson[0].data, parsedJson[1].data);
  }


  updateEventMap(eventMessage: EventNotification) {
    let eventNotifications = this.events.get(this.getKeyFromEventNotification(eventMessage));
    if (eventNotifications == undefined) {
      eventNotifications = [];
    }
    eventNotifications.push(eventMessage);
    this.allEventsCount++;
    this.events.set(this.getKeyFromEventNotification(eventMessage), eventNotifications);
  }

  navigateToDestination(destinationId: string, eventType: string) {
    this.eventMessagesService.markAsEventsRead(destinationId, eventType).subscribe((data) => {
      this.allEventsCount -= this.events.get(this.getKeyFromDestinationAndEventType(destinationId, eventType))!.length;
      this.events.delete(this.getKeyFromDestinationAndEventType(destinationId, eventType))
      this.router.navigateByUrl(EventNotificationPathResolver.resolvePathByEventTypeAndDestination(eventType, destinationId));
    });
  }

  isUserAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }

  getKeyFromEventNotification(eventNotification: EventNotification): string {
    return eventNotification.destinationId + ";" + eventNotification.eventType;
  }

  getKeyFromDestinationAndEventType(destinationId: string, eventType: string): string {
    return destinationId + ";" + eventType;
  }

  getDestinationIdFromMapKey(mapKey: string) {
    return mapKey.split(";")[0];
  }

  getEventTypeIdFromMapKey(mapKey: string) {
    return mapKey.split(";")[1];
  }

  getNotificationMessage(destinationId: string, eventType: string) {
    return EventNotificationMessageFactory.getEventNotificationMessage(destinationId, eventType);
  }
}
