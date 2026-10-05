# 代码规范工具链（ESLint / Prettier / Stylelint）

[返回主索引](../../AGENTS.md)。本文中的源码路径均相对仓库根目录。

规范口径对齐宿主模板 `admin-template-vue`，用于保证组件包与各宿主系统代码风格一致。三个工具职责分离：ESLint 管代码质量与 Vue/TS 规则，Prettier 管格式化，Stylelint 管样式；**不启用 git 钩子**，全部靠手动执行脚本，与参考项目现状一致。

## 配置文件

| 文件 | 作用 |
| --- | --- |
| `eslint.config.mjs` | ESLint 扁平配置（js / ts / vue 推荐规则 + 自定义规则） |
| `.prettierrc` | Prettier 格式规则（单引号、无分号、`printWidth: 100`、`vueIndentScriptAndStyle`） |
| `.prettierignore` | Prettier 忽略项 |
| `.stylelintrc.cjs` | Stylelint 配置（standard / recommended-scss / recommended-vue / html / recess-order） |
| `.stylelintignore` | Stylelint 忽略项 |

## 命令

- `pnpm run lint`：ESLint 检查。
- `pnpm run fix`：ESLint 自动修复。
- `pnpm run lint:prettier`：Prettier 全量格式化（`--write`）。
- `pnpm run lint:stylelint`：Stylelint 检查并自动修复。

## 约束

- 新增、修改任何源码文件（`.ts` / `.vue` / `.scss` / `.json`）后，必须执行 `pnpm run fix`、`pnpm run lint:prettier`、`pnpm run lint:stylelint`，并确认 `pnpm run lint` 与 `stylelint` 检查零报错。

- 三个工具均纳入 `.agents/rules/workflow.md` 的「完成检查」流程，与 `typecheck`、`build` 一并执行。

- 忽略范围：`node_modules`、`dist`（含 `playground/dist`）、`src/types/generated`、`.vscode`。构建产物 `dist/` 提交进仓库但**不参与格式化与校验**。

- 源码中不再保留无用引入（`@typescript-eslint/no-unused-vars` 会直接报错）；确属占位待用的引入应先删除，需要时再加回。

- `scripts/*.cjs` 等 CommonJS 文件允许使用 `require`，已在配置中单独放行 `@typescript-eslint/no-require-imports`。

- 不要手工制造与格式化规则冲突的写法；若发现 ESLint 与 Prettier 互相回写（同一文件 `--fix` 与 `--write` 反复改动），应调整 ESLint 规则使其与 Prettier 口径一致，而不是关闭校验。

## 与参考项目的差异

- `quotes` 规则启用 `avoidEscape: true`。参考项目的 `quotes: ['error', 'single']` 在字符串内含单引号时（如内嵌单引号的 SVG data URI）会与 Prettier 的引号策略冲突，导致两个工具互相回写；开启后两者口径一致。

- `typescript-eslint` 固定为 `8.71.0`（非 `^` 区间）。`8.71.1` 已发布但其依赖 `@typescript-eslint/parser@8.71.1` 未同步到当前 npm 镜像，`^` 区间会导致安装失败；镜像补齐后可放开为区间版本。
