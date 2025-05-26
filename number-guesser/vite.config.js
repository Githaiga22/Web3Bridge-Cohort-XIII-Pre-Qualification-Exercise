import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true, // or '0.0.0.0'
    port: 4173,
    allowedHosts: ['web3bridge-cohort-xiii-pre-qualification.onrender.com']
  }
})
