import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  root: join(dirname(fileURLToPath(new URL(import.meta.url))), 'client'),
  plugins: [react()],
});
