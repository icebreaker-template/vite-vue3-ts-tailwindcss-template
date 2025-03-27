<script setup lang="tsx">
import type OSS from 'ali-oss'
import type { UploadInstance, UploadUserFile } from 'element-plus'
import { ElNotification, ElProgress } from 'element-plus'
import { h, onMounted, ref } from 'vue'
import { initClient } from '../lib/oss'

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadUserFile[]>([])

let OSSClient: OSS
const bc = new BroadcastChannel('happy')

const isUploading = ref(false)
async function submitUpload() {
  try {
    isUploading.value = true
    ElNotification({
      title: '进度',
      message: () => {
        return h('div', null, [
          fileList.value.map((file) => {
            return h('div', {
              class: 'space-y-4',
            }, [
              h('div', {
                class: 'mb-2',
              }, [
                h('span', {}, file.name),
              ]),
              h(ElProgress, {
                'textInside': true,
                'percentage': file.percentage ?? 0,
                'stroke-width': 24,
                'format': (percentage) => {
                  return `${percentage.toFixed(2)}%`
                },
              }),
            ])
          }),
        ])
      },
      position: 'bottom-right',
      duration: 0,
    })

    await Promise.all(fileList.value.map(async (file) => {
      const res = await OSSClient.multipartUpload(file.name, file.raw, {
        progress(p, cpt) {
          file.percentage = p * 100
          // @ts-ignore
          file.cpt = cpt

          bc.postMessage({
            progress: p,
          })
        },
      })

      return res
    }))
  }
  finally {
    isUploading.value = false
  }
}

onMounted(async () => {
  OSSClient = await initClient()
  bc.addEventListener('message', (e) => {
    if (!isUploading.value) {

    }
  })
})
</script>

<template>
  <div class="flex flex-col">
    <el-upload ref="uploadRef" v-model:file-list="fileList" multiple action="" :auto-upload="false">
      <template #trigger>
        <el-button type="primary">
          select file
        </el-button>
      </template>

      <el-button class="ml-3" type="success" @click="submitUpload">
        upload to server
      </el-button>
    </el-upload>

    <!-- <el-input-number v-model="percentageRef" :min="0" :max="100" :step="10" /> -->
  </div>
</template>
