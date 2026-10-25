<!-- AoForm 表单组件入口 -->
<!-- 支持常用表单组件、自定义组件、插槽、校验、隐藏表单项；默认由 AoDialog 承载为弹窗表单，传 :dialog="false" 时为内联表单 -->
<!-- 写法同 ElementPlus 官方文档组件，把属性写在 props 里面就可以了 -->
<!-- 对外 API：ref 可调用 validate / reset / submit / getOutput；getOutput 允许外部在不触发提交事件时读取清洗后的表单输出 -->
<!-- 弹窗模式（默认）：v-model:visible 控制显隐；底部操作区固定为 取消 / 确定（确定 = 校验通过后触发 submit 并携带清洗后的全部表单值，校验失败只展示行内错误且不上报，是否关闭弹窗由业务决定），按钮文案可用 cancelText / confirmText 覆盖 -->
<!-- 底部操作区默认右对齐；需要替换或增删按钮时用 #footer 插槽整体接管，仅需调整位置时穿透样式修改即可 -->
<!-- 弹窗默认支持拖拽头部，在浏览器可视区域内移动，拖拽与边界限制由 ElDialog 原生能力处理 -->
<!-- 弹窗整体高度上限、头部与底部的 1px 分隔线及内边距压缩由 @ao/admin-layout 的 app.scss 提供（.el-dialog.ao-form-dialog），与 AoDialog 共用同一套外观 -->
<template>
  <!-- 弹窗表单模式：弹窗外壳复用 AoDialog，与独立弹窗保持一致的头部、底部与分隔线 -->
  <AoDialog
    v-if="isDialog"
    :visible="visible"
    :title="title"
    :width="width"
    :align-center="alignCenter"
    :cancel-text="cancelText"
    :confirm-text="confirmText"
    :show-confirm="showSubmit"
    :confirm-disabled="disabledSubmit || loading"
    @update:visible="handleVisibleChange"
    @cancel="emit('cancel')"
    @confirm="handleConfirm"
    @closed="emit('closed')"
  >
    <AoFormBody
      ref="formBodyRef"
      v-loading="loading"
      v-bind="{ ...bodyProps, ...$attrs }"
      v-model="modelValue"
      @reset="handleReset"
      @submit="handleSubmit"
    >
      <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps ?? {}" />
      </template>
    </AoFormBody>

    <!-- 底部操作区由 AoDialog 提供默认 取消 / 确定；业务传入 #footer 时整体接管 -->
    <template v-if="slots.footer" #footer>
      <slot name="footer" />
    </template>
  </AoDialog>

  <!-- 内联表单模式 -->
  <AoFormBody
    v-else
    ref="formBodyRef"
    v-loading="loading"
    v-bind="{ ...bodyProps, ...$attrs }"
    v-model="modelValue"
    @reset="handleReset"
    @submit="handleSubmit"
  >
    <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </AoFormBody>
</template>

<script setup lang="ts">
  import { computed, useSlots, useTemplateRef } from 'vue'
  import type { Slots } from 'vue'
  import AoDialog from '../../base/AoDialog.vue'
  import AoFormBody from './widget/FormBody.vue'
  import type { FormWrapperProps, FormWrapperEmits } from '../../types/component'

  defineOptions({ name: 'AoForm', inheritAttrs: false })

  // 组件配置：表单属性的默认值统一收敛在本入口定义，避免 Boolean 属性未传时被 Vue 转为 false、跳过表单主体的默认值
  const props = withDefaults(defineProps<FormWrapperProps>(), {
    items: () => [],
    span: 24,
    gutter: 12,
    labelPosition: 'right',
    labelWidth: '70px',
    sanitizeOutput: () => ({}),
    dialog: true,
    visible: false,
    loading: false,
    title: '',
    width: '600px',
    alignCenter: true,
    cancelText: '',
    confirmText: '',
    showSubmit: true,
    disabledSubmit: false
  })

  const emit = defineEmits<FormWrapperEmits>()

  const modelValue = defineModel<Record<string, any>>({
    default: () => ({}) as Record<string, any>
  })

  // 显式标注运行时插槽，避免声明生成器在动态透传时循环推断 $slots。
  const slots: Slots = useSlots()
  const formBodyRef = useTemplateRef<InstanceType<typeof AoFormBody>>('formBodyRef')

  /** 是否为弹窗表单模式（dialog 默认 true） */
  const isDialog = computed(() => props.dialog)

  /**
   * @description 透传给表单主体的属性：只传表单渲染相关字段，弹窗包装与底部操作按钮的配置不向下透传
   */
  const bodyProps = computed(() => ({
    items: props.items,
    span: props.span,
    gutter: props.gutter,
    labelPosition: props.labelPosition,
    labelWidth: props.labelWidth,
    sanitizeOutput: props.sanitizeOutput
  }))

  /**
   * @description 处理重置事件：由表单主体触发后原样上报（底部不内置重置按钮，业务可通过 ref.reset 或 #footer 插槽自行触发）
   */
  const handleReset = (): void => {
    emit('reset')
  }

  /**
   * @description 处理提交事件：表单主体已完成校验，此处只透传清洗后的输出
   * @param output 清洗后的表单输出
   */
  const handleSubmit = (output: Record<string, any>): void => {
    emit('submit', output)
  }

  /**
   * @description 同步弹窗显隐（遮罩点击、ESC 关闭等场景）到 v-model:visible
   * @param value 弹窗目标显隐状态
   */
  const handleVisibleChange = (value: boolean): void => {
    emit('update:visible', value)
  }

  /**
   * @description 点击确定：交由表单主体执行校验并触发 submit，弹窗是否关闭由业务层在 submit 回调中决定
   */
  const handleConfirm = (): void => {
    formBodyRef.value?.submit()
  }

  defineExpose({
    /** 校验表单，透传表单主体的 validate */
    validate: (
      ...args: Parameters<InstanceType<typeof AoFormBody>['validate']>
    ): ReturnType<InstanceType<typeof AoFormBody>['validate']> =>
      formBodyRef.value!.validate(...args),
    /**
     * @description 清除指定字段或全部字段的校验状态，透传表单主体的 clearValidate
     * @param args 待清除校验的字段参数，省略时清除全部字段
     */
    clearValidate: (...args: Parameters<InstanceType<typeof AoFormBody>['clearValidate']>): void =>
      formBodyRef.value?.clearValidate(...args),
    /** 重置表单，透传表单主体的 reset */
    reset: () => formBodyRef.value?.reset(),
    /** 触发提交（含校验），透传表单主体的 submit */
    submit: () => formBodyRef.value?.submit(),
    /** 读取清洗后的表单输出，透传表单主体的 getOutput */
    getOutput: () => formBodyRef.value?.getOutput() ?? {}
  })
</script>

<script lang="ts">
  // 对外类型由入口统一导出，业务层无需感知内部拆分
  export type { FormItem } from '../../types/component'
</script>
