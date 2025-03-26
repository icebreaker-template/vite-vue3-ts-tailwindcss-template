<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto">
    <div>
      <RouterLink to="/">
        上传
      </RouterLink>
      <RouterLink to="/about">
        其他页面
      </RouterLink>
    </div>
    <RouterView />
  </div>
</template>
