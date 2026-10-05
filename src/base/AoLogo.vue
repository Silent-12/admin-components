<!-- 系统logo -->
<template>
  <div class="logo-container">
    <img v-if="logoSrc" :style="logoStyle" :src="logoSrc" alt="logo" class="logo-img" />
  </div>
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { LOGO_URL_KEY } from '../hooks/useLocalSvg'

  defineOptions({ name: 'AoLogo' })

  interface Props {
    /** logo 大小 */
    size?: number | string
    /** logo 图片地址；不传时使用 Admin模板通过 install 注入的地址 */
    src?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 36
  })

  // logo 属于 Admin模板品牌资源，由 Admin模板通过 install 注入默认地址
  const injectedLogoUrl = inject<string | undefined>(LOGO_URL_KEY, undefined)

  const logoSrc = computed(() => props.src ?? injectedLogoUrl)

  const logoStyle = computed(() => ({ width: `${props.size}px` }))
</script>

<style scoped lang="scss">
  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // logo 图片
  .logo-img {
    width: 100%;
    height: 100%;
  }
</style>
