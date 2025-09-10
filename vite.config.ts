import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: './',
  root: './',
  build: {
    outDir: './dist',
    emptyOutDir: true, // Clean the output directory before each build
  },
})
