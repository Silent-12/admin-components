import { ButtonType } from 'element-plus';
/** 导出数据类型 */
type ExportValue = string | number | boolean | null | undefined | Date;
interface ExportData {
    [key: string]: ExportValue;
}
/** 列配置 */
interface ColumnConfig {
    /** 列标题 */
    title: string;
    /** 列宽度 */
    width?: number;
    /** 数据格式化函数 */
    formatter?: (value: ExportValue, row: ExportData, index: number) => string;
}
/** 导出配置选项 */
interface ExportOptions {
    /** 数据源 */
    data: ExportData[];
    /** 文件名（不含扩展名） */
    filename?: string;
    /** 工作表名称 */
    sheetName?: string;
    /** 按钮类型 */
    type?: ButtonType;
    /** 按钮尺寸 */
    size?: 'large' | 'default' | 'small';
    /** 是否禁用 */
    disabled?: boolean;
    /** 按钮文本 */
    buttonText?: string;
    /** 加载中文本 */
    loadingText?: string;
    /** 是否自动添加序号列 */
    autoIndex?: boolean;
    /** 序号列标题 */
    indexColumnTitle?: string;
    /** 列配置映射 */
    columns?: Record<string, ColumnConfig>;
    /** 表头映射（简化版本，向后兼容） */
    headers?: Record<string, string>;
    /** 最大导出行数 */
    maxRows?: number;
    /** 是否显示成功消息 */
    showSuccessMessage?: boolean;
    /** 是否显示错误消息 */
    showErrorMessage?: boolean;
    /** 工作簿配置 */
    workbookOptions?: {
        /** 创建者 */
        creator?: string;
        /** 最后修改者 */
        lastModifiedBy?: string;
        /** 创建时间 */
        created?: Date;
        /** 修改时间 */
        modified?: Date;
    };
}
/** 导出错误类型 */
declare class ExportError extends Error {
    code: string;
    details?: any;
    constructor(message: string, code: string, details?: any);
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<ExportOptions, {
    exportData: import('@vueuse/core').PromisifyFn<() => Promise<void>>;
    isExporting: Readonly<import('vue').Ref<boolean, boolean>>;
    hasData: import('vue').ComputedRef<boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "before-export": (data: ExportData[]) => any;
    "export-success": (filename: string, rowCount: number) => any;
    "export-error": (error: ExportError) => any;
    "export-progress": (progress: number) => any;
}, string, import('vue').PublicProps, Readonly<ExportOptions> & Readonly<{
    "onBefore-export"?: ((data: ExportData[]) => any) | undefined;
    "onExport-success"?: ((filename: string, rowCount: number) => any) | undefined;
    "onExport-error"?: ((error: ExportError) => any) | undefined;
    "onExport-progress"?: ((progress: number) => any) | undefined;
}>, {
    size: "large" | "default" | "small";
    type: ButtonType;
    disabled: boolean;
    columns: Record<string, ColumnConfig>;
    loadingText: string;
    filename: string;
    sheetName: string;
    buttonText: string;
    autoIndex: boolean;
    indexColumnTitle: string;
    headers: Record<string, string>;
    maxRows: number;
    showSuccessMessage: boolean;
    showErrorMessage: boolean;
    workbookOptions: {
        /** 创建者 */
        creator?: string;
        /** 最后修改者 */
        lastModifiedBy?: string;
        /** 创建时间 */
        created?: Date;
        /** 修改时间 */
        modified?: Date;
    };
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
