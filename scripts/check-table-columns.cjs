/**
 * @description 验证列显隐仅由 visible 控制；运行：node scripts/check-table-columns.cjs
 */
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
const { effectScope, nextTick } = require('vue')

const source = fs.readFileSync(path.join(__dirname, '../src/hooks/useTableColumns.ts'), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
})
const hookModule = { exports: {} }
// 仅替代无关的翻译文案；ref、computed、watch 使用真实 Vue 实现。
new Function('require', 'exports', outputText)(
  (name) => (name === 'vue-i18n' ? { useI18n: () => ({ t: (key) => key }) } : require(name)),
  hookModule.exports
)
const { useTableColumns, getColumnVisibility, getColumnKey } = hookModule.exports

/** @description 覆盖普通列与全部特殊列的默认值、初始隐藏、面板回写、切换及新增。 */
async function check() {
  for (const type of [undefined, 'selection', 'expand', 'index', 'globalIndex']) {
    const scope = effectScope()
    try {
      const state = scope.run(() =>
        useTableColumns(() => [
          { type, prop: 'value', columnKey: 'main', label: '列', visible: false },
          { prop: 'name', columnKey: 'default' }
        ])
      )
      assert.deepEqual(
        state.columns.value.map((col) => col.columnKey),
        ['default']
      )
      assert.ok(state.columnChecks.value.every((col) => !('checked' in col)))

      state.columnChecks.value[0].visible = true
      assert.equal(state.columns.value.length, 2)
      state.toggleColumn('main')
      assert.equal(state.columns.value.length, 1)
      state.toggleColumn(['main', 'default'], true)
      assert.equal(state.columns.value.length, 2)

      state.addColumn({ type, prop: 'extra', columnKey: 'extra', visible: false })
      await nextTick()
      assert.equal(state.columns.value.length, 2)
      assert.equal(state.columnChecks.value.find((col) => col.columnKey === 'extra').visible, false)
      assert.ok(state.columnChecks.value.every((col) => !('checked' in col)))

      // 验证 updateColumn 动态修改显隐
      state.updateColumn('default', { visible: false })
      assert.equal(
        state.columns.value.some((col) => col.columnKey === 'default'),
        false
      )
      state.updateColumn('default', { visible: true })
      assert.equal(
        state.columns.value.some((col) => col.columnKey === 'default'),
        true
      )

      // 验证重排序后新增列，原有排序不会丢失
      state.reorderColumns(0, 1)
      const reorderedFirstKey = state.columnChecks.value[0].columnKey
      state.addColumn({ prop: 'tail', columnKey: 'tail' })
      assert.equal(state.columnChecks.value[0].columnKey, reorderedFirstKey)

      // 验证 resetColumns 彻底恢复初始显隐和顺序
      state.resetColumns()
      assert.deepEqual(
        state.columns.value.map((col) => col.columnKey),
        ['default']
      )
      assert.equal(state.columnChecks.value.find((col) => col.columnKey === 'main').visible, false)
      assert.equal(
        state.columnChecks.value.find((col) => col.columnKey === 'default').visible,
        true
      )
    } finally {
      scope.stop()
    }
  }
  assert.equal(getColumnVisibility({}), true)
  assert.equal(getColumnVisibility({ visible: false }), false)
  // 旧字段不再参与显隐判断。
  assert.equal(getColumnVisibility({ checked: false }), true)

  // 验证纯 slotName 展示列正确提取 key
  assert.equal(getColumnKey({ slotName: 'operation' }), 'operation')
  assert.equal(getColumnKey({ columnKey: 'custom', slotName: 'operation' }), 'custom')

  console.log(
    '列显隐回归检查通过：默认显示、初始隐藏、面板回写、批量切换、新增列、updateColumn 显隐、顺序保留与 resetColumns 重置。'
  )
}

check().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
