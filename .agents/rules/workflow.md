# 开发流程与验证

[返回主索引](../../AGENTS.md)。本文中的源码路径均相对仓库根目录。

## 代码检索与复用

- 修改/新增代码前，先搜索包内已有实现与既有组件能力，优先复用；无则新增。

- 组件能力调整前，先对照宿主模板 `admin-template-vue` 的同名组件使用方式，确认变更对全部下游系统的影响面；本包源码源自该模板，历史上的一致性约定优先保持。

## 包边界纪律（核心）

- 组件内禁止 import 任何宿主业务资源：`store/modules` 的业务 store（user、menu 等）、`@/api`、`@/views`、`@/locales`、`@/router`、`@/utils`。宿主数据与能力一律通过 `install` 注入（`getAuthList`、`resolveLocalSvg`、`assets.logo`、`i18n`）。

- 新增需要宿主数据的能力时，先扩展 `AdminComponentsOptions` 注入接口并在 README 契约章节说明，禁止在组件内直接读取宿主全局状态。

- 包内禁止使用 `import.meta.glob` 指向包外路径；本地资源类需求（如 SVG）一律走注入。

## 开发与预览

- 修改组件后在 playground 验证：`pnpm --filter playground dev`（即 `cd playground && pnpm dev`）。playground 通过 vite 别名链接包源码，改包代码即时热更新；模拟数据在 `playground/src/mock/` 下按 `BaseResponse` 形状构造。

- 组件新增/修改文案时，同步更新 `src/locales/zh.json` 与 `src/locales/en.json`，playground 已通过 install 合并包语言包可直接验证。

## 完成检查

- 涉及源码改动的任务完成后，必须依次执行 `pnpm run typecheck`（vue-tsc）与 `pnpm run build`（库模式构建 + d.ts 生成）；两者都通过才算完成。

- 构建产物 `dist/` 提交进仓库（下游 git 依赖安装不执行构建），build 后确认 `dist/tables/AoTable/index.vue.d.ts` 等声明文件完整生成，构建日志中的 d.ts 类型告警需要评估是否阻塞下游类型检查。

- 修改样式后需在 playground 中分别验证亮色与暗色（`.dark`）表现。

## 发版

- 版本号为纯整数自增（v1、v2、v3…），不使用 semver 小数点版本；tag 即版本。

- 发版统一执行 `pnpm run release`：自动取最大 `v*` tag 加 1、同步 `package.json` 的 `version` 与 `CHANGELOG.md`、构建并提交 `dist/`、打 tag 并推送。禁止手工改版本号或手工打 tag。

- 发版前必须在 playground 完成回归预览；版本号在下游 install 时控制台输出，用于确认升级生效。
