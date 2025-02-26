<script setup lang="ts">

</script>

<template>
  <RouterView />
</template>

<style>
/* 应用层 (app) - 定义特定页面的样式，可用于覆盖上面所有的层 */
@layer app {

  h1 {
    color: blue;
  }

  .custom-header {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
  }
}
</style>
