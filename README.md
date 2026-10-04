# @ao/admin-components

后台管理系统公共组件库：AoTable、AoForm、AoSearchBar、AoButtonTable、AoButtonMore、AoExcelExport/Import 等，独立版本化，供多个后台系统通过 git 依赖统一升级。

## 安装

```bash
pnpm add @ao/admin-components@git+ssh://git@github.com:<org>/admin-components.git#v1
```

## 使用

```typescript
import { AdminComponents } from '@ao/admin-components'
import '@ao/admin-components/dist/index.css'

app.use(AdminComponents, {
  // 可选：宿主 vue-i18n 实例，包内置语言包（common/table 段）会合并进去
  i18n,
  // 可选：按钮级权限判断的权限列表来源
  getAuthList: () => userStore.info?.auth
})
```

安装成功后控制台会输出 `[ao-admin-components] v1`，用于确认升级是否生效。

## 升级

```bash
# 包仓库发版（版本自动 +1：v1 → v2）
pnpm run release

# 下游升级：package.json 中 tag 号改为 #v2 后
pnpm install
```

## 开发

```bash
pnpm install
pnpm build        # 库模式构建，产物提交进仓库（下游无需构建环境）
pnpm typecheck    # vue-tsc 类型检查

pnpm --filter playground dev   # 组件预览（mock 数据）
```

## 契约约定

- 下游只允许从包入口导入（组件、类型、hooks），禁止深引 `src` 内部路径。
- `vue`、`element-plus`、`pinia`、`vue-i18n`、`@vueuse/core` 为 peerDependencies，版本以宿主为准。
- `scrollToTop` 等页面级滚动依赖布局包提供的 `#app-main` DOM 锚点。
