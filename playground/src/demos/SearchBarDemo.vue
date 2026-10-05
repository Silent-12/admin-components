<!--
  AoSearchBar 示例
  场景一：独立使用（默认 span 6，超过一行容量自动出现展开 / 收起）
  场景二：配置项（span、buttonLeftLimit、showExpand、defaultExpanded、showReset、disabledSearch）
-->
<template>
  <div class="demo-page">
    <header class="demo-head">
      <h2>AoSearchBar 搜索栏</h2>
      <p>
        与 AoTable 内置搜索栏是同一组件：内部持有表单状态，通过
        <code>update:modelValue</code> 整体上报， 查询时上报
        <code>search</code> 事件并携带清洗后的参数。单独使用时，校验需由页面通过 ref 的
        <code>validate()</code> 主动触发。
      </p>
    </header>

    <!-- 场景一 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景一：基础用法</h3>
      <p class="demo-block__desc">
        搜索项超过一行容量时自动出现「展开 / 收起」。选项类表单项的 <code>options</code> 写在顶层，
        由组件渲染为 ElOption 子节点；其余属性写在 <code>props</code> 内。
      </p>

      <AoSearchBar
        ref="searchBarRef"
        v-model="searchModel"
        :items="searchItems"
        :rules="searchRules"
        @search="handleSearch"
        @reset="handleReset"
      />

      <div class="demo-actions">
        <ElButton size="small" @click="handleReadOutput">ref.getOutput()</ElButton>
        <ElButton size="small" @click="handleValidate">ref.validate()</ElButton>
      </div>

      <pre class="demo-output">{{ searchText }}</pre>
    </section>

    <!-- 场景二 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景二：配置项</h3>
      <p class="demo-block__desc">
        <code>span</code> 控制单项占宽（24 栅格）；<code>button-left-limit</code>
        指定表单项数量不超过该值时按钮靠左对齐；
        <code>show-expand="false"</code> 关闭展开收起；<code>default-expanded</code> 指定默认展开；
        <code>show-reset</code> / <code>disabled-search</code> 控制按钮的显示与禁用。
      </p>

      <div class="demo-block__desc"
        >配置 A：span=8（一行两项）+ buttonLeftLimit=2（按钮靠左）+ 关闭展开收起</div
      >
      <AoSearchBar
        v-model="compactModel"
        :items="compactItems"
        :span="8"
        :button-left-limit="2"
        :show-expand="false"
        @search="handleCompactSearch"
      />

      <div class="demo-block__desc"
        >配置 B：defaultExpanded（默认展开全部）+ 隐藏重置按钮 + 禁用查询按钮</div
      >
      <AoSearchBar
        v-model="expandedModel"
        :items="searchItems"
        :default-expanded="true"
        :show-reset="false"
        :disabled-search="true"
        label-width="80px"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, useTemplateRef } from 'vue'
  import { ElButton } from 'element-plus'
  import type { FormRules } from 'element-plus'
  import { AoSearchBar, type SearchFormItem } from '@ao/admin-components'
  import { DEPARTMENT_OPTIONS, STATUS_OPTIONS } from '../mock/options'

  defineOptions({ name: 'SearchBarDemo' })

  /** AoSearchBar 通过 ref 暴露的能力（与组件 defineExpose 契约一致） */
  interface AoSearchBarExpose {
    /** 校验表单，未通过时 reject */
    validate: () => Promise<unknown>
    /** 重置表单并恢复初始值 */
    reset: () => void
    /** 读取清洗后的查询参数 */
    getOutput: () => Record<string, unknown>
  }

  /** 搜索栏实例引用 */
  const searchBarRef = useTemplateRef<AoSearchBarExpose>('searchBarRef')

  /** 场景一表单数据 */
  const searchModel = ref<Record<string, any>>({})

  /** 场景一搜索项：6 项超过 span=6 的一行容量（3 项），自动出现展开 / 收起 */
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
    },
    {
      label: '状态',
      key: 'status',
      type: 'select',
      options: STATUS_OPTIONS,
      props: { placeholder: '请选择状态', clearable: true }
    },
    {
      label: '入职日期',
      key: 'joinDate',
      type: 'date',
      props: { type: 'date', placeholder: '选择日期', valueFormat: 'YYYY-MM-DD' }
    },
    {
      label: '有效期',
      key: 'activeRange',
      type: 'daterange',
      props: {
        type: 'daterange',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD'
      }
    }
  ]

  /** 搜索项校验规则（独立使用时需页面主动调用 ref.validate()） */
  const searchRules: FormRules = {
    userEmail: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }]
  }

  /** 最近一次查询 / 读取的参数 */
  const lastSearch = ref<Record<string, unknown>>({})

  /** 参数面板文本 */
  const searchText = computed(() => JSON.stringify(lastSearch.value, null, 2))

  /**
   * @description 处理查询：search 事件携带的是清洗后的参数，空值已被移除。
   * @param params 清洗后的查询参数。
   */
  const handleSearch = (params: Record<string, unknown>): void => {
    lastSearch.value = params
  }

  /** @description 处理重置：表单值已由组件恢复为初始值，页面只需刷新数据。 */
  const handleReset = (): void => {
    lastSearch.value = { 提示: '已重置为初始查询条件' }
  }

  /** @description 演示 ref.getOutput()：不触发查询事件直接读取清洗后的参数。 */
  const handleReadOutput = (): void => {
    lastSearch.value = searchBarRef.value?.getOutput() ?? {}
  }

  /** @description 演示 ref.validate()：独立使用时校验不会随查询自动触发。 */
  const handleValidate = async (): Promise<void> => {
    try {
      await searchBarRef.value?.validate()
      lastSearch.value = { 校验: '通过' }
    } catch {
      lastSearch.value = { 校验: '未通过，请检查邮箱格式' }
    }
  }

  // ---------- 场景二：配置项 ----------

  /** 配置 A 表单数据 */
  const compactModel = ref<Record<string, any>>({})

  /** 配置 A 搜索项：span=8 时一行两项，按钮靠左 */
  const compactItems: SearchFormItem[] = [
    {
      label: '用户名',
      key: 'userName',
      type: 'input',
      props: { placeholder: '请输入用户名', clearable: true }
    },
    {
      label: '部门',
      key: 'department',
      type: 'select',
      options: DEPARTMENT_OPTIONS,
      props: { placeholder: '请选择部门', clearable: true }
    }
  ]

  /** 配置 B 表单数据 */
  const expandedModel = ref<Record<string, any>>({})

  /**
   * @description 配置 A 查询回调。
   * @param params 清洗后的查询参数。
   */
  const handleCompactSearch = (params: Record<string, unknown>): void => {
    lastSearch.value = params
  }
</script>
