import { TableInstance } from 'element-plus';
import { AoTableProps, ColumnOption } from '../../types/component';
declare const _default: <T extends Record<string, any> = Record<string, any>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{
        readonly onSearch?: ((params: Record<string, any>) => any) | undefined;
        readonly onReset?: (() => any) | undefined;
        readonly onRefresh?: (() => any) | undefined;
        readonly "onUpdate:showSearchBar"?: ((value: boolean) => any) | undefined;
        readonly "onUpdate:searchForm"?: ((value: Record<string, any>) => any) | undefined;
        readonly "onUpdate:columnChecks"?: ((value: ColumnOption<T>[]) => any) | undefined;
        readonly "onSize-change"?: ((value: number) => any) | undefined;
        readonly "onCurrent-change"?: ((value: number) => any) | undefined;
    } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, never>, "onReset" | "onSearch" | "onRefresh" | "onUpdate:showSearchBar" | "onUpdate:searchForm" | "onUpdate:columnChecks" | "onSize-change" | "onCurrent-change"> & ({
        searchForm?: Record<string, any>;
        columnChecks?: ColumnOption<T>[];
    } & AoTableProps<T>) & any> & import('vue').PublicProps;
    expose(exposed: import('vue').ShallowUnwrapRef<{
        scrollToTop: () => void;
        elTableRef: import('vue').Ref<TableInstance | null, TableInstance | null>;
    }>): void;
    attrs: any;
    slots: any;
    emit: {
        (e: "size-change", value: number): void;
        (e: "current-change", value: number): void;
        (e: "refresh"): void;
        (e: "search", params: Record<string, any>): void;
        (e: "reset"): void;
        (e: "update:showSearchBar", value: boolean): void;
    } & (((evt: "update:searchForm", value: Record<string, any>) => void) & ((evt: "update:columnChecks", value: ColumnOption<T>[]) => void));
}>) => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
