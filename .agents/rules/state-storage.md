# 状态管理与持久化

[返回主索引](../../AGENTS.md)。本文中的源码路径均相对仓库根目录。

- 包内 Pinia store 仅存放组件私有 UI 状态（当前仅 `src/store/modules/table.ts`，表格尺寸 / 斑马纹 / 边框等显示偏好），每个 store 一个文件，命名与组件域对应。

- 禁止在包内定义或读取 Admin模板业务 store（user、menu、setting 等）；需要 Admin模板数据时通过 `install` 注入（见 [workflow](workflow.md) 包边界纪律）。

- 持久化依赖 Admin模板安装的 `pinia-plugin-persistedstate`（包的 peerDependencies），包内不注册插件；`persist` 类型扩充通过 store 文件内 `import type {} from 'pinia-plugin-persistedstate'` 引入。Setup Store 的持久化示例：

  ```ts
  export const usePreferenceStore = defineStore(
    'preferenceStore',
    () => {
      const theme = ref('light')
      return { theme }
    },
    {
      persist: {
        key: 'preference',
        storage: localStorage,
        pick: ['theme']
      }
    }
  )
  ```

- `persist` 是 `defineStore` 的配置项：Setup Store 放在第三个参数。`key` 必须使用稳定且唯一的组件域名称，禁止拼接版本号；只需持久化部分字段时使用 `pick` 或 `omit`。

- 包内禁止直接调用 `localStorage.getItem/setItem/removeItem`；临时会话状态使用 `sessionStorage`（如表格 store 当前即用 sessionStorage），跨刷新保留的用户偏好才使用 `localStorage`。
