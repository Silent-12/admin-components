<!-- AoDialog 通用弹窗组件入口 -->
<!-- 统一后台弹窗外观：复用 .ao-form-dialog 的头部与底部内边距、1px 分隔线，头部支持拖拽，内容区自适应滚动 -->
<!-- 底部操作区默认右对齐 取消 / 确定；确定仅上报 confirm，是否关闭弹窗由业务决定，需要自定义按钮时用 #footer 插槽整体接管 -->
<template>
  <ElDialog
    class="ao-form-dialog ao-dialog"
    :model-value="visible"
    :title="title"
    :width="width"
    :align-center="alignCenter"
    draggable
    :overflow="false"
    @update:model-value="handleVisibleChange"
    @closed="emit('closed')"
  >
    <div v-loading="loading" class="ao-dialog__body">
      <slot />
    </div>
    <template #footer>
      <slot name="footer">
        <ElButton v-if="showCancel" @click="handleCancel">
          {{ cancelText || t('common.cancel') }}
        </ElButton>
        <ElButton
          v-if="showConfirm"
          type="primary"
          :disabled="confirmDisabled || loading"
          @click="emit('confirm')"
        >
          {{ confirmText || t('common.confirm') }}
        </ElButton>
      </slot>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import { ElButton, ElDialog } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  import type { AoDialogEmits, AoDialogProps } from '../types/component'

  defineOptions({ name: 'AoDialog' })

  withDefaults(defineProps<AoDialogProps>(), {
    visible: false,
    title: '',
    width: '600px',
    alignCenter: true,
    loading: false,
    showCancel: true,
    showConfirm: true,
    cancelText: '',
    confirmText: '',
    confirmDisabled: false
  })

  const emit = defineEmits<AoDialogEmits>()

  const { t } = useI18n()

  /**
   * @description 同步弹窗显隐（遮罩点击、ESC 关闭等场景）到 v-model:visible
   * @param value 弹窗目标显隐状态
   */
  const handleVisibleChange = (value: boolean): void => {
    emit('update:visible', value)
  }

  /**
   * @description 点击取消：上报 cancel 事件并关闭弹窗
   */
  const handleCancel = (): void => {
    emit('cancel')
    handleVisibleChange(false)
  }
</script>

<style scoped lang="scss">
  // .ao-form-dialog 已把 .el-dialog__body 内边距归零，内容区留白统一由本容器提供
  .ao-dialog {
    .ao-dialog__body {
      padding: 16px;
    }
  }
</style>
