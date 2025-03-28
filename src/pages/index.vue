<script setup lang="ts">
import type OSS from 'ali-oss'
import type { NotificationHandle, UploadInstance, UploadUserFile } from 'element-plus'
import { ElButton, ElNotification, ElProgress } from 'element-plus'
import { h, ref } from 'vue'
import { initClient } from '../lib/oss'

type UploadStatus = 'ready' | 'pause' | 'uploading' | 'success' | 'fail'
const uploadRef = ref<UploadInstance>()
type CustomFile = UploadUserFile & { cpt?: OSS.Checkpoint, OSSClient: OSS, ossUploadStatus: UploadStatus }

const fileList = ref<CustomFile[]>([])

// 多浏览器 tab 广播
// const bc = new BroadcastChannel('happy')

const isUploading = ref(false)
let hotificationHandle: NotificationHandle

async function upload(file: CustomFile, opts?: { withCheckpoint?: boolean }) {
  if (!file.OSSClient) {
    const OSSClient = await initClient()
    file.OSSClient = OSSClient
  }

  const options: OSS.MultipartUploadOptions = {
    progress(p: number, cpt: OSS.Checkpoint) {
      file.ossUploadStatus = 'uploading'
      file.percentage = p * 100
      if (cpt) {
        file.cpt = cpt
      }
    },
  }
  if (opts?.withCheckpoint) {
    options.checkpoint = file.cpt
  }
  const res = await file.OSSClient.multipartUpload(file.name, file.raw, options)
  file.ossUploadStatus = 'success'
  return res
}
function batchUpload(opts?: { withCheckpoint?: boolean }) {
  return Promise.all(fileList.value.map((file) => {
    return upload(file, opts)
  }))
}

async function submitUpload() {
  try {
    isUploading.value = true
    hotificationHandle = ElNotification({
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
              h('div', {
                class: 'text-xs text-gray-500',
              }, [

                h(ElButton, {
                  size: 'small',
                  onClick() {
                    file.OSSClient
                      // @ts-ignore
                      .cancel()
                    file.ossUploadStatus = 'pause'
                  },
                  disabled: file.ossUploadStatus === 'pause',
                }, '暂停'),
                h(ElButton, {
                  size: 'small',
                  onClick() {
                    upload(file, {
                      withCheckpoint: true,
                    })
                  },
                  disabled: file.ossUploadStatus !== 'pause',
                }, '继续'),
                h(ElButton, {
                  size: 'small',
                  onClick() {
                    if (file.cpt) {
                      file.OSSClient.abortMultipartUpload(file.cpt.name, file.cpt.uploadId)
                      hotificationHandle.close()
                    }
                  },
                }, '取消上传'),
              ]),
            ])
          }),
        ])
      },
      position: 'bottom-right',
      duration: 0,
    })

    await batchUpload()

    setTimeout(() => {
      hotificationHandle.close()
    }, 3000)
  }
  finally {
    isUploading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col pt-8">
    <el-upload ref="uploadRef" v-model:file-list="fileList" multiple action="" :auto-upload="false">
      <template #trigger>
        <ElButton type="primary">
          select file
        </ElButton>
      </template>

      <ElButton class="ml-3" type="success" @click="submitUpload">
        upload to server
      </ElButton>
    </el-upload>
  </div>
</template>
