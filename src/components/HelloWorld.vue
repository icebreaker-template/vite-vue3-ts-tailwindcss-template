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
    <div>Hello World</div>
    <input v-model="name">
  </div>
</template>

<i18n>
  {
    "en": {
      "language": "Language",
      "hello": "hello, world!"
    },
    "ja": {
      "language": "言語",
      "hello": "こんにちは、世界！"
    }
  }
</i18n>
