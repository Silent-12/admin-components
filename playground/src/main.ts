import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { AdminComponents } from '@ao/admin-components'
import 'element-plus/dist/index.css'
import '@ao/admin-layout/styles.css'
import './style.scss'
import App from './App.vue'

/**
 * 预览用的默认 logo（内联 SVG data URI）
 * @description 模拟宿主通过 install 的 assets.logo 注入品牌资源，
 * AoLogo 未显式传 src 时即使用该地址。
 */
const LOGO_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23409eff'/%3E%3Ctext x='16' y='22' font-size='15' font-family='sans-serif' text-anchor='middle' fill='%23fff'%3EAo%3C/text%3E%3C/svg%3E"

const app = createApp(App)
const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: { zh: {}, en: {} }
})

// 包内 table store 声明了 persist，宿主需注册持久化插件才会写入 localStorage
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(i18n)
app.use(ElementPlus, { locale: zhCn })
app.use(AdminComponents, {
  // 模拟宿主注入：实际项目中从 user store 读取 info.auth
  i18n,
  getAuthList: () => ['add', 'edit', 'delete'],
  assets: { logo: LOGO_URL }
})
app.mount('#app')
