import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base defaults to "/" for local dev; OAP sets VITE_BASE_URL at build time so
// the app resolves correctly when served from a subpath.
export default defineConfig({
  base: process.env.VITE_BASE_URL ?? '/',
  plugins: [react(), tailwindcss()],
})
