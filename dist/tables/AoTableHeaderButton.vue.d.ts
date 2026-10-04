interface Props {
    /** 图标名称 */
    icon: string;
    /** 悬停提示文案，为空时不渲染 Tooltip */
    content?: string;
    /** 激活态，如搜索栏展开时高亮 */
    active?: boolean;
    /** 加载态，如表格数据刷新请求进行中 */
    loading?: boolean;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    click: (event: MouseEvent) => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
    loading: boolean;
    content: string;
    active: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    triggerRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
