<script setup lang="ts">
defineOptions({
  name: 'ScreenIndex',
})
</script>
<template>
  <div class="w-screen h-screen bg-[var(--page-bg)] flex flex-col overflow-hidden page_container">
    <!-- 头部区域 -->
    <div class="w-full h-[94px] flex-shrink-0 bg_head_bg"></div>

    <!-- 主体区域 -->
    <div class="flex-1 flex gap-4 p-4 overflow-hidden">
      <!-- 左侧区域 -->
      <div class="w-96 bg-white/5 border border-white/10 rounded-lg flex-shrink-0"></div>

      <!-- 中间区域 -->
      <div class="flex-1 flex flex-col gap-4 overflow-hidden">
        <!-- 中间上部 -->
        <div class="flex-1 bg-white/5 border border-white/10 rounded-lg min-h-0"></div>

        <!-- 中间下部 -->
        <div class="flex-1 bg-white/5 border border-white/10 rounded-lg min-h-0"></div>
      </div>

      <!-- 右侧区域 -->
      <div class="w-96 bg-white/5 border border-white/10 rounded-lg flex-shrink-0"></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.page_container {
  .bg_head_bg {
    background-image: url('@/assets/images/head-bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}

</style>
