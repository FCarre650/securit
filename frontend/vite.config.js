import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
      port: 8080,
      open: true,
      host: true, // allows for external device connection on local network
      proxy: {
         // prevent CORS error in dev when backend and frontend servers run on different ports
         '^/socket.io/.*': {
            target: 'http://localhost:3000/',
            ws: true,
            secure: false,
            changeOrigin: true,
         },

      }
  },
})


