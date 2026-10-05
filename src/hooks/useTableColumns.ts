/**
 * useTableColumns - 表格列配置管理
 *
 * 为 AoTable 提供完整的列管理能力：页面把本 Hook 返回的 `columns` 传给组件的 `columns` 属性，
 * 把 `columnChecks` 通过 `v-model:column-checks` 绑定给组件，表头「列设置」的勾选显隐与拖拽排序
 * 即会回写到同一份列配置上。
 *
 * ## 主要功能
 *
 * 1. 列显示控制 - 动态显示/隐藏列，支持批量操作
 * 2. 列排序 - 拖拽或编程方式重新排列列顺序
 * 3. 列配置管理 - 新增、删除、更新列配置
 * 4. 特殊列支持 - 自动处理 selection、expand、index、globalIndex 的占位标识与兜底列名
 * 5. 状态重置 - 支持恢复到初始列配置
 *
 * ## 使用示例
 *
 * ```typescript
 * const { columns, columnChecks } = useTableColumns<UserRecord>(() => [
 *   { prop: 'userName', label: '用户名' },
 *   { prop: 'userEmail', label: '邮箱', visible: false }
 * ])
 * ```
 *
 * ```vue
 * <AoTable :data="rows" :columns="columns" v-model:column-checks="columnChecks" />
 * ```
 *
 * 特殊列的列名取自包内置语言包 `table.column.*`（随 install 合并进宿主实例），
 * 因此本 Hook 必须在 setup 上下文中调用。
 */
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ColumnOption } from '../types/component'

/**
 * 特殊列类型
 * @description 这些列没有数据字段，列设置面板需要为其提供占位标识与兜底列名
 */
type SpecialColumnType = 'selection' | 'expand' | 'index' | 'globalIndex'

/** 特殊列在列设置面板中的占位标识，不参与数据取值 */
const SPECIAL_COLUMN_PROPS: Record<SpecialColumnType, string> = {
  selection: '__selection__',
  expand: '__expand__',
  index: '__index__',
  globalIndex: '__globalIndex__'
}

/**
 * @description 获取列的唯一标识，优先使用原生 columnKey，允许展示列省略 prop 或多列共用数据字段；
 * 无 columnKey 的特殊列回落到类型占位标识，省略 prop 的展示列回退到 slotName；
 * 同类型的特殊列出现多个时必须显式声明 columnKey
 * @param col 列配置
 * @return 列的唯一标识
 */
export const getColumnKey = <T extends Record<string, any>>(col: ColumnOption<T>): string =>
  col.columnKey ??
  SPECIAL_COLUMN_PROPS[col.type as SpecialColumnType] ??
  (col.prop as string) ??
  col.slotName ??
  ''

/**
 * @description 获取列的显示状态，visible 未声明时视为显示
 * @param col 列配置
 * @return 是否显示该列
 */
export const getColumnVisibility = <T extends Record<string, any>>(col: ColumnOption<T>): boolean =>
  col.visible ?? true

/**
 * @description 格式化单列配置为列设置面板使用的格式，处理特殊列占位标识、兜底列名并补齐 visible
 * @param col 原始列配置
 * @param specialLabels 特殊列兜底列名映射
 * @return 列设置面板使用的列配置
 */
const formatColumnCheck = <T extends Record<string, any>>(
  col: ColumnOption<T>,
  specialLabels: Record<SpecialColumnType, string>
): ColumnOption<T> => {
  const isSpecial = col.type && col.type in SPECIAL_COLUMN_PROPS
  const visibility = getColumnVisibility(col)

  if (isSpecial) {
    const type = col.type as SpecialColumnType
    return {
      ...col,
      prop: SPECIAL_COLUMN_PROPS[type],
      // 列名以用户声明为准，仅在未声明时回落到内置文案
      label: col.label || specialLabels[type],
      visible: visibility
    }
  }
  return { ...col, visible: visibility }
}

/**
 * @description 生成列设置面板使用的列副本，为特殊列补上占位标识与兜底列名，并补齐 visible 默认值
 * @param columns 列配置
 * @param specialLabels 特殊列兜底列名映射，由调用方从语言包解析
 * @return 列设置面板使用的列配置副本
 */
const createColumnChecks = <T extends Record<string, any>>(
  columns: ColumnOption<T>[],
  specialLabels: Record<SpecialColumnType, string>
): ColumnOption<T>[] => columns.map((col) => formatColumnCheck(col, specialLabels))

/**
 * 动态列配置接口
 * @description useTableColumns 返回的列增删改查能力
 */
export interface DynamicColumnConfig<T extends Record<string, any> = any> {
  // 新增列（支持单个或批量），index 为可选的插入位置，默认末尾
  addColumn: (column: ColumnOption<T> | ColumnOption<T>[], index?: number) => void
  // 删除列（支持单个或批量），prop 为列的唯一标识或标识数组
  removeColumn: (prop: string | string[]) => void
  // 切换列显示状态（支持单个或批量），visible 未传时取反
  toggleColumn: (prop: string | string[], visible?: boolean) => void
  // 更新列（支持单个或批量），prop 为字符串或更新配置数组
  updateColumn: (
    prop: string | Array<{ prop: string; updates: Partial<ColumnOption<T>> }>,
    updates?: Partial<ColumnOption<T>>
  ) => void
  // 批量更新列（兼容旧版本，推荐使用 updateColumn 的数组模式）
  // @deprecated 推荐使用 updateColumn 的数组模式
  batchUpdateColumns: (updates: Array<{ prop: string; updates: Partial<ColumnOption<T>> }>) => void
  // 重新排序列，从 fromIndex 移动到 toIndex
  reorderColumns: (fromIndex: number, toIndex: number) => void
  // 获取指定列配置
  getColumnConfig: (prop: string) => ColumnOption<T> | undefined
  // 获取所有列配置副本
  getAllColumns: () => ColumnOption<T>[]
  // 重置所有列到初始配置
  resetColumns: () => void
}

/**
 * @description 创建表格列配置管理实例，供 AoTable 的 columns 与 v-model:column-checks 使用
 * @param columnsFactory 初始列配置工厂，重置列时重新调用
 * @return 当前显示列、列设置数据源与列增删改查方法
 */
export function useTableColumns<T extends Record<string, any> = any>(
  columnsFactory: () => ColumnOption<T>[]
): {
  columns: ComputedRef<ColumnOption<T>[]>
  columnChecks: Ref<ColumnOption<T>[]>
} & DynamicColumnConfig<T> {
  const { t } = useI18n()

  /** 特殊列的兜底列名，跟随语言切换 */
  const specialLabels = computed<Record<SpecialColumnType, string>>(() => ({
    selection: t('table.column.selection'),
    expand: t('table.column.expand'),
    index: t('table.column.index'),
    globalIndex: t('table.column.globalIndex')
  }))

  /** 列的完整配置，增删改查均作用于它 */
  const dynamicColumns = ref<ColumnOption<T>[]>(columnsFactory())

  /** 列设置面板的数据源，表头的勾选与拖拽排序回写到它 */
  const columnChecks = ref<ColumnOption<T>[]>(
    createColumnChecks(dynamicColumns.value, specialLabels.value)
  )

  // 语言切换时同步特殊列的兜底文本，不改变已有顺序与显隐状态
  watch(specialLabels, (labels) => {
    const dynamicMap = new Map(dynamicColumns.value.map((col) => [getColumnKey(col), col]))
    columnChecks.value = columnChecks.value.map((col) => {
      if (col.type && col.type in SPECIAL_COLUMN_PROPS) {
        const type = col.type as SpecialColumnType
        const originalCol = dynamicMap.get(getColumnKey(col))
        return {
          ...col,
          label: originalCol?.label || labels[type]
        }
      }
      return col
    })
  })

  /** 当前显示的列，顺序跟随列设置 */
  const columns = computed(() => {
    const columnMap = new Map(dynamicColumns.value.map((col) => [getColumnKey(col), col]))
    return columnChecks.value
      .filter((col) => getColumnVisibility(col))
      .map((col) => {
        const key = getColumnKey(col)
        const dynamicCol = columnMap.get(key)
        return dynamicCol ? { ...dynamicCol, visible: true } : col
      })
  })

  /**
   * @description 以不可变方式更新列配置，updater 可返回新数组或就地修改传入的副本
   * @param updater 列配置更新函数
   */
  const setDynamicColumns = (updater: (columns: ColumnOption<T>[]) => void | ColumnOption<T>[]) => {
    const copy = [...dynamicColumns.value]
    const result = updater(copy)
    dynamicColumns.value = Array.isArray(result) ? result : copy
  }

  return {
    columns,
    columnChecks,

    /**
     * @description 新增列（支持单个或批量）
     * @param column 列配置或列配置数组
     * @param index 可选的插入位置，越界时追加到末尾
     */
    addColumn: (column, index) => {
      const columnsToAdd = Array.isArray(column) ? column : [column]
      if (columnsToAdd.length === 0) return

      setDynamicColumns((cols) => {
        const next = [...cols]
        const insertIndex =
          typeof index === 'number' && index >= 0 && index <= next.length ? index : next.length
        next.splice(insertIndex, 0, ...columnsToAdd)
        return next
      })

      const checksToAdd = createColumnChecks(columnsToAdd, specialLabels.value)
      const nextChecks = [...columnChecks.value]
      const insertIndex =
        typeof index === 'number' && index >= 0 && index <= nextChecks.length
          ? index
          : nextChecks.length
      nextChecks.splice(insertIndex, 0, ...checksToAdd)
      columnChecks.value = nextChecks
    },

    /**
     * @description 删除列（支持单个或批量）
     * @param prop 列的唯一标识或标识数组
     */
    removeColumn: (prop) => {
      const propsToRemove = Array.isArray(prop) ? prop : [prop]
      if (propsToRemove.length === 0) return

      setDynamicColumns((cols) => cols.filter((col) => !propsToRemove.includes(getColumnKey(col))))
      columnChecks.value = columnChecks.value.filter(
        (col) => !propsToRemove.includes(getColumnKey(col))
      )
    },

    /**
     * @description 更新列（支持单个或批量）
     * @param prop 列的唯一标识或更新配置数组
     * @param updates 列配置更新，prop 为字符串时使用
     */
    updateColumn: (prop, updates) => {
      const updateList = Array.isArray(prop) ? prop : updates ? [{ prop, updates }] : []
      if (updateList.length === 0) return

      const updateMap = new Map(updateList.map((item) => [item.prop, item.updates]))

      setDynamicColumns((cols) =>
        cols.map((col) => {
          const update = updateMap.get(getColumnKey(col))
          return update ? { ...col, ...update } : col
        })
      )

      columnChecks.value = columnChecks.value.map((col) => {
        const key = getColumnKey(col)
        const update = updateMap.get(key)
        if (!update) return col

        const merged = { ...col, ...update }
        if (merged.type && merged.type in SPECIAL_COLUMN_PROPS) {
          merged.prop = SPECIAL_COLUMN_PROPS[merged.type as SpecialColumnType]
          merged.label = merged.label || specialLabels.value[merged.type as SpecialColumnType]
        }
        if ('visible' in update) {
          merged.visible = update.visible
        }
        return merged
      })
    },

    /**
     * @description 切换列显示状态（支持单个或批量），通过 visible 控制显隐
     * @param prop 列的唯一标识或标识数组
     * @param visible 可选的显示状态，未传时取反
     */
    toggleColumn: (prop, visible) => {
      const propsToToggle = Array.isArray(prop) ? prop : [prop]
      if (propsToToggle.length === 0) return

      const nextChecks = [...columnChecks.value]
      const toggledMap = new Map<string, boolean>()

      propsToToggle.forEach((target) => {
        const index = nextChecks.findIndex((col) => getColumnKey(col) === target)
        if (index < 0) return

        const newVisibility = visible ?? !getColumnVisibility(nextChecks[index])
        nextChecks[index] = { ...nextChecks[index], visible: newVisibility }
        toggledMap.set(target, newVisibility)
      })

      columnChecks.value = nextChecks

      // 同步更新 dynamicColumns，保证 getColumnConfig 获取到最新显隐状态
      setDynamicColumns((cols) =>
        cols.map((col) => {
          const key = getColumnKey(col)
          return toggledMap.has(key) ? { ...col, visible: toggledMap.get(key) } : col
        })
      )
    },

    /** @description 重置所有列到初始配置，恢复初始列显隐与初始列顺序 */
    resetColumns: () => {
      const initialColumns = columnsFactory()
      dynamicColumns.value = [...initialColumns]
      columnChecks.value = createColumnChecks(initialColumns, specialLabels.value)
    },

    /**
     * @description 批量更新列
     * @param updates 列更新配置
     * @deprecated 推荐使用 updateColumn 的数组模式
     */
    batchUpdateColumns: (updates) => {
      if (!Array.isArray(updates) || updates.length === 0) return
      const updateMap = new Map(updates.map((item) => [item.prop, item.updates]))

      setDynamicColumns((cols) =>
        cols.map((col) => {
          const update = updateMap.get(getColumnKey(col))
          return update ? { ...col, ...update } : col
        })
      )

      columnChecks.value = columnChecks.value.map((col) => {
        const key = getColumnKey(col)
        const update = updateMap.get(key)
        if (!update) return col

        const merged = { ...col, ...update }
        if (merged.type && merged.type in SPECIAL_COLUMN_PROPS) {
          merged.prop = SPECIAL_COLUMN_PROPS[merged.type as SpecialColumnType]
          merged.label = merged.label || specialLabels.value[merged.type as SpecialColumnType]
        }
        if ('visible' in update) {
          merged.visible = update.visible
        }
        return merged
      })
    },

    /**
     * @description 重新排序列，索引越界或原地移动时保持原顺序
     * @param fromIndex 源索引
     * @param toIndex 目标索引
     */
    reorderColumns: (fromIndex, toIndex) => {
      const reorder = <U>(list: U[]): U[] => {
        if (
          fromIndex < 0 ||
          fromIndex >= list.length ||
          toIndex < 0 ||
          toIndex >= list.length ||
          fromIndex === toIndex
        ) {
          return list
        }
        const next = [...list]
        const [moved] = next.splice(fromIndex, 1)
        next.splice(toIndex, 0, moved)
        return next
      }

      setDynamicColumns(reorder)
      columnChecks.value = reorder(columnChecks.value)
    },

    /**
     * @description 获取指定列的配置
     * @param prop 列的唯一标识
     * @return 列配置，未找到时返回 undefined
     */
    getColumnConfig: (prop) => dynamicColumns.value.find((col) => getColumnKey(col) === prop),

    /**
     * @description 获取所有列配置的副本
     * @return 所有列配置
     */
    getAllColumns: () => [...dynamicColumns.value]
  }
}
