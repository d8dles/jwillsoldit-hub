import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// JWILLSOLDIT root hub — static build, no backend, no API routes.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2019',
    assetsInlineLimit: 2048,
  },
});
