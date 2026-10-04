<!-- 按钮组件 -->
<template>
  <div class="icon-button" :class="{ 'is-circle': circle }">
    <AoSvgIcon :icon="icon"></AoSvgIcon>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import AoSvgIcon from '../base/AoSvgIcon.vue'
  defineOptions({ name: 'AoIconButton' })

  interface Props {
    /** 图标名称 */
    icon: string
    /** 圆角按钮 */
    circle?: boolean
  }

  withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
  .icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.125rem;
    height: 2.125rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: var(--ao-gray-600);
    cursor: pointer;
    border-radius: 0.25rem;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    transition-property: all;
    &:hover {
      background: var(--ao-hover-color);
    }
    .dark & {
      color: var(--ao-gray-800);
    }
  }

  .icon-button.is-circle {
    border-radius: 9999px;
  }
</style>
