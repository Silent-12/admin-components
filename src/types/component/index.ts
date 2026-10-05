/**
 * 组件类型定义模块
 *
 * 提供项目组件的类型定义
 *
 * ## 主要功能
 *
 * - 表格列配置类型
 * - 表单配置类型（见 ./form）
 *
 * ## 使用场景
 *
 * - 组件 Props 类型约束
 * - 组件配置类型定义
 * - 组件事件参数类型
 */

import type { FormRules, PaginationProps, TableProps, TableColumnCtx } from 'element-plus'
import type { SearchFormItem } from './form'

/**
 * 表格列配置接口
 * @description 沿用原生列属性和 formatter，slotName 指定 AoTable 上的自定义插槽。
 */
export interface ColumnOption<T extends Record<string, any> = any> {
  // 列类型
  type?: 'selection' | 'expand' | 'index' | 'globalIndex'
  // 可选的数据字段名，沿用 Element Plus 原生点路径取值，例如 meta.title
  prop?: string
  // 可选的列唯一标识，用于无数据字段或多列使用同一字段的场景
  columnKey?: string
  // 列标题
  label?: string
  // 列宽度
  width?: string | number
  // 最小列宽度
  minWidth?: string | number
  // 固定列
  fixed?: boolean | 'left' | 'right'
  // 是否可排序
  sortable?: boolean | 'custom'
  // 过滤器选项
  filters?: any[]
  // 过滤方法
  filterMethod?: (value: any, row: T) => boolean
  // 过滤器位置
  filterPlacement?: string
  // 是否禁用
  disabled?: boolean
  // 可选的列显隐配置，未声明时默认显示
  visible?: boolean
  // 可选的原生单元格格式化函数
  formatter?: TableColumnCtx<T>['formatter']
  // 可选的 AoTable 命名插槽，填写即启用，不默认取 prop
  slotName?: string
  // 其他属性
  [key: string]: any
}

/**
 * 表格分页状态
 * @description 由页面持有；AoTable 通过原生 size-change/current-change 事件上报交互。
 */
export interface TablePaginationState {
  // 当前页码
  currentPage: number
  // 每页条数
  pageSize: number
  // 总条数
  total: number
}

/**
 * 分页器外观配置
 * @description 复用 Element Plus 原生属性类型，分页器在表格底部固定靠右。
 */
export type TablePaginationOptions = Pick<
  PaginationProps,
  'pageSizes' | 'layout' | 'background' | 'hideOnSinglePage' | 'size' | 'pagerCount'
>

export * from './form'

/**
 * AoTable 组件 Props 接口
 * @description 继承 ElTable 除 data 外的全部属性，并扩展列配置、搜索栏与分页集成能力。
 */
export interface AoTableProps<T extends Record<string, any> = Record<string, any>>
  extends Omit<TableProps<T>, 'data'> {
  /** 表格数据，由页面请求后传入，组件不做任何二次处理 */
  data?: T[]
  /** 列渲染配置，单元格内容通过同名插槽渲染 */
  columns?: ColumnOption<T>[]
  /** 分页状态，由页面持有；交互通过原生 size-change/current-change 事件回传 */
  pagination?: TablePaginationState
  /** 加载状态 */
  loading?: boolean
  /** 分页配置 */
  paginationOptions?: Partial<TablePaginationOptions>
  /** 空数据表格高度 */
  emptyHeight?: string
  /** 空数据时显示的文本 */
  emptyText?: string
  /** 是否开启 AoTableHeader，解决表格高度自适应问题 */
  showTableHeader?: boolean
  /** 搜索项配置（同 AoSearchBar 的 items），传入后自动在表格上方渲染搜索栏 */
  searchItems?: SearchFormItem[]
  /** 搜索表单校验规则，配置后点击查询会先校验，未通过则不触发查询 */
  searchRules?: FormRules
  /** 搜索栏单项占位宽度（24 栅格），默认沿用 AoSearchBar 的 6 */
  searchSpan?: number
  /** 搜索栏是否显示展开 / 收起按钮，默认沿用 AoSearchBar 的 true */
  searchShowExpand?: boolean
  /** 是否显示搜索栏；有搜索项时默认显示并启用头部搜索开关，显式传入可覆盖 */
  showSearchBar?: boolean
  /** 表格头部是否显示斑马纹开关，默认沿用 AoTableHeader 的 true */
  headerShowZebra?: boolean
  /** 表格头部是否显示边框开关，默认沿用 AoTableHeader 的 true */
  headerShowBorder?: boolean
  /** 表格头部是否显示表头背景开关，默认沿用 AoTableHeader 的 true */
  headerShowHeaderBackground?: boolean
  /** 是否启用集成布局（搜索栏 + 卡片 + 表格头部），默认按 searchItems / 头部插槽自动判断 */
  integrated?: boolean
}
