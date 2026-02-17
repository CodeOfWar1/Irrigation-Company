import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Vite config for existing CRA-style React 17 app (JSX in .js files)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // Ensure JSX is handled correctly in .js files during dev/build and dependency scanning
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});


