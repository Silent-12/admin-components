import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { AdminComponents } from '@ao/admin-components'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: { zh: {}, en: {} }
})

app.use(createPinia())
app.use(i18n)
app.use(ElementPlus, { locale: zhCn })
app.use(AdminComponents, {
  // 模拟宿主注入：实际项目中从 user store 读取 info.auth
  i18n,
  getAuthList: () => ['add', 'edit', 'delete']
})
app.mount('#app')
