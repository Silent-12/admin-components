<!--
  playground 外壳
  左侧按组件分组导航，右侧只挂载当前 demo；每个 demo 内部按场景拆分为多个区块。
  内容区带 ao-page-view 类，作为表格头部「全屏」按钮的定位锚点（AoTableHeader 默认 fullClass）。
-->
<template>
  <div class="playground">
    <aside class="sidebar">
      <div class="brand">
        <AoLogo :size="30" />
        <div class="brand-text">
          <strong>admin-components</strong>
          <span>v{{ version }} playground</span>
        </div>
      </div>

      <nav class="nav">
        <button
          v-for="item in NAV_ITEMS"
          :key="item.key"
          type="button"
          class="nav-item"
          :class="{ 'is-active': item.key === activeKey }"
          @click="activeKey = item.key"
        >
          <AoSvgIcon :icon="item.icon" class="nav-icon" />
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <ElButton size="small" @click="toggleDark">切换{{ isDark ? '亮色' : '暗色' }}</ElButton>
      </div>
    </aside>

    <main class="content ao-page-view">
      <component :is="activeDemo" />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, type Component } from 'vue'
  import { ElButton } from 'element-plus'
  import { AoLogo, AoSvgIcon, version } from '@ao/admin-components'
  import TableDemo from './demos/TableDemo.vue'
  import FormDemo from './demos/FormDemo.vue'
  import SearchBarDemo from './demos/SearchBarDemo.vue'
  import TableHeaderDemo from './demos/TableHeaderDemo.vue'
  import ButtonDemo from './demos/ButtonDemo.vue'
  import ExcelDemo from './demos/ExcelDemo.vue'
  import BaseDemo from './demos/BaseDemo.vue'

  defineOptions({ name: 'Playground' })

  /** demo 标识 */
  type DemoKey = 'table' | 'form' | 'searchBar' | 'tableHeader' | 'button' | 'excel' | 'base'

  /** 导航项配置 */
  interface NavItem {
    key: DemoKey
    label: string
    icon: string
  }

  /** 各 demo 组件映射 */
  const DEMOS: Record<DemoKey, Component> = {
    table: TableDemo,
    form: FormDemo,
    searchBar: SearchBarDemo,
    tableHeader: TableHeaderDemo,
    button: ButtonDemo,
    excel: ExcelDemo,
    base: BaseDemo
  }

  /** 导航项列表 */
  const NAV_ITEMS: NavItem[] = [
    { key: 'table', label: '表格 AoTable', icon: 'ri:table-line' },
    { key: 'form', label: '表单 AoForm', icon: 'ri:file-list-3-line' },
    { key: 'searchBar', label: '搜索栏 AoSearchBar', icon: 'ri:search-line' },
    { key: 'tableHeader', label: '表头 AoTableHeader', icon: 'ri:layout-top-line' },
    { key: 'button', label: '按钮组', icon: 'ri:apps-2-line' },
    { key: 'excel', label: 'Excel 导入导出', icon: 'ri:file-excel-2-line' },
    { key: 'base', label: '图标与 Logo', icon: 'ri:image-line' }
  ]

  /** 当前激活的 demo */
  const activeKey = ref<DemoKey>('table')

  /** 当前激活的 demo 组件 */
  const activeDemo = computed<Component>(() => DEMOS[activeKey.value])

  /** 暗色模式开关：验证组件在 .dark 下的样式表现 */
  const isDark = ref(document.documentElement.classList.contains('dark'))

  /** @description 切换根元素主题，使 Admin模板变量与 Element Plus 暗色样式同步生效。 */
  const toggleDark = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
  }
</script>

<style scoped lang="scss">
  .playground {
    display: flex;
    height: 100%;
    min-height: 0;
    background: var(--default-bg-color);
  }

  .sidebar {
    display: flex;
    flex: none;
    flex-direction: column;
    gap: 12px;
    width: 216px;
    padding: 14px 12px;
    background: var(--default-box-color);
    border-right: 1px solid var(--ao-card-border);
  }

  .brand {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 0 4px 12px;
    border-bottom: 1px solid var(--ao-card-border);

    .brand-text {
      display: flex;
      flex-direction: column;
      min-width: 0;
      line-height: 1.4;

      strong {
        font-size: 14px;
        color: var(--ao-gray-900);
      }

      span {
        font-size: 12px;
        color: var(--ao-gray-600);
      }
    }
  }

  .nav {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 4px;
    min-height: 0;
    overflow: auto;
  }

  .nav-item {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 10px;
    font-size: 13px;
    color: var(--ao-gray-700);
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: calc(var(--custom-radius) / 2);
    transition: background-color 0.2s;

    .nav-icon {
      font-size: 15px;
    }

    &:hover {
      background: var(--ao-hover-color);
    }

    &.is-active {
      color: var(--theme-color);
      background: color-mix(in srgb, var(--theme-color) 12%, transparent);
    }
  }

  .sidebar-footer {
    flex: none;
    padding-top: 12px;
    border-top: 1px solid var(--ao-card-border);
  }

  .content {
    flex: 1;
    min-width: 0;
    padding: 16px;
    overflow: auto;
    background: var(--default-bg-color);
  }
</style>
