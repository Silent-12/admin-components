<!-- 更多按钮 -->
<template>
  <div>
    <ElDropdown v-if="hasAnyAuthItem">
      <AoIconButton icon="ri:more-2-fill" class="more-button" />
      <template #dropdown>
        <ElDropdownMenu>
          <template v-for="item in list" :key="item.key">
            <ElDropdownItem
              v-if="!item.auth || hasAuth(item.auth)"
              :disabled="item.disabled"
              @click="handleClick(item)"
            >
              <div class="dropdown-item-content" :style="{ color: item.color }">
                <AoSvgIcon v-if="item.icon" :icon="item.icon" />
                <span>{{ item.label }}</span>
              </div>
            </ElDropdownItem>
          </template>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
  import AoIconButton from '../widget/AoIconButton.vue'
  import AoSvgIcon from '../base/AoSvgIcon.vue'
  import { useAuth } from '../hooks/useAuth'

  defineOptions({ name: 'AoButtonMore' })

  const { hasAuth } = useAuth()

  export interface ButtonMoreItem {
    /** 按钮标识，可用于点击事件 */
    key: string | number
    /** 按钮文本 */
    label: string
    /** 是否禁用 */
    disabled?: boolean
    /** 权限标识 */
    auth?: string
    /** 图标组件 */
    icon?: string
    /** 文本颜色 */
    color?: string
    /** 图标颜色（优先级高于 color） */
    iconColor?: string
  }

  interface Props {
    /** 下拉项列表 */
    list: ButtonMoreItem[]
    /** 整体权限控制 */
    auth?: string
  }

  const props = withDefaults(defineProps<Props>(), {})

  // 检查是否有任何有权限的 item
  const hasAnyAuthItem = computed(() => {
    return props.list.some((item) => !item.auth || hasAuth(item.auth))
  })

  const emit = defineEmits<{
    (e: 'click', item: ButtonMoreItem): void
  }>()

  const handleClick = (item: ButtonMoreItem) => {
    emit('click', item)
  }
</script>

<style scoped lang="scss">
  // 更多按钮样式
  .more-button {
    width: 2rem !important;
    height: 2rem !important;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background: var(--ao-gray-200);
    // 暗黑模式背景（45% 透明度）
    .dark & {
      background: color-mix(in oklab, var(--ao-gray-300) 45%, transparent);
    }
  }

  // 下拉项内容布局
  .dropdown-item-content {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>
