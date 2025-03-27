<script setup lang="ts">
import { ElNotification, ElProgress } from 'element-plus'
import { h, onMounted, ref } from 'vue'
import Happy from '../workers/upload.worker?sharedworker'

const percentageRef = ref(0)
let shareWorker: SharedWorker
onMounted(() => {
  shareWorker = new Happy()

  shareWorker.port.start()

  console.log(shareWorker)
  shareWorker.port.onmessage = (e) => {
    console.log(e)
    if (e.data.type === 'info') {
      ElNotification({
        title: '提示',
        message: e.data.data,
        position: 'bottom-right',
      })
    }
    else if (e.data.type === 'upload-start') {
      ElNotification({
        title: '进度',
        message: () => h(ElProgress, {
          'textInside': true,
          'percentage': percentageRef.value,
          'stroke-width': 24,
        }),
        position: 'bottom-right',
        duration: 0,
      })
    }
    else if (e.data.type === 'upload-progress') {

    }
  }
  // 传递 你可以将 File 或 Blob 对象传递给Web Worker，这样可以避免文件的完整复制。
  // 当你通过 postMessage 将文件传递给Web Worker时，可以使用 transfer 参数，将文件的引用传递给worker。

  // shareWorker.port.postMessage({
  //   type: 'upload',
  //   data: {
  //     file: 'test.txt',
  //     content: 'hello world',
  //   },
  // }, {
  //   transfer: [],
  // })
})

function addData() {
  shareWorker.port.postMessage({
    type: 'add',
    data: {
      name: 'test.txt',
      content: Date.now(),
    },
  })
}
// function updatePercentage() {
//   percentageRef.value = Math.floor(Math.random() * 100)
// }
</script>

<template>
  <div class="border flex flex-col">
    <input type="file">
    <button>上传</button>
    <button @click="addData">
      添加数据
    </button>
    <el-input-number v-model="percentageRef" :min="0" :max="100" :step="10" />
  </div>
</template>
