import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {EventType} from "../../domain/EventType";

@Injectable({
  providedIn: 'root'
})
export class EventNotificationListenerService {

  private newEvent = new Subject<EventType>();

  constructor() { }


  setEventNotification(value: EventType) {
    this.newEvent.next(value);
  }

  getEventNotification() : Observable<EventType>{
    return this.newEvent.asObservable();
  }
}
