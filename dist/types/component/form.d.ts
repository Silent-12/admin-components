import { Component, VNode } from 'vue';
/**
 * 表单选项数据结构
 * @description 用于 select、checkboxgroup、radiogroup 等选项类表单项
 */
export interface FormOption {
    value: string | number | boolean;
    [key: string]: unknown;
}
/**
 * 表单项插槽渲染函数
 * @description 表单项 slots 配置中单个具名插槽的渲染函数签名
 */
export type FormSlotFn = () => VNode;
/**
 * 预定义表单组件类型
 * @description 与 form-shared.ts 中 componentMap 的键一一对应，新增组件时由 satisfies 约束同步维护
 */
export type FormComponentType = 'input' | 'inputtag' | 'number' | 'select' | 'switch' | 'checkbox' | 'checkboxgroup' | 'radiogroup' | 'date' | 'daterange' | 'datetime' | 'datetimerange' | 'rate' | 'slider' | 'cascader' | 'timepicker' | 'timeselect' | 'treeselect';
/**
 * 表单项配置的基础结构
 * @description AoForm 与 AoSearchBar 在此之上扩展各自的字段约束
 */
export interface FormItemBase {
    key: string;
    label?: string | (() => VNode) | Component;
    labelWidth?: string | number;
    type?: FormComponentType | string;
    render?: (() => VNode) | Component;
    hidden?: boolean;
    span?: number;
    options?: FormOption[];
    props?: Record<string, unknown>;
    slots?: Record<string, FormSlotFn | undefined>;
    placeholder?: string;
}
/**
 * AoForm 表单项配置
 * @description 在共享表单项结构上要求提供标签，支持文本、渲染函数或组件。
 */
export interface FormItem extends FormItemBase {
    label: string | (() => VNode) | Component;
}
/**
 * AoForm 表单主体属性
 * @description 定义表单渲染与输出清洗配置，默认值由 AoForm 入口统一设置。
 */
export interface FormProps {
    items: FormItem[];
    span?: number;
    gutter?: number;
    labelPosition?: 'left' | 'right' | 'top';
    labelWidth?: string | number;
    sanitizeOutput?: Partial<SanitizeOutputOptions>;
}
/**
 * AoForm 表单主体事件
 * @description 上报表单重置完成以及校验通过后的清洗输出。
 */
export interface FormEmits {
    reset: [];
    submit: [Record<string, any>];
}
/**
 * AoForm 入口属性
 * @description 复用表单主体配置，并提供弹窗呈现、显隐和底部操作按钮配置。
 */
export interface FormWrapperProps extends FormProps {
    dialog?: boolean;
    visible?: boolean;
    title?: string;
    width?: string | number;
    alignCenter?: boolean;
    cancelText?: string;
    confirmText?: string;
    showSubmit?: boolean;
    disabledSubmit?: boolean;
}
/**
 * AoForm 入口事件
 * @description 透传表单主体事件，并上报弹窗显隐、取消操作及关闭动画完成。
 */
export interface FormWrapperEmits extends FormEmits {
    'update:visible': [boolean];
    cancel: [];
    closed: [];
}
/**
 * 输出清洗策略
 * @description 控制表单输出时空值的移除范围，同时保留 0 与 false 这类有效值
 */
export interface SanitizeOutputOptions {
    removeEmptyString: boolean;
    removeEmptyArray: boolean;
    removeEmptyObject: boolean;
    removeEmptyRichText: boolean;
    keepZero: boolean;
    keepFalse: boolean;
}
/**
 * 响应式断点
 * @description 基于 Element Plus Grid 24 栅格系统的断点标识，用于表单项列宽降级计算
 */
export type ResponsiveBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/**
 * 搜索表单项配置
 * @description 由 AoSearchBar 消费；label 支持文本或自定义渲染函数。
 */
export interface SearchFormItem extends FormItemBase {
    /** 表单项的标签文本或自定义渲染函数 */
    label: string | (() => VNode) | Component;
}
