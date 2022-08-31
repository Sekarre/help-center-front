import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {ApiPaths} from "../ApiPaths";
import {AuthService} from "../services/auth.service";
import {EventNotificationService} from "../services/event-notification.service";
import {EventNotification} from "../domain/EventNotification";
import {Router} from "@angular/router";
import {EventNotificationPathResolver} from "../util/EventNotificationPathResolver";
import {EventNotificationMessageFactory} from "../util/EventNotificationMessageFactory";
import {EventNotificationListenerService} from "../services/listeners/event-notification-listener.service";
import {EventType} from "../domain/EventType";
import {EnumParser} from "../util/EnumParser";
import {NavbarListenerService} from "../services/listeners/navbar-listener.service";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private serverUrl: string = environment.baseUrl + ApiPaths.SSE;
  private source: EventSource | undefined;
  public allEventsCount: number = 0;
  public roles: string[] = []
  public username: string = ""

  constructor(private authService: AuthService, private eventNotificationListenerService: EventNotificationListenerService,
              private eventNotificationService: EventNotificationService, private navbarListenerService: NavbarListenerService,
              public eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.connect();
    this.getAllUnreadEventNotifications();
    this.roles = this.authService.getRoles();
    this.username = this.authService.getUsername();
    this.listenToNavbarReloadCalls();
  }

  private listenToNavbarReloadCalls() {
    this.navbarListenerService.getNavbarRemoveNotificationsCalls().subscribe((data) => {
      if (data) {
        this.removeFromEventMap(data.destinationId, data.eventType);
      }
    });
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  connect(): void {
    this.source = new EventSource(this.serverUrl + "?token=Bearer " + this.authService.getToken());
    console.log('Connecting to event source');
    this.source.addEventListener('message', message => {
      let eventNotification = this.parseEventJson(message);
      this.updateEventMap(eventNotification);
      this.eventNotificationListenerService.setEventNotification(EnumParser.getEnumFromString(EventType, eventNotification.eventType));
    });
  }

  disconnect() {
    console.log('SSe closed');
    this.source?.close();
  }

  getAllUnreadEventNotifications() {
    this.eventNotificationService.getAllUnreadEventNotifications().subscribe(data => {
      data.forEach(elem => this.updateEventMap(elem));
    });
  }

  parseEventJson(message: MessageEvent): EventNotification {
    let parsedJson = JSON.parse(message.data);
    return new EventNotification(parsedJson[0].data, parsedJson[1].data);
  }

  updateEventMap(eventMessage: EventNotification) {
    this.eventService.updateEventMap(eventMessage);
    this.allEventsCount = this.eventService.getAllEventsCount();
  }

  navigateToDestination(destinationId: string, eventType: string) {
    this.eventNotificationService.markEventNotificationAsRead(destinationId, eventType).subscribe(() => {
      this.removeFromEventMap(destinationId, eventType);
      this.router.navigateByUrl(EventNotificationPathResolver.resolvePathByEventTypeAndDestination(eventType, destinationId));
    });
  }

  private removeFromEventMap(destinationId: string, eventType: string) {
    this.eventService.removeFromEventMap(destinationId, eventType);
    this.allEventsCount = this.eventService.getAllEventsCount();
  }

  isUserAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }


  getNotificationMessage(destinationId: string, eventType: string) {
    return EventNotificationMessageFactory.getEventNotificationMessage(destinationId, eventType);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
