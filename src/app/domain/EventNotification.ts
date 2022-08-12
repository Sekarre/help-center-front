export class EventNotification {
  eventType: string;
  destinationId: string;

  constructor(event: string, data: string) {
    this.eventType = event.replace('event:', '').replace('\ndata:', '');
    this.destinationId = data;
  }
}
