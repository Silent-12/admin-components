/**
 * 表单类型定义模块
 * @description 提供共享表单项、组件映射与输出清洗类型，以及 AoForm 的属性和事件契约
 */

import type { Component, VNode } from 'vue'

/**
 * 表单选项数据结构
 * @description 用于 select、checkboxgroup、radiogroup 等选项类表单项
 */
export interface FormOption {
  // 选项值
  value: string | number | boolean
  // 其他属性透传给 ElOption / ElCheckbox / ElRadio（如 label、disabled）
  [key: string]: unknown
}

/**
 * 表单项插槽渲染函数
 * @description 表单项 slots 配置中单个具名插槽的渲染函数签名
 */
export type FormSlotFn = () => VNode

/**
 * 预定义表单组件类型
 * @description 与 form-shared.ts 中 componentMap 的键一一对应，新增组件时由 satisfies 约束同步维护
 */
export type FormComponentType =
  | 'input'
  | 'inputtag'
  | 'number'
  | 'select'
  | 'switch'
  | 'checkbox'
  | 'checkboxgroup'
  | 'radiogroup'
  | 'date'
  | 'daterange'
  | 'datetime'
  | 'datetimerange'
  | 'rate'
  | 'slider'
  | 'cascader'
  | 'timepicker'
  | 'timeselect'
  | 'treeselect'

/**
 * 表单项配置的基础结构
 * @description AoForm 与 AoSearchBar 在此之上扩展各自的字段约束
 */
export interface FormItemBase {
  // 表单项的唯一标识，支持 a.b、a.0.b 这类点路径
  key: string
  // 可选的表单项标签文本或自定义渲染函数
  label?: string | (() => VNode) | Component
  // 可选的标签宽度，会覆盖 Form 的 labelWidth
  labelWidth?: string | number
  // 可选的表单项类型，未命中预定义映射时回退为输入框；传 FORM_TITLE_TYPE（'title'）时渲染为独占一行的分组标题项，不参与表单数据
  type?: FormComponentType | string
  // 可选的自定义渲染函数或组件，优先级高于 type
  render?: (() => VNode) | Component
  // 是否隐藏该表单项
  hidden?: boolean
  // 可选的列宽：AoForm 中为相对行基准（组件 span 属性）的格数，如行基准 12 时 4 格换算为 8，未声明时按每行 2 项换算；AoSearchBar 中为 24 格栅格宽度
  span?: number
  // 可选的选项数据，也可通过 props.options 传入
  options?: FormOption[]
  // 传递给表单项组件的属性，支持 Element Plus 官方文档中的组件属性
  props?: Record<string, unknown>
  // 可选的插槽配置
  slots?: Record<string, FormSlotFn | undefined>
  // 可选的占位符文本
  placeholder?: string
}

/**
 * AoForm 表单项配置
 * @description 在共享表单项结构上要求提供标签，支持文本、渲染函数或组件。
 */
export interface FormItem extends FormItemBase {
  // 表单项的标签文本或自定义渲染函数、组件
  label: string | (() => VNode) | Component
}

/**
 * AoForm 表单主体属性
 * @description 定义表单渲染与输出清洗配置，默认值由 AoForm 入口统一设置。
 */
export interface FormProps {
  // 表单项配置列表
  items: FormItem[]
  // 可选的行基准格数，表单项 span 相对它换算；如基准 12 时三个 span 为 4 的项占满一行。表单项未声明 span 时按每行 2 项换算
  span?: number
  // 可选的表单控件间隙
  gutter?: number
  // 可选的表单域标签位置
  labelPosition?: 'left' | 'right' | 'top'
  // 可选的标签宽度
  labelWidth?: string | number
  // 可选的提交输出清洗策略
  sanitizeOutput?: Partial<SanitizeOutputOptions>
}

/**
 * AoForm 表单主体事件
 * @description 上报表单重置完成以及校验通过后的清洗输出。
 */
export interface FormEmits {
  // 表单重置完成
  reset: []
  // 校验通过后的清洗输出
  submit: [Record<string, any>]
}

/**
 * AoForm 入口属性
 * @description 复用表单主体配置，并提供弹窗呈现、显隐和底部操作按钮配置。
 */
export interface FormWrapperProps extends FormProps {
  // 可选的弹窗模式开关，默认 true；false 时呈现内联表单
  dialog?: boolean
  // 可选的弹窗显隐状态，支持 v-model:visible，仅弹窗模式生效
  visible?: boolean
  // 可选的弹窗标题，仅弹窗模式生效
  title?: string
  // 可选的弹窗宽度，仅弹窗模式生效；默认 600px，与「每行 2 项 + 默认 labelWidth」的默认密度匹配，继续收窄时需同步调小表单项 span
  width?: string | number
  // 可选的弹窗垂直居中开关，默认 true，仅弹窗模式生效
  alignCenter?: boolean
  // 可选的取消按钮文案，未传时使用内置国际化文案
  cancelText?: string
  // 可选的确定按钮文案，未传时使用内置国际化文案
  confirmText?: string
  // 可选的底部确定按钮显示开关
  showSubmit?: boolean
  // 可选的确定按钮禁用状态
  disabledSubmit?: boolean
}

/**
 * AoForm 入口事件
 * @description 透传表单主体事件，并上报弹窗显隐、取消操作及关闭动画完成。
 */
export interface FormWrapperEmits extends FormEmits {
  // 弹窗目标显隐状态
  'update:visible': [boolean]
  // 点击取消按钮后触发，弹窗随后关闭
  cancel: []
  // 弹窗关闭动画结束后触发，仅弹窗模式生效，用于重置表单等收尾操作
  closed: []
}

/**
 * 输出清洗策略
 * @description 控制表单输出时空值的移除范围，同时保留 0 与 false 这类有效值
 */
export interface SanitizeOutputOptions {
  // 移除空字符串
  removeEmptyString: boolean
  // 移除空数组
  removeEmptyArray: boolean
  // 移除清洗后为空的对象
  removeEmptyObject: boolean
  // 移除空富文本占位内容，如 <p><br></p>
  removeEmptyRichText: boolean
  // 保留数字 0 这类有效值
  keepZero: boolean
  // 保留 false 这类有效值
  keepFalse: boolean
}

/**
 * 响应式断点
 * @description 基于 Element Plus Grid 24 栅格系统的断点标识，用于表单项列宽降级计算
 */
export type ResponsiveBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * 搜索表单项配置
 * @description 由 AoSearchBar 消费；label 支持文本或自定义渲染函数。
 */
export interface SearchFormItem extends FormItemBase {
  /** 表单项的标签文本或自定义渲染函数 */
  label: string | (() => VNode) | Component
}
