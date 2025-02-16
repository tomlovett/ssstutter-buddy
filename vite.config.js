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
      '@': path.resolve(__dirname, './app/frontend'),
      components: path.resolve(__dirname, './app/frontend/components'),
      pages: path.resolve(__dirname, './app/frontend/pages'),
    },
  },
})
