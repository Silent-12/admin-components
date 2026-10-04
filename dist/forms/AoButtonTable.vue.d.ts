interface Props {
    /** 按钮类型 */
    type?: 'add' | 'edit' | 'delete' | 'more' | 'view';
    /** 按钮图标 */
    icon?: string;
    /** 按钮样式类 */
    iconClass?: string;
    /** icon 颜色 */
    iconColor?: string;
    /** 按钮背景色 */
    buttonBgColor?: string;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    click: () => any;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    onClick?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
