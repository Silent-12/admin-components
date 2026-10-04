import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const pkg = JSON.parse(readFileSync('../package.json', 'utf-8'))

export default defineConfig({
  plugins: [vue()],
  define: {
    // 包源码里的 version.ts 依赖该常量，源码链接开发时同样需要注入
    __VERSION__: JSON.stringify(pkg.version)
  },
  resolve: {
    alias: {
      // 源码级链接组件包：开发时改包源码即时热更新，无需先构建
      '@ao/admin-components': fileURLToPath(new URL('../src/index.ts', import.meta.url))
    }
  }
})
