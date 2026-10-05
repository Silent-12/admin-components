<!--
  AoExcelExport / AoExcelImport 示例
  场景一：基础导出（headers 重命名 + 自动序号）
  场景二：列配置导出（columns 控制标题 / 列宽 / 格式化）+ 事件与 ref
  场景三：空数据自动禁用
  场景四：导入解析
-->
<template>
  <div class="demo-page">
    <header class="demo-head">
      <h2>Excel 导入导出</h2>
      <p>
        导出与导入均基于 xlsx + file-saver 在前端完成，不经过后端。<code>data</code> 是纯对象数组，
        键名对应列，列标题通过 <code>headers</code>（简写）或 <code>columns</code>（可配列宽与格式化）声明。
      </p>
    </header>

    <!-- 场景一 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景一：基础导出</h3>
      <p class="demo-block__desc">
        <code>headers</code> 把数据键映射为中文列标题，<code>auto-index</code> 自动追加序号列，
        <code>filename</code> / <code>sheet-name</code> 控制文件名与工作表名（文件名会追加时间戳保证唯一）。
      </p>

      <div class="demo-actions">
        <AoExcelExport
          :data="exportRows"
          :headers="exportHeaders"
          filename="用户列表"
          sheet-name="用户列表"
          :auto-index="true"
          index-column-title="序号"
        />
      </div>
    </section>

    <!-- 场景二 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景二：列配置 + 事件 + ref</h3>
      <p class="demo-block__desc">
        <code>columns</code> 支持按列声明 <code>title</code>、<code>width</code> 与 <code>formatter</code>；
        导出过程会依次触发 <code>before-export</code> / <code>export-progress</code> /
        <code>export-success</code> 或 <code>export-error</code>。也可通过 ref 的
        <code>exportData()</code> 由页面按钮触发导出。
      </p>

      <div class="demo-actions">
        <AoExcelExport
          ref="exportRef"
          :data="exportRows"
          :columns="exportColumns"
          button-text="导出（列配置）"
          loading-text="正在生成文件..."
          filename="用户明细"
          @before-export="handleBeforeExport"
          @export-progress="handleExportProgress"
          @export-success="handleExportSuccess"
          @export-error="handleExportError"
        />
        <ElButton size="small" @click="exportRef?.exportData()">ref.exportData()</ElButton>
      </div>

      <pre class="demo-output">导出进度：{{ exportProgress }}%{{ '\n' }}{{ exportLogText }}</pre>
    </section>

    <!-- 场景三 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景三：空数据自动禁用</h3>
      <p class="demo-block__desc">
        <code>data</code> 为空数组时按钮自动禁用；<code>disabled</code> 可额外强制禁用。
      </p>

      <div class="demo-actions">
        <AoExcelExport :data="[]" button-text="导出空列表" />
        <AoExcelExport :data="exportRows" :disabled="true" button-text="强制禁用" />
      </div>
    </section>

    <!-- 场景四 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景四：导入解析</h3>
      <p class="demo-block__desc">
        选择 .xlsx / .xls 文件后在本地解析为对象数组并通过 <code>import-success</code> 上报（读取第一个工作表），
        解析异常时触发 <code>import-error</code>。按钮文案可用默认插槽覆盖。
      </p>

      <div class="demo-actions">
        <AoExcelImport @import-success="handleImportSuccess" @import-error="handleImportError">
          导入用户 Excel
        </AoExcelImport>
      </div>

      <pre class="demo-output">{{ importText }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, useTemplateRef } from 'vue'
  import { ElButton, ElMessage } from 'element-plus'
  import { AoExcelExport, AoExcelImport } from '@ao/admin-components'
  import { createUserRecords } from '../mock/user'

  defineOptions({ name: 'ExcelDemo' })

  /**
   * 单元格值类型
   * @description AoExcelExport 的列值类型未从包入口导出，这里按组件契约声明同构类型，
   * 仅用于给 formatter 参数标注类型。
   */
  type ExportCellValue = string | number | boolean | null | undefined | Date

  /** 导出数据源：键名对应列，值类型需落在 ExportCellValue 范围内 */
  const exportRows: Record<string, ExportCellValue>[] = createUserRecords(12).map((row) => ({
    userName: row.userName,
    userPhone: row.userPhone,
    department: row.department,
    status: row.status,
    createdAt: row.createdAt
  }))

  /** 表头映射（简写方式） */
  const exportHeaders: Record<string, string> = {
    userName: '用户名',
    userPhone: '手机号',
    department: '部门',
    status: '状态',
    createdAt: '创建时间'
  }

  /** 列配置：标题、列宽与单元格格式化 */
  const exportColumns: Record<
    string,
    { title: string; width?: number; formatter?: (value: ExportCellValue) => string }
  > = {
    userName: { title: '用户名', width: 16 },
    userPhone: { title: '手机号', width: 16 },
    department: { title: '部门', width: 12 },
    status: { title: '在职状态', width: 10, formatter: (value) => (value === 1 ? '在职' : '离职') },
    createdAt: { title: '创建时间', width: 20 }
  }

  /** 导出组件实例引用 */
  const exportRef = useTemplateRef<{ exportData: () => void }>('exportRef')

  /** 导出进度（0-100） */
  const exportProgress = ref(0)

  /** 导出过程日志 */
  const exportLog = ref<string[]>([])

  /** 导出日志文本 */
  const exportLogText = computed(() => exportLog.value.join('\n') || '等待导出...')

  /**
   * @description 记录一次导出过程事件，仅保留最近 6 条。
   * @param text 事件描述。
   */
  const logExport = (text: string): void => {
    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
    exportLog.value = [`${time}  ${text}`, ...exportLog.value].slice(0, 6)
  }

  /**
   * @description 导出前触发，可在此时对数据做最终加工。
   * @param data 待导出的数据副本。
   */
  const handleBeforeExport = (data: unknown[]): void => {
    logExport(`before-export：${data.length} 行`)
  }

  /**
   * @description 导出进度回调。
   * @param progress 进度百分比。
   */
  const handleExportProgress = (progress: number): void => {
    exportProgress.value = progress
  }

  /**
   * @description 导出成功回调。
   * @param filename 文件名（不含时间戳）。
   * @param rowCount 导出行数。
   */
  const handleExportSuccess = (filename: string, rowCount: number): void => {
    logExport(`export-success：${filename}（${rowCount} 行）`)
  }

  /**
   * @description 导出失败回调。
   * @param error 导出错误对象，带 code 与 details。
   */
  const handleExportError = (error: Error): void => {
    logExport(`export-error：${error.message}`)
  }

  // ---------- 场景四：导入 ----------

  /** 导入解析结果 */
  const importedRows = ref<Record<string, unknown>[]>([])

  /** 导入结果文本：展示前 3 行，避免面板过长 */
  const importText = computed(() =>
    importedRows.value.length
      ? JSON.stringify(importedRows.value.slice(0, 3), null, 2)
      : '选择 Excel 文件后展示解析结果（最多预览 3 行）。'
  )

  /**
   * @description 导入成功：解析结果由组件通过事件上报，落库动作由页面自行处理。
   * @param data 解析后的对象数组。
   */
  const handleImportSuccess = (data: Record<string, unknown>[]): void => {
    importedRows.value = data
    ElMessage.success(`已解析 ${data.length} 行数据`)
  }

  /**
   * @description 导入失败回调。
   * @param error 解析错误。
   */
  const handleImportError = (error: Error): void => {
    ElMessage.error(`导入失败：${error.message}`)
  }
</script>
