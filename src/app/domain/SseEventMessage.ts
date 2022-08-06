export class SseEventMessage {
  event!: string
  data!: string;

  constructor(event: string, data: string) {
    this.event = event.replace('event:', '').replace('\ndata:', '');
    this.data = data;
  }
}
