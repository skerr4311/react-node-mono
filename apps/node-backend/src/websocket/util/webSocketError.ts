import { WebSocket } from 'ws';

interface WebSocketError {
  ws: WebSocket;
  errorKey: keyof typeof WebSocketErrors;
  shouldCloseConnection?: boolean;
}

const WebSocketErrors = {
  MISSING_PARAMETERS: 'Missing required query parameters: family_id and centre_id',
  UNAUTHORIZED: 'Unauthorized connection',
  INVALID_MESSAGE: 'Invalid message format',
};

export const webSocketError = ({ ws, errorKey, shouldCloseConnection }: WebSocketError) => {
  ws.send(JSON.stringify({ error: WebSocketErrors[errorKey] }));
  if (shouldCloseConnection) ws.close(1008, 'Policy Violation');
};
