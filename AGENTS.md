# 项目定位

- 本仓库是后台管理系统公共组件包 `@ao/admin-components`，从宿主模板 `admin-template-vue` 抽离，独立版本化，供多个后台管理系统通过 git tag 依赖统一升级。纯前端组件库，无后端、数据库；不包含业务页面、路由与请求层。
- 技术栈：Vue 3、Vite（库模式）、TypeScript、Pinia、Element Plus、vue-i18n、SCSS。
- 使用 `pnpm`，Node.js 要求 `>=20.19.0`；开发与调试命令兼容 Windows PowerShell。

# 规则加载与优先级

- 项目内规则优先级：本文件 > 专项 rules > skills 与参考资料；系统、开发者指令和用户明确要求按各自优先级执行。
- 开始任务先读 [开发流程与验证](.agents/rules/workflow.md)；分析、编写、修改或审查相关内容前，按下表显式读取**所有匹配项**。跨主题任务累加加载，影响范围扩大时补读；当前会话已读且未变更的文件可复用。
- 详细约束集中在 `rules/`，任务流程放在 `skills/`，速查资料放在 `references/`。
- 若规则与实际目录或实现不符，以仓库现状为准，先同步更新对应规则及索引再继续；新增规则需补充触发条件与链接，避免多处维护同一详细规范。

# 核心约定

- **包边界（最高优先级）**：组件内禁止依赖宿主业务资源（业务 store、api、views、locales、router、utils）；宿主数据与能力一律通过 `install` 注入（`getAuthList`、`resolveLocalSvg`、`assets.logo`、`i18n`）。下游只允许从包入口 `@ao/admin-components` 导入，禁止深引 `src` 内部路径——入口导出是版本契约。
- 依赖纪律：`vue`、`element-plus`、`pinia`、`vue-i18n`、`@vueuse/core`、`pinia-plugin-persistedstate` 为 peerDependencies，版本以宿主为准；新依赖能不加就不加，运行时必需的依赖必须同步加入 `vite.config.ts` external。
- 类型对外公开的必须归位 `src/types/component/` 并从出口导出；类型注释遵循 TypeDoc 风格。
- 组件文案集中在 `src/locales/zh.json` 与 `en.json`（common/table 段），新增文案两种语言同步维护；组件内通过 `useI18n` 消费，语言包由 `install` 合并进宿主实例。
- 样式使用 SCSS 与宿主 CSS 变量，兼容暗色模式（`.dark`）；包内不定义主题变量、不引入全局样式。
- 源码使用 UTF-8 无 BOM 编码，业务函数同步维护 JSDoc。
- 版本与发版：整数版本自增（v1、v2…），发版统一 `pnpm run release`；`dist/` 构建产物提交进仓库；包安装后在控制台输出 `[ao-admin-components] v<版本号>` 供下游确认升级。

# 按需加载索引

| 级别 / 任务触发条件 | 必须读取 |
| --- | --- |
| 通用：所有任务 | [开发流程与验证](.agents/rules/workflow.md) |
| 专项：编写、修改、重构或审查代码 | [编码与注释](.agents/rules/coding.md)、[Ponytail](.agents/rules/ponytail.md)、[Karpathy Guidelines](.agents/skills/karpathy-guidelines/SKILL.md) |
| 专项：新增或修改类型声明、类型注释 | [类型定义](.agents/rules/typescript.md)、[TypeDoc 技能](.agents/skills/typedoc-style/SKILL.md) |
| 专项：目录、组件、依赖或出口调整 | [目录与组件结构](.agents/rules/module-structure.md) |
| 专项：Store、持久化或本地存储 | [状态管理与持久化](.agents/rules/state-storage.md) |
| 专项：新增或修改任何 Vue / SCSS 文件，或整理样式 | [SCSS 与深色模式](.agents/rules/styles.md) |
| 技能：移除功能及关联资源 | [Feature Removal](.agents/skills/feature-removal/SKILL.md) |
| 技能：审查当前未提交改动 | [Code Review](.agents/skills/code-review/SKILL.md)，并加载改动涉及的专项规则 |
| 技能：提交或生成提交信息 | [Git 提交规范](.agents/rules/git-commit-message.md)、[Commit Msg](.agents/skills/commit-msg/SKILL.md) |
| 技能：根据指定提交生成改动或测试说明 | [Git Commit Changelog](.agents/skills/git-commit-changelog/SKILL.md) |
| 参考：查询颜色、阴影、暗色变量及工具类 | [CSS 变量速查](.agents/references/css-variables.md) |
