import { TestBed } from '@angular/core/testing';

import { EventNotificationListenerService } from './event-notification-listener.service';

describe('EventNotificationService', () => {
  let service: EventNotificationListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventNotificationListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
