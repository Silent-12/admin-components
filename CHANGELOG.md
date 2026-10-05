# Changelog

## 未发布

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
