<!--
  AoButtonTable / AoButtonMore / AoIconButton 示例
  场景一：AoButtonTable 五种内置类型与自定义图标 / 颜色
  场景二：AoButtonMore 权限过滤与整体权限开关
  场景三：AoIconButton 普通与圆角形态
-->
<template>
  <div class="demo-page">
    <header class="demo-head">
      <h2>按钮组</h2>
      <p>
        表格行内按钮（AoButtonTable）、下拉更多按钮（AoButtonMore）与通用图标按钮（AoIconButton）。
        AoButtonMore 的 <code>auth</code> 走包内 <code>useAuth</code>，权限列表由 Admin模板在
        install 时通过 <code>getAuthList</code> 注入（当前注入值：<code
          >['add', 'edit', 'delete']</code
        >）。
      </p>
    </header>

    <!-- 场景一 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景一：AoButtonTable</h3>
      <p class="demo-block__desc">
        <code>type</code> 提供 add / edit / delete / view / more 五种内置图标与配色； 传
        <code>icon</code> 覆盖图标，传 <code>icon-color</code> /
        <code>button-bg-color</code> 覆盖前景与背景色。
      </p>

      <div class="demo-actions">
        <AoButtonTable type="add" @click="handleButtonClick('add')" />
        <AoButtonTable type="edit" @click="handleButtonClick('edit')" />
        <AoButtonTable type="delete" @click="handleButtonClick('delete')" />
        <AoButtonTable type="view" @click="handleButtonClick('view')" />
        <AoButtonTable type="more" @click="handleButtonClick('more')" />
        <AoButtonTable
          icon="ri:download-2-line"
          icon-color="#7c3aed"
          button-bg-color="rgba(124, 58, 237, 0.12)"
          @click="handleButtonClick('自定义图标与配色')"
        />
      </div>
    </section>

    <!-- 场景二 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景二：AoButtonMore</h3>
      <p class="demo-block__desc">
        列表项 <code>auth</code> 未命中注入的权限列表时不渲染；不传 <code>auth</code> 的项始终渲染；
        <code>disabled</code> 置灰、<code>color</code> 覆盖文本色、<code>icon</code> 显示图标。
        当所有项都无权限时，整个下拉按钮不渲染（可用整体 <code>auth</code> 进一步收口）。
      </p>

      <div class="demo-actions">
        <AoButtonMore :list="moreList" @click="handleMoreClick" />
        <AoButtonMore :list="deniedList" @click="handleMoreClick" />
        <span class="demo-footer-tip">右侧列表项的 auth 均未命中，按钮整体不渲染</span>
      </div>
    </section>

    <!-- 场景三 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景三：AoIconButton</h3>
      <p class="demo-block__desc">
        通用图标按钮，默认 2.125rem 方形，<code>circle</code> 开启圆角；默认插槽可追加文字内容。
      </p>

      <div class="demo-actions">
        <AoIconButton icon="ri:settings-3-line" />
        <AoIconButton icon="ri:add-line" circle />
        <AoIconButton icon="ri:refresh-line" @click="handleButtonClick('AoIconButton')">
          <span class="icon-text">刷新</span>
        </AoIconButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import {
    AoButtonMore,
    AoButtonTable,
    AoIconButton,
    type ButtonMoreItem
  } from '@ao/admin-components'

  defineOptions({ name: 'ButtonDemo' })

  /** 权限命中的下拉项列表 */
  const moreList: ButtonMoreItem[] = [
    { key: 'add', label: '新增', icon: 'ri:add-line', auth: 'add' },
    { key: 'export', label: '导出', icon: 'ri:download-2-line', auth: 'export' },
    {
      key: 'delete',
      label: '批量删除',
      icon: 'ri:delete-bin-line',
      color: '#f56c6c',
      auth: 'delete'
    },
    { key: 'help', label: '帮助文档', icon: 'ri:question-line' },
    { key: 'archive', label: '归档（禁用）', icon: 'ri:archive-line', disabled: true }
  ]

  /** 权限全部未命中的下拉项列表 */
  const deniedList: ButtonMoreItem[] = [
    { key: 'approve', label: '审批', auth: 'approve' },
    { key: 'publish', label: '发布', auth: 'publish' }
  ]

  /**
   * @description AoButtonTable / AoIconButton 点击反馈。
   * @param name 按钮标识。
   */
  const handleButtonClick = (name: string): void => {
    ElMessage.info(`点击了「${name}」按钮`)
  }

  /**
   * @description AoButtonMore 下拉项点击反馈。
   * @param item 被点击的下拉项。
   */
  const handleMoreClick = (item: ButtonMoreItem): void => {
    ElMessage.info(`点击了「${item.label}」`)
  }
</script>

<style scoped lang="scss">
  // AoIconButton 的文字插槽
  .icon-text {
    margin-left: 4px;
    font-size: 13px;
  }
</style>
