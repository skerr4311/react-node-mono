import { removeConnection } from '../../storage/memoryStorage';
import { ConnectionDetails } from '../types';

export const onDisconnect = ({
  ws,
  fastify,
  ...userConnectionDetails
}: ConnectionDetails & { pingInterval: NodeJS.Timer }) =>
  ws.on('close', () => {
    const { pingInterval, ...userDetails } = userConnectionDetails;
    removeConnection(userDetails);
    clearInterval(pingInterval);
    fastify.log.info(`Client disconnected: ${userConnectionDetails.uuid}`);
  });
