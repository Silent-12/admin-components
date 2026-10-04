import { ColumnOption } from '../types/component';
interface Props {
    /** 斑马纹 */
    showZebra?: boolean;
    /** 边框 */
    showBorder?: boolean;
    /** 表头背景 */
    showHeaderBackground?: boolean;
    /** 全屏 class */
    fullClass?: string;
    /** 组件布局，子组件名用逗号分隔 */
    layout?: string;
    /** 加载中 */
    loading?: boolean;
    /** 搜索栏显示状态 */
    showSearchBar?: boolean;
}
type __VLS_Props = Props;
type __VLS_PublicProps = {
    'columns'?: ColumnOption[];
} & __VLS_Props;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        left?(_: {}): any;
        right?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:columns": (value: ColumnOption<any>[]) => any;
} & {
    search: () => any;
    refresh: () => any;
    "update:showSearchBar": (value: boolean) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onSearch?: (() => any) | undefined;
    onRefresh?: (() => any) | undefined;
    "onUpdate:showSearchBar"?: ((value: boolean) => any) | undefined;
    "onUpdate:columns"?: ((value: ColumnOption<any>[]) => any) | undefined;
}>, {
    layout: string;
    showZebra: boolean;
    showBorder: boolean;
    showHeaderBackground: boolean;
    fullClass: string;
    showSearchBar: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
