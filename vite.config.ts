import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.vue'],
      outDir: 'dist',
      tsconfigPath: './tsconfig.json'
    })
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'index'
    },
    outDir: 'dist',
    cssCodeSplit: false,
    rollupOptions: {
      external: [
        'vue',
        'pinia',
        'vue-i18n',
        '@vueuse/core',
        '@element-plus/icons-vue',
        '@iconify/vue',
        'xlsx',
        'file-saver',
        'vue-draggable-plus',
        /^element-plus($|\/)/
      ]
    }
  }
})
