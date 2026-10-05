<!-- 表格搜索组件 -->
<!-- 支持常用表单组件、自定义组件、插槽、校验、隐藏表单项 -->
<!-- 写法同 ElementPlus 官方文档组件，把属性写在 props 里面就可以了 -->
<!-- 与 AoForm 的契约差异：本组件内部持有表单状态并通过 update:modelValue 整体上报；AoForm 直接对 v-model 对象做受控变更 -->
<template>
  <section class="ao-search-bar ao-card-xs" :class="{ 'is-expanded': isExpanded }">
    <ElForm ref="formRef" :model="formModel" :label-position="labelPosition" v-bind="{ ...$attrs }">
      <ElRow :gutter="gutter">
        <ElCol
          v-for="item in visibleFormItems"
          :key="item.key"
          :xs="getColSpan(item.span, 'xs')"
          :sm="getColSpan(item.span, 'sm')"
          :md="getColSpan(item.span, 'md')"
          :lg="getColSpan(item.span, 'lg')"
          :xl="getColSpan(item.span, 'xl')"
        >
          <ElFormItem
            :prop="item.key"
            :label-width="item.label ? item.labelWidth || labelWidth : undefined"
          >
            <template #label v-if="item.label">
              <component v-if="typeof item.label !== 'string'" :is="item.label" />
              <span v-else>{{ item.label }}</span>
            </template>
            <slot :name="item.key" :item="item" :modelValue="formModel">
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
        <ElCol :xs="24" :sm="24" :md="span" :lg="span" :xl="span" class="action-column">
          <div class="action-buttons-wrapper" :style="actionButtonsStyle">
            <div class="form-buttons">
              <ElButton v-if="showReset" class="reset-button" @click="handleReset">
                {{ t('table.searchBar.reset') }}
              </ElButton>
              <ElButton
                v-if="showSearch"
                type="primary"
                class="search-button"
                @click="handleSearch"
                :disabled="disabledSearch"
              >
                {{ t('table.searchBar.search') }}
              </ElButton>
            </div>
            <div v-if="shouldShowExpandToggle" class="filter-toggle" @click="toggleExpand">
              <span>{{ expandToggleText }}</span>
              <div class="icon-wrapper">
                <ElIcon>
                  <ArrowUpBold v-if="isExpanded" />
                  <ArrowDownBold v-else />
                </ElIcon>
              </div>
            </div>
          </div>
        </ElCol>
      </ElRow>
    </ElForm>
  </section>
</template>

<script setup lang="ts">
  import { computed, ref, toRefs, useTemplateRef, watch } from 'vue'
  import {
    ElButton,
    ElCheckbox,
    ElCol,
    ElForm,
    ElFormItem,
    ElIcon,
    ElOption,
    ElRadio,
    ElRow
  } from 'element-plus'
  import type { FormInstance } from 'element-plus'
  import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue'
  import { useWindowSize } from '@vueuse/core'
  import { useI18n } from 'vue-i18n'
  import type { ResponsiveBreakpoint, SanitizeOutputOptions } from '../types/component'
  import {
    DEFAULT_SANITIZE_OPTIONS,
    FORM_MOBILE_BREAKPOINT,
    calculateResponsiveSpan,
    cloneModelValue,
    getOptions,
    getRenderComponent,
    getValidSlots,
    getItemProps,
    getValueByPath,
    resolveActionButtonsAlign,
    sanitizeFormOutput,
    setValueByPath
  } from './form-shared'

  defineOptions({ name: 'AoSearchBar' })

  import { type SearchFormItem } from '../types/component'

  // 类型统一归位到 types/component，这里再导出保持原引用方式可用
  export type { SearchFormItem }

  /** 搜索表单数据模型 */
  type SearchFormModel = Record<string, unknown>

  // 表单配置
  interface SearchBarProps {
    /** 表单数据 */
    items: SearchFormItem[]
    /** 当前表单值（支持 v-model） */
    modelValue?: SearchFormModel
    /** 每列的宽度（基于 24 格布局） */
    span?: number
    /** 表单控件间隙 */
    gutter?: number
    /** 展开/收起 */
    isExpand?: boolean
    /** 默认是否展开（仅在 showExpand 为 true 且 isExpand 为 false 时生效） */
    defaultExpanded?: boolean
    /** 表单域标签的位置 */
    labelPosition?: 'left' | 'right' | 'top'
    /** 文字宽度 */
    labelWidth?: string | number
    /** 是否需要展示，收起 */
    showExpand?: boolean
    /** 按钮靠左对齐限制（表单项小于等于该值时） */
    buttonLeftLimit?: number
    /** 是否显示重置按钮 */
    showReset?: boolean
    /** 是否显示搜索按钮 */
    showSearch?: boolean
    /** 是否禁用搜索按钮 */
    disabledSearch?: boolean
    /** 搜索时是否清洗空值 */
    sanitizeOutput?: Partial<SanitizeOutputOptions>
  }

  const props = withDefaults(defineProps<SearchBarProps>(), {
    items: () => [],
    modelValue: () => ({}) as SearchFormModel,
    span: 6,
    gutter: 12,
    isExpand: false,
    labelPosition: 'right',
    labelWidth: '70px',
    showExpand: true,
    defaultExpanded: false,
    buttonLeftLimit: 2,
    showReset: true,
    showSearch: true,
    disabledSearch: false,
    sanitizeOutput: () => ({})
  })

  interface SearchBarEmits {
    reset: []
    search: [SearchFormModel]
    'update:modelValue': [SearchFormModel]
  }

  const emit = defineEmits<SearchBarEmits>()

  const { width } = useWindowSize()
  const { t } = useI18n()
  const isMobile = computed(() => width.value < FORM_MOBILE_BREAKPOINT)

  const formInstance = useTemplateRef<FormInstance>('formRef')

  const formModel = ref<SearchFormModel>(cloneModelValue(props.modelValue))
  const initialModelValue = ref<SearchFormModel>(cloneModelValue(props.modelValue))

  /** 最近一次由组件内部抛出的表单值，用于识别并跳过父级回写 */
  let lastEmittedModel: SearchFormModel | undefined

  /**
   * 同步父级 v-model 变化
   * @description 当父组件通过 v-model 传入新值时，同步更新本地表单数据；
   * 组件自身 emit 引起的回写需要跳过，否则表单快照会被不断覆盖，导致重置失效
   */
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue === lastEmittedModel) return
      formModel.value = cloneModelValue(newValue)
      initialModelValue.value = cloneModelValue(newValue)
    }
  )

  /**
   * 是否展开状态
   */
  const isExpanded = ref(props.defaultExpanded)

  // 搜索参数默认更激进地去掉空值，减少无效 query 参数。
  const sanitizeOutputOptions = computed<SanitizeOutputOptions>(() => ({
    ...DEFAULT_SANITIZE_OPTIONS,
    ...props.sanitizeOutput
  }))

  /**
   * @description 读取搜索项当前值（key 即单段点路径）
   * @param key 搜索项唯一标识
   * @return 搜索项当前值
   */
  const getFieldValue = (key: string): unknown => getValueByPath(formModel.value, key)

  /**
   * @description 写入搜索项值并上报父级，清空输入时不保留空字符串
   * @param key 搜索项唯一标识
   * @param value 待写入的值
   */
  const setFieldValue = (key: string, value: unknown): void => {
    setValueByPath(formModel.value, key, value)

    lastEmittedModel = formModel.value
    emit('update:modelValue', formModel.value)
  }

  /**
   * 获取列宽 span 值
   * 根据屏幕尺寸智能降级，避免小屏幕上表单项被压缩过小
   */
  const getColSpan = (itemSpan: number | undefined, breakpoint: ResponsiveBreakpoint): number => {
    return calculateResponsiveSpan(itemSpan ?? span.value, breakpoint)
  }

  /**
   * 可见的表单项
   */
  const visibleFormItems = computed(() => {
    const filteredItems = props.items.filter((item) => !item.hidden)
    const shouldShowLess = !props.isExpand && !isExpanded.value
    if (shouldShowLess) {
      const maxItemsPerRow = Math.floor(24 / props.span) - 1
      return filteredItems.slice(0, maxItemsPerRow)
    }
    return filteredItems
  })

  /**
   * 是否应该显示展开/收起按钮
   */
  const shouldShowExpandToggle = computed(() => {
    const filteredItems = props.items.filter((item) => !item.hidden)
    return (
      !props.isExpand && props.showExpand && filteredItems.length > Math.floor(24 / props.span) - 1
    )
  })

  /**
   * 展开/收起按钮文本
   */
  const expandToggleText = computed(() => {
    return isExpanded.value ? t('table.searchBar.collapse') : t('table.searchBar.expand')
  })

  /**
   * 操作按钮样式
   */
  const actionButtonsStyle = computed(() => ({
    'justify-content': resolveActionButtonsAlign(
      isMobile.value,
      props.items.filter((item) => !item.hidden).length,
      props.buttonLeftLimit
    )
  }))

  /**
   * 切换展开/收起状态
   */
  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value
  }

  /**
   * 处理重置事件
   */
  const handleReset = () => {
    // 重置表单字段（UI 层）
    formInstance.value?.resetFields()

    // 恢复初始表单值，保留默认搜索条件而不是简单清空。
    Object.keys(formModel.value).forEach((key) => {
      delete formModel.value[key]
    })
    Object.assign(formModel.value, cloneModelValue(initialModelValue.value))

    lastEmittedModel = formModel.value
    emit('update:modelValue', formModel.value)
    // 触发 reset 事件
    emit('reset')
  }

  /**
   * 处理搜索事件
   */
  const handleSearch = () => {
    // 对外只抛出清洗后的查询参数，避免接口收到空数组/空字符串。
    emit(
      'search',
      sanitizeFormOutput<SearchFormModel>(formModel.value, sanitizeOutputOptions.value)
    )
  }

  defineExpose({
    validate: (
      ...args: Parameters<FormInstance['validate']>
    ): ReturnType<FormInstance['validate']> => formInstance.value!.validate(...args),
    reset: handleReset,
    // 允许外部在手动组装请求前直接读取清洗后的参数。
    getOutput: (): SearchFormModel =>
      sanitizeFormOutput<SearchFormModel>(formModel.value, sanitizeOutputOptions.value)
  })

  // 解构 props 以便在模板中直接使用
  const { span, gutter, labelPosition, labelWidth } = toRefs(props)
</script>

<style lang="scss" scoped>
  .ao-search-bar {
    padding: 10px;
    // 收紧表单项垂直间距，提升搜索区域信息密度
    :deep(.el-form-item) {
      margin-bottom: 12px;
    }
    // 抵消表单末行自带的 12px 下边距（表单项 / 按钮区各一处），使卡片四周留白统一为 10px
    :deep(.el-form) {
      margin-bottom: -12px;
    }
    .action-column {
      flex: 1;
      max-width: 100%;
      .action-buttons-wrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 12px;
      }
      .form-buttons {
        display: flex;
        gap: 8px;
      }
      .filter-toggle {
        display: flex;
        align-items: center;
        margin-left: 10px;
        line-height: 32px;
        color: var(--theme-color);
        cursor: pointer;
        transition: color 0.2s ease;
        span {
          font-size: 14px;
          user-select: none;
        }
        .icon-wrapper {
          display: flex;
          align-items: center;
          margin-left: 4px;
          font-size: 14px;
          transition: transform 0.2s ease;
        }
      }
    }
  }

  // 响应式优化
  @media (width <= 768px) {
    .ao-search-bar {
      .action-column {
        .action-buttons-wrapper {
          flex-direction: column;
          gap: 8px;
          align-items: stretch;
          .form-buttons {
            justify-content: center;
          }
          .filter-toggle {
            justify-content: center;
            margin-left: 0;
          }
        }
      }
    }
  }
</style>
