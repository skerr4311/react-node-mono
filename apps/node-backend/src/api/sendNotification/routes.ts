import { ApiProps } from '../types';

export const registerSendNotificationRoute = ({ fastify }: ApiProps) =>
  fastify.post('/api/send-notification', async (request, reply) => {
    //todo: use zod for type safety
    const { message } = request.body as { message: string };

    if (!message) reply.status(400).send({ error: 'Message is required' });

    // todo: send to specific user id
    // find all ws connections and run ws.send for each one

    return reply.status(200).send({ message: `object sent to all users with family_id: ${1234}` });
  });
