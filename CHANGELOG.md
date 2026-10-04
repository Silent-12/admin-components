# Changelog

## v1

- 首版：从 admin-template-vue 抽离 AoTable、AoTableHeader、AoTableHeaderButton、AoForm、AoSearchBar、AoButtonTable、AoButtonMore、AoExcelExport、AoExcelImport 及共用基础组件
- 解耦：权限判断改为宿主注入（getAuthList）、滚动工具包内实现、内置 common/table 语言包
- 发版机制：`pnpm run release` 整数版本自动自增
