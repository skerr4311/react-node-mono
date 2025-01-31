import { v4 as uuidv4 } from 'uuid';

import { WebSocketProps } from '../types';
import { webSocketError } from '../util/webSocketError';
import { ConnectQuerySchema } from './types';

interface ConnectProps extends WebSocketProps {
  query: Record<string, unknown>;
}

export const onConnect = ({ query, ws }: ConnectProps) => {
  // run checks on the connection.
  const check = ConnectQuerySchema.safeParse(query);

  if (!check.success) {
    webSocketError({ ws, errorKey: 'MISSING_PARAMETERS', shouldCloseConnection: true });
    return;
  }
  const uuid = uuidv4();

  // Send pings to connected user
  const pingInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.ping();
    }
  }, 24000);

  return { uuid, centreId: check.data.centre_id, familyId: check.data.family_id, pingInterval };
};
