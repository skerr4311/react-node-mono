import { z } from 'zod';

export const Config = z.object({
  // App
  environment: z.string(),
  apiEndpoint: z.string(),
});

export type Config = z.infer<typeof Config>;

export function getConfig(data: Record<string, string | undefined>): Config {
  const config = {
    // App
    environment: data.ENVIRONMENT ?? 'development',
    apiEndpoint: data.API_ENDPOINT ?? 'http"//localhost:4000',
  };

  try {
    return Config.parse(config);
  } catch (e: unknown) {
    const error = e as Error;
    let message = error.message;
    if (error.stack) {
      message = JSON.stringify(error.stack, null, 2);
    }
    throw new Error(`Failed to load config: ${message}`);
  }
}
