<script setup lang="ts">
import { getCurrentInstance } from 'vue'

defineProps<{
  type: string
  dsa?: string
}>()

const vm = getCurrentInstance()

console.log(vm)
</script>

<template>
  <div>
    <pre>
      <code>
        {{ vm.propsOptions }}
      </code>
    </pre>
  </div>
</template>
