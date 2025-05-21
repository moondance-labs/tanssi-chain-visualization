import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['c69e-2a02-a312-c292-f100-45ca-a6d3-5306-21cb.ngrok-free.app'],
  },
});
