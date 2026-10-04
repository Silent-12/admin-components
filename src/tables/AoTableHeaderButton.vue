<!-- 表格头部操作按钮：纯图标 + Tooltip 悬停提示，供 AoTableHeader 内置按钮与头部插槽自定义按钮统一复用 -->
<!-- 组件仅渲染图标，内部不提供插槽；「图标 + 文字」的组合按钮请另用其它组件实现 -->
<!-- 根节点固定为普通元素，保证能直接充当 ElDropdown / ElPopover 的触发元素（二者内部依赖 ElOnlyChild 取根元素） -->
<!-- 因此 Tooltip 不使用包裹写法，而是通过 virtual-ref + virtual-triggering 绑定到根节点自身 -->
<template>
  <div ref="triggerRef" class="button" :class="{ 'is-active': active }" @click="handleClick">
    <!-- 图标尺寸固定 1rem，不随外层继承的 font-size 变化（ElDropdown 会给其触发器设置 14px） -->
    <AoSvgIcon :icon="icon" size="1rem" :class="iconClass" />

    <!-- show-after 固定 500ms：鼠标停留 0.5s 后才展示提示，避免扫过按钮时频繁弹出 -->
    <ElTooltip
      v-if="content"
      :virtual-ref="triggerRef"
      virtual-triggering
      :content="content"
      placement="top"
      :show-after="500"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ElTooltip } from 'element-plus'
  import { computed, ref } from 'vue'
  import AoSvgIcon from '../base/AoSvgIcon.vue'

  defineOptions({ name: 'AoTableHeaderButton' })

  interface Props {
    /** 图标名称 */
    icon: string
    /** 悬停提示文案，为空时不渲染 Tooltip */
    content?: string
    /** 激活态，如搜索栏展开时高亮 */
    active?: boolean
    /** 加载态，如表格数据刷新请求进行中 */
    loading?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    content: '',
    active: false,
    loading: false
  })

  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
  }>()

  /** 按钮根节点，同时作为 Tooltip 的虚拟触发元素 */
  const triggerRef = ref<HTMLElement>()

  /** 图标状态 class，按加载态、激活态、默认态依次判定 */
  const iconClass = computed(() => {
    if (props.loading) {
      return 'is-loading-icon'
    }
    return props.active ? 'is-active-icon' : 'is-icon'
  })

  /**
   * @description 点击事件处理，向外透出原生事件对象，保证 ElDropdown / ElPopover 的点击触发逻辑可用
   * @param event 原生鼠标事件
   * @return 无返回值
   */
  const handleClick = (event: MouseEvent) => {
    emit('click', event)
  }
</script>

<style scoped lang="scss">
  // 操作按钮：纯图标形态，宽高固定 2rem，图标居中
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    margin-left: 0.5rem;
    color: var(--ao-gray-700);
    cursor: pointer;
    background-color: color-mix(in srgb, var(--ao-gray-300) 55%, transparent);
    border-radius: 0.375rem;
    &:hover {
      background-color: var(--ao-gray-300);
    }
    @media (width >= 48rem) {
      margin-right: 0.625rem;
      margin-left: 0;
    }
    .dark & {
      background-color: color-mix(in srgb, var(--ao-gray-300) 40%, transparent);
    }
    // 激活态
    &.is-active {
      background-color: var(--theme-color) !important;
      &:hover {
        background-color: color-mix(in srgb, var(--theme-color) 80%, transparent) !important;
      }
    }
    // 激活图标
    :deep(.is-active-icon) {
      color: var(--ao-white);
    }
    // 默认图标
    :deep(.is-icon) {
      color: var(--ao-gray-700);
    }
    // 加载中图标
    :deep(.is-loading-icon) {
      color: var(--ao-gray-600);
      animation: spin 1s linear infinite;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
