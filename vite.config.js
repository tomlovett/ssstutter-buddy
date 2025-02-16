import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby' // unsure
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [RubyPlugin(), react(), tailwindcss()],
})
