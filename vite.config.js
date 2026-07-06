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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/react-router')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/@mui/')) {
            return 'vendor-mui'
          }
          if (id.includes('node_modules/@reduxjs/') || id.includes('node_modules/react-redux') || id.includes('node_modules/redux-persist')) {
            return 'vendor-redux'
          }
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) {
            return 'vendor-charts'
          }
          if (id.includes('node_modules/jspdf')) {
            return 'vendor-pdf'
          }
        },
      },
    },
  },
})
