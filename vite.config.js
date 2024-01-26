import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base : 'https://todo-it-pi.vercel.app/',
  plugins: [react()],
})
