export enum ApiPaths {
  Chat = '/api/v1/chat-info',
  Auth = '/api/v1/auth/login',
  Issues = '/api/v1/issues',
  Comments = '/api/v1/comments',
  Users = '/api/v1/users',
  SSE = '/api/v1/sse/events',
  EventMessages = '/api/v1/event-notifications',
  WebSocket = '/websocket',
  WebSocketSubscribe = '/topic/private.',
  WebSocketErrorsSubscribe = '/user/topic/private.errors',
  WebSocketSend = '/app/private-chat-room.',
}
