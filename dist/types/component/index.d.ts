import { FormRules, PaginationProps, TableProps, TableColumnCtx } from 'element-plus';
import { SearchFormItem } from './form';
/**
 * 表格列配置接口
 * @description 沿用原生列属性和 formatter，slotName 指定 AoTable 上的自定义插槽。
 */
export interface ColumnOption<T extends Record<string, any> = any> {
    type?: 'selection' | 'expand' | 'index' | 'globalIndex';
    prop?: string;
    columnKey?: string;
    label?: string;
    width?: string | number;
    minWidth?: string | number;
    fixed?: boolean | 'left' | 'right';
    sortable?: boolean | 'custom';
    filters?: any[];
    filterMethod?: (value: any, row: T) => boolean;
    filterPlacement?: string;
    disabled?: boolean;
    visible?: boolean;
    checked?: boolean;
    formatter?: TableColumnCtx<T>['formatter'];
    slotName?: string;
    [key: string]: any;
}
/**
 * 表格分页状态
 * @description 由页面持有；AoTable 通过原生 size-change/current-change 事件上报交互。
 */
export interface TablePaginationState {
    currentPage: number;
    pageSize: number;
    total: number;
}
/**
 * 分页器外观配置
 * @description 复用 Element Plus 原生属性类型，分页器在表格底部固定靠右。
 */
export type TablePaginationOptions = Pick<PaginationProps, 'pageSizes' | 'layout' | 'background' | 'hideOnSinglePage' | 'size' | 'pagerCount'>;
export * from './form';
/**
 * AoTable 组件 Props 接口
 * @description 继承 ElTable 除 data 外的全部属性，并扩展列配置、搜索栏与分页集成能力。
 */
export interface AoTableProps<T extends Record<string, any> = Record<string, any>> extends Omit<TableProps<T>, 'data'> {
    /** 表格数据，由页面请求后传入，组件不做任何二次处理 */
    data?: T[];
    /** 列渲染配置，单元格内容通过同名插槽渲染 */
    columns?: ColumnOption<T>[];
    /** 分页状态，由页面持有；交互通过原生 size-change/current-change 事件回传 */
    pagination?: TablePaginationState;
    /** 加载状态 */
    loading?: boolean;
    /** 分页配置 */
    paginationOptions?: Partial<TablePaginationOptions>;
    /** 空数据表格高度 */
    emptyHeight?: string;
    /** 空数据时显示的文本 */
    emptyText?: string;
    /** 是否开启 AoTableHeader，解决表格高度自适应问题 */
    showTableHeader?: boolean;
    /** 搜索项配置（同 AoSearchBar 的 items），传入后自动在表格上方渲染搜索栏 */
    searchItems?: SearchFormItem[];
    /** 搜索表单校验规则，配置后点击查询会先校验，未通过则不触发查询 */
    searchRules?: FormRules;
    /** 搜索栏单项占位宽度（24 栅格），默认沿用 AoSearchBar 的 6 */
    searchSpan?: number;
    /** 搜索栏是否显示展开 / 收起按钮，默认沿用 AoSearchBar 的 true */
    searchShowExpand?: boolean;
    /** 是否显示搜索栏；有搜索项时默认显示并启用头部搜索开关，显式传入可覆盖 */
    showSearchBar?: boolean;
    /** 表格头部是否显示斑马纹开关，默认沿用 AoTableHeader 的 true */
    headerShowZebra?: boolean;
    /** 表格头部是否显示边框开关，默认沿用 AoTableHeader 的 true */
    headerShowBorder?: boolean;
    /** 表格头部是否显示表头背景开关，默认沿用 AoTableHeader 的 true */
    headerShowHeaderBackground?: boolean;
    /** 是否启用集成布局（搜索栏 + 卡片 + 表格头部），默认按 searchItems / 头部插槽自动判断 */
    integrated?: boolean;
}
