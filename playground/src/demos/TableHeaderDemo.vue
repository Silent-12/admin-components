<!--
  AoTableHeader / AoTableHeaderButton 示例
  场景一：完整表头（默认 layout，含全屏按钮）+ 受 useTableStore 驱动的表格外观联动
  场景二：layout 裁剪与 loading / show-search-bar 控制
  场景三：AoTableHeaderButton 各状态（普通、激活、加载中、无 Tooltip）
-->
<template>
  <div class="demo-page">
    <header class="demo-head">
      <h2>AoTableHeader 表格头部</h2>
      <p>
        表格头部是独立组件，AoTable 在集成模式下内部使用它。<code>layout</code>
        按顺序声明要显示的按钮， 支持 search、refresh、size、fullscreen、columns、settings。斑马纹 /
        边框 / 表头背景与表格尺寸写入 包内 <code>useTableStore</code>（已持久化到
        localStorage），所有表格共享同一份外观偏好。
      </p>
    </header>

    <!-- 场景一 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景一：完整表头 + 外观联动</h3>
      <p class="demo-block__desc">
        下表为原生 ElTable，直接读取
        <code>useTableStore</code> 的状态渲染，用来验证表头「其他设置」与
        「表格大小」的作用；列设置面板通过
        <code>v-model:columns</code> 回写列配置，拖拽排序与勾选显隐会即时反映到表格。
      </p>

      <AoTableHeader
        v-model:columns="headerColumns"
        v-model:show-search-bar="showSearchBar"
        :loading="headerLoading"
        @refresh="handleRefresh"
        @search="handleHeaderSearch"
      >
        <template #left>
          <ElButton type="primary">新增</ElButton>
          <AoTableHeaderButton icon="ri:filter-3-line" content="筛选" />
        </template>
        <template #right>
          <AoTableHeaderButton icon="ri:star-line" content="已激活" active />
        </template>
      </AoTableHeader>

      <div class="demo-actions">
        <span class="demo-footer-tip">
          搜索栏：{{ showSearchBar ? '显示' : '隐藏' }} / 斑马纹：{{ isZebra ? '开' : '关' }} /
          边框：{{ isBorder ? '开' : '关' }} / 表头背景：{{ isHeaderBackground ? '开' : '关' }} /
          尺寸：{{ tableSize }}
        </span>
      </div>

      <ElTable
        :data="rows"
        :border="isBorder"
        :stripe="isZebra"
        :size="tableSize"
        :header-cell-style="headerCellStyle"
      >
        <ElTableColumn
          v-for="col in visibleHeaderColumns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
        />
      </ElTable>
    </section>

    <!-- 场景二 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景二：layout 裁剪</h3>
      <p class="demo-block__desc">
        <code>layout="refresh,columns"</code> 只保留刷新与列设置；不传
        <code>show-search-bar</code> 时搜索按钮不渲染。 全屏按钮依赖页面锚点，默认
        <code>full-class="ao-page-view"</code>。
      </p>

      <AoTableHeader
        v-model:columns="simpleColumns"
        layout="refresh,columns"
        :loading="headerLoading"
        @refresh="handleRefresh"
      />
    </section>

    <!-- 场景三 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景三：AoTableHeaderButton 状态</h3>
      <p class="demo-block__desc">
        纯图标按钮，供表头内置按钮与头部插槽自定义按钮统一复用；<code>content</code> 为空时不渲染
        Tooltip。 插槽内请使用该组件，才能获得与内置按钮一致的样式与提示。
      </p>

      <div class="demo-actions">
        <AoTableHeaderButton icon="ri:refresh-line" content="普通状态" />
        <AoTableHeaderButton icon="ri:star-line" content="激活状态" active />
        <AoTableHeaderButton icon="ri:loader-4-line" content="加载状态" loading />
        <AoTableHeaderButton icon="ri:question-line" />
      </div>

      <ul class="demo-log">
        <li v-for="(item, index) in eventLog" :key="index">{{ item }}</li>
        <li v-if="!eventLog.length">表头交互事件会在此处输出。</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { ElButton, ElTable, ElTableColumn } from 'element-plus'
  import {
    AoTableHeader,
    AoTableHeaderButton,
    useTableStore,
    type ColumnOption
  } from '@ao/admin-components'
  import { createUserRecords, type UserRecord } from '../mock/user'

  defineOptions({ name: 'TableHeaderDemo' })

  /** 表格外观偏好（包内 store，持久化到 localStorage） */
  const tableStore = useTableStore()
  const { isZebra, isBorder, isHeaderBackground, tableSize } = storeToRefs(tableStore)

  /** 表格数据 */
  const rows = ref<UserRecord[]>(createUserRecords(5))

  /** 表头列设置的数据源：拖拽排序与勾选显隐会直接改写该数组 */
  const headerColumns = ref<ColumnOption<UserRecord>[]>([
    { prop: 'userName', label: '用户名' },
    { prop: 'userPhone', label: '手机号' },
    { prop: 'department', label: '部门' },
    { prop: 'createdAt', label: '创建时间' }
  ])

  /** 实际渲染的列：勾选状态由页面过滤实现 */
  const visibleHeaderColumns = computed(() =>
    headerColumns.value.filter((col) => col.visible !== false)
  )

  /** 场景二列设置数据源 */
  const simpleColumns = ref<ColumnOption<UserRecord>[]>([
    { prop: 'userName', label: '用户名' },
    { prop: 'department', label: '部门' }
  ])

  /** 搜索栏显示状态（v-model:show-search-bar） */
  const showSearchBar = ref(true)

  /** 表头加载状态：手动刷新时刷新按钮显示加载动画 */
  const headerLoading = ref(false)

  /** 表头背景样式：与 AoTable 内部逻辑一致，跟随 store 切换 */
  const headerCellStyle = computed(() => ({
    background: isHeaderBackground.value
      ? 'var(--el-fill-color-lighter)'
      : 'var(--default-box-color)'
  }))

  /** 表头交互事件日志 */
  const eventLog = ref<string[]>([])

  /**
   * @description 记录一次表头交互事件，仅保留最近 8 条。
   * @param text 事件描述。
   */
  const logEvent = (text: string): void => {
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    eventLog.value = [`${time}  ${text}`, ...eventLog.value].slice(0, 8)
  }

  /** @description 表头刷新按钮：仅上报事件，是否重新请求由页面决定。 */
  const handleRefresh = (): void => {
    logEvent('refresh')
    headerLoading.value = true
    window.setTimeout(() => {
      headerLoading.value = false
    }, 800)
  }

  /** @description 表头搜索按钮：同时上报搜索与搜索栏显隐变化。 */
  const handleHeaderSearch = (): void => {
    logEvent(`search（搜索栏${showSearchBar.value ? '展开' : '收起'}）`)
  }
</script>
