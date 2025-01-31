import { FastifyInstance } from 'fastify';

// todo: socketio for ping / pong

// Websocket routes
import { onConnect } from './$connect/service';
import { onDisconnect } from './$disconnect/routes';
import { onMessageReceived } from './receiveMessage/routes';
import { addConnection } from '../storage/memoryStorage';

export const registerWebSocketRoutes = (fastify: FastifyInstance) =>
  fastify.register(async (fastify) => {
    fastify.get('/ws', { websocket: true }, (connection, req) => {
      const webSocketProps = { ws: connection, fastify };
      const userConnectionDetails = onConnect({ query: req.query as Record<string, unknown>, ...webSocketProps });

      if (!userConnectionDetails) return;

      addConnection({ ...userConnectionDetails, webSocket: connection });

      const connectionDetails = { ...webSocketProps, ...userConnectionDetails };

      // Register events
      onDisconnect(connectionDetails);
      onMessageReceived(connectionDetails);
    });
  });
