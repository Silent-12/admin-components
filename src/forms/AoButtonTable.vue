<!-- 表格按钮 -->
<template>
  <div
    :class="['ao-button-table', buttonClass]"
    :style="{ backgroundColor: buttonBgColor, color: iconColor }"
    @click="handleClick"
  >
    <AoSvgIcon :icon="iconContent" />
  </div>
</template>

<script setup lang="ts">
  import AoSvgIcon from '../base/AoSvgIcon.vue'
  import { computed } from 'vue'
  defineOptions({ name: 'AoButtonTable' })

  interface Props {
    /** 按钮类型 */
    type?: 'add' | 'edit' | 'delete' | 'more' | 'view'
    /** 按钮图标 */
    icon?: string
    /** 按钮样式类 */
    iconClass?: string
    /** icon 颜色 */
    iconColor?: string
    /** 按钮背景色 */
    buttonBgColor?: string
  }

  const props = withDefaults(defineProps<Props>(), {})

  const emit = defineEmits<{
    (e: 'click'): void
  }>()

  // 默认按钮配置
  const defaultButtons = {
    add: { icon: 'ri:add-fill', class: 'ao-btn-theme' },
    edit: { icon: 'ri:pencil-line', class: 'ao-btn-secondary' },
    delete: { icon: 'ri:delete-bin-5-line', class: 'ao-btn-error' },
    view: { icon: 'ri:eye-line', class: 'ao-btn-info' },
    more: { icon: 'ri:more-2-fill', class: '' }
  } as const

  // 获取图标内容
  const iconContent = computed(() => {
    return props.icon || (props.type ? defaultButtons[props.type]?.icon : '') || ''
  })

  // 获取按钮样式类
  const buttonClass = computed(() => {
    return props.iconClass || (props.type ? defaultButtons[props.type]?.class : '') || ''
  })

  const handleClick = () => {
    emit('click')
  }
</script>

<style scoped lang="scss">
  // 表格按钮基础样式
  .ao-button-table {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    height: 2rem;
    padding-right: 0.625rem;
    padding-left: 0.625rem;
    margin-right: 0.625rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 0.375rem;
  }

  // 主题色按钮
  .ao-btn-theme {
    color: var(--theme-color);
    background-color: color-mix(in oklab, var(--theme-color) 12%, transparent);
  }

  // 次要色按钮
  .ao-btn-secondary {
    color: var(--ao-secondary);
    background-color: color-mix(in oklab, var(--ao-secondary) 12%, transparent);
  }

  // 错误色按钮
  .ao-btn-error {
    color: var(--ao-error);
    background-color: color-mix(in oklab, var(--ao-error) 12%, transparent);
  }

  // 信息色按钮
  .ao-btn-info {
    color: var(--ao-info);
    background-color: color-mix(in oklab, var(--ao-info) 12%, transparent);
  }
</style>
