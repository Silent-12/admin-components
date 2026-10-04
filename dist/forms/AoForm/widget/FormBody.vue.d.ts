import { FormInstance } from 'element-plus';
import { FormItem, FormProps } from '../../../types/component';
type __VLS_Props = FormProps;
type __VLS_PublicProps = {
    modelValue?: Record<string, any>;
} & __VLS_Props;
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<string, (_: {
        item: FormItem;
        modelValue: Record<string, any>;
    }) => any>>;
    refs: {
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
    rootEl: HTMLElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_PublicProps, {
    validate: (callback?: import('element-plus').FormValidateCallback | undefined) => ReturnType<FormInstance["validate"]>;
    reset: () => void;
    submit: () => Promise<void>;
    getOutput: () => Record<string, any>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: Record<string, any>) => any;
    reset: () => any;
    submit: (args_0: Record<string, any>) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: Record<string, any>) => any) | undefined;
    onReset?: (() => any) | undefined;
    onSubmit?: ((args_0: Record<string, any>) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
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
}, HTMLElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
