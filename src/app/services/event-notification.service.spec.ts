import { TestBed } from '@angular/core/testing';

import { EventNotificationService } from './event-notification.service';

describe('EventMessagesService', () => {
  let service: EventNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
