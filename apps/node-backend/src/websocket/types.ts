import { FastifyInstance } from 'fastify';
import { WebSocket } from 'ws';

export interface WebSocketProps {
  ws: WebSocket;
  fastify: FastifyInstance;
}

export interface UserDetailsProps {
  centreId: string;
  familyId: string;
  uuid: string;
}

export type ConnectionDetails = WebSocketProps & UserDetailsProps;
