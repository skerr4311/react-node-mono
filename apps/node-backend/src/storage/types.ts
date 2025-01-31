import { WebSocket } from 'ws';

type Uuid = string;
type FamilyId = string;
type CentreId = string;

export interface FamilyLevelProps {
  uuidConnections: Set<Uuid>; // WebSocket UUIDs belonging to this family
  notifications: Notification[];
  // add more props child sessions, makeup lesson count ect...
}

export interface CentreLevelProps {
  uuidConnections: Set<Uuid>; // WebSocket UUIDs belonging to this centre
  sessions: Session[];
  // add more centre contact details....
}

export interface InMemoryStorage {
  connections: Map<Uuid, WebSocket>; // Store WebSocket + IDs
  families: Map<FamilyId, FamilyLevelProps>;
  centres: Map<CentreId, CentreLevelProps>;
}

// todo: use notification object from open api
interface Notification {
  id: string;
  message: string;
  centre_id?: string;
  createdAt: Date;
}

// todo: use sessions object from open api
interface Session {
  id: string;
  startTime: Date;
  endTime: Date;
  availableSlots: number;
}

export interface Connection {
  familyId: FamilyId;
  centreId: CentreId;
  uuid: Uuid;
  webSocket: WebSocket;
}
