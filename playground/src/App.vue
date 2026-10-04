<template>
  <div class="playground ao-full-height">
    <div class="toolbar">
      <span class="title">admin-components playground</span>
      <ElButton size="small" @click="toggleDark">切换{{ isDark ? '亮色' : '暗色' }}</ElButton>
      <ElButton size="small" @click="emptyData = !emptyData">切换{{ emptyData ? '有数据' : '空数据' }}</ElButton>
    </div>

    <AoTable
      v-model:search-form="searchForm"
      v-model:column-checks="columnChecks"
      :search-items="searchItems"
      :loading="loading"
      :data="tableData"
      :columns="columns"
      :pagination="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @search="handleSearch"
      @reset="handleReset"
      @refresh="fetchList"
      @selection-change="handleSelectionChange"
    >
      <template #header-left>
        <ElSpace wrap>
          <ElButton type="primary">新增用户</ElButton>
          <AoButtonMore
            :list="[
              { key: 'export', label: '导出', icon: 'ri:download-2-line', auth: 'export' },
              { key: 'import', label: '导入', icon: 'ri:upload-2-line', auth: 'import' },
              { key: 'delete', label: '批量删除', icon: 'ri:delete-bin-line', color: '#f56c6c', auth: 'delete' }
            ]"
            @click="handleMoreClick"
          />
        </ElSpace>
      </template>

      <template #department="{ row }">
        <ElTag>{{ row.department }}</ElTag>
      </template>

      <template #status="{ row }">
        <ElTag :type="row.status === 1 ? 'success' : 'info'">
          {{ row.status === 1 ? '在职' : '离职' }}
        </ElTag>
      </template>

      <template #operation>
        <AoButtonTable type="edit" @click="() => {}" />
        <AoButtonTable type="delete" @click="() => {}" />
      </template>
    </AoTable>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue'
  import { ElButton, ElMessage, ElSpace, ElTag } from 'element-plus'
  import { AoButtonMore, AoButtonTable, AoTable } from '@ao/admin-components'
  import type { ColumnOption, SearchFormItem, TablePaginationState } from '@ao/admin-components'
  import { fetchUserList, type UserRecord, type UserSearchParams } from './mock/user'

  defineOptions({ name: 'Playground' })

  // 暗色模式切换：验证组件在 .dark 下的样式表现
  const isDark = ref(document.documentElement.classList.contains('dark'))
  const toggleDark = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  // 空数据切换：验证 ElEmpty 与分页器表现
  const emptyData = ref(false)

  const searchForm = ref<UserSearchParams>({})
  const columnChecks = ref([])

  const searchItems = computed<SearchFormItem[]>(() => [
    { label: '用户名', key: 'userName', type: 'input', props: { placeholder: '请输入用户名', clearable: true } },
    { label: '邮箱', key: 'userEmail', type: 'input', props: { placeholder: '请输入邮箱' } }
  ])

  const columns: ColumnOption<UserRecord>[] = [
    { type: 'selection', columnKey: 'selection' },
    { prop: 'userName', label: '用户名' },
    { prop: 'userPhone', label: '手机号' },
    { prop: 'userEmail', label: '邮箱' },
    { prop: 'department', label: '部门', slotName: 'department' },
    { prop: 'status', label: '状态', slotName: 'status' },
    { prop: 'remark', label: '备注', showOverflowTooltip: true }
  ]

  const tableData = ref<UserRecord[]>([])
  const loading = ref(false)
  const appliedFilters = ref<UserSearchParams>({})
  const pagination = reactive<TablePaginationState>({ currentPage: 1, pageSize: 10, total: 0 })

  /** @description 拉取列表数据（mock）。 */
  const fetchList = async () => {
    loading.value = true
    try {
      const result = await fetchUserList({
        ...appliedFilters.value,
        current: pagination.currentPage,
        size: pagination.pageSize
      })
      tableData.value = emptyData.value ? [] : result.records
      pagination.total = emptyData.value ? 0 : result.total
    } finally {
      loading.value = false
    }
  }

  /** @description 提交搜索：重置页码并应用表单条件。 */
  const handleSearch = () => {
    appliedFilters.value = { ...searchForm.value }
    pagination.currentPage = 1
    fetchList()
  }

  /** @description 重置搜索条件并刷新。 */
  const handleReset = () => {
    searchForm.value = {}
    appliedFilters.value = {}
    pagination.currentPage = 1
    fetchList()
  }

  /** @description 每页条数变化：回到第一页并重新请求。 */
  const handleSizeChange = (size: number) => {
    pagination.pageSize = size
    pagination.currentPage = 1
    fetchList()
  }

  /** @description 页码变化：重新请求。 */
  const handleCurrentChange = (page: number) => {
    pagination.currentPage = page
    fetchList()
  }

  /** @description 多选变化（仅打印验证）。 */
  const handleSelectionChange = (rows: UserRecord[]) => {
    console.info('selection-change:', rows.length)
  }

  /** @description 更多按钮点击。 */
  const handleMoreClick = (item: { key: string | number; label: string }) => {
    ElMessage.info(`点击了 ${item.label}`)
  }

  onMounted(fetchList)
</script>

<style scoped>
  .playground {
    padding: 16px;
  }
  .toolbar {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
  }
  .title {
    font-weight: 600;
  }
</style>
