<script setup lang="ts">
import type OSS from 'ali-oss'
import type { UploadInstance, UploadUserFile } from 'element-plus'
import { ElNotification, ElProgress } from 'element-plus'
import { h, onMounted, ref } from 'vue'
import { initClient } from '../lib/oss'
import Happy from '../workers/upload.worker?sharedworker'

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const percentageRef = ref(0)
let shareWorker: SharedWorker
const xxxpercentage = ref(0)

let OSSClient: OSS

async function submitUpload() {
  const files = fileList.value.map(item => item.raw) as File[]
  const blobs = files.map(file => new Blob([file], { type: file.type }))
  shareWorker.port.postMessage({
    type: 'upload-files',
    data: {
      blobs,
    },
  })
  const res = await OSSClient.multipartUpload('xxx/a', blobs[0], {
    progress(p) {
      xxxpercentage.value = p * 100
    },
  })
  console.log(res)
}

onMounted(async () => {
  OSSClient = await initClient()
  shareWorker = new Happy()

  shareWorker.port.start()

  console.log(shareWorker)
  shareWorker.port.onmessage = (e) => {
    console.log(e)
    if (e.data.type === 'info') {
      // ElNotification({
      //   title: '提示',
      //   message: e.data.data,
      //   position: 'bottom-right',
      // })
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
      percentageRef.value = e.data.data.progress * 100
    }
    else if (e.data.type === 'upload-end') {

    }
    else if (e.data.type === 'upload-error') {

    }
    else if (e.data.type === 'sync') {
      console.log(e.data)
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
  const file = new Blob(['hello world'], {
    type: 'text/plain',
  })

  shareWorker.port.postMessage({
    type: 'add',
    data: {
      name: 'test.txt',
      content: file,

    },
  })
}
//  [stream]
// function updatePercentage() {
//   percentageRef.value = Math.floor(Math.random() * 100)
// }
</script>

<template>
  <div class="border flex flex-col">
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      class="upload-demo"
      action=""
      :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary">
          select file
        </el-button>
      </template>

      <el-button class="ml-3" type="success" @click="submitUpload">
        upload to server
      </el-button>
    </el-upload>
    <el-button @click="addData">
      添加数据
    </el-button>
    <el-input-number v-model="percentageRef" :min="0" :max="100" :step="10" />
    <ElProgress :percentage="xxxpercentage" />
  </div>
</template>
