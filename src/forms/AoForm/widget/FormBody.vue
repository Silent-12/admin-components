<!-- AoForm 表单主体：只负责 ElForm 渲染与表单项循环，不承载操作按钮；弹窗模式的操作按钮在上级 index.vue 的底部，内联模式由页面自行提供 -->
<!-- 支持常用表单组件、自定义组件、插槽、校验、隐藏表单项 -->
<!-- 写法同 ElementPlus 官方文档组件，把属性写在 props 里面就可以了 -->
<!-- 与 AoSearchBar 的契约差异：本组件直接对 v-model 对象做受控变更（就地修改，不整体替换）；AoSearchBar 内部持有状态并整体上报 -->
<template>
  <section class="form-section">
    <ElForm
      ref="formRef"
      :model="modelValue"
      :label-position="labelPosition"
      v-bind="{ ...$attrs }"
    >
      <ElRow :gutter="gutter">
        <ElCol
          v-for="item in visibleFormItems"
          :key="item.key"
          :xs="getColSpan(item, 'xs')"
          :sm="getColSpan(item, 'sm')"
          :md="getColSpan(item, 'md')"
          :lg="getColSpan(item, 'lg')"
          :xl="getColSpan(item, 'xl')"
        >
          <!-- 分组标题项：独占一行，只渲染标题文本，不产生表单控件与数据 -->
          <div v-if="isFormTitleItem(item)" class="form-title">
            <component v-if="typeof item.label !== 'string'" :is="item.label" />
            <span v-else>{{ item.label }}</span>
          </div>
          <ElFormItem
            v-else
            :prop="item.key"
            :label-width="item.label ? item.labelWidth || labelWidth : undefined"
          >
            <template #label v-if="item.label">
              <component v-if="typeof item.label !== 'string'" :is="item.label" />
              <span v-else>{{ item.label }}</span>
            </template>
            <slot :name="item.key" :item="item" :modelValue="modelValue">
              <component
                :is="getRenderComponent(item)"
                :model-value="getFieldValue(item.key)"
                @update:model-value="setFieldValue(item.key, $event)"
                v-bind="getItemProps(item)"
              >
                <!-- 下拉选择 -->
                <template v-if="item.type === 'select' && getOptions(item).length">
                  <ElOption
                    v-for="option in getOptions(item)"
                    v-bind="option"
                    :key="String(option.value)"
                  />
                </template>

                <!-- 复选框组 -->
                <template v-if="item.type === 'checkboxgroup' && getOptions(item).length">
                  <ElCheckbox
                    v-for="option in getOptions(item)"
                    v-bind="option"
                    :key="String(option.value)"
                  />
                </template>

                <!-- 单选框组 -->
                <template v-if="item.type === 'radiogroup' && getOptions(item).length">
                  <ElRadio
                    v-for="option in getOptions(item)"
                    v-bind="option"
                    :key="String(option.value)"
                  />
                </template>

                <!-- 动态插槽支持 -->
                <template
                  v-for="(slotFn, slotName) in getValidSlots(item)"
                  :key="slotName"
                  #[slotName]
                >
                  <component :is="slotFn" />
                </template>
              </component>
            </slot>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref, toRefs, useTemplateRef, watch } from 'vue'
  import { ElCheckbox, ElCol, ElForm, ElFormItem, ElOption, ElRadio, ElRow } from 'element-plus'
  import type { FormInstance } from 'element-plus'
  import type {
    FormItem,
    FormProps,
    FormEmits,
    ResponsiveBreakpoint,
    SanitizeOutputOptions
  } from '../../../types/component'
  import {
    DEFAULT_SANITIZE_OPTIONS,
    calculateResponsiveSpan,
    cloneModelValue,
    convertItemSpanToCol,
    getOptions,
    getRenderComponent,
    getValidSlots,
    getItemProps,
    getValueByPath,
    isFormTitleItem,
    sanitizeFormOutput,
    setValueByPath
  } from '../../form-shared'

  // 表单配置：默认值统一由入口 index.vue 定义，本组件只负责消费
  const props = defineProps<FormProps>()

  const emit = defineEmits<FormEmits>()

  const modelValue = defineModel<Record<string, any>>({
    default: () => ({}) as Record<string, any>
  })

  const formInstance = useTemplateRef<FormInstance>('formRef')

  // 表单快照：保存组件初始化时的表单值，用于 reset 时恢复默认值
  const initialModelValue = ref<Record<string, any>>({})

  initialModelValue.value = cloneModelValue(modelValue.value)

  /**
   * @description 父级整体替换 v-model 对象时重新快照；就地修改（如编辑回填）不触发，保持重置恢复挂载时初始值的契约
   */
  watch(modelValue, (value) => {
    initialModelValue.value = cloneModelValue(value)
  })

  // 输出时的清洗策略默认偏“接口友好”，但允许按业务覆盖。
  const sanitizeOutputOptions = computed<SanitizeOutputOptions>(() => ({
    ...DEFAULT_SANITIZE_OPTIONS,
    ...props.sanitizeOutput
  }))

  /**
   * @description 读取表单项当前值（key 支持点路径）
   * @param key 表单项唯一标识
   * @return 表单项当前值
   */
  const getFieldValue = (key: string): unknown => getValueByPath(modelValue.value, key)

  /**
   * @description 写入表单项值，清空输入时不保留空字符串
   * @param key 表单项唯一标识
   * @param value 待写入的值
   */
  const setFieldValue = (key: string, value: unknown): void => {
    setValueByPath(modelValue.value, key, value)
  }

  /**
   * @description 计算表单项列宽：先把相对行基准的格数换算为 24 栅格宽度，再按屏幕尺寸智能降级，避免小屏幕上表单项被压缩过小；分组标题项独占一行，固定占满 24 栅格
   * @param item 表单项配置
   * @param breakpoint 当前断点
   * @return 计算后的 24 栅格 span 值
   */
  const getColSpan = (item: FormItem, breakpoint: ResponsiveBreakpoint): number => {
    if (isFormTitleItem(item)) return 24
    return calculateResponsiveSpan(convertItemSpanToCol(item.span, span.value), breakpoint)
  }

  /**
   * 可见的表单项
   */
  const visibleFormItems = computed(() => {
    return props.items.filter((item) => !item.hidden)
  })

  /**
   * @description 获取清洗后的表单输出，供外部在不触发提交事件时主动读取
   * @return 清洗后的表单输出
   */
  const getSanitizedOutput = (): Record<string, any> => {
    return sanitizeFormOutput<Record<string, any>>(modelValue.value, sanitizeOutputOptions.value)
  }

  /**
   * @description 处理重置事件：重置表单字段并恢复初始表单值（保留默认值而不是简单清空），最后上报页面
   */
  const handleReset = () => {
    // 重置表单字段（UI 层）
    formInstance.value?.resetFields()

    // 恢复初始表单值，保留默认值而不是简单清空。
    Object.keys(modelValue.value).forEach((key) => {
      delete modelValue.value[key]
    })
    Object.assign(modelValue.value, cloneModelValue(initialModelValue.value))

    // 触发 reset 事件
    emit('reset')
  }

  /**
   * @description 处理提交事件：执行表单校验，校验失败在控制台报错并中断提交，校验通过或无规则时上报清洗后的表单数据
   */
  const handleSubmit = async (): Promise<void> => {
    try {
      await formInstance.value?.validate()
    } catch {
      // 校验失败：控制台报错且不触发提交事件，行内错误由 ElForm 渲染
      console.error('[AoForm] 表单校验失败')
      return
    }

    // 对外只抛出清洗后的结果，避免业务层重复过滤空值。
    emit('submit', getSanitizedOutput())
  }

  defineExpose({
    validate: (
      ...args: Parameters<FormInstance['validate']>
    ): ReturnType<FormInstance['validate']> => formInstance.value!.validate(...args),
    reset: handleReset,
    submit: handleSubmit,
    // 允许外部在不触发提交事件时主动获取清洗后的输出。
    getOutput: getSanitizedOutput
  })

  // 解构 props 以便在模板中直接使用
  const { span, gutter, labelPosition, labelWidth } = toRefs(props)
</script>

<style scoped lang="scss">
  // 表单容器：左右留白由容器自身提供（弹窗 body 只提供垂直留白）；底部不留白，末行下边距已含校验提示的落位空间
  .form-section {
    padding: 1rem 1rem 0;

    // 行内校验提示为绝对定位（top: 100%），依赖表单项下边距容纳其高度：
    // 压缩该间距会让提示与下一行重叠，或被弹窗的 overflow: hidden 裁切
    :deep(.el-form-item) {
      margin-bottom: 18px;
    }
  }

  // 分组标题：左侧色条 + 标题文本，配合额外的上间距形成「组间距 > 行间距」的层级
  .form-title {
    display: flex;
    gap: 8px;
    align-items: center;
    margin: 4px 0 12px;
    font-size: 14px;
    font-weight: 500;
    color: var(--ao-gray-900);

    &::before {
      flex-shrink: 0;
      width: 3px;
      height: 14px;
      content: '';
      background: var(--theme-color);
      border-radius: 2px;
    }
  }
</style>
