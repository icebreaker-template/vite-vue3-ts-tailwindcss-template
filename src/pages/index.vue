<script setup lang="ts">
import { onMounted } from 'vue'
import Happy from './shareWorker?sharedworker'

onMounted(() => {
  const shareWorker = new Happy()

  shareWorker.port.start()

  console.log(shareWorker)
  shareWorker.port.onmessage = (e) => {
    console.log(e)
  }

  shareWorker.port.postMessage({
    type: 'upload',
    data: {
      file: 'test.txt',
      content: 'hello world',
    },
  })
})
</script>

<template>
  <div class="border flex flex-col">
    <input type="file">
    <button>上传</button>
  </div>
</template>
