# @ao/admin-components

后台管理系统公共组件库：AoTable、AoForm、AoSearchBar、AoButtonTable、AoButtonMore、AoExcelExport/Import 等，独立版本化，供多个后台系统通过 git 依赖统一升级。同时导出 `useTableColumns`（表格列显隐与排序）等 hooks 与配套类型。

## 安装

```bash
pnpm add @ao/admin-components@git+ssh://git@github.com:<org>/admin-components.git#v1
```

## 使用

```typescript
import { AdminComponents } from '@ao/admin-components'
import 'element-plus/dist/index.css'
import '@ao/admin-components/styles.css'
import '@ao/admin-layout/styles.css'

app.use(AdminComponents, {
  // 可选：Admin模板 vue-i18n 实例，包内置语言包（common/table 段）会合并进去
  i18n,
  // 可选：按钮级权限判断的权限列表来源
  getAuthList: () => userStore.info?.auth
})
```

安装成功后控制台会输出 `[ao-admin-components] v1`，用于确认升级是否生效。

组件样式依赖主题变量。`@ao/admin-layout/styles.css` 提供公共亮暗色变量、主题色与圆角基数默认值（`--main-color` 默认跟随 `--el-color-primary`，`--custom-radius` 默认 `0.75rem`）以及 Element Plus 暗色样式，Admin模板可在自己的全局样式中覆盖。切换 `<html class="dark">` 后自动生效。独立接入的系统也可以提供同名主题变量，但不能只引入组件 CSS。playground 的接入示例见 `playground/src/main.ts` 和 `playground/src/style.scss`。

Iconify 图标按名称在线加载，组件包不携带图标数据。本地 SVG 仍通过 `resolveLocalSvg` 注入。

## 升级

```bash
# 包仓库发版（版本自动 +1：v1 → v2）
pnpm run release

# 下游升级：package.json 中 tag 号改为 #v2 后
pnpm install
```

## 开发

```bash
corepack enable
pnpm install
pnpm build        # 库模式构建，产物提交进仓库（下游无需构建环境）
pnpm typecheck    # vue-tsc 类型检查

pnpm --dir playground dev      # 组件预览（mock 数据）
pnpm --dir playground typecheck
```

项目通过 `packageManager` 固定 pnpm 10.34.6，与 Node.js >=20.19.0 的最低要求兼容。playground 是 workspace 成员，也可使用 `pnpm --filter admin-components-playground dev`。预览页可直接切换亮暗色和空／有数据，数据切换会重置页码并更新分页总数。

## 契约约定

- 表格列（含序号列）统一通过 `visible` 控制显隐，未声明时默认显示，`visible: false` 默认隐藏；列设置面板与 `toggleColumn` 均操作此字段。旧配置 `checked` 已移除，请迁移为 `visible`。`columnChecks` 是列设置数组，不是第二个显隐字段。
- 下游只允许从包入口导入（组件、类型、hooks），禁止深引 `src` 内部路径。
- `vue`、`element-plus`、`pinia`、`vue-i18n`、`@vueuse/core` 为 peerDependencies，版本以 Admin模板为准。
- `scrollToTop` 等页面级滚动依赖布局包提供的 `#app-main` DOM 锚点。
