# 类型定义

[返回主索引](../../AGENTS.md)。本文中的源码路径均相对仓库根目录。

- 对外公开的 TS 类型定义统一放在 `src/types/component/` 下（当前含 `index.ts` 表格类型与 `form.ts` 表单类型），新增类型前先复用现有文件与命名方式；包内其余目录（hooks、store、enums）的类型跟随所在文件。

- 组件 SFC 内不定义对外类型：Props 契约（如 `AoTableProps`）与插槽/事件相关类型一律归位 `src/types/component/`，SFC 内 `import type` 使用；仅包内部消费的类型可留在组件文件内。

- 新增或修改 `src/types/component/` 中的公开类型后，必须确认 `src/index.ts` 出口已导出（当前通过 `export * from './types/component'` 全量导出），并评估变更是否属于下游破坏性改动（属于则记录到 CHANGELOG）。

- TypeScript 类型定义文件（`.ts` / `.d.ts`）的注释规则：`type`、`interface`、`class` 等类型声明前仅保留一段 JSDoc，第一行写简短说明，使用 `@description` 补充用途；字段注释统一使用字段上方的单行 `//` 注释，不在类型 JSDoc 中使用 `@param` 描述字段。类型声明前禁止额外添加与 JSDoc 重复的 `//` 标题注释。

- d.ts 生成约束：公开类型禁止依赖包外路径或 Admin模板专属模块；`vite build` 的 dts 步骤对私有类型名（TS4082）与不可移植推断（TS2742）会失败或告警，出现时优先把类型显式化或移入 `src/types/`，而不是关闭检查。

类型注释示例见 [typedoc-style](../skills/typedoc-style/SKILL.md)。
