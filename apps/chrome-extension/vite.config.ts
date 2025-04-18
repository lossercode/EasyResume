import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import DevPreview from './plugins/dev-preview'; // Import the custo
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), DevPreview()],
  build: {
    emptyOutDir: true, // Clear the output directory before building
    sourcemap: false, // Generate source maps for debugging
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'), // Specify the entry point for the index// Specify the entry point for the index
        worker: path.resolve(__dirname, 'src/scripts/worker.ts'), // Specify the entry point for the worker
        content: path.resolve(__dirname, 'src/scripts/content.ts'), // Specify the entry point for the content
      },
      output: {
        /**index单独成包 */
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'index'
            ? 'assets/[name].js'
            : 'scripts/[name].js';
        },
        chunkFileNames: 'assets/[name].js', // Use the chunk name as the output file name
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
});
