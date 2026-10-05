// ESLint 扁平配置（flat config）
// 规范对齐 Admin模板 `admin-template-vue`，忽略项按本仓库目录结构调整。
// 说明：Prettier 负责格式化，ESLint 只做代码质量与 Vue/TS 规则校验，两者通过
// 下方 quotes / semi 等规则保持口径一致，因此不引入 eslint-config-prettier。
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  // 指定文件匹配规则
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}']
  },
  // 指定全局变量和环境
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  // 扩展配置
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  // 自定义规则
  {
    // 针对所有 JavaScript、TypeScript 和 Vue 文件应用以下配置
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],

    rules: {
      // avoidEscape 与 Prettier 的引号策略保持一致：字符串内含单引号时允许双引号，
      // 否则 ESLint --fix 与 prettier --write 会互相回写（如内嵌单引号的 data URI）。
      quotes: ['error', 'single', { avoidEscape: true }], // 使用单引号
      semi: ['error', 'never'], // 语句末尾不加分号
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      '@typescript-eslint/no-explicit-any': 'off', // 禁用 any 检查
      'vue/multi-word-component-names': 'off', // 禁用对 Vue 组件名称的多词要求检查
      'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
      'no-unexpected-multiline': 'error' // 禁止空余的多行
    }
  },
  // vue 规则
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser }
    }
  },
  // CommonJS 脚本（scripts/*.cjs、*.stylelintrc.cjs 等）允许使用 require
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  },
  // 忽略文件
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'playground/dist/**',
      'src/types/generated/**',
      '.vscode/**'
    ]
  }
]
