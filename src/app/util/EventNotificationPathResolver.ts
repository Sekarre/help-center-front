import {EventType} from "../domain/EventType";
import {EnumParser} from "./EnumParser";

export class EventNotificationPathResolver {

  public static resolvePathByEventTypeAndDestination(eventType: string, destinationId: string): string {
    const event : EventType = EnumParser.getEnumFromString(EventType, eventType);
    switch (event) {
      case EventType.CHAT:
        return '/chat/' + destinationId;
      case EventType.NEW_CHAT_MESSAGE:
        return '/chat/' + destinationId;
      case EventType.REMOVED_FROM_CHAT:
        return '/issues';
      case EventType.NEW_ISSUE_COMMENT:
        return '/issues/' + destinationId;
      case EventType.NEW_ISSUE:
        return '/issues';
    }
  }
}