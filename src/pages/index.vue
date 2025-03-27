<script setup lang="ts">
import type OSS from 'ali-oss'
import type { UploadInstance, UploadUserFile } from 'element-plus'
import { ElNotification, ElProgress } from 'element-plus'
import { h, onMounted, ref } from 'vue'
import { initClient } from '../lib/oss'
// import Happy from '../workers/upload.worker?sharedworker'

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])
const percentageRef = ref(0)

let OSSClient: OSS
const bc = new BroadcastChannel('happy')
const isUploading = ref(false)
async function submitUpload() {
  const files = fileList.value.map(item => item.raw) as File[]
  const blobs = files.map(file => new Blob([file], { type: file.type }))

  try {
    isUploading.value = true
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
    const res = await OSSClient.multipartUpload('xxx/a', blobs[0], {
      progress(p) {
        percentageRef.value = p * 100
        bc.postMessage({
          progress: p,
        })
      },
    })
    console.log(res)
  }
  finally {
    isUploading.value = false
  }
}

onMounted(async () => {
  OSSClient = await initClient()
  bc.addEventListener('message', (e) => {
    if (!isUploading.value) {
      percentageRef.value = e.data.progress * 100
    }
  })
})
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

    <el-input-number v-model="percentageRef" :min="0" :max="100" :step="10" />
  </div>
</template>
