/**
 * 弹窗类型定义模块
 * @description 提供 AoDialog 的属性与事件契约，供组件库内部与下游页面共用
 */
/**
 * AoDialog 属性
 * @description 统一后台弹窗的标题、宽度与底部操作按钮配置，默认值由组件入口设置
 */
export interface AoDialogProps {
    visible?: boolean;
    title?: string;
    width?: string | number;
    alignCenter?: boolean;
    loading?: boolean;
    showCancel?: boolean;
    showConfirm?: boolean;
    cancelText?: string;
    confirmText?: string;
    confirmDisabled?: boolean;
}
/**
 * AoDialog 事件
 * @description 上报弹窗显隐、底部按钮操作及关闭动画完成
 */
export interface AoDialogEmits {
    'update:visible': [boolean];
    cancel: [];
    confirm: [];
    closed: [];
}
