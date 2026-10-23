import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Sitio de usuario de GitHub Pages (GiacoboniConstanza.github.io): base '/'
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
