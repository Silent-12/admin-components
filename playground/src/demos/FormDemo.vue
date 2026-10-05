<!--
  AoForm 示例
  场景一：弹窗表单（默认底部按钮 + 校验 + 提交 / 取消 / 关闭事件）
  场景二：弹窗表单（#footer 插槽接管底部操作区）
  场景三：内联表单（dialog=false，覆盖全部内置表单项类型，底部按钮由页面自备）
-->
<template>
  <div class="demo-page">
    <header class="demo-head">
      <h2>AoForm 表单</h2>
      <p>
        表单项通过 <code>items</code> 配置，属性写在 <code>props</code> 里，写法与 Element Plus 官方文档一致；
        默认由 ElDialog 承载为弹窗表单，传 <code>:dialog="false"</code> 时为内联表单。
        组件只上报清洗后的输出，<code>submit</code> 后是否关闭弹窗由业务决定。
      </p>
    </header>

    <!-- 场景一 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景一：弹窗表单（默认底部操作区）</h3>
      <p class="demo-block__desc">
        <code>v-model</code> 绑定表单数据，<code>v-model:visible</code> 控制显隐；<code>rules</code> 通过属性透传给
        ElForm。底部固定为「取消 / 确定」，确定 = 校验通过后触发 <code>submit</code> 并携带清洗后的全部表单值，
        校验失败只展示行内错误。按钮文案可用 <code>cancel-text</code> / <code>confirm-text</code> 覆盖。
        表单项未声明 <code>span</code> 时默认每行 2 项，弹窗宽度未传时取默认 600px；需要更稀疏或更紧凑时由
        表单项声明 <code>span</code>（相对行基准，基准默认 24，此处 <code>span: 12</code> 即半行）。
      </p>

      <div class="demo-actions">
        <ElButton type="primary" @click="openUserForm">新增用户</ElButton>
      </div>

      <AoForm
        ref="userFormRef"
        v-model="userForm"
        v-model:visible="userFormVisible"
        title="新增用户"
        cancel-text="关闭"
        confirm-text="保存"
        :items="userFormItems"
        :rules="userFormRules"
        @submit="handleUserFormSubmit"
        @cancel="handleUserFormCancel"
        @closed="handleUserFormClosed"
      />
    </section>

    <!-- 场景二 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景二：自定义底部操作区（#footer 插槽）</h3>
      <p class="demo-block__desc">
        需要增删按钮或调整按钮顺序时，用 <code>#footer</code> 插槽整体接管底部操作区；配合
        <code>:show-submit="false"</code> 隐藏内置确定按钮。通过 ref 的 <code>getOutput()</code>
        可在不触发提交事件的前提下读取清洗后的表单值。
      </p>

      <div class="demo-actions">
        <ElButton @click="footerFormVisible = true">打开自定义底部弹窗</ElButton>
      </div>

      <AoForm
        ref="footerFormRef"
        v-model="footerForm"
        v-model:visible="footerFormVisible"
        title="新建任务"
        width="520px"
        :items="footerFormItems"
        :show-submit="false"
        @submit="handleFooterFormSubmit"
      >
        <template #footer>
          <ElButton @click="footerFormVisible = false">取消</ElButton>
          <ElButton @click="handleFooterDraft">存为草稿</ElButton>
          <ElButton type="primary" @click="footerFormRef?.submit()">保存并关闭</ElButton>
        </template>
      </AoForm>
    </section>

    <!-- 场景三 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景三：内联表单（全部内置表单项类型）</h3>
      <p class="demo-block__desc">
        <code>:dialog="false"</code> 渲染为内联表单，底部按钮由页面自备。表单项
        <code>span</code> 是相对行基准（组件 <code>span</code> 属性，默认 24）的格数，此处每项 8 格即一行三项，
        与未声明 <code>span</code> 时的默认密度一致。
        <code>type: 'title'</code> 渲染为独占一行的分组标题项，不参与表单数据；<code>hidden</code> 的表单项不渲染；
        <code>slots</code> 用于向内层组件注入具名插槽，<code>render</code> 用于完全自定义渲染。
        选项类表单项（select / checkboxgroup / radiogroup）的 <code>options</code> 写在表单项顶层，
        由组件渲染为子节点；其余组件（cascader 的 options、treeselect 的 data）按官方属性写在 <code>props</code> 内。
      </p>

      <AoForm
        ref="inlineFormRef"
        v-model="inlineForm"
        :dialog="false"
        :items="inlineFormItems"
        :rules="inlineFormRules"
        :span="24"
        :gutter="16"
        label-position="right"
        label-width="96px"
        :sanitize-output="{ removeEmptyArray: false }"
        @submit="handleInlineSubmitOutput"
      />

      <div class="demo-form-actions">
        <ElButton @click="handleInlineValidate">校验</ElButton>
        <ElButton @click="handleInlineReset">重置</ElButton>
        <ElButton type="primary" @click="handleInlineSubmit">提交</ElButton>
      </div>
    </section>

    <!-- 输出面板 -->
    <section class="demo-block">
      <h3 class="demo-block__title">表单输出（清洗后）</h3>
      <p class="demo-block__desc">
        空字符串、空数组、空对象、空富文本默认会被移除，但保留 <code>0</code> 与 <code>false</code>；
        清洗范围可通过 <code>sanitize-output</code> 覆盖（内联表单已关闭空数组移除）。
      </p>
      <pre class="demo-output">{{ outputText }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed, h, ref, useTemplateRef } from 'vue'
  import { ElButton, ElMessage } from 'element-plus'
  import type { FormRules } from 'element-plus'
  import { AoForm, AoSvgIcon, type FormItem } from '@ao/admin-components'
  import { CITY_OPTIONS, DEPARTMENT_OPTIONS, GENDER_OPTIONS, MENU_TREE_OPTIONS, SKILL_OPTIONS } from '../mock/options'

  defineOptions({ name: 'FormDemo' })

  /** AoForm 通过 ref 暴露的能力（与组件 defineExpose 契约一致） */
  interface AoFormExpose {
    /** 校验表单，未通过时 reject */
    validate: () => Promise<unknown>
    /** 重置表单并恢复初始值 */
    reset: () => void
    /** 触发校验并在通过后上报 submit */
    submit: () => void
    /** 读取清洗后的表单输出，不触发提交 */
    getOutput: () => Record<string, any>
  }

  /** 最近一次读取/提交的表单输出 */
  const lastOutput = ref<Record<string, any>>({})

  /** 输出面板文本 */
  const outputText = computed(() => JSON.stringify(lastOutput.value, null, 2))

  // ---------- 场景一：默认弹窗 ----------

  /** 表单实例引用 */
  const userFormRef = useTemplateRef<AoFormExpose>('userFormRef')

  /** 弹窗显隐 */
  const userFormVisible = ref(false)

  /** 表单数据 */
  const userForm = ref<Record<string, any>>({})

  /** 表单项配置 */
  const userFormItems: FormItem[] = [
    {
      key: 'userName',
      label: '用户名',
      type: 'input',
      props: { placeholder: '请输入用户名', clearable: true }
    },
    {
      key: 'userEmail',
      label: '邮箱',
      type: 'input',
      props: { placeholder: '请输入邮箱', clearable: true }
    },
    {
      key: 'department',
      label: '部门',
      type: 'select',
      options: DEPARTMENT_OPTIONS,
      props: { placeholder: '请选择部门', clearable: true }
    },
    {
      key: 'status',
      label: '账号状态',
      type: 'switch',
      span: 12,
      props: { activeValue: 1, inactiveValue: 0, activeText: '启用', inactiveText: '停用' }
    },
    {
      key: 'remark',
      label: '备注',
      span: 24,
      props: { type: 'textarea', rows: 3, placeholder: '请输入备注' }
    }
  ]

  /** 校验规则 */
  const userFormRules: FormRules = {
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    userEmail: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ]
  }

  /** @description 打开弹窗并回填默认值（初始值会在表单主体挂载时被快照，用于 reset 恢复）。 */
  const openUserForm = (): void => {
    userForm.value = { status: 1 }
    userFormVisible.value = true
  }

  /**
   * @description 提交回调：校验已由组件完成，这里决定关闭弹窗与后续处理。
   * @param output 清洗后的表单输出。
   */
  const handleUserFormSubmit = (output: Record<string, any>): void => {
    lastOutput.value = output
    userFormVisible.value = false
    ElMessage.success('表单已提交，输出见下方面板')
  }

  /** @description 点击取消按钮。 */
  const handleUserFormCancel = (): void => {
    ElMessage.info('已取消')
  }

  /** @description 弹窗关闭动画结束后重置表单，恢复到挂载时的初始值。 */
  const handleUserFormClosed = (): void => {
    userFormRef.value?.reset()
  }

  // ---------- 场景二：#footer 插槽 ----------

  /** 自定义底部表单实例引用 */
  const footerFormRef = useTemplateRef<AoFormExpose>('footerFormRef')

  /** 自定义底部弹窗显隐 */
  const footerFormVisible = ref(false)

  /** 自定义底部表单数据 */
  const footerForm = ref<Record<string, any>>({})

  /** 自定义底部表单项配置 */
  const footerFormItems: FormItem[] = [
    { key: 'title', label: '任务标题', type: 'input', props: { placeholder: '请输入任务标题' } },
    {
      key: 'owner',
      label: '负责人',
      type: 'select',
      options: DEPARTMENT_OPTIONS,
      props: { placeholder: '请选择负责部门', clearable: true }
    }
  ]

  /** @description 读取清洗后的表单输出但不提交，演示 ref.getOutput()。 */
  const handleFooterDraft = (): void => {
    lastOutput.value = footerFormRef.value?.getOutput() ?? {}
    ElMessage.info('已读取清洗后的表单输出（未触发提交）')
  }

  /**
   * @description 自定义底部「保存并关闭」：组件校验通过后触发。
   * @param output 清洗后的表单输出。
   */
  const handleFooterFormSubmit = (output: Record<string, any>): void => {
    lastOutput.value = output
    footerFormVisible.value = false
    ElMessage.success('任务已保存')
  }

  // ---------- 场景三：内联表单 ----------

  /** 内联表单实例引用 */
  const inlineFormRef = useTemplateRef<AoFormExpose>('inlineFormRef')

  /** 内联表单数据 */
  const inlineForm = ref<Record<string, any>>({
    enabled: true,
    status: 1,
    gender: 1,
    skills: ['vue'],
    score: 60,
    rate: 4
  })

  /** render 渲染的自定义内容（不参与表单数据，仅演示 render 出口） */
  const renderTip = () => h('div', { class: 'demo-render-tip' }, '由 render 渲染的静态内容')

  /** 内联表单配置：覆盖全部内置 type，含分组标题、隐藏项、插槽与 render */
  const inlineFormItems: FormItem[] = [
    { key: 'section-base', label: '基础信息', type: 'title' },
    {
      key: 'userName',
      label: '用户名',
      type: 'input',
      span: 8,
      props: { placeholder: '请输入用户名', clearable: true }
    },
    {
      key: 'tags',
      label: '标签',
      type: 'inputtag',
      span: 8,
      props: { placeholder: '回车添加标签' }
    },
    {
      key: 'age',
      label: '年龄',
      type: 'number',
      span: 8,
      props: { min: 0, max: 120, controlsPosition: 'right' }
    },
    {
      key: 'department',
      label: '部门',
      type: 'select',
      span: 8,
      options: DEPARTMENT_OPTIONS,
      props: { placeholder: '请选择部门', clearable: true }
    },
    {
      key: 'city',
      label: '所在城市',
      type: 'cascader',
      span: 8,
      props: { options: CITY_OPTIONS, placeholder: '请选择城市', clearable: true }
    },
    {
      key: 'menu',
      label: '所属菜单',
      type: 'treeselect',
      span: 8,
      props: { data: MENU_TREE_OPTIONS, placeholder: '请选择菜单', clearable: true }
    },

    { key: 'section-status', label: '状态与偏好', type: 'title' },
    { key: 'enabled', label: '是否启用', type: 'switch', span: 8 },
    {
      key: 'agreed',
      label: '用户协议',
      type: 'checkbox',
      span: 8,
      slots: { default: () => h('span', null, '已阅读并同意用户协议') }
    },
    {
      key: 'gender',
      label: '性别',
      type: 'radiogroup',
      span: 8,
      options: GENDER_OPTIONS
    },
    {
      key: 'skills',
      label: '技术栈',
      type: 'checkboxgroup',
      span: 24,
      options: SKILL_OPTIONS
    },
    { key: 'rate', label: '综合评分', type: 'rate', span: 8 },
    {
      key: 'score',
      label: '完成进度',
      type: 'slider',
      span: 16,
      props: { min: 0, max: 100, showInput: false }
    },

    { key: 'section-time', label: '时间设置', type: 'title' },
    {
      key: 'joinDate',
      label: '入职日期',
      type: 'date',
      span: 8,
      props: { type: 'date', placeholder: '选择日期', valueFormat: 'YYYY-MM-DD' }
    },
    {
      key: 'activeRange',
      label: '有效期',
      type: 'daterange',
      span: 8,
      props: {
        type: 'daterange',
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD'
      }
    },
    {
      key: 'planTime',
      label: '计划时间',
      type: 'datetime',
      span: 8,
      props: { type: 'datetime', placeholder: '选择日期时间' }
    },
    {
      key: 'windowRange',
      label: '时间窗口',
      type: 'datetimerange',
      span: 8,
      props: {
        type: 'datetimerange',
        rangeSeparator: '至',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    },
    {
      key: 'remindTime',
      label: '提醒时间',
      type: 'timepicker',
      span: 8,
      props: { placeholder: '选择时间' }
    },
    {
      key: 'workTime',
      label: '上班时间',
      type: 'timeselect',
      span: 8,
      props: { start: '08:00', end: '20:00', step: '00:30' }
    },

    { key: 'section-other', label: '其他', type: 'title' },
    { key: 'renderTip', label: '自定义渲染', span: 12, render: renderTip },
    {
      key: 'searchKey',
      label: '插槽图标',
      type: 'input',
      span: 12,
      props: { placeholder: '前缀图标由 slots 注入' },
      slots: { prefix: () => h(AoSvgIcon, { icon: 'ri:search-line' }) }
    },
    // 隐藏表单项不渲染、不占位，但仍参与表单数据
    { key: 'internalCode', label: '内部编号', type: 'input', hidden: true },
    {
      key: 'remark',
      label: '备注',
      type: 'input',
      span: 24,
      props: { type: 'textarea', rows: 3, placeholder: '请输入备注' }
    }
  ]

  /** 内联表单校验规则 */
  const inlineFormRules: FormRules = {
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
  }

  /** @description 主动校验内联表单，未通过时展示行内错误。 */
  const handleInlineValidate = async (): Promise<void> => {
    try {
      await inlineFormRef.value?.validate()
      ElMessage.success('校验通过')
    } catch {
      ElMessage.error('校验未通过，请检查行内提示')
    }
  }

  /** @description 重置内联表单（恢复挂载时的初始值）。 */
  const handleInlineReset = (): void => {
    inlineFormRef.value?.reset()
    ElMessage.info('表单已重置')
  }

  /** @description 提交内联表单，校验通过后由组件上报 submit。 */
  const handleInlineSubmit = (): void => {
    inlineFormRef.value?.submit()
  }

  /**
   * @description 内联表单提交回调。
   * @param output 清洗后的表单输出。
   */
  const handleInlineSubmitOutput = (output: Record<string, any>): void => {
    lastOutput.value = output
    ElMessage.success('内联表单已提交，输出见下方面板')
  }
</script>
