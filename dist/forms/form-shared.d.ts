import { Component } from 'vue';
import { FormComponentType, FormItemBase, FormOption, FormSlotFn, ResponsiveBreakpoint, SanitizeOutputOptions } from '../types/component';
/** 预定义表单组件映射，type 配置与组件一一对应，键集合由 FormComponentType 约束 */
export declare const componentMap: Record<FormComponentType, Component>;
/** 表单项自有的布局与渲染控制字段，透传给渲染组件前必须剔除，否则会泄漏为 DOM 属性 */
export declare const FORM_ITEM_ROOT_PROPS: readonly ["label", "labelWidth", "key", "type", "hidden", "span", "slots", "render", "options"];
/**
 * 分组标题项的类型标识
 * @description 声明该 type 的表单项独占一行、只渲染标题文本，不渲染表单控件，也不写入表单数据。
 * key 仅用于列表渲染去重，建议使用 `section-*` 这类不与业务字段同名的标识。
 */
export declare const FORM_TITLE_TYPE = "title";
/**
 * @description 判断表单项是否为分组标题项
 * @param item 表单项配置
 * @return 是否为分组标题项
 */
export declare const isFormTitleItem: (item: FormItemBase) => boolean;
/** 输出清洗策略默认值，偏“接口友好”：去掉各类空值，但保留 0 与 false */
export declare const DEFAULT_SANITIZE_OPTIONS: SanitizeOutputOptions;
/**
 * @description 解析点路径为段数组，兼容 a.b、a.0.b 写法，数字段会被当作数组索引处理
 * @param path 点路径字符串
 * @return 路径段数组，数字段已转换为 number
 */
export declare const parsePath: (path: string) => Array<string | number>;
/**
 * @description 深度克隆表单数据，避免重置等场景修改原始引用
 * @param value 待克隆的表单数据
 * @return 克隆后的表单数据
 */
export declare const cloneModelValue: (value: Record<string, unknown> | undefined) => Record<string, unknown>;
/**
 * @description 按点路径读取表单数据
 * @param source 表单数据
 * @param path 点路径字符串
 * @return 路径对应的值，中间节点不存在时返回 undefined
 */
export declare const getValueByPath: (source: Record<string, unknown> | undefined, path: string) => unknown;
/**
 * @description 按点路径删除表单数据，只删除路径的最后一段，避免误删同级数据
 * @param source 表单数据
 * @param path 点路径字符串
 */
export declare const deleteValueByPath: (source: Record<string, unknown>, path: string) => void;
/**
 * @description 按点路径写入表单数据，清空输入（空字符串）时不保留空字段，并按路径自动补齐中间对象或数组
 * @param source 表单数据
 * @param path 点路径字符串
 * @param value 待写入的值，空字符串会被视为清空
 */
export declare const setValueByPath: (source: Record<string, unknown>, path: string, value: unknown) => void;
/**
 * @description 判断富文本是否为空：仅含编辑器占位标签（如 <p><br></p>、&nbsp;）视为空，包含媒体元素则视为有内容
 * @param value 富文本 HTML 字符串
 * @return 是否为空富文本
 */
export declare const isRichTextEmpty: (value: string) => boolean;
/**
 * @description 递归清洗表单输出值，按策略移除空值，但保留 0 和 false 这类有效值
 * @param value 待清洗的值
 * @param options 清洗策略
 * @return 清洗后的值，被移除的分支返回 undefined
 */
export declare const sanitizeOutputValue: (value: unknown, options?: SanitizeOutputOptions) => unknown;
/**
 * @description 克隆表单数据并清洗输出，业务层与接口层拿到的都是无空值干扰的结果
 * @param value 表单数据
 * @param options 清洗策略
 * @return 清洗后的表单输出，整体为空时返回空对象
 */
export declare const sanitizeFormOutput: <T extends Record<string, unknown>>(value: Record<string, unknown> | undefined, options?: SanitizeOutputOptions) => T;
/**
 * @description 获取表单项需要透传给渲染组件的属性：优先使用 item.props，否则剔除表单项自有字段后返回其余配置
 * @param item 表单项配置
 * @return 需要绑定到表单组件的属性对象
 */
export declare const getItemProps: (item: FormItemBase) => Record<string, unknown>;
/**
 * @description 获取表单项的选项数据，支持通过 item.props.options 或 item.options 传入
 * @param item 表单项配置
 * @return 选项数组，配置缺失或类型不符时返回空数组
 */
export declare const getOptions: (item: FormItemBase) => FormOption[];
/**
 * @description 获取表单项的有效插槽配置，过滤掉值为 undefined 的插槽
 * @param item 表单项配置
 * @return 过滤后的插槽映射
 */
export declare const getValidSlots: (item: FormItemBase) => Record<string, FormSlotFn>;
/**
 * @description 获取表单项对应的渲染组件：优先使用 render 函数或组件，其次按 type 查预定义映射，未知类型回退为输入框
 * @param item 表单项配置
 * @return 渲染组件
 */
export declare const getRenderComponent: (item: FormItemBase) => Component | (() => import('vue').VNode);
/**
 * @description 计算响应式列宽：根据屏幕尺寸智能降级，避免小屏幕上表单项被压缩过小
 * @param span 已解析的 24 栅格列宽，默认值由调用方在传入前决定
 * @param breakpoint 当前断点
 * @return 计算后的 span 值
 */
export declare function calculateResponsiveSpan(span: number, breakpoint: ResponsiveBreakpoint): number;
/** 移动端断点（px），两个组件的响应式布局与按钮对齐共用同一阈值 */
export declare const FORM_MOBILE_BREAKPOINT = 500;
/** AoForm 表单项未声明 span 时的默认格数（相对行基准），对应 24 栅格基准下每行 4 个 */
export declare const FORM_DEFAULT_ITEM_SPAN = 6;
/**
 * @description 将表单项格数（相对行基准）换算为 ElCol 的 24 栅格宽度，如行基准 12 时 4 格换算为 8
 * @param itemSpan 表单项声明的格数，未声明时使用 FORM_DEFAULT_ITEM_SPAN
 * @param baseSpan 行基准格数，非法值（非正数或未定义）按 24 处理
 * @return 24 栅格下的列宽，收敛到 [1, 24]
 */
export declare const convertItemSpanToCol: (itemSpan: number | undefined, baseSpan: number | undefined) => number;
/**
 * @description 计算操作按钮的对齐方式：移动端靠右；非移动端在表单项数量不超过阈值时靠左，否则靠右
 * @param isMobile 是否处于移动端
 * @param visibleItemCount 可见表单项数量
 * @param buttonLeftLimit 按钮靠左对齐的表单项数量上限，未定义时按默认值 2 处理
 * @return 对应 CSS justify-content 的取值
 */
export declare const resolveActionButtonsAlign: (isMobile: boolean, visibleItemCount: number, buttonLeftLimit?: number) => "flex-start" | "flex-end";
