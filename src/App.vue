<script setup lang="ts">
function toggleMode() {
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <div>
    <div class="bg-foreground h-20" @click="toggleMode" />
    <RouterView />
  </div>
</template>

<style scoped></style>
