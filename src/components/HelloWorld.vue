<script setup lang="ts">
import ThemeButton from './ThemeButton.vue'
import './WordCount'

const { msg = 'icebreaker' } = defineProps<{
  msg?: string
}>()
</script>

<template>
  <div>
    <h1> {{ msg }}</h1>
    <div>Hello World</div>
    <ThemeButton />
  </div>
</template>

<style scoped></style>
