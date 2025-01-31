import { FastifyInstance } from 'fastify';

import { registerStatusRoute } from './status/routes';
import { registerSendNotificationRoute } from './sendNotification/routes';

export const registerApiRoutes = (fastify: FastifyInstance) => {
  registerStatusRoute({ fastify });
  registerSendNotificationRoute({ fastify });
};
