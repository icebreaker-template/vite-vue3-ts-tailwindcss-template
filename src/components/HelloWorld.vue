<script setup lang="ts">
const { msg = 'icebreaker' } = defineProps<{
  msg?: string
}>()

const name = defineModel<string>({
  default: 'icebreaker',
})
</script>

<template>
  <div>
    <h1> {{ msg }}</h1>
    <div class="text-[#ff166f]">
      Hello World
    </div>
    <input v-model="name">
  </div>
</template>
