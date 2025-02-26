<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src: string
}>()

const sources = computed(() => {
  const webpSrc = props.src.replace(/\.\w+$/, '.webp')
  const avifSrc = props.src.replace(/\.\w+$/, '.avif')
  return [
    {
      srcset: avifSrc,
      type: 'image/avif',
    },
    {
      srcset: webpSrc,
      type: 'image/webp',
    },
  ]
})
</script>

<template>
  <picture>
    <source v-for="(source, i) in sources" :key="i" :srcset="source.srcset" :type="source.type">
    <img :src="src" v-bind="$attrs">
  </picture>
</template>

<style scoped></style>
