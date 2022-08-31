import {Injectable} from '@angular/core';
import {EventNotification} from "../domain/EventNotification";
import {EventType} from "../domain/EventType";
import {EventNotificationService} from "./event-notification.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: Map<string, EventNotification[]> = new Map<string, EventNotification[]>();
  allEventsCount: number = 0;

  constructor() {
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

  removeFromEventMap(destinationId: string, eventType: string) {
    if (this.events.size != 0) {
      this.allEventsCount -= this.events.get(this.getKeyFromDestinationAndEventType(destinationId, eventType))!.length;
      this.events.delete(this.getKeyFromDestinationAndEventType(destinationId, eventType))
    }
  }

  getAllEventsCount(): number {
    return this.allEventsCount;
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

  getEvents(): Map<string, EventNotification[]> {
    return this.events;
  }

  getChatEventsCount(channelId: string): number {
    let key = this.getKeyFromDestinationAndEventType(channelId, EventType.NEW_CHAT_MESSAGE.toString());
    if (this.events && this.events.has(key)) {
      return this.events.get(key)!.length;
    }
    return 0;
  }
}
