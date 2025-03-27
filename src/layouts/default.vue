<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const activeIndex = ref('/')
</script>

<template>
  <div>
    <el-menu :default-active="activeIndex" mode="horizontal" router>
      <el-menu-item index="/">
        上传
      </el-menu-item>
      <el-menu-item index="/about">
        其他页面
      </el-menu-item>
      <el-menu-item index="/other">
        Other
      </el-menu-item>
    </el-menu>
  </div>
  <div class="container mx-auto">
    <RouterView />
  </div>
</template>
