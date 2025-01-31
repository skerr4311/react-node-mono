import { Connection, InMemoryStorage } from './types';

// iru-cache
// The in-memory storage object
const memoryStore: InMemoryStorage = {
  connections: new Map(),
  families: new Map(),
  centres: new Map(),
};

export const getActiveConnectionsCount = () => memoryStore.connections.size;

/**
 * Adds a WebSocket connection and associates it with a family and a centre.
 */
export const addConnection = ({ familyId, centreId, uuid, webSocket }: Connection) => {
  const { connections, families, centres } = memoryStore;
  connections.set(uuid, webSocket);

  // Get or create the family record
  const family = families.get(familyId) ?? { uuidConnections: new Set(), notifications: [] };
  const centre = centres.get(centreId) ?? { uuidConnections: new Set(), sessions: [] };

  family.uuidConnections.add(uuid);
  centre.uuidConnections.add(uuid);

  if (!families.has(familyId)) families.set(familyId, family);
  if (!centres.has(centreId)) centres.set(centreId, centre);
};

/**
 * Removes a WebSocket connection and cleans up empty references.
 */
export const removeConnection = ({ familyId, centreId, uuid }: Omit<Connection, 'webSocket'>) => {
  const { connections, families, centres } = memoryStore;
  connections.delete(uuid);

  const family = families.get(familyId);
  const centre = centres.get(centreId);

  if (family) {
    family.uuidConnections.delete(uuid);
    if (family.uuidConnections.size === 0) families.delete(familyId); // Clean up empty families
  }

  if (centre) {
    centre.uuidConnections.delete(uuid);
    if (centre.uuidConnections.size === 0) centres.delete(centreId); // Clean up empty centres
  }
};

/**
 * Fetches sessions for a given centre.
 */
export const getCentreSessions = (centreId: string) => memoryStore.centres.get(centreId)?.sessions ?? [];

/**
 * Fetches notifications for a given family.
 */
export const getFamilyNotifications = (familyId: string) => memoryStore.families.get(familyId)?.notifications ?? [];

/**
 * todo: Add new notification.
 */

/**
 * todo: update centre cessions.
 */
