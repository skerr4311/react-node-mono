import { DateTime } from 'luxon';
import { ApiProps } from '../types';
import { getActiveConnectionsCount } from '../../storage/memoryStorage';

export const registerStatusRoute = ({ fastify }: ApiProps) =>
  fastify.get('/api/status', async () => ({
    status: 'Server is running',
    timestamp: DateTime.now().toISO(),
    activeUsers: getActiveConnectionsCount(),
  }));
