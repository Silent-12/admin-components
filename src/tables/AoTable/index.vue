<!-- 表格组件 -->
<!-- 定位：纯展示组件。数据由页面自行请求后通过 data 传入，组件不感知任何接口响应格式 -->
<!-- 支持：el-table 全部属性、事件、插槽，同官方文档写法 -->
<!-- 扩展功能：分页组件（分页状态由页面持有并通过 pagination 传入，组件只渲染与上报交互）、命名插槽渲染列内容、loading、表格全局边框、斑马纹、表格尺寸、表头背景配置 -->
<!-- 集成能力：传入 searchItems 自动渲染搜索栏（v-model:searchForm 双向绑定，内置查询 / 重置按钮）；搜索栏默认显示，头部搜索开关可切换显隐，v-model:show-search-bar 可接管状态；编写 #header-left / #header-right 插槽自动渲染表格头部 -->
<!-- 布局：集成模式下根容器为唯一卡片外框，搜索栏、表格头部、表格与分页共用同一层边框，搜索栏下边框作为分隔线 -->
<!-- 列内容渲染：沿用原生 formatter；填写 slotName 即使用 AoTable 上的同名插槽 -->
<!-- 事件：size-change / current-change / search / reset / refresh 均为交互上报，分页重置与数据加载由页面决定 -->
<!-- 插槽：#header-left / #header-right 渲染表格头部；#footer 渲染表格底部左侧内容区；#operation 自动启用末尾操作列；其他列内容插槽由 slotName 指定 -->
<!-- 获取 ref：默认暴露了 elTableRef 外部通过 ref.value.elTableRef 可以调用 el-table 方法 -->
<template>
  <div class="ao-table-root" :class="rootClass">
    <!-- 搜索栏：传入 searchItems 即启用；显隐交给 v-show，避免隐藏后再显示时重新挂载刷新 AoSearchBar 的重置快照 -->
    <AoSearchBar
      v-if="hasSearchItems"
      v-show="resolvedShowSearchBar"
      ref="searchBarRef"
      v-model="searchFormModel"
      :items="searchItems"
      :rules="searchRules"
      :span="searchSpan"
      :show-expand="searchShowExpand"
      @search="handleSearch"
      @reset="handleReset"
    />

    <!-- 表格容器：集成模式下根容器即卡片，此处仅作为内部纵向布局层；默认模式使用 display: contents 透传，保持既有 DOM 布局不变 -->
    <component :is="cardComponent" :class="cardClass">
      <!-- 表格头部：集成模式下由 AoTable 内部渲染，#header-left / #header-right 插槽内容写入对应位置 -->
      <AoTableHeader
        v-if="renderHeader"
        ref="tableHeaderCompRef"
        v-model:columns="headerColumns"
        :show-search-bar="headerShowSearchBar"
        :show-zebra="headerShowZebra"
        :show-border="headerShowBorder"
        :show-header-background="headerShowHeaderBackground"
        :loading="loading"
        @update:show-search-bar="handleShowSearchBarChange"
        @refresh="handleRefresh"
      >
        <template #left>
          <slot name="header-left"></slot>
        </template>
        <template #right>
          <slot name="header-right"></slot>
        </template>
      </AoTableHeader>

      <!-- 表格主体 -->
      <div class="ao-table" :class="{ 'is-empty': isEmpty }" :style="containerHeight">
        <ElTable ref="elTableRef" v-loading="!!loading" v-bind="mergedTableProps">
          <template #default>
            <template v-for="col in columns" :key="col.columnKey || col.prop || col.type">
              <!-- 渲染全局序号列 -->
              <ElTableColumn v-if="col.type === 'globalIndex'" v-bind="cleanColumnProps(col)">
                <template #default="{ $index }">
                  <span>{{ getGlobalIndex($index) }}</span>
                </template>
              </ElTableColumn>

              <!-- 渲染展开行：内容由列配置的 slotName 对应的插槽提供 -->
              <ElTableColumn v-else-if="col.type === 'expand'" v-bind="cleanColumnProps(col)">
                <template v-if="col.slotName" #default="expandScope">
                  <slot :name="col.slotName" v-bind="expandScope" />
                </template>
              </ElTableColumn>

              <!-- 渲染普通列 -->
              <ElTableColumn v-else v-bind="cleanColumnProps(col)">
                <template v-if="col.slotName" #default="slotScope">
                  <slot
                    v-if="shouldRenderSlotScope(slotScope)"
                    :name="col.slotName"
                    v-bind="slotScope"
                  />
                </template>
              </ElTableColumn>
            </template>

            <slot v-if="slots.default" />

            <!-- 操作列由插槽自动启用，不参与业务列配置与列显隐设置 -->
            <ElTableColumn
              v-if="slots.operation"
              label="操作"
              :width="170"
              fixed="right"
              align="right"
            >
              <template #default="slotScope">
                <slot v-if="shouldRenderSlotScope(slotScope)" name="operation" v-bind="slotScope" />
              </template>
            </ElTableColumn>
          </template>

          <template #empty>
            <div v-if="loading"></div>
            <ElEmpty v-else :description="emptyText" :image-size="120" />
          </template>
        </ElTable>
      </div>

      <!-- 表格底部栏：左侧为 #footer 内容区，右侧为分页器 -->
      <div
        class="ao-table-bottom"
        :class="{ 'is-bar-empty': !showPagination && !$slots.footer }"
        ref="bottomBarRef"
      >
        <!-- 左侧内容区：占满剩余空间，使分页器始终贴右 -->
        <div class="ao-table-bottom__left">
          <slot name="footer"></slot>
        </div>

        <div class="pagination custom-pagination" v-if="showPagination">
          <ElPagination
            v-bind="mergedPaginationOptions"
            :total="resolvedTotal"
            :disabled="loading"
            :current-page="currentPage"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>">
  import { ElCard, ElEmpty, ElPagination, ElTable, ElTableColumn } from 'element-plus'
  import { ref, computed, nextTick, watchEffect, getCurrentInstance, useAttrs, useSlots } from 'vue'
  import type { ComponentPublicInstance, Slots } from 'vue'
  import type { FormRules, TableColumnCtx, TableInstance, TableProps } from 'element-plus'
  import { storeToRefs } from 'pinia'
  import type {
    AoTableProps,
    ColumnOption,
    TablePaginationOptions,
    TablePaginationState
  } from '../../types/component'
  import { useTableStore } from '../../store/modules/table'
  import { scrollToTop as useCommonScrollToTop } from '../../hooks/useScroll'
  import { useTableHeight } from '../../hooks/useTableHeight'
  import { useResizeObserver, useWindowSize } from '@vueuse/core'
  import AoSearchBar, { type SearchFormItem } from '../../forms/AoSearchBar.vue'
  import AoTableHeader from '../AoTableHeader.vue'

  defineOptions({ name: 'AoTable' })

  /**
   * 显式声明插槽契约。
   * 列内容插槽为动态命名，自动推断只能得到 ElTable 的 DefaultRow，
   * 无法还原调用方传入的泛型，因此在此显式声明作用域类型。
   * 固定插槽需单独声明，以保证无参数调用（如 <slot name="header-left" />）可通过类型检查。
   */
  defineSlots<{
    /** 表格头部左侧操作区 */
    'header-left': (props: any) => any
    /** 表格头部右侧操作区 */
    'header-right': (props: any) => any
    /** 表格默认插槽，用于在列配置之外追加自定义列 */
    default: (props: any) => any
    /** 表格底部左侧内容区（分页器位于同一行的右侧） */
    footer: (props: any) => any
    /** 声明即启用末尾操作列，透传原生单元格作用域 */
    operation: (props: { row: T; column: TableColumnCtx<T>; $index: number }) => any
    /**
     * 列内容插槽：填写 slotName 即启用 AoTable 上的同名插槽，透传原生作用域。
     */
    [name: string]: (props: {
      /** 当前行数据 */
      row: T
      /** 列上下文 */
      column: TableColumnCtx<T>
      /** 行索引 */
      $index: number
    }) => any
  }>()


  const props = withDefaults(defineProps<AoTableProps<T>>(), {
    columns: () => [],
    searchItems: () => [],
    fit: true,
    showHeader: true,
    stripe: undefined,
    border: undefined,
    size: undefined,
    emptyHeight: '100%',
    emptyText: '暂无数据',
    showTableHeader: true,
    searchShowExpand: undefined,
    showSearchBar: undefined,
    headerShowZebra: undefined,
    headerShowBorder: undefined,
    headerShowHeaderBackground: undefined,
    integrated: undefined
  })

  /** 搜索表单数据，支持 v-model:searchForm 双向绑定 */
  const searchFormModel = defineModel<Record<string, any>>('searchForm', {
    default: () => ({})
  })

  /** 表格头部列显示控制，支持 v-model:columnChecks 双向绑定（传入包内 useTableColumns 返回的 columnChecks） */
  const headerColumns = defineModel<ColumnOption<T>[]>('columnChecks', {
    default: () => []
  })

  const instance = getCurrentInstance()
  const attrs = useAttrs()
  // 运行时插槽可缺省；显式类型避免声明生成器沿模板条件循环推断。
  const slots: Slots = useSlots()

  const { width } = useWindowSize()
  const elTableRef = ref<TableInstance | null>(null)
  const bottomBarRef = ref<HTMLElement>()
  const tableHeaderRef = ref<HTMLElement>()
  const tableStore = useTableStore()
  const { isBorder, isZebra, tableSize, isFullScreen, isHeaderBackground } = storeToRefs(tableStore)

  /** 搜索栏组件实例，用于查询前触发表单校验 */
  const searchBarRef = ref<{ validate: () => Promise<unknown> } | null>(null)

  /** 表格头部组件实例，用于获取根元素监听高度变化 */
  const tableHeaderCompRef = ref<ComponentPublicInstance | null>(null)

  const LAYOUT = {
    MOBILE: 'prev, pager, next, sizes, jumper, total',
    IPAD: 'prev, pager, next, jumper, total',
    DESKTOP: 'total, prev, pager, next, sizes, jumper'
  }

  const layout = computed(() => {
    if (width.value < 768) {
      return LAYOUT.MOBILE
    } else if (width.value < 1024) {
      return LAYOUT.IPAD
    } else {
      return LAYOUT.DESKTOP
    }
  })

  // 合并分页配置：仅覆盖布局与外观，pageSizes 等未声明项沿用 element-plus 默认配置
  const mergedPaginationOptions = computed(() => ({
    background: true,
    hideOnSinglePage: false,
    size: 'default' as const,
    pagerCount: width.value > 1200 ? 7 : 5,
    layout: layout.value,
    ...props.paginationOptions
  }))

  // 边框 (优先级：props > store)
  const border = computed(() => props.border ?? isBorder.value)
  // 斑马纹
  const stripe = computed(() => props.stripe ?? isZebra.value)
  // 表格尺寸
  const size = computed(() => props.size ?? tableSize.value)
  // 数据是否为空
  const isEmpty = computed(() => props.data?.length === 0)

  // 分页状态全部派生自页面传入的 pagination，组件不持有、不修改分页状态
  const currentPage = computed(() => props.pagination?.currentPage ?? 1)
  const pageSize = computed(() => props.pagination?.pageSize ?? 10)
  // 总条数：未传入 pagination 时视为不分页
  const resolvedTotal = computed(() => props.pagination?.total ?? 0)

  // 是否传入搜索项
  const hasSearchItems = computed(() => (props.searchItems?.length ?? 0) > 0)
  // 是否编写了表格头部插槽
  const hasHeaderSlot = computed(() => !!(slots['header-left'] || slots['header-right']))
  // 是否启用集成布局：显式指定优先，否则按搜索项 / 头部插槽自动判断
  const isIntegrated = computed(
    () => props.integrated ?? (hasSearchItems.value || hasHeaderSlot.value)
  )
  // 搜索栏显隐状态：页面未显式传入 show-search-bar 时由组件内部维护，默认显示
  const innerShowSearchBar = ref(true)
  const resolvedShowSearchBar = computed(() => props.showSearchBar ?? innerShowSearchBar.value)
  // 头部搜索开关状态：无搜索项时不渲染开关，避免出现无效的切换按钮
  const headerShowSearchBar = computed(() =>
    hasSearchItems.value ? resolvedShowSearchBar.value : undefined
  )
  // 是否渲染表格头部
  const renderHeader = computed(() => isIntegrated.value && props.showTableHeader)
  // 根容器样式类：集成模式为纵向容器，默认模式不生成盒子以保持既有 DOM 布局
  const rootClass = computed(() => (isIntegrated.value ? 'is-integrated' : 'is-bare'))
  // 表格容器组件：集成模式使用 ElCard 作为内部布局层（卡片外观由根容器统一承担）
  const cardComponent = computed(() => (isIntegrated.value ? ElCard : 'div'))
  // 表格容器样式类：集成模式下退化为根卡片内的透明布局层，默认模式保持原有透传
  const cardClass = computed(() => (isIntegrated.value ? 'ao-table-card' : 'ao-table-bare'))

  const bottomBarHeight = ref(0)
  const tableHeaderHeight = ref(0)

  // 使用 useResizeObserver 监听底部栏高度变化（含 #footer 插槽内容，避免其高度未被计入布局）
  useResizeObserver(bottomBarRef, (entries) => {
    const entry = entries[0]
    if (entry) {
      // 使用 requestAnimationFrame 避免 ResizeObserver loop 警告
      requestAnimationFrame(() => {
        bottomBarHeight.value = entry.contentRect.height
      })
    }
  })

  // 使用 useResizeObserver 监听表格头部高度变化
  useResizeObserver(tableHeaderRef, (entries) => {
    const entry = entries[0]
    if (entry) {
      // 使用 requestAnimationFrame 避免 ResizeObserver loop 警告
      requestAnimationFrame(() => {
        tableHeaderHeight.value = entry.contentRect.height
      })
    }
  })

  // 底部栏与表格之间的间距常量（与 style.scss 中 .ao-table-bottom 的 margin-top 保持一致）
  const BOTTOM_BAR_SPACING = ref(10)

  // 使用表格高度计算 Hook
  const { containerHeight } = useTableHeight({
    showTableHeader: computed(() => props.showTableHeader),
    bottomBarHeight,
    tableHeaderHeight,
    bottomBarSpacing: BOTTOM_BAR_SPACING
  })

  // 表格高度逻辑
  const height = computed(() => {
    // 全屏模式下占满全屏
    if (isFullScreen.value) return '100%'
    // 空数据且非加载状态时固定高度
    if (isEmpty.value && !props.loading) return props.emptyHeight
    // 使用传入的高度
    if (props.height) return props.height
    // 默认占满容器高度
    return '100%'
  })

  // 表头背景颜色样式
  const headerCellStyle = computed(() => ({
    background: isHeaderBackground.value
      ? 'var(--el-fill-color-lighter)'
      : 'var(--default-box-color)',
    ...(props.headerCellStyle || {}) // 合并用户传入的样式
  }))

  // 只有显式传入时才覆盖 ElTable 的原生默认值，避免继承的 Boolean props 把官方默认值冲掉。
  const hasExplicitTableProp = (propName: string): boolean => {
    const rawProps = (instance?.vnode.props || {}) as Record<string, unknown>
    const kebabName = propName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
    return propName in rawProps || kebabName in rawProps
  }

  /** AoTable 自身扩展属性，不向 ElTable 透传，避免对象 / 数组被序列化为 DOM 属性；data 需透传故不在此列 */
  const OWN_PROP_KEYS = [
    'loading',
    'columns',
    'pagination',
    'paginationOptions',
    'emptyHeight',
    'emptyText',
    'showTableHeader',
    'searchItems',
    'searchRules',
    'searchSpan',
    'searchShowExpand',
    'showSearchBar',
    'headerShowZebra',
    'headerShowBorder',
    'headerShowHeaderBackground',
    'integrated',
    'searchForm',
    'columnChecks'
  ]

  /**
   * @description 过滤掉 AoTable 自身属性后，需要透传给 ElTable 的属性
   * @return 透传给 ElTable 的属性对象
   */
  const passThroughProps = computed(() => {
    const rest = { ...props } as Record<string, unknown>
    OWN_PROP_KEYS.forEach((key) => {
      delete rest[key]
    })
    return rest
  })

  const mergedTableProps = computed(() => ({
    ...attrs,
    ...passThroughProps.value,
    height: height.value,
    stripe: stripe.value,
    border: border.value,
    size: size.value,
    headerCellStyle: headerCellStyle.value,
    // Element Plus 默认值为 true，未显式传入时不应被 AoTable 覆盖成 false。
    selectOnIndeterminate: hasExplicitTableProp('selectOnIndeterminate')
      ? props.selectOnIndeterminate
      : undefined
  }))

  // 是否显示分页器：需页面传入 pagination.total 且当前页有数据
  const showPagination = computed(() => resolvedTotal.value > 0 && !isEmpty.value)

  // Element Plus 在部分场景会先用 $index = -1 进行预渲染。
  // 这对普通展示无影响，但会让 ElForm 错误注册出 lineList.-1.xxx 这类字段。
  const shouldRenderSlotScope = (slotScope: { $index?: number }) => {
    return slotScope.$index === undefined || slotScope.$index >= 0
  }

  /** 列配置中 AoTable / 列设置自有的字段，不透传给 ElTableColumn，避免被错误解释或泄漏为 DOM 属性 */
  const COLUMN_OWN_PROP_KEYS = ['slotName', 'visible', 'disabled']

  /**
   * @description 清理列属性，移除 AoTable 与列设置自有的字段，确保它们不会被 ElTableColumn 错误解释
   * @param col 列配置
   * @return 可透传给 ElTableColumn 的列属性
   */
  const cleanColumnProps = (col: ColumnOption<T>) => {
    const columnProps: Record<string, unknown> = { ...col }
    COLUMN_OWN_PROP_KEYS.forEach((key) => {
      delete columnProps[key]
    })
    return columnProps
  }

  /**
   * @description 沿用原生事件上报每页条数，页码重置与请求由页面决定
   * @param val 每页条数
   */
  const handleSizeChange = (val: number): void => {
    emit('size-change', val)
  }

  /**
   * @description 沿用原生事件上报页码并滚动到表格顶部
   * @param val 当前页码
   */
  const handleCurrentChange = (val: number): void => {
    emit('current-change', val)
    scrollToTop()
  }

  /**
   * @description 处理搜索事件，配置校验规则时先校验，未通过则不触发查询
   * @param params 清洗后的搜索参数
   */
  const handleSearch = async (params: Record<string, any>): Promise<void> => {
    if (props.searchRules) {
      try {
        await searchBarRef.value?.validate()
      } catch {
        return
      }
    }
    emit('search', params)
  }

  /** @description 处理重置事件，表单重置由搜索栏内部完成，此处仅上报页面 */
  const handleReset = (): void => {
    emit('reset')
  }

  /** @description 处理表格头部刷新事件，仅上报页面 */
  const handleRefresh = (): void => {
    emit('refresh')
  }

  /**
   * @description 处理表格头部搜索按钮的开关变化
   * @param value 搜索栏显示状态
   */
  const handleShowSearchBarChange = (value: boolean): void => {
    // 页面未显式传入 show-search-bar 时同步内部状态，保证开关可切换
    if (props.showSearchBar === undefined) {
      innerShowSearchBar.value = value
    }
    emit('update:showSearchBar', value)
  }

  const scrollPageToTop = useCommonScrollToTop

  // 滚动表格内容到顶部，并可以联动页面滚动到顶部
  const scrollToTop = () => {
    nextTick(() => {
      elTableRef.value?.setScrollTop(0) // 滚动 ElTable 内部滚动条到顶部
      scrollPageToTop() // 调用公共 composable 滚动页面到顶部
    })
  }

  // 全局序号
  const getGlobalIndex = (index: number) => {
    return (currentPage.value - 1) * pageSize.value + index + 1
  }

  const emit = defineEmits<{
    (e: 'size-change', value: number): void
    (e: 'current-change', value: number): void
    (e: 'refresh'): void
    (e: 'search', params: Record<string, any>): void
    (e: 'reset'): void
    (e: 'update:showSearchBar', value: boolean): void
  }>()

  // 表格头部根元素：经子组件实例获取，随 v-if 挂载 / 卸载自动同步，避免全局 getElementById 在多表格场景下取错元素
  watchEffect(
    () => {
      tableHeaderRef.value = (tableHeaderCompRef.value?.$el as HTMLElement | undefined) ?? undefined
    },
    { flush: 'post' }
  )

  defineExpose({
    scrollToTop,
    elTableRef
  })
</script>

<style lang="scss" scoped>
  @use './style';
</style>
