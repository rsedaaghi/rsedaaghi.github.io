import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Reza Sedaaghi Portfolio',
        short_name: 'Portfolio',
        description: 'Portfolio website of Reza Sedaaghi showcasing software development skills and experience.',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        registerType: 'autoUpdate',
        workbox: {
          // Increase allowed precache file size to 5 MB (5 * 1024 * 1024)
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        },
      },
    }),
  ],
})
