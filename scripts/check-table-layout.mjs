/** AoTable 工具栏布局回归检查：node scripts/check-table-layout.mjs */
import assert from 'node:assert/strict'
import vue from '@vitejs/plugin-vue'
import { createPinia } from 'pinia'
import { createServer } from 'vite'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createI18n } from 'vue-i18n'
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'

// 包内表格 store 使用浏览器存储，服务端渲染检查不持久化任何状态
globalThis.localStorage ??= { getItem: () => null, setItem: () => {}, removeItem: () => {} }

const server = await createServer({
  configFile: false,
  plugins: [vue()],
  server: { middlewareMode: true },
  appType: 'custom'
})

try {
  const { default: AoTable } = await server.ssrLoadModule('/src/tables/AoTable/index.vue')
  for (const scenario of [
    { name: '默认基础模式', props: {}, header: false },
    { name: '显式基础模式', props: { integrated: false, showTableHeader: true }, header: false },
    {
      name: '集成模式关闭工具栏',
      props: { integrated: true, showTableHeader: false },
      header: false
    },
    { name: '集成模式显示工具栏', props: { integrated: true }, header: true }
  ]) {
    const app = createSSRApp({
      render: () =>
        h(AoTable, {
          data: [{ name: '布局检查' }],
          columns: [{ prop: 'name', label: '名称' }],
          ...scenario.props
        })
    })
    app.use(createPinia())
    app.use(createI18n({ legacy: false, locale: 'zh', missingWarn: false, fallbackWarn: false }))
    app.provide(ID_INJECTION_KEY, { prefix: 1, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
    app.directive('loading', { getSSRProps: () => ({}) })

    const html = await renderToString(app)
    const table = html.match(/<div class="ao-table(?: [^"]*)?" style="([^"]*)"/)
    assert.ok(table, `${scenario.name}：应渲染表格主体`)
    assert.equal(
      table[1],
      scenario.header ? 'height:calc(100% - 54px);' : 'height:100%;',
      `${scenario.name}：只扣除实际渲染的工具栏高度和间距`
    )
    assert.equal(html.includes('class="table-header-root"'), scenario.header, scenario.name)
    assert.equal(table[0].includes('has-header'), scenario.header, scenario.name)
  }
  console.info('AoTable 工具栏显隐与高度回归检查通过（4 个场景）')
} finally {
  await server.close()
}
