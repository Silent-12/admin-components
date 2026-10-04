export interface ButtonMoreItem {
    /** 按钮标识，可用于点击事件 */
    key: string | number;
    /** 按钮文本 */
    label: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 权限标识 */
    auth?: string;
    /** 图标组件 */
    icon?: string;
    /** 文本颜色 */
    color?: string;
    /** 图标颜色（优先级高于 color） */
    iconColor?: string;
}
interface Props {
    /** 下拉项列表 */
    list: ButtonMoreItem[];
    /** 整体权限控制 */
    auth?: string;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    click: (item: ButtonMoreItem) => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClick?: ((item: ButtonMoreItem) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
