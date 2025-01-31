import { ConnectionDetails } from '../types';

/**
 * @intent
 * this can be an object the user sends back.
 * "marking an absence"
 * "booking a makeup"
 * "read a notification"
 * we can then keep track of these changes in internal memory and update sessions as needed
 */

export const onMessageReceived = ({ ws, fastify }: ConnectionDetails) =>
  ws.on('message', (message) => {
    fastify.log.info(`Message received: ${message}`);
  });
