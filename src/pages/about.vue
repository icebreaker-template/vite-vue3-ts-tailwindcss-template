<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      About
    </h1>
    <div>
      {{ t('hello') }}
    </div>
    <HelloWorld msg="About" />
  </div>
</template>
