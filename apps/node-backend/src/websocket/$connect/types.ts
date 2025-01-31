import { z } from 'zod';

export const ConnectQuerySchema = z.object({
  centre_id: z.string(),
  family_id: z.string(),
});
