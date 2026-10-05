# SCSS 与深色模式

[返回主索引](../../AGENTS.md)。本文中的源码路径均相对仓库根目录。

- 组件样式统一使用 SCSS 写在 SFC 的 `<style scoped lang="scss">` 中（或组件私有 `style.scss` 由 SFC 引入）；包内**没有全局样式入口**，不提供 reset、主题变量定义与 Element Plus 主题样式，这些由 Admin模板全局样式与 `dist/index.css`（组件 scoped 样式编译产物）共同承担。

- 组件样式中的颜色、边框、阴影必须引用 CSS 变量（如 `var(--default-border)`、`var(--default-bg-color)`），公共变量由 `@ao/admin-layout/styles.css` 提供，Admin模板负责引入；包内不重复定义。playground 作为预览环境，通过开发依赖复用布局包样式，并补齐 Admin模板的 Element Plus 桥接变量。变量清单见 [CSS 变量速查](../references/css-variables.md)，实际值以布局包为准；若现有变量无法满足需求，先在布局包中补变量再在组件包内引用。

- 包内禁止使用 `@use '@styles/mixin.scss'` 等 Admin模板样式路径；确需混入时在包内 `src/styles/` 自带实现。

- Vue 组件 `<style scoped>` 的 class 命名规则：每个组件通常只声明一个顶层模块 class 作为作用域入口，内部子节点使用简短语义命名（`left`/`right`/`header`/`body`/`item`/`title`/`info` 等），避免机械 BEM 前缀；仅跨组件复用、Element Plus 深度覆盖等场景使用完整 BEM。

- 同一 BEM 前缀的选择器优先使用 SCSS 嵌套（`&__*`、`&--*`），但只有编译后选择器与原选择器完全一致时才能嵌套，禁止因嵌套新增后代层级或改变特异性。

## 深色模式适配强制检查规则

Admin模板通过切换 `<html>` 的 `class="dark"` 切换主题，组件样式随 CSS 变量自动适配。**新增或修改任何 `.vue` / `.scss` 文件时必须检查：**

1. 扫描 `<style>` 块中的裸色值（`#fff`、`#000`、`rgba(0,0,0,...)` 等）。
2. `transparent`、`rgba(0,0,0,0)` 等无视觉影响的颜色可豁免；确需固定不随主题变化的颜色必须注释原因。
3. 检测到硬编码颜色时，直接列出文件、行号与建议替换的 CSS 变量名（对照 [CSS 变量速查](../references/css-variables.md)），无需等待确认。
4. 修改样式后必须在 playground 分别验证亮色与暗色表现（见 [开发流程与验证](workflow.md)）。
