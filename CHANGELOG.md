# Changelog

## v7 (2026-10-24)

- 表格：开启表头背景时使用布局包的 `--ao-table-header-bg-color`，亮色调整为 `#f5f7f9`，暗色保持主题适配；需配套 `@ao/admin-layout` v6 或以上版本。

## v6 (2026-10-24)

- 表格：`AoTable` 操作列默认左对齐，宽度由 170px 调整为 210px，解决“重置密码、编辑、删除”三个文字按钮换行的问题；亮色、暗色及边框开关场景均已验证。

## v5 (2026-10-18)

- 表单：`AoForm` 暴露 `clearValidate()`，支持清除全部或指定字段的校验状态，不修改表单数据、不触发 `reset` 事件。

## v4 (2026-10-06)

- 表格：集成模式下搜索栏改用浅色底（`--el-fill-color-light`），与表格区形成明度差，解决搜索栏与工具栏同底色、仅靠细边框分区导致的层次不清问题。

## v3 (2026-10-06)

- 破坏性变更：移除表格列配置的 `checked` 显隐兼容字段，所有列（含序号列）统一使用 `visible`，默认显示。下游需将列配置中的 `checked: false` 改为 `visible: false`；`columnChecks` 数组及其绑定方式不变。
- 表格：导出 `useTableColumns` Composable（支持列显隐控制、拖拽排序、特殊列识别与增删改查）。
- 表单：`AoForm` 表单项未声明 `span` 时默认按每行 2 项换算（适配 600px 默认弹窗宽度）。
- 文档：术语统一为「Admin模板」，同步更新注释、规则文档与预览页文案。

## v1

- 首版：从 admin-template-vue 抽离 AoTable、AoTableHeader、AoTableHeaderButton、AoForm、AoSearchBar、AoButtonTable、AoButtonMore、AoExcelExport、AoExcelImport 及共用基础组件
- 解耦：权限判断改为 Admin模板注入（getAuthList）、滚动工具包内实现、内置 common/table 语言包
- 发版机制：`pnpm run release` 整数版本自动自增
## v2 (2026-10-05)

- 见提交记录
