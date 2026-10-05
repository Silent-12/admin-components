<!--
  AoTable 示例
  场景一：集成模式（搜索栏 + 表格头部 + 列插槽 + 操作列 + 列设置 + 分页 + ref）
  场景二：基础模式（纯列配置 + index / expand 列 + 内置排序，无搜索栏与分页）
  场景三：空数据、底部插槽与加载态
-->
<template>
  <div class="demo-page">
    <header class="demo-head">
      <h2>AoTable 表格</h2>
      <p>
        纯展示组件：数据由页面请求后通过
        <code>data</code> 传入，组件不感知接口响应格式；分页状态由页面持有， 交互通过原生
        <code>size-change</code> / <code>current-change</code> 事件上报。列内容由
        <code>columns[].slotName</code> 指向同名插槽渲染。
      </p>
    </header>

    <!-- 场景一 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景一：集成模式</h3>
      <p class="demo-block__desc">
        传入 <code>search-items</code> 自动渲染搜索栏并启用头部搜索开关；编写
        <code>#header-left</code> /
        <code>#header-right</code> 自动渲染表格头部。搜索栏、头部、表格与分页共用同一层卡片外框。
        列显隐与排序用包内 <code>useTableColumns</code> 驱动：<code>columnChecks</code> 交给
        <code>v-model:column-checks</code>，当前显示列 <code>columns</code> 交给
        <code>columns</code> 属性。
      </p>

      <div class="demo-table-box">
        <AoTable
          ref="mainTableRef"
          v-model:search-form="searchForm"
          v-model:column-checks="columnChecks"
          :search-items="searchItems"
          :search-rules="searchRules"
          :loading="loading"
          :data="tableData"
          :columns="columns"
          :pagination="pagination"
          :pagination-options="{ pageSizes: [10, 20, 50] }"
          empty-text="暂无用户数据"
          @search="handleSearch"
          @reset="handleReset"
          @refresh="handleRefresh"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @selection-change="handleSelectionChange"
        >
          <template #header-left>
            <ElSpace wrap>
              <ElButton type="primary">新增用户</ElButton>
              <AoButtonMore :list="moreActions" @click="handleMoreClick" />
            </ElSpace>
          </template>

          <template #header-right>
            <AoTableHeaderButton
              icon="ri:download-2-line"
              content="导出当前页"
              @click="logEvent('header-right 自定义按钮：导出')"
            />
          </template>

          <template #department="{ row }">
            <ElTag>{{ row.department }}</ElTag>
          </template>

          <template #status="{ row }">
            <ElTag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? '在职' : '离职' }}
            </ElTag>
          </template>

          <template #operation="{ row }">
            <AoButtonTable type="view" @click="logEvent(`查看：${row.userName}`)" />
            <AoButtonTable type="edit" @click="logEvent(`编辑：${row.userName}`)" />
            <AoButtonTable type="delete" @click="logEvent(`删除：${row.userName}`)" />
          </template>

          <template #footer>
            <span class="demo-footer-tip">
              已选 {{ selectedRows.length }} 条 / 共 {{ pagination.total }} 条
            </span>
          </template>
        </AoTable>
      </div>

      <div class="demo-actions">
        <ElButton size="small" @click="handleScrollToTop">ref.scrollToTop()</ElButton>
        <ElButton size="small" @click="handleClearSelection"
          >ref.elTableRef.clearSelection()</ElButton
        >
      </div>

      <ul class="demo-log">
        <li v-for="(item, index) in eventLog" :key="index">{{ item }}</li>
        <li v-if="!eventLog.length">交互事件会在此处输出。</li>
      </ul>
    </section>

    <!-- 场景二 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景二：基础模式（无搜索栏 / 无分页）</h3>
      <p class="demo-block__desc">
        只传 <code>data</code> 与 <code>columns</code>：不传
        <code>search-items</code> 与头部插槽时不会渲染搜索栏， 不传
        <code>pagination</code> 时不渲染分页器。显式传 <code>:integrated="true"</code> +
        <code>:show-table-header="false"</code> 可保留卡片外框但不渲染表格头部。
        <code>type: 'index'</code> 为当前页序号，<code>type: 'expand'</code>
        配合同名插槽渲染展开行， <code>sortable: true</code> 使用 ElTable 内置前端排序。
      </p>

      <div class="demo-table-box demo-table-box--short">
        <AoTable
          :integrated="true"
          :show-table-header="false"
          :data="basicRows"
          :columns="basicColumns"
        >
          <template #expand="{ row }">
            <div class="expand-detail">
              <p>邮箱：{{ row.userEmail }}</p>
              <p>备注：{{ row.remark || '（无）' }}</p>
            </div>
          </template>
        </AoTable>
      </div>
    </section>

    <!-- 场景三 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景三：空数据、底部插槽与加载态</h3>
      <p class="demo-block__desc">
        <code>data</code> 为空数组时渲染 <code>empty-text</code>，并通过
        <code>empty-height</code> 控制空态高度； <code>#footer</code> 插槽位于分页器左侧。分页器在
        <code>pagination.total</code> 为 0 或当前页无数据时自动隐藏。
      </p>

      <div class="demo-actions">
        <ElButton size="small" @click="emptyMode = !emptyMode">
          切换{{ emptyMode ? '有数据' : '空数据' }}
        </ElButton>
        <ElButton size="small" :disabled="emptyMode" @click="simulateLoading">模拟加载态</ElButton>
      </div>

      <div class="demo-table-box demo-table-box--short">
        <AoTable
          :loading="detailLoading"
          :data="detailData"
          :columns="detailColumns"
          empty-text="暂无匹配的用户，请调整筛选条件"
          empty-height="260px"
        >
          <template #footer>
            <span class="demo-footer-tip">数据来源：本地 mock</span>
          </template>
        </AoTable>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, useTemplateRef } from 'vue'
  import { ElButton, ElMessage, ElSpace, ElTag } from 'element-plus'
  import type { FormRules, TableInstance } from 'element-plus'
  import {
    AoButtonMore,
    AoButtonTable,
    AoTable,
    AoTableHeaderButton,
    useTableColumns,
    type ButtonMoreItem,
    type ColumnOption,
    type SearchFormItem,
    type TablePaginationState
  } from '@ao/admin-components'
  import { createUserRecords, fetchUserList, type UserRecord } from '../mock/user'
  import { DEPARTMENT_OPTIONS } from '../mock/options'

  defineOptions({ name: 'TableDemo' })

  /** AoTable 通过 ref 暴露的能力（与组件 defineExpose 契约一致） */
  interface AoTableExpose {
    /** 滚动表格内容与页面回到顶部 */
    scrollToTop: () => void
    /** ElTable 实例，可调用原生方法 */
    elTableRef: TableInstance | null
  }

  // ---------- 场景一：集成模式 ----------

  /** 表格实例引用 */
  const mainTableRef = useTemplateRef<AoTableExpose>('mainTableRef')

  /** 搜索表单数据，由 AoSearchBar 内部持有并双向同步 */
  const searchForm = ref<Record<string, any>>({})

  /**
   * 列配置：useTableColumns 返回当前显示列 columns 与列设置数据源 columnChecks，
   * 表头「列设置」的勾选显隐与拖拽排序会回写到 columnChecks，columns 随之更新
   */
  const { columns, columnChecks } = useTableColumns<UserRecord>(() => [
    // disabled 为 true 的列在列设置中不可取消勾选
    { type: 'selection', columnKey: 'selection', width: 46, disabled: true },
    { type: 'globalIndex', columnKey: 'globalIndex', label: '序号', width: 62 },
    { prop: 'userName', label: '用户名', minWidth: 100 },
    { prop: 'userPhone', label: '手机号', width: 130 },
    { prop: 'userEmail', label: '邮箱', minWidth: 160, showOverflowTooltip: true },
    { prop: 'department', label: '部门', width: 100, slotName: 'department' },
    { prop: 'status', label: '状态', width: 80, slotName: 'status' },
    { prop: 'remark', label: '备注', minWidth: 130, showOverflowTooltip: true },
    {
      prop: 'createdAt',
      label: '创建时间',
      width: 150,
      formatter: (row) => row.createdAt
    }
  ])

  /** 搜索项配置：type 对应内置组件，选项类表单项的 options 放在顶层由组件渲染子节点 */
  const searchItems: SearchFormItem[] = [
    {
      label: '用户名',
      key: 'userName',
      type: 'input',
      props: { placeholder: '请输入用户名', clearable: true }
    },
    {
      label: '邮箱',
      key: 'userEmail',
      type: 'input',
      props: { placeholder: '请输入邮箱', clearable: true }
    },
    {
      label: '部门',
      key: 'department',
      type: 'select',
      options: DEPARTMENT_OPTIONS,
      props: { placeholder: '请选择部门', clearable: true }
    }
  ]

  /** 搜索校验规则：配置后点击查询会先校验，未通过则不触发 search */
  const searchRules: FormRules = {
    userEmail: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }]
  }

  /** 表格数据与加载状态 */
  const tableData = ref<UserRecord[]>([])
  const loading = ref(false)

  /** 已选行 */
  const selectedRows = ref<UserRecord[]>([])

  /** 已应用的查询条件（以 search 事件回传的清洗结果为唯一来源） */
  const appliedFilters = ref<Record<string, any>>({})

  /** 分页状态：由页面持有并回传，组件不修改 */
  const pagination = reactive<TablePaginationState>({ currentPage: 1, pageSize: 10, total: 0 })

  /** 表格头部「更多」下拉：auth 未命中注入权限列表的项不会渲染 */
  const moreActions: ButtonMoreItem[] = [
    { key: 'add', label: '新增', icon: 'ri:add-line', auth: 'add' },
    { key: 'export', label: '导出', icon: 'ri:download-2-line', auth: 'export' },
    {
      key: 'delete',
      label: '批量删除',
      icon: 'ri:delete-bin-line',
      color: '#f56c6c',
      auth: 'delete'
    },
    { key: 'help', label: '帮助文档', icon: 'ri:question-line' }
  ]

  /** 交互事件日志 */
  const eventLog = ref<string[]>([])

  /**
   * @description 记录一次交互事件，仅保留最近 12 条用于预览验证。
   * @param text 事件描述。
   */
  const logEvent = (text: string): void => {
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    eventLog.value = [`${time}  ${text}`, ...eventLog.value].slice(0, 12)
  }

  /** @description 拉取列表数据（mock），查询条件取自 search 事件回传的清洗结果。 */
  const fetchList = async (): Promise<void> => {
    loading.value = true
    try {
      const result = await fetchUserList({
        userName: appliedFilters.value.userName,
        userEmail: appliedFilters.value.userEmail,
        department: appliedFilters.value.department,
        current: pagination.currentPage,
        size: pagination.pageSize
      })
      tableData.value = result.records
      pagination.total = result.total
    } finally {
      loading.value = false
    }
  }

  /**
   * @description 提交搜索：重置页码并应用清洗后的查询条件。
   * @param params AoSearchBar 上报的清洗参数。
   */
  const handleSearch = (params: Record<string, any>): void => {
    appliedFilters.value = params
    pagination.currentPage = 1
    logEvent(`search：${JSON.stringify(params)}`)
    fetchList()
  }

  /** @description 重置搜索条件（表单重置由搜索栏内部完成）并刷新。 */
  const handleReset = (): void => {
    appliedFilters.value = {}
    pagination.currentPage = 1
    logEvent('reset')
    fetchList()
  }

  /** @description 表格头部刷新按钮：仅上报，是否重新请求由页面决定。 */
  const handleRefresh = (): void => {
    logEvent('refresh')
    fetchList()
  }

  /**
   * @description 每页条数变化：回到第一页并重新请求。
   * @param size 每页条数。
   */
  const handleSizeChange = (size: number): void => {
    pagination.pageSize = size
    pagination.currentPage = 1
    logEvent(`size-change：${size}`)
    fetchList()
  }

  /**
   * @description 页码变化：重新请求。
   * @param page 当前页码。
   */
  const handleCurrentChange = (page: number): void => {
    pagination.currentPage = page
    logEvent(`current-change：${page}`)
    fetchList()
  }

  /**
   * @description 多选变化。
   * @param rows 当前选中行。
   */
  const handleSelectionChange = (rows: UserRecord[]): void => {
    selectedRows.value = rows
    logEvent(`selection-change：${rows.length} 条`)
  }

  /**
   * @description 更多下拉项点击。
   * @param item 被点击的下拉项。
   */
  const handleMoreClick = (item: ButtonMoreItem): void => {
    ElMessage.info(`点击了「${item.label}」`)
  }

  /** @description 演示 ref.scrollToTop：滚动表格内容与页面回到顶部。 */
  const handleScrollToTop = (): void => {
    mainTableRef.value?.scrollToTop()
    logEvent('ref.scrollToTop()')
  }

  /** @description 演示 ref.elTableRef：调用 ElTable 原生方法清空选中。 */
  const handleClearSelection = (): void => {
    mainTableRef.value?.elTableRef?.clearSelection()
    logEvent('ref.elTableRef.clearSelection()')
  }

  // ---------- 场景二：基础模式 ----------

  /** 基础表格数据（不分页，直接使用全量数组） */
  const basicRows = ref<UserRecord[]>(createUserRecords(6))

  /** 基础表格列配置 */
  const basicColumns: ColumnOption<UserRecord>[] = [
    { type: 'index', columnKey: 'index', label: '序号', width: 70 },
    { type: 'expand', columnKey: 'expand', slotName: 'expand' },
    { prop: 'userName', label: '用户名', minWidth: 120 },
    { prop: 'userPhone', label: '手机号', width: 140 },
    { prop: 'department', label: '部门', width: 110 },
    {
      prop: 'status',
      label: '状态',
      width: 90,
      formatter: (row) => (row.status === 1 ? '在职' : '离职')
    },
    { prop: 'createdAt', label: '创建时间', width: 160, sortable: true }
  ]

  // ---------- 场景三：空数据与加载态 ----------

  /** 是否展示空数据 */
  const emptyMode = ref(true)

  /** 空态/加载态示例的加载状态 */
  const detailLoading = ref(false)

  /** 空态示例的原始数据 */
  const detailRows = ref<UserRecord[]>(createUserRecords(5))

  /** 空态示例的表格数据 */
  const detailData = computed(() => (emptyMode.value ? [] : detailRows.value))

  /** 空态示例的列配置 */
  const detailColumns: ColumnOption<UserRecord>[] = [
    { prop: 'userName', label: '用户名' },
    { prop: 'department', label: '部门', width: 120 },
    { prop: 'userPhone', label: '手机号', width: 150 },
    { prop: 'createdAt', label: '创建时间', width: 160 }
  ]

  /** @description 演示 loading 态：遮罩由 v-loading 指令渲染，1 秒后恢复。 */
  const simulateLoading = (): void => {
    detailLoading.value = true
    window.setTimeout(() => {
      detailLoading.value = false
    }, 1000)
  }

  onMounted(fetchList)
</script>

<style scoped lang="scss">
  // 展开行内容
  .expand-detail {
    padding: 4px 0;
    font-size: 13px;
    line-height: 1.8;
    color: var(--ao-gray-700);

    p {
      margin: 0;
    }
  }
</style>
