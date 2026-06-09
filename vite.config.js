import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // You can safely remove the 'server' object if you want, 
  // but keeping it helps if you still develop locally!
})

// plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       '/auth': {
//         target: 'http://localhost:3000', // Changed 'localhost' to '127.0.0.1'
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   }