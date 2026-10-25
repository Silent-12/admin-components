import { AoDialogProps } from '../types/component';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<AoDialogProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    cancel: () => any;
    "update:visible": (args_0: boolean) => any;
    confirm: () => any;
    closed: () => any;
}, string, import('vue').PublicProps, Readonly<AoDialogProps> & Readonly<{
    onCancel?: (() => any) | undefined;
    "onUpdate:visible"?: ((args_0: boolean) => any) | undefined;
    onConfirm?: (() => any) | undefined;
    onClosed?: (() => any) | undefined;
}>, {
    width: string | number;
    visible: boolean;
    loading: boolean;
    showConfirm: boolean;
    title: string;
    alignCenter: boolean;
    showCancel: boolean;
    cancelText: string;
    confirmText: string;
    confirmDisabled: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
