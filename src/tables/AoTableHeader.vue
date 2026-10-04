<!-- 表格头部，包含表格大小、刷新、全屏、列设置、其他设置 -->
<!-- 插槽契约：#left / #right 内的自定义按钮需使用 AoTableHeaderButton（已自动导入），才能获得与内置按钮一致的样式与 Tooltip 提示 -->
<template>
  <div class="table-header-root">
    <div class="left-wrap">
      <!-- 左侧插槽：插槽内自定义按钮使用 AoTableHeaderButton 可复用统一样式与 Tooltip 提示 -->
      <slot name="left"></slot>
    </div>

    <div class="right-wrap">
      <!-- 右侧插槽：插槽内自定义按钮使用 AoTableHeaderButton 可复用统一样式与 Tooltip 提示 -->
      <slot name="right"></slot>

      <!-- 搜索按钮 -->
      <AoTableHeaderButton
        v-if="showSearchBar != null"
        icon="ri:search-line"
        :content="t('table.header.search')"
        :active="showSearchBar"
        @click="search"
      />

      <!-- 刷新按钮 -->
      <AoTableHeaderButton
        v-if="shouldShow('refresh')"
        icon="ri:refresh-line"
        :content="t('table.header.refresh')"
        :loading="loading && isManualRefresh"
        @click="refresh"
      />

      <!-- 表格大小选择 -->
      <ElDropdown v-if="shouldShow('size')" @command="handleTableSizeChange">
        <AoTableHeaderButton icon="ri:arrow-up-down-fill" :content="t('table.header.size')" />
        <template #dropdown>
          <ElDropdownMenu>
            <div
              v-for="item in tableSizeOptions"
              :key="item.value"
              class="table-size-btn-item"
              :class="{ 'is-current-size': tableSize === item.value }"
            >
              <ElDropdownItem :key="item.value" :command="item.value">
                {{ item.label }}
              </ElDropdownItem>
            </div>
          </ElDropdownMenu>
        </template>
      </ElDropdown>

      <!-- 全屏按钮 -->
      <AoTableHeaderButton
        v-if="shouldShow('fullscreen')"
        :icon="isFullScreen ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-line'"
        :content="t('table.header.fullscreen')"
        @click="toggleFullScreen"
      />

      <!-- 列设置 -->
      <ElPopover v-if="shouldShow('columns')" placement="bottom" trigger="click">
        <template #reference>
          <AoTableHeaderButton icon="ri:align-right" :content="t('table.header.columns')" />
        </template>
        <div>
          <ElScrollbar max-height="380px">
            <VueDraggable
              v-model="columns"
              :disabled="false"
              filter=".fixed-column"
              :prevent-on-filter="false"
              @move="checkColumnMove"
            >
              <div
                v-for="item in columns"
                :key="item.columnKey || item.prop || item.type"
                class="column-option"
                :class="{ 'fixed-column': item.fixed }"
              >
                <div class="drag-icon" :class="item.fixed ? 'is-fixed' : 'is-movable'">
                  <AoSvgIcon
                    :icon="item.fixed ? 'ri:unpin-line' : 'ri:drag-move-2-fill'"
                    class="drag-icon-svg"
                  />
                </div>
                <ElCheckbox
                  :model-value="getColumnVisibility(item)"
                  @update:model-value="(val) => updateColumnVisibility(item, val)"
                  :disabled="item.disabled"
                  class="column-checkbox"
                  >{{
                    item.label || (item.type === 'selection' ? t('table.selection') : '')
                  }}</ElCheckbox
                >
              </div>
            </VueDraggable>
          </ElScrollbar>
        </div>
      </ElPopover>

      <!-- 其他设置 -->
      <ElPopover v-if="shouldShow('settings')" placement="bottom" trigger="click">
        <template #reference>
          <AoTableHeaderButton icon="ri:settings-line" :content="t('table.header.settings')" />
        </template>
        <div>
          <ElCheckbox v-if="showZebra" v-model="isZebra" :value="true">{{
            t('table.zebra')
          }}</ElCheckbox>
          <ElCheckbox v-if="showBorder" v-model="isBorder" :value="true">{{
            t('table.border')
          }}</ElCheckbox>
          <ElCheckbox v-if="showHeaderBackground" v-model="isHeaderBackground" :value="true">{{
            t('table.headerBackground')
          }}</ElCheckbox>
        </div>
      </ElPopover>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ElCheckbox, ElDropdown, ElDropdownItem, ElDropdownMenu, ElPopover } from 'element-plus'
  import { computed, ref, onMounted, onUnmounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { TableSizeEnum } from '../enums'
  import { useTableStore } from '../store/modules/table'
  import { VueDraggable } from 'vue-draggable-plus'
  import { useI18n } from 'vue-i18n'
  import type { ColumnOption } from '../types/component'
  import { ElScrollbar } from 'element-plus'
  import AoTableHeaderButton from './AoTableHeaderButton.vue'
  import AoSvgIcon from '../base/AoSvgIcon.vue'

  defineOptions({ name: 'AoTableHeader' })

  const { t } = useI18n()

  interface Props {
    /** 斑马纹 */
    showZebra?: boolean
    /** 边框 */
    showBorder?: boolean
    /** 表头背景 */
    showHeaderBackground?: boolean
    /** 全屏 class */
    fullClass?: string
    /** 组件布局，子组件名用逗号分隔 */
    layout?: string
    /** 加载中 */
    loading?: boolean
    /** 搜索栏显示状态 */
    showSearchBar?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    showZebra: true,
    showBorder: true,
    showHeaderBackground: true,
    fullClass: 'ao-page-view',
    layout: 'search,refresh,size,fullscreen,columns,settings',
    showSearchBar: undefined
  })

  const columns = defineModel<ColumnOption[]>('columns', {
    required: false,
    default: () => []
  })

  const emit = defineEmits<{
    (e: 'refresh'): void
    (e: 'search'): void
    (e: 'update:showSearchBar', value: boolean): void
  }>()

  /**
   * 获取列的显示状态
   * 优先使用 visible 字段，如果不存在则使用 checked 字段
   */
  const getColumnVisibility = (col: ColumnOption): boolean => {
    if (col.visible !== undefined) {
      return col.visible
    }
    return col.checked ?? true
  }

  /**
   * 更新列的显示状态
   * 同时更新 checked 和 visible 字段以保持兼容性
   */
  const updateColumnVisibility = (col: ColumnOption, value: boolean | string | number): void => {
    const boolValue = !!value
    col.checked = boolValue
    col.visible = boolValue
  }

  /** 表格大小选项配置 */
  const tableSizeOptions = [
    { value: TableSizeEnum.SMALL, label: t('table.sizeOptions.small') },
    { value: TableSizeEnum.DEFAULT, label: t('table.sizeOptions.default') },
    { value: TableSizeEnum.LARGE, label: t('table.sizeOptions.large') }
  ]

  const tableStore = useTableStore()
  const { tableSize, isZebra, isBorder, isHeaderBackground } = storeToRefs(tableStore)

  /** 解析 layout 属性，转换为数组 */
  const layoutItems = computed(() => {
    return props.layout.split(',').map((item) => item.trim())
  })

  /**
   * 检查组件是否应该显示
   * @param componentName 组件名称
   * @returns 是否显示
   */
  const shouldShow = (componentName: string) => {
    return layoutItems.value.includes(componentName)
  }

  /**
   * 拖拽移动事件处理 - 防止固定列位置改变
   * @param evt move事件对象
   * @returns 是否允许移动
   */
  const checkColumnMove = (event: any) => {
    // 拖拽进入的目标 DOM 元素
    const toElement = event.related as HTMLElement
    // 如果目标位置是 fixed 列，则不允许移动
    if (toElement && toElement.classList.contains('fixed-column')) {
      return false
    }
    return true
  }

  /** 搜索事件处理 */
  const search = () => {
    // 切换搜索栏显示状态
    emit('update:showSearchBar', !props.showSearchBar)
    emit('search')
  }

  /** 刷新事件处理 */
  const refresh = () => {
    isManualRefresh.value = true
    emit('refresh')
  }

  /**
   * 表格大小变化处理
   * @param command 表格大小枚举值
   */
  const handleTableSizeChange = (command: TableSizeEnum) => {
    useTableStore().setTableSize(command)
  }

  /** 是否手动点击刷新 */
  const isManualRefresh = ref(false)

  /** 加载中 */
  const isFullScreen = ref(false)

  /** 保存原始的 overflow 样式，用于退出全屏时恢复 */
  const originalOverflow = ref('')

  /**
   * 切换全屏状态
   * 进入全屏时会隐藏页面滚动条，退出时恢复原状态
   */
  const toggleFullScreen = () => {
    const el = document.querySelector(`.${props.fullClass}`)
    if (!el) return

    isFullScreen.value = !isFullScreen.value

    if (isFullScreen.value) {
      // 进入全屏：保存原始样式并隐藏滚动条
      originalOverflow.value = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      el.classList.add('el-full-screen')
      tableStore.setIsFullScreen(true)
    } else {
      // 退出全屏：恢复原始样式
      document.body.style.overflow = originalOverflow.value
      el.classList.remove('el-full-screen')
      tableStore.setIsFullScreen(false)
    }
  }

  /**
   * ESC键退出全屏的事件处理器
   * 需要保存引用以便在组件卸载时正确移除监听器
   */
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isFullScreen.value) {
      toggleFullScreen()
    }
  }

  /** 组件挂载时注册全局事件监听器 */
  onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey)
  })

  /** 组件卸载时清理资源 */
  onUnmounted(() => {
    // 移除事件监听器
    document.removeEventListener('keydown', handleEscapeKey)

    // 如果组件在全屏状态下被卸载，恢复页面滚动状态
    if (isFullScreen.value) {
      document.body.style.overflow = originalOverflow.value
      const el = document.querySelector(`.${props.fullClass}`)
      if (el) {
        el.classList.remove('el-full-screen')
      }
    }
  })
</script>

<style scoped lang="scss">
  // 表格头部根容器
  .table-header-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (width <= 47.99rem) {
      display: block !important;
    }
  }

  // 左侧插槽容器
  .left-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  // 右侧操作区容器
  .right-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media (width <= 47.99rem) {
      margin-top: 0.75rem;
    }
    @media (width <= 39.99rem) {
      display: none !important;
    }
  }

  // 表格大小选项容器
  .table-size-btn-item {
    :deep(.el-dropdown-menu__item) {
      margin-bottom: 3px !important;
    }
    &:last-child :deep(.el-dropdown-menu__item) {
      margin-bottom: 0 !important;
    }
  }

  // 当前选中的表格大小
  .table-size-btn-item.is-current-size {
    :deep(.el-dropdown-menu__item) {
      background-color: color-mix(in srgb, var(--ao-gray-300) 55%, transparent) !important;
    }
  }

  // 列选项容器
  .column-option {
    display: flex;
    align-items: center;
  }

  // 列选项拖拽图标
  .drag-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.125rem;
    margin-right: 0.5rem;
    color: var(--ao-gray-500);
    // 固定列状态
    &.is-fixed {
      color: var(--ao-gray-300);
      cursor: default;
    }
    // 可拖拽状态
    &.is-movable {
      cursor: move;
    }
  }

  // 拖拽图标
  .drag-icon :deep(.drag-icon-svg) {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  // 列复选框
  .column-checkbox {
    flex: 1 1 0%;
    min-width: 0;
    :deep(.el-checkbox__label) {
      overflow: hidden;
      // Element Plus 默认 line-height: 1，行盒高度恰好等于 14px 字号，
      // 而中文字形的基线下笔画（如「序」的竖钩尾、「日」的底横下缘）会落到行盒之外，
      // 被上面的 overflow: hidden 裁掉一行；提高行高为字形留出纵向余量即可修复。
      // .el-checkbox 固定 32px 且垂直居中，label 变高不会影响行高与弹层尺寸
      line-height: 1.5;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
