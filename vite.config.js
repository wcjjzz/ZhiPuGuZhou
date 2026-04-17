import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages 仓库部署配置
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/ZhiPuGuZhou/',
})
