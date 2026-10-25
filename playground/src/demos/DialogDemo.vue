<!--
  AoDialog 示例
  场景一：默认底部操作区（取消 / 确定，确定只上报 confirm，是否关闭由业务决定）
  场景二：#footer 插槽整体接管按钮
-->
<template>
  <div class="demo-page">
    <header class="demo-head">
      <h2>通用弹窗</h2>
      <p>
        <code>AoDialog</code> 统一后台弹窗外壳：头部、底部与 1px 分隔线同
        <code>AoForm</code>
        弹窗模式（<code>.ao-form-dialog</code>），头部可拖拽，内容区超出可视高度时自身滚动。
      </p>
    </header>

    <!-- 场景一 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景一：默认底部操作区</h3>
      <p class="demo-block__desc">
        底部默认右对齐 <code>取消</code> / <code>确定</code>；<code>取消</code> 上报
        <code>cancel</code> 并关闭，<code>确定</code> 只上报
        <code>confirm</code>，关闭时机由业务决定。 文案可用 <code>cancel-text</code> /
        <code>confirm-text</code> 覆盖，<code>confirm-disabled</code>
        可禁用确定。
      </p>

      <div class="demo-actions">
        <ElButton type="primary" @click="basicVisible = true">打开弹窗</ElButton>
      </div>

      <AoDialog
        v-model:visible="basicVisible"
        title="弹窗标题"
        width="min(520px, calc(100vw - 32px))"
        confirm-text="确定"
        @confirm="basicVisible = false"
      >
        <p class="dialog-text">
          内容区留白由
          <code>AoDialog</code> 统一提供，业务只负责内容本身，无需再处理头部、底部间距与分隔线。
        </p>
      </AoDialog>
    </section>

    <!-- 场景二 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景二：#footer 插槽接管底部</h3>
      <p class="demo-block__desc">
        传入 <code>#footer</code> 后默认按钮整体失效，可自行组合按钮；关闭按钮点击后自行修改
        <code>visible</code>。
      </p>

      <div class="demo-actions">
        <ElButton @click="customVisible = true">打开自定义底部弹窗</ElButton>
      </div>

      <AoDialog
        v-model:visible="customVisible"
        title="自定义底部"
        width="min(520px, calc(100vw - 32px))"
      >
        <p class="dialog-text">只读信息或危险操作确认等场景，可完全自定义底部按钮。</p>

        <template #footer>
          <ElButton @click="customVisible = false">关闭</ElButton>
          <ElButton type="danger" @click="customVisible = false">立即删除</ElButton>
        </template>
      </AoDialog>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElButton } from 'element-plus'
  import { AoDialog } from '@ao/admin-components'

  defineOptions({ name: 'DialogDemo' })

  /** 场景一弹窗显隐 */
  const basicVisible = ref(false)
  /** 场景二弹窗显隐 */
  const customVisible = ref(false)
</script>

<style scoped lang="scss">
  .dialog-text {
    margin: 0;
    line-height: 1.7;
    color: var(--ao-gray-700);
  }
</style>
