/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Heavy viz libs (~5 MB) — split out so they don't bloat
          // every chapter chunk that imports any chart.
          apex: ['apexcharts', 'react-apexcharts'],
          // Animation lib used everywhere — share one chunk.
          framer: ['framer-motion'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        // Non-opaque origin required for jsdom to expose localStorage.
        url: 'http://localhost:3001/',
      },
    },
    include: ['src/**/*.test.{js,jsx}'],
    globals: false,
  },
})
