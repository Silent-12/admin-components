import { default as AoFormBody } from './widget/FormBody.vue';
import { FormWrapperProps } from '../../types/component';
export type { FormItem } from '../../types/component';
declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
    modelValue?: Record<string, any>;
} & FormWrapperProps, {
    /** 校验表单，透传表单主体的 validate */
    validate: (callback?: import('element-plus').FormValidateCallback | undefined) => ReturnType<InstanceType<typeof AoFormBody>["validate"]>;
    /** 重置表单，透传表单主体的 reset */
    reset: () => void | undefined;
    /** 触发提交（含校验），透传表单主体的 submit */
    submit: () => Promise<void> | undefined;
    /** 读取清洗后的表单输出，透传表单主体的 getOutput */
    getOutput: () => Record<string, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: Record<string, any>) => any;
    reset: () => any;
    cancel: () => any;
    submit: (args_0: Record<string, any>) => any;
    "update:visible": (args_0: boolean) => any;
    closed: () => any;
}, string, import('vue').PublicProps, Readonly<{
    modelValue?: Record<string, any>;
} & FormWrapperProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: Record<string, any>) => any) | undefined;
    onReset?: (() => any) | undefined;
    onCancel?: (() => any) | undefined;
    onSubmit?: ((args_0: Record<string, any>) => any) | undefined;
    "onUpdate:visible"?: ((args_0: boolean) => any) | undefined;
    onClosed?: (() => any) | undefined;
}>, {
    width: string | number;
    visible: boolean;
    labelWidth: string | number;
    span: number;
    title: string;
    items: import('../../types/component').FormItem[];
    gutter: number;
    labelPosition: "left" | "right" | "top";
    sanitizeOutput: Partial<import('../../types/component').SanitizeOutputOptions>;
    dialog: boolean;
    alignCenter: boolean;
    cancelText: string;
    confirmText: string;
    showSubmit: boolean;
    disabledSubmit: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    formBodyRef: ({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: {
            readonly modelValue?: Record<string, any> | undefined;
            readonly items: import('../../types/component').FormItem[];
            readonly span?: number | undefined;
            readonly gutter?: number | undefined;
            readonly labelPosition?: ("left" | "right" | "top") | undefined;
            readonly labelWidth?: (string | number) | undefined;
            readonly sanitizeOutput?: Partial<import('../../types/component').SanitizeOutputOptions> | undefined;
            readonly "onUpdate:modelValue"?: ((value: Record<string, any>) => any) | undefined;
            readonly onReset?: (() => any) | undefined;
            readonly onSubmit?: ((args_0: Record<string, any>) => any) | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
        $attrs: import('vue').Attrs;
        $refs: {
            [x: string]: unknown;
        } & {
            formRef: ({
                $: import('vue').ComponentInternalInstance;
                $data: {};
                $props: {
                    readonly model?: Record<string, any> | undefined;
                    readonly rules?: import('element-plus').FormRules | undefined;
                    readonly labelPosition?: ("left" | "right" | "top") | undefined;
                    readonly requireAsteriskPosition?: ("left" | "right") | undefined;
                    readonly labelWidth?: (string | number) | undefined;
                    readonly labelSuffix?: string | undefined;
                    readonly inline?: boolean | undefined;
                    readonly inlineMessage?: boolean | undefined;
                    readonly statusIcon?: boolean | undefined;
                    readonly showMessage?: boolean | undefined;
                    readonly validateOnRuleChange?: boolean | undefined;
                    readonly hideRequiredAsterisk?: boolean | undefined;
                    readonly scrollToError?: boolean | undefined;
                    readonly scrollIntoViewOptions?: (ScrollIntoViewOptions | boolean) | undefined;
                    readonly size?: import('element-plus').ComponentSize | undefined;
                    readonly disabled?: boolean | undefined;
                    readonly onValidate?: ((prop: import('element-plus').FormItemProp, isValid: boolean, message: string) => any) | undefined;
                } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
                $attrs: import('vue').Attrs;
                $refs: {
                    [x: string]: unknown;
                };
                $slots: Readonly<{
                    [name: string]: import('vue').Slot<any> | undefined;
                }>;
                $root: import('vue').ComponentPublicInstance | null;
                $parent: import('vue').ComponentPublicInstance | null;
                $host: Element | null;
                $emit: (event: "validate", prop: import('element-plus').FormItemProp, isValid: boolean, message: string) => void;
                $el: any;
                $options: import('vue').ComponentOptionsBase<Readonly<import('element-plus').FormProps> & Readonly<{
                    onValidate?: ((prop: import('element-plus').FormItemProp, isValid: boolean, message: string) => any) | undefined;
                }>, {
                    validate: (callback?: import('element-plus').FormValidateCallback) => import('element-plus').FormValidationResult;
                    validateField: (props?: import('element-plus/es/utils/typescript').Arrayable<import('element-plus').FormItemProp>, callback?: import('element-plus').FormValidateCallback) => import('element-plus').FormValidationResult;
                    resetFields: (props?: import('element-plus/es/utils/typescript').Arrayable<import('element-plus').FormItemProp>) => void;
                    clearValidate: (props?: import('element-plus/es/utils/typescript').Arrayable<import('element-plus').FormItemProp>) => void;
                    scrollToField: (prop: import('element-plus').FormItemProp) => void;
                    getField: (prop: import('element-plus').FormItemProp) => import('element-plus').FormItemContext | undefined;
                    fields: import('vue').Reactive<import('element-plus').FormItemContext[]>;
                    setInitialValues: (initModel: Record<string, any>) => void;
                }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
                    validate: (prop: import('element-plus').FormItemProp, isValid: boolean, message: string) => void;
                }, string, {
                    labelWidth: string | number;
                    labelPosition: "left" | "right" | "top";
                    requireAsteriskPosition: "left" | "right";
                    labelSuffix: string;
                    showMessage: boolean;
                    validateOnRuleChange: boolean;
                    scrollIntoViewOptions: ScrollIntoViewOptions | boolean;
                }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
                    beforeCreate?: (() => void) | (() => void)[];
                    created?: (() => void) | (() => void)[];
                    beforeMount?: (() => void) | (() => void)[];
                    mounted?: (() => void) | (() => void)[];
                    beforeUpdate?: (() => void) | (() => void)[];
                    updated?: (() => void) | (() => void)[];
                    activated?: (() => void) | (() => void)[];
                    deactivated?: (() => void) | (() => void)[];
                    beforeDestroy?: (() => void) | (() => void)[];
                    beforeUnmount?: (() => void) | (() => void)[];
                    destroyed?: (() => void) | (() => void)[];
                    unmounted?: (() => void) | (() => void)[];
                    renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
                    renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
                    errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
                };
                $forceUpdate: () => void;
                $nextTick: typeof import('vue').nextTick;
                $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
            } & Readonly<{
                labelWidth: string | number;
                labelPosition: "left" | "right" | "top";
                requireAsteriskPosition: "left" | "right";
                labelSuffix: string;
                showMessage: boolean;
                validateOnRuleChange: boolean;
                scrollIntoViewOptions: ScrollIntoViewOptions | boolean;
            }> & Omit<Readonly<import('element-plus').FormProps> & Readonly<{
                onValidate?: ((prop: import('element-plus').FormItemProp, isValid: boolean, message: string) => any) | undefined;
            }>, "labelWidth" | "labelPosition" | "requireAsteriskPosition" | "labelSuffix" | "showMessage" | "validateOnRuleChange" | "scrollIntoViewOptions" | "validate" | "validateField" | "resetFields" | "clearValidate" | "scrollToField" | "getField" | "fields" | "setInitialValues"> & {
                validate: (callback?: import('element-plus').FormValidateCallback) => import('element-plus').FormValidationResult;
                validateField: (props?: import('element-plus/es/utils/typescript').Arrayable<import('element-plus').FormItemProp>, callback?: import('element-plus').FormValidateCallback) => import('element-plus').FormValidationResult;
                resetFields: (props?: import('element-plus/es/utils/typescript').Arrayable<import('element-plus').FormItemProp>) => void;
                clearValidate: (props?: import('element-plus/es/utils/typescript').Arrayable<import('element-plus').FormItemProp>) => void;
                scrollToField: (prop: import('element-plus').FormItemProp) => void;
                getField: (prop: import('element-plus').FormItemProp) => import('element-plus').FormItemContext | undefined;
                fields: import('vue').Reactive<import('element-plus').FormItemContext[]>;
                setInitialValues: (initModel: Record<string, any>) => void;
            } & {} & import('vue').ComponentCustomProperties & {} & {
                $slots: {
                    default?: (props: {}) => any;
                };
            }) | null;
        };
        $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined;
        }>;
        $root: import('vue').ComponentPublicInstance | null;
        $parent: import('vue').ComponentPublicInstance | null;
        $host: Element | null;
        $emit: ((event: "update:modelValue", value: Record<string, any>) => void) & ((event: "reset") => void) & ((event: "submit", args_0: Record<string, any>) => void);
        $el: HTMLElement;
        $options: import('vue').ComponentOptionsBase<Readonly<{
            modelValue?: Record<string, any>;
        } & import('../../types/component').FormProps> & Readonly<{
            "onUpdate:modelValue"?: ((value: Record<string, any>) => any) | undefined;
            onReset?: (() => any) | undefined;
            onSubmit?: ((args_0: Record<string, any>) => any) | undefined;
        }>, {
            validate: (callback?: import('element-plus').FormValidateCallback | undefined) => ReturnType<import('element-plus').FormInstance["validate"]>;
            reset: () => void;
            submit: () => Promise<void>;
            getOutput: () => Record<string, any>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            "update:modelValue": (value: Record<string, any>) => any;
            reset: () => any;
            submit: (args_0: Record<string, any>) => any;
        }, string, {}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import('vue').nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
    } & Readonly<{}> & Omit<Readonly<{
        modelValue?: Record<string, any>;
    } & import('../../types/component').FormProps> & Readonly<{
        "onUpdate:modelValue"?: ((value: Record<string, any>) => any) | undefined;
        onReset?: (() => any) | undefined;
        onSubmit?: ((args_0: Record<string, any>) => any) | undefined;
    }>, "reset" | "validate" | "getOutput" | "submit"> & {
        validate: (callback?: import('element-plus').FormValidateCallback | undefined) => ReturnType<import('element-plus').FormInstance["validate"]>;
        reset: () => void;
        submit: () => Promise<void>;
        getOutput: () => Record<string, any>;
    } & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: Partial<Record<string, (_: {
            item: import('../../types/component').FormItem;
            modelValue: Record<string, any>;
        }) => any>>;
    }) | null;
}, any>, Partial<Record<NonNullable<string | number>, (_: {
    item: import('../../types/component').FormItem;
    modelValue: Record<string, any>;
}) => any>> & Partial<Record<NonNullable<string | number>, (_: {
    item: import('../../types/component').FormItem;
    modelValue: Record<string, any>;
}) => any>> & {
    footer?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
