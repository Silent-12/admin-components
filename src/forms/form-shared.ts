/**
 * AoForm / AoSearchBar 共享逻辑模块
 *
 * 表单组件（AoForm）与搜索栏组件（AoSearchBar）共用同一套组件映射、
 * 数据克隆、输出清洗、路径读写与配置解析逻辑；本模块是它们唯一的实现源，
 * 避免双份代码各自漂移（历史上曾出现 inputtag / inputTag 键名分叉）。
 *
 * 对外类型声明统一归位到 `@/types/component`（见 `src/types/component/form.ts`）。
 *
 * ## 两个组件的契约差异（刻意保留）
 *
 * - AoSearchBar：内部持有表单状态，通过 update:modelValue 整体上报；
 * - AoForm：直接对 v-model 对象做受控变更（就地修改，不整体替换）。
 */

import { toRaw } from 'vue'
import type { Component } from 'vue'
import {
  ElCascader,
  ElCheckbox,
  ElCheckboxGroup,
  ElDatePicker,
  ElInput,
  ElInputTag,
  ElInputNumber,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTreeSelect
} from 'element-plus'
import type {
  FormComponentType,
  FormItemBase,
  FormOption,
  FormSlotFn,
  ResponsiveBreakpoint,
  SanitizeOutputOptions
} from '../types/component'

/** 预定义表单组件映射，type 配置与组件一一对应，键集合由 FormComponentType 约束 */
export const componentMap: Record<FormComponentType, Component> = {
  input: ElInput, // 输入框
  inputtag: ElInputTag, // 标签输入框
  number: ElInputNumber, // 数字输入框
  select: ElSelect, // 选择器
  switch: ElSwitch, // 开关
  checkbox: ElCheckbox, // 复选框
  checkboxgroup: ElCheckboxGroup, // 复选框组
  radiogroup: ElRadioGroup, // 单选框组
  date: ElDatePicker, // 日期选择器
  daterange: ElDatePicker, // 日期范围选择器
  datetime: ElDatePicker, // 日期时间选择器
  datetimerange: ElDatePicker, // 日期时间范围选择器
  rate: ElRate, // 评分
  slider: ElSlider, // 滑块
  cascader: ElCascader, // 级联选择器
  timepicker: ElTimePicker, // 时间选择器
  timeselect: ElTimeSelect, // 时间选择
  treeselect: ElTreeSelect // 树选择器
} satisfies Record<FormComponentType, Component>

/** 表单项自有的布局与渲染控制字段，透传给渲染组件前必须剔除，否则会泄漏为 DOM 属性 */
export const FORM_ITEM_ROOT_PROPS = [
  'label',
  'labelWidth',
  'key',
  'type',
  'hidden',
  'span',
  'slots',
  'render',
  'options'
] as const

/** 选项由模板子节点渲染的表单项类型，其顶层 options 不再透传给渲染组件 */
const OPTION_CHILD_TYPES = ['select', 'checkboxgroup', 'radiogroup']

/**
 * 分组标题项的类型标识
 * @description 声明该 type 的表单项独占一行、只渲染标题文本，不渲染表单控件，也不写入表单数据。
 * key 仅用于列表渲染去重，建议使用 `section-*` 这类不与业务字段同名的标识。
 */
export const FORM_TITLE_TYPE = 'title'

/**
 * @description 判断表单项是否为分组标题项
 * @param item 表单项配置
 * @return 是否为分组标题项
 */
export const isFormTitleItem = (item: FormItemBase): boolean => item.type === FORM_TITLE_TYPE

/**
 * @description 判断表单项配置字段是否需要在透传给渲染组件前剔除
 * @param key 字段名
 * @param type 表单项类型
 * @return 是否剔除该字段
 */
const shouldStripItemProp = (key: string, type: string | undefined): boolean => {
  if (!(FORM_ITEM_ROOT_PROPS as readonly string[]).includes(key)) return false
  // options 由模板子节点渲染的类型才剔除，其余类型仍需透传原生 options prop（如 cascader）
  if (key === 'options') return OPTION_CHILD_TYPES.includes(type ?? '')
  return true
}

/** 输出清洗策略默认值，偏“接口友好”：去掉各类空值，但保留 0 与 false */
export const DEFAULT_SANITIZE_OPTIONS: SanitizeOutputOptions = {
  removeEmptyString: true,
  removeEmptyArray: true,
  removeEmptyObject: true,
  removeEmptyRichText: true,
  keepZero: true,
  keepFalse: true
}

const PATH_NUMBER_RE = /^\d+$/

/**
 * @description 解析点路径为段数组，兼容 a.b、a.0.b 写法，数字段会被当作数组索引处理
 * @param path 点路径字符串
 * @return 路径段数组，数字段已转换为 number
 */
export const parsePath = (path: string): Array<string | number> => {
  return path
    .split('.')
    .filter(Boolean)
    .map((segment) => (PATH_NUMBER_RE.test(segment) ? Number(segment) : segment))
}

/**
 * @description 深度克隆表单数据，避免重置等场景修改原始引用
 * @param value 待克隆的表单数据
 * @return 克隆后的表单数据
 */
export const cloneModelValue = (
  value: Record<string, unknown> | undefined
): Record<string, unknown> => {
  if (!value) return {}

  const deepClone = (source: unknown): unknown => {
    if (Array.isArray(source)) {
      return source.map((item) => deepClone(item))
    }

    if (source && typeof source === 'object') {
      const rawSource = toRaw(source)
      return Object.keys(rawSource).reduce<Record<string, unknown>>((accumulator, key) => {
        accumulator[key] = deepClone((rawSource as Record<string, unknown>)[key])
        return accumulator
      }, {})
    }

    return source
  }

  return deepClone(toRaw(value)) as Record<string, unknown>
}

/**
 * @description 按点路径读取表单数据
 * @param source 表单数据
 * @param path 点路径字符串
 * @return 路径对应的值，中间节点不存在时返回 undefined
 */
export const getValueByPath = (
  source: Record<string, unknown> | undefined,
  path: string
): unknown => {
  return parsePath(path).reduce<unknown>((currentValue, segment) => {
    if (currentValue == null) return undefined
    return (currentValue as Record<string | number, unknown>)[segment]
  }, source)
}

/**
 * @description 按点路径删除表单数据，只删除路径的最后一段，避免误删同级数据
 * @param source 表单数据
 * @param path 点路径字符串
 */
export const deleteValueByPath = (source: Record<string, unknown>, path: string): void => {
  const segments = parsePath(path)
  if (!segments.length) return

  const lastSegment = segments.pop()
  const parent = segments.reduce<unknown>((currentValue, segment) => {
    if (currentValue == null) return undefined
    return (currentValue as Record<string | number, unknown>)[segment]
  }, source)

  if (parent != null && lastSegment !== undefined) {
    delete (parent as Record<string | number, unknown>)[lastSegment]
  }
}

/**
 * @description 按点路径写入表单数据，清空输入（空字符串）时不保留空字段，并按路径自动补齐中间对象或数组
 * @param source 表单数据
 * @param path 点路径字符串
 * @param value 待写入的值，空字符串会被视为清空
 */
export const setValueByPath = (
  source: Record<string, unknown>,
  path: string,
  value: unknown
): void => {
  const normalizedValue = value === '' ? undefined : value

  if (normalizedValue === undefined) {
    deleteValueByPath(source, path)
    return
  }

  const segments = parsePath(path)
  if (!segments.length) return

  let currentValue: Record<string | number, unknown> = source

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1

    if (isLast) {
      currentValue[segment] = normalizedValue
      return
    }

    const nextSegment = segments[index + 1]
    const nextContainer = typeof nextSegment === 'number' ? [] : {}

    if (
      currentValue[segment] === null ||
      currentValue[segment] === undefined ||
      typeof currentValue[segment] !== 'object'
    ) {
      currentValue[segment] = nextContainer
    }

    currentValue = currentValue[segment] as Record<string | number, unknown>
  })
}

/**
 * @description 判断富文本是否为空：仅含编辑器占位标签（如 <p><br></p>、&nbsp;）视为空，包含媒体元素则视为有内容
 * @param value 富文本 HTML 字符串
 * @return 是否为空富文本
 */
export const isRichTextEmpty = (value: string): boolean => {
  if (/<(img|video|audio|iframe|embed|object)\b/i.test(value)) {
    return false
  }

  // 去掉编辑器常见占位标签后再判断是否还有实际内容。
  return (
    value
      .replace(/&nbsp;/gi, '')
      .replace(/<br\s*\/?>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim() === ''
  )
}

/**
 * @description 递归清洗表单输出值，按策略移除空值，但保留 0 和 false 这类有效值
 * @param value 待清洗的值
 * @param options 清洗策略
 * @return 清洗后的值，被移除的分支返回 undefined
 */
export const sanitizeOutputValue = (
  value: unknown,
  options: SanitizeOutputOptions = DEFAULT_SANITIZE_OPTIONS
): unknown => {
  if (Array.isArray(value)) {
    const sanitizedArray = value
      .map((item) => sanitizeOutputValue(item, options))
      .filter((item) => item !== undefined)
    return sanitizedArray.length === 0 && options.removeEmptyArray ? undefined : sanitizedArray
  }

  if (value && typeof value === 'object') {
    const rawValue = toRaw(value)
    const sanitizedObject = Object.entries(rawValue).reduce<Record<string, unknown>>(
      (accumulator, [key, item]) => {
        const sanitizedItem = sanitizeOutputValue(item, options)
        if (sanitizedItem !== undefined) {
          accumulator[key] = sanitizedItem
        }
        return accumulator
      },
      {}
    )
    return Object.keys(sanitizedObject).length === 0 && options.removeEmptyObject
      ? undefined
      : sanitizedObject
  }

  if (typeof value === 'string') {
    if (options.removeEmptyString && value.trim() === '') {
      return undefined
    }
    if (options.removeEmptyRichText && isRichTextEmpty(value)) {
      return undefined
    }
    return value
  }

  if (value === 0) {
    return options.keepZero ? value : undefined
  }

  if (value === false) {
    return options.keepFalse ? value : undefined
  }

  return value ?? undefined
}

/**
 * @description 克隆表单数据并清洗输出，业务层与接口层拿到的都是无空值干扰的结果
 * @param value 表单数据
 * @param options 清洗策略
 * @return 清洗后的表单输出，整体为空时返回空对象
 */
export const sanitizeFormOutput = <T extends Record<string, unknown>>(
  value: Record<string, unknown> | undefined,
  options: SanitizeOutputOptions = DEFAULT_SANITIZE_OPTIONS
): T => {
  return (sanitizeOutputValue(cloneModelValue(value), options) || {}) as T
}

/**
 * @description 获取表单项需要透传给渲染组件的属性：优先使用 item.props，否则剔除表单项自有字段后返回其余配置
 * @param item 表单项配置
 * @return 需要绑定到表单组件的属性对象
 */
export const getItemProps = (item: FormItemBase): Record<string, unknown> => {
  if (item.props) return item.props
  return Object.fromEntries(
    Object.entries(item).filter(([key]) => !shouldStripItemProp(key, item.type))
  )
}

/**
 * @description 获取表单项的选项数据，支持通过 item.props.options 或 item.options 传入
 * @param item 表单项配置
 * @return 选项数组，配置缺失或类型不符时返回空数组
 */
export const getOptions = (item: FormItemBase): FormOption[] => {
  const options = item.props?.options ?? item.options
  return Array.isArray(options) ? (options as FormOption[]) : []
}

/**
 * @description 获取表单项的有效插槽配置，过滤掉值为 undefined 的插槽
 * @param item 表单项配置
 * @return 过滤后的插槽映射
 */
export const getValidSlots = (item: FormItemBase): Record<string, FormSlotFn> => {
  if (!item.slots) return {}
  const validSlots: Record<string, FormSlotFn> = {}
  Object.entries(item.slots).forEach(([key, slotFn]) => {
    if (slotFn) {
      validSlots[key] = slotFn
    }
  })
  return validSlots
}

/**
 * @description 获取表单项对应的渲染组件：优先使用 render 函数或组件，其次按 type 查预定义映射，未知类型回退为输入框
 * @param item 表单项配置
 * @return 渲染组件
 */
export const getRenderComponent = (item: FormItemBase) => {
  // 优先使用 render 函数或组件渲染自定义组件
  if (item.render) {
    return item.render
  }

  const component = item.type ? componentMap[item.type as FormComponentType] : undefined
  if (component) {
    return component
  }

  // type 拼写漂移（如 inputTag / inputtag）会静默回退为输入框，开发期给出提示
  if (import.meta.env.DEV && item.type) {
    console.warn(`[form-shared] 未知的表单项类型 "${item.type}"，已回退为 input`)
  }
  return componentMap.input
}

/** 响应式断点配置，lg / xl 不降级故为 null */
const BREAKPOINT_CONFIG: Record<
  ResponsiveBreakpoint,
  { threshold: number; fallback: number } | null
> = {
  xs: { threshold: 12, fallback: 24 }, // 手机：小于 12 时使用满宽
  sm: { threshold: 12, fallback: 12 }, // 平板：小于 12 时使用半宽
  md: { threshold: 8, fallback: 8 }, // 中等屏幕：小于 8 时使用三分之一宽
  lg: null, // 大屏幕：直接使用设置的 span
  xl: null // 超大屏幕：直接使用设置的 span
}

/**
 * @description 计算响应式列宽：根据屏幕尺寸智能降级，避免小屏幕上表单项被压缩过小
 * @param span 已解析的 24 栅格列宽，默认值由调用方在传入前决定
 * @param breakpoint 当前断点
 * @return 计算后的 span 值
 */
export function calculateResponsiveSpan(span: number, breakpoint: ResponsiveBreakpoint): number {
  const config = BREAKPOINT_CONFIG[breakpoint]

  // 如果没有配置（lg/xl），直接返回原始 span
  if (!config) {
    return span
  }

  // 如果 span 小于阈值，使用降级值
  return span >= config.threshold ? span : config.fallback
}

/** 移动端断点（px），两个组件的响应式布局与按钮对齐共用同一阈值 */
export const FORM_MOBILE_BREAKPOINT = 500

/**
 * AoForm 表单项未声明 span 时的默认每行项数
 * @description 弹窗是 AoForm 的默认形态，宽度通常在 600px 上下；此时每行 4 项会把输入框压到不可用
 * （labelWidth 与输入框内固定开销之和已接近列宽）。默认取每行 2 项，可在默认弹窗宽度下直接可用；
 * 需要每行 3 项及以上时由表单项显式声明 span。
 */
export const FORM_DEFAULT_ITEMS_PER_ROW = 2

/**
 * @description 将表单项格数（相对行基准）换算为 ElCol 的 24 栅格宽度，如行基准 12 时 4 格换算为 8；
 * 未声明格数时按每行 FORM_DEFAULT_ITEMS_PER_ROW 项反推，保证默认密度不随行基准漂移
 * @param itemSpan 表单项声明的格数，未声明时按每行 FORM_DEFAULT_ITEMS_PER_ROW 项换算
 * @param baseSpan 行基准格数，非法值（非正数或未定义）按 24 处理
 * @return 24 栅格下的列宽，收敛到 [1, 24]
 */
export const convertItemSpanToCol = (
  itemSpan: number | undefined,
  baseSpan: number | undefined
): number => {
  const base = baseSpan && baseSpan > 0 ? baseSpan : 24
  const raw = ((itemSpan ?? base / FORM_DEFAULT_ITEMS_PER_ROW) / base) * 24
  return Math.min(24, Math.max(1, Math.round(raw)))
}

/**
 * @description 计算操作按钮的对齐方式：移动端靠右；非移动端在表单项数量不超过阈值时靠左，否则靠右
 * @param isMobile 是否处于移动端
 * @param visibleItemCount 可见表单项数量
 * @param buttonLeftLimit 按钮靠左对齐的表单项数量上限，未定义时按默认值 2 处理
 * @return 对应 CSS justify-content 的取值
 */
export const resolveActionButtonsAlign = (
  isMobile: boolean,
  visibleItemCount: number,
  buttonLeftLimit?: number
): 'flex-start' | 'flex-end' => {
  if (isMobile) return 'flex-end'
  return visibleItemCount <= (buttonLeftLimit ?? 2) ? 'flex-start' : 'flex-end'
}
