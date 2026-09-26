import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Cuando se despliega en GitHub Pages, el sitio vive en /rym-calculadora-benny/
// En Vercel (o local) se sirve desde la raíz.
// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/rym-calculadora-benny/' : '/',
  plugins: [react()],
})
