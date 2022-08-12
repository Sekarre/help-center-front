import {EventType} from "../domain/EventType";

export class EventNotificationMessageFactory {

  public static getEventNotificationMessage(destinationId: string, eventType: string): string {
    const event : EventType = (<any>EventType)[eventType];
    switch (event) {
      case EventType.CHAT:
        return 'New chat message on: ' + destinationId;
      case EventType.NEW_CHAT_MESSAGE:
        return 'New chat message on: ' + destinationId;
      case EventType.REMOVED_FROM_CHAT:
        return 'You have been removed from chat: ' + destinationId;
      case EventType.NEW_ISSUE_COMMENT:
        return 'New comment on issue: ' + destinationId;
    }
  }
}
