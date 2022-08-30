import {EventType} from "../domain/EventType";
import {EnumParser} from "./EnumParser";

export class EventNotificationPathResolver {

  public static resolvePathByEventTypeAndDestination(eventType: string, destinationId: string): string {
    const event: EventType = EnumParser.getEnumFromString(EventType, eventType);
    switch (event) {
      case EventType.CHAT_All:
        return '/chat/' + destinationId;
      case EventType.NEW_CHAT_MESSAGE:
        return '/chat-channels?channelId=' + destinationId;
      case EventType.REMOVED_FROM_CHAT:
        return '/issues';
      case EventType.ISSUE_ALL:
        return '/issues/';
      case EventType.NEW_ISSUE_COMMENT:
        return '/issues/' + destinationId;
      case EventType.NEW_ISSUE:
        return '/issues';
      case EventType.ASSIGNED_TO_ISSUE:
        return '/issues/' + destinationId;
    }
  }
}
