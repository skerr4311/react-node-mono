import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';

import { registerWebSocketRoutes } from './websocket';
import { registerApiRoutes } from './api';

// Create Fastify instance
const fastify = Fastify({ logger: true });

// Register WebSocket plugin
fastify.register(fastifyWebsocket);

// Register Routes
registerWebSocketRoutes(fastify);
registerApiRoutes(fastify);

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info(`Server is running on http://localhost:3000`);
    fastify.log.info(`WebSocket is running on ws://localhost:3000/ws`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
