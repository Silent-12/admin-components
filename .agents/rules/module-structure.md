# 目录与组件结构

[返回主索引](../../AGENTS.md)。本文中的源码路径均相对仓库根目录。

## 包目录

```
src/
├─ tables/     # 表格组件：AoTable/（index.vue + style.scss）、AoTableHeader.vue、AoTableHeaderButton.vue
├─ forms/      # 表单组件：AoForm/、AoSearchBar.vue、AoButtonTable.vue、AoButtonMore.vue、AoExcelExport.vue、AoExcelImport.vue、form-shared.ts
├─ base/       # 两包共用基础组件：AoSvgIcon.vue、AoLogo.vue
├─ widget/     # 通用小部件：AoIconButton.vue
├─ store/      # 包内 Pinia store（modules/table.ts），仅组件私有 UI 状态
├─ hooks/      # 包内 Composable（useAuth、useScroll、useTableHeight、useTableColumns、useLocalSvg）
├─ types/      # 对外类型：component/（index.ts、form.ts），公开类型必须从这里导出
├─ enums/      # 包内枚举（index.ts 统一导出）
├─ locales/    # 包内置语言包（zh.json、en.json，仅 common/table 段）
└─ index.ts    # 统一出口 + install 插件
playground/    # 预览应用，vite 别名链接包源码
scripts/       # release.mjs 发版脚本
dist/          # 构建产物（提交进仓库）
```

## 组件约定

- 组件文件使用大驼峰命名；含子组件的组件（AoTable、AoForm）保留目录 + `index.vue` 入口，组件私有样式同名 `style.scss` 并在 SFC 内 `@use './style'` 引入。

- 组件内使用的子组件必须显式 import（模板时代的 unplugin 自动导入在包内不可用）；Element Plus 组件显式导入，`v-loading` 等指令由 `install` 统一注册，模板中不自行注册。

- 对外类型统一归位 `src/types/component/`（如 `AoTableProps`、`FormItem`、`SearchFormItem`、`ColumnOption`），组件 SFC 内只做 re-export；新增公开类型必须在 `src/index.ts` 出口导出。

- 共享逻辑优先抽到 `src/hooks/`（命名 `use` 开头）或 `src/forms/form-shared.ts` 这类共享模块，禁止在组件间复制粘贴逻辑。

- 依赖纪律：`vue`、`element-plus`、`pinia`、`vue-i18n`、`@vueuse/core`、`pinia-plugin-persistedstate` 只能作为 peerDependencies；仅当组件运行时必需（如 `xlsx`、`file-saver`、`vue-draggable-plus`）才进 dependencies，且必须加入 `vite.config.ts` 的 external 列表。

## playground 约定

- playground 只做预览与交互验证，不放业务逻辑；每个被验证的组件场景一个 demo 区块，模拟数据使用 `playground/src/mock/` 下的工厂函数。

- playground 通过 vite 别名 `@ao/admin-components` 指向包源码，禁止改用 dist 依赖方式开发。
