<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { RouterView } from 'vue-router'

const container = useTemplateRef('container')

onMounted(() => {
  // container.value?.attachShadow({ mode: 'open' })
  // if (container.value?.shadowRoot) {
  //   container.value.shadowRoot.innerHTML = container.value.innerHTML
  //   const style = document.createElement('style')

  //   style.innerHTML = `
  //   h1{
  //     color: red;
  //   }
  //   `
  //   container.value.shadowRoot.appendChild(style)
  // }
})
</script>

<template>
  <div ref="container" class="container mx-auto">
    <RouterView />
  </div>
</template>
