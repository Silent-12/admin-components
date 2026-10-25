/**
 * 弹窗类型定义模块
 * @description 提供 AoDialog 的属性与事件契约，供组件库内部与下游页面共用
 */

/**
 * AoDialog 属性
 * @description 统一后台弹窗的标题、宽度与底部操作按钮配置，默认值由组件入口设置
 */
export interface AoDialogProps {
  // 弹窗显隐状态，支持 v-model:visible
  visible?: boolean
  // 可选的弹窗标题
  title?: string
  // 可选的弹窗宽度，默认 600px；需要限制最大宽度时传入 min(600px, calc(100vw - 32px)) 这类表达式
  width?: string | number
  // 可选的弹窗垂直居中开关，默认 true
  alignCenter?: boolean
  // 可选的加载状态，默认 false；为 true 时在内容区显示加载遮罩
  loading?: boolean
  // 是否显示取消按钮，默认 true
  showCancel?: boolean
  // 是否显示确定按钮，默认 true
  showConfirm?: boolean
  // 可选的取消按钮文案，未传时使用内置国际化文案
  cancelText?: string
  // 可选的确定按钮文案，未传时使用内置国际化文案
  confirmText?: string
  // 可选的确定按钮禁用状态
  confirmDisabled?: boolean
}

/**
 * AoDialog 事件
 * @description 上报弹窗显隐、底部按钮操作及关闭动画完成
 */
export interface AoDialogEmits {
  // 弹窗目标显隐状态
  'update:visible': [boolean]
  // 点击取消按钮后触发，弹窗随后关闭
  cancel: []
  // 点击确定按钮后触发，是否关闭弹窗由业务决定
  confirm: []
  // 弹窗关闭动画结束后触发，用于重置内容等收尾操作
  closed: []
}
