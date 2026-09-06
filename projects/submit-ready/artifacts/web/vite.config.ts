import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://dsdevsingh556-png.github.io/Opus-Zero/
export default defineConfig({
  plugins: [react()],
  base: '/Opus-Zero/',
})
