import {EventType} from "../domain/EventType";

export class EventNotificationPathResolver {

  public static resolvePathByEventTypeAndDestination(eventType: string, destinationId: string): string {
    const event : EventType = (<any>EventType)[eventType];
    switch (event) {
      case EventType.CHAT:
        return '/chat/' + destinationId;
      case EventType.NEW_CHAT_MESSAGE:
        return '/chat/' + destinationId;
      case EventType.REMOVED_FROM_CHAT:
        return '/issues';
      case EventType.NEW_ISSUE_COMMENT:
        return '/issues/' + destinationId;
    }
  }
}
