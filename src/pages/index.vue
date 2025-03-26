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
  // 传递 你可以将 File 或 Blob 对象传递给Web Worker，这样可以避免文件的完整复制。
  // 当你通过 postMessage 将文件传递给Web Worker时，可以使用 transfer 参数，将文件的引用传递给worker。

  shareWorker.port.postMessage({
    type: 'upload',
    data: {
      file: 'test.txt',
      content: 'hello world',
    },
  }, {
    transfer: [],
  })
})
</script>

<template>
  <div class="border flex flex-col">
    <input type="file">
    <button>上传</button>
  </div>
</template>
