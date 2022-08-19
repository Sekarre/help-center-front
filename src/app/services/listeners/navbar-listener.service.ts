import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {EventType} from "../../domain/EventType";
import {DestinationWithEvent} from "../../domain/helper/DestinationWithEvent";

@Injectable({
  providedIn: 'root'
})
export class NavbarListenerService {

  private newEvent = new Subject<DestinationWithEvent>();

  constructor() { }

  setNavbarRemoveNotifications(destinationId: string, eventType: EventType) {
    this.newEvent.next({destinationId: destinationId, eventType: eventType});
  }

  getNavbarRemoveNotificationsCalls() : Observable<DestinationWithEvent>{
    return this.newEvent.asObservable();
  }
}

