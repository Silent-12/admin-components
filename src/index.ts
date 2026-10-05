/**
 * @ao/admin-components 统一出口
 *
 * 下游项目只允许从本入口导入组件、类型与工具，禁止深引包内路径：
 * 内部结构不是公开 API，入口导出才是版本契约。
 *
 * ## 安装
 *
 * ```typescript
 * import { AdminComponents } from '@ao/admin-components'
 * import '@ao/admin-components/dist/index.css'
 *
 * app.use(AdminComponents, {
 *   // 可选：合并包内置语言包（含 table 段文案）
 *   i18n,
 *   // 可选：注入权限列表获取函数，供 AoButtonMore 等按钮级权限判断
 *   getAuthList: () => useUserStore().info?.auth
 * })
 * ```
 */
import type { App, Plugin } from 'vue'
import { ElLoadingDirective } from 'element-plus'
import zhMessages from './locales/zh.json'
import enMessages from './locales/en.json'
import { version } from './version'
import { AUTH_LIST_KEY, useAuth, type AuthListGetter } from './hooks/useAuth'
import { LOCAL_SVG_KEY, LOGO_URL_KEY, type LocalSvgResolver } from './hooks/useLocalSvg'
import AoTable from './tables/AoTable/index.vue'
import AoTableHeader from './tables/AoTableHeader.vue'
import AoTableHeaderButton from './tables/AoTableHeaderButton.vue'
import AoForm from './forms/AoForm/index.vue'
import AoSearchBar from './forms/AoSearchBar.vue'
import AoButtonTable from './forms/AoButtonTable.vue'
import AoButtonMore from './forms/AoButtonMore.vue'
import AoExcelExport from './forms/AoExcelExport.vue'
import AoExcelImport from './forms/AoExcelImport.vue'
import AoSvgIcon from './base/AoSvgIcon.vue'
import AoIconButton from './widget/AoIconButton.vue'
import AoLogo from './base/AoLogo.vue'

/** 宿主 i18n 实例的最小结构约束，兼容 legacy / composition 两种模式 */
interface MergeableI18n {
  global: {
    mergeLocaleMessage: (locale: string, messages: Record<string, unknown>) => void
  }
}

/** 组件包安装选项 */
export interface AdminComponentsOptions {
  /** 宿主 vue-i18n 实例；传入后包内置语言包（common/table 段）会合并进去 */
  i18n?: MergeableI18n
  /** 权限列表获取函数；未注入时按钮级权限判断视为无权限 */
  getAuthList?: AuthListGetter
  /** 宿主本地 SVG 解析函数；未注入时所有图标名走 iconify */
  resolveLocalSvg?: LocalSvgResolver
  /** 宿主品牌资源 */
  assets?: {
    /** 默认 logo 图片地址，供 AoLogo 使用 */
    logo?: string
  }
}

/**
 * 组件包插件
 * @description 安装时在控制台静默输出版本号，注册 loading 指令，
 * 合并内置语言包并保存宿主注入的权限获取函数与资源解析函数。
 */
export const AdminComponents: Plugin = {
  install(app: App, options: AdminComponentsOptions = {}) {
    console.info(`[ao-admin-components] v${version}`)
    if (options.i18n) {
      options.i18n.global.mergeLocaleMessage('zh', zhMessages)
      options.i18n.global.mergeLocaleMessage('en', enMessages)
    }
    app.provide<AuthListGetter>(AUTH_LIST_KEY, options.getAuthList ?? (() => undefined))
    app.provide<LocalSvgResolver>(LOCAL_SVG_KEY, options.resolveLocalSvg ?? (() => undefined))
    app.provide<string | undefined>(LOGO_URL_KEY, options.assets?.logo)
    // AoTable 模板使用 v-loading，包内统一注册，不依赖宿主自动导入
    app.directive('loading', ElLoadingDirective)
  }
}

export { version }

// 组件
export {
  AoTable,
  AoTableHeader,
  AoTableHeaderButton,
  AoForm,
  AoSearchBar,
  AoButtonTable,
  AoButtonMore,
  AoExcelExport,
  AoExcelImport,
  AoSvgIcon,
  AoIconButton,
  AoLogo
}

// 类型与工具
export * from './types/component'
export { TableSizeEnum } from './enums/formEnum'
export type { ButtonMoreItem } from './forms/AoButtonMore.vue'
export { useAuth, AUTH_LIST_KEY, type AuthListGetter } from './hooks/useAuth'
export {
  LOCAL_SVG_KEY,
  LOGO_URL_KEY,
  type LocalSvgResolver
} from './hooks/useLocalSvg'
export { useTableHeight } from './hooks/useTableHeight'
export { useTableStore } from './store/modules/table'
