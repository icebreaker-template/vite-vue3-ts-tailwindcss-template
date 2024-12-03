<script setup lang="ts">
import type { ModelViewerElement } from '@google/model-viewer'
import { onMounted, ref } from 'vue'

const modelViewerRef0 = ref<ModelViewerElement>()
const modelViewerRef1 = ref<ModelViewerElement>()

onMounted(() => {
  modelViewerRef1.value?.addEventListener('load', () => {
    console.log('---------------load-start--------------------')
    console.log(modelViewerRef0.value?.canActivateAR)
    console.log(modelViewerRef1.value?.canActivateAR)
    console.log('---------------load-end--------------------')
  })
  console.log('---------------onMounted-start--------------------')
  console.log(modelViewerRef0.value?.canActivateAR)
  console.log(modelViewerRef1.value?.canActivateAR)
  console.log('---------------onMounted-end--------------------')
})
</script>

<template>
  <div>
    <model-viewer
      ref="modelViewerRef0"
      alt="xxxx"
      src="/NeilArmstrong.glb"
      ar shadow-intensity="1" camera-controls touch-action="pan-y"
    />
    <model-viewer
      ref="modelViewerRef1"
      alt="xxxx"
      src="/1090012-3D.glb"
      ar shadow-intensity="1" camera-controls touch-action="pan-y"
    />
  </div>
</template>
