import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: [
      'redux-persist',
      'redux-persist/lib/storage',
      'redux-persist/lib/storage/createWebStorage',
    ],
  },
  build: {
    commonjsOptions: {
      include: [/redux-persist/, /node_modules/],
    },
  },
})
