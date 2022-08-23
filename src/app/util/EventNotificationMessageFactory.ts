import {EventType} from "../domain/EventType";
import {EnumParser} from "./EnumParser";

export class EventNotificationMessageFactory {

  public static getEventNotificationMessage(destinationId: string, eventType: string): string {
    const event: EventType = EnumParser.getEnumFromString(EventType, eventType);
    switch (event) {
      case EventType.CHAT_All:
        return 'New chat message on: ' + destinationId;
      case EventType.NEW_CHAT_MESSAGE:
        return 'New chat message on: ' + destinationId;
      case EventType.REMOVED_FROM_CHAT:
        return 'You have been removed from chat: ' + destinationId;
      case EventType.ISSUE_ALL:
        return 'New issues';
      case EventType.NEW_ISSUE_COMMENT:
        return 'New comment on issue: ' + destinationId;
      case EventType.NEW_ISSUE:
        return 'New issues has been added';
      case EventType.ASSIGNED_TO_ISSUE:
        return 'New issue assigned to you';
    }
  }
}
