import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby' // unsure
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [RubyPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('./app/frontend'),
      components: path.resolve('./app/frontend/components'),
      '@ui': path.resolve('./app/frontend/components/ui'),
      pages: path.resolve('./app/frontend/pages'),
      '@tests': path.resolve('./app/frontend/__tests__'),
    },
  },
})
