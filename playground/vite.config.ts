import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 源码级链接组件包：开发时改包源码即时热更新，无需先构建
      '@ao/admin-components': fileURLToPath(new URL('../src/index.ts', import.meta.url))
    }
  }
})
