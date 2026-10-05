import { Plugin } from 'vue';
import { version } from './version';
import { AuthListGetter } from './hooks/useAuth';
import { LocalSvgResolver } from './hooks/useLocalSvg';
import { default as AoTable } from './tables/AoTable/index.vue';
import { default as AoTableHeader } from './tables/AoTableHeader.vue';
import { default as AoTableHeaderButton } from './tables/AoTableHeaderButton.vue';
import { default as AoForm } from './forms/AoForm/index.vue';
import { default as AoSearchBar } from './forms/AoSearchBar.vue';
import { default as AoButtonTable } from './forms/AoButtonTable.vue';
import { default as AoButtonMore } from './forms/AoButtonMore.vue';
import { default as AoExcelExport } from './forms/AoExcelExport.vue';
import { default as AoExcelImport } from './forms/AoExcelImport.vue';
import { default as AoSvgIcon } from './base/AoSvgIcon.vue';
import { default as AoIconButton } from './widget/AoIconButton.vue';
import { default as AoLogo } from './base/AoLogo.vue';
/** 宿主 i18n 实例的最小结构约束，兼容 legacy / composition 两种模式 */
interface MergeableI18n {
    global: {
        mergeLocaleMessage: (locale: string, messages: Record<string, unknown>) => void;
    };
}
/** 组件包安装选项 */
export interface AdminComponentsOptions {
    /** 宿主 vue-i18n 实例；传入后包内置语言包（common/table 段）会合并进去 */
    i18n?: MergeableI18n;
    /** 权限列表获取函数；未注入时按钮级权限判断视为无权限 */
    getAuthList?: AuthListGetter;
    /** 宿主本地 SVG 解析函数；未注入时所有图标名走 iconify */
    resolveLocalSvg?: LocalSvgResolver;
    /** 宿主品牌资源 */
    assets?: {
        /** 默认 logo 图片地址，供 AoLogo 使用 */
        logo?: string;
    };
}
/**
 * 组件包插件
 * @description 安装时在控制台静默输出版本号，注册 loading 指令，
 * 合并内置语言包并保存宿主注入的权限获取函数与资源解析函数。
 */
export declare const AdminComponents: Plugin;
export { version };
export { AoTable, AoTableHeader, AoTableHeaderButton, AoForm, AoSearchBar, AoButtonTable, AoButtonMore, AoExcelExport, AoExcelImport, AoSvgIcon, AoIconButton, AoLogo };
export * from './types/component';
export { TableSizeEnum } from './enums/formEnum';
export type { ButtonMoreItem } from './forms/AoButtonMore.vue';
export { useAuth, AUTH_LIST_KEY, type AuthListGetter } from './hooks/useAuth';
export { LOCAL_SVG_KEY, LOGO_URL_KEY, type LocalSvgResolver } from './hooks/useLocalSvg';
export { useTableHeight } from './hooks/useTableHeight';
export { useTableColumns, getColumnKey, getColumnVisibility, type DynamicColumnConfig } from './hooks/useTableColumns';
export { useTableStore } from './store/modules/table';
