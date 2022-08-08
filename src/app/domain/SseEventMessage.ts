export class SseEventMessage {
  event!: string
  data!: string;
  count!: number;

  constructor(event: string, data: string) {
    this.event = event.replace('event:', '').replace('\ndata:', '');
    this.data = data;
  }
}
