<!--
  AoSvgIcon / AoLogo 示例
  场景一：AoSvgIcon 图标（iconify 名称、尺寸、颜色继承）
  场景二：AoLogo（Admin模板注入的默认地址、src 覆盖、尺寸）
-->
<template>
  <div class="demo-page">
    <header class="demo-head">
      <h2>图标与 Logo</h2>
      <p>
        <code>AoSvgIcon</code> 名称含 <code>:</code> 时走 iconify 在线图标，否则交给 Admin模板通过
        <code>resolveLocalSvg</code> 注入的本地 SVG 解析函数；<code>AoLogo</code> 未显式传
        <code>src</code> 时使用 Admin模板通过 <code>assets.logo</code> 注入的地址。
      </p>
    </header>

    <!-- 场景一 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景一：AoSvgIcon</h3>
      <p class="demo-block__desc">
        <code>size</code> 默认 <code>1em</code>，跟随外层字号；图标颜色由 <code>color</code> 继承，
        未注入本地 SVG 解析函数时所有名称都按 iconify 在线加载。
      </p>

      <div class="demo-actions">
        <AoSvgIcon icon="ri:user-line" class="icon-default" />
        <AoSvgIcon icon="ri:settings-3-line" size="20px" />
        <AoSvgIcon icon="ri:notification-3-line" size="24px" />
        <AoSvgIcon icon="ri:star-line" size="28px" />
        <AoSvgIcon icon="ri:github-fill" size="24px" />
      </div>

      <div class="demo-actions icon-color-row">
        <span>跟随文字颜色：</span>
        <AoSvgIcon icon="ri:check-line" size="18px" />
        <span class="icon-primary"><AoSvgIcon icon="ri:check-line" size="18px" /> 主题色</span>
        <span class="icon-error"><AoSvgIcon icon="ri:close-line" size="18px" /> 错误色</span>
      </div>
    </section>

    <!-- 场景二 -->
    <section class="demo-block">
      <h3 class="demo-block__title">场景二：AoLogo</h3>
      <p class="demo-block__desc">
        左侧为 Admin模板通过 install 的 <code>assets.logo</code> 注入的默认地址（playground
        注入的是内联 SVG data URI）； 右侧显式传 <code>src</code> 覆盖默认值。<code>size</code>
        控制宽度，高度自适应。
      </p>

      <div class="demo-actions logo-row">
        <div class="logo-item">
          <AoLogo />
          <span>默认注入（size=36）</span>
        </div>
        <div class="logo-item">
          <AoLogo :size="48" />
          <span>size=48</span>
        </div>
        <div class="logo-item">
          <AoLogo :size="36" :src="overrideLogo" />
          <span>src 覆盖</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { AoLogo, AoSvgIcon } from '@ao/admin-components'

  defineOptions({ name: 'BaseDemo' })

  /**
   * 覆盖默认 logo 的示例地址
   * @description 与 main.ts 注入的内联 SVG 同构，仅改配色，用于验证 src 优先级高于注入值。
   */
  const overrideLogo =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='16' fill='%2322c55e'/%3E%3Ctext x='16' y='22' font-size='14' font-family='sans-serif' text-anchor='middle' fill='%23fff'%3ELogo%3C/text%3E%3C/svg%3E"
</script>

<style scoped lang="scss">
  // 默认字号下的图标基准
  .icon-default {
    font-size: 18px;
  }

  // 颜色继承示例：图标颜色由外层文字颜色决定
  .icon-color-row {
    font-size: 13px;
    color: var(--ao-gray-700);
  }

  .icon-primary {
    color: var(--theme-color);
  }

  .icon-error {
    color: var(--ao-error);
  }

  // logo 示例布局
  .logo-row {
    align-items: flex-start;
  }

  .logo-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    font-size: 12px;
    color: var(--ao-gray-600);
  }
</style>
