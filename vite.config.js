import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby' // unsure
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [RubyPlugin()],
  // plugins: [RubyPlugin(), react()],
  // esbuild: {
  //   jsxInject: `import React from 'react'`,
  // },
})
