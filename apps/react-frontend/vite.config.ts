/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig((configEnv) => {
  const env = loadEnv(configEnv.mode, process.cwd(), '');

  // comment to force redeploy
  const define = ['ENVIRONMENT', 'API_ENDPOINT'].reduce((acc: Record<string, string | undefined>, envVar) => {
    acc[`import.meta.env.${envVar}`] = JSON.stringify(env?.[envVar]);
    return acc;
  }, {});

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/react-frontend',

    server: {
      port: 3003,
      host: 'localhost',
    },

    preview: {
      port: 3004,
      host: 'localhost',
    },

    plugins: [react(), nxViteTsPaths()],

    define,
  };
});
