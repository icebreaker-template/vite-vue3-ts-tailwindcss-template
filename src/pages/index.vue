<script setup lang="ts">
import type OSS from 'ali-oss'
import type { NotificationHandle, UploadInstance, UploadUserFile } from 'element-plus'
import { ElButton, ElNotification, ElProgress } from 'element-plus'
import { h, onMounted, ref } from 'vue'
import { initClient } from '../lib/oss'

const uploadRef = ref<UploadInstance>()
const fileList = ref<(UploadUserFile & { cpt?: OSS.Checkpoint })[]>([])

let OSSClient: OSS
const bc = new BroadcastChannel('happy')

const isUploading = ref(false)
let hotificationHandle: NotificationHandle

function doUpload(opts?: { withCheckpoint?: boolean }) {
  return Promise.all(fileList.value.map(async (file) => {
    const options: OSS.MultipartUploadOptions = {
      progress(p: number, cpt: OSS.Checkpoint) {
        file.percentage = p * 100
        if (cpt) {
          file.cpt = cpt
        }

        bc.postMessage({
          progress: p,
        })
      },
    }
    if (opts?.withCheckpoint) {
      options.checkpoint = file.cpt
    }
    const res = await OSSClient.multipartUpload(file.name, file.raw, options)

    return res
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
                    // @ts-ignore
                    OSSClient.cancel()
                  },
                }, '暂停'),
                h(ElButton, {
                  size: 'small',
                  onClick() {
                    doUpload({
                      withCheckpoint: true,
                    })
                  },
                }, '继续'),
                h(ElButton, {
                  size: 'small',
                  onClick() {
                    if (file.cpt) {
                      OSSClient.abortMultipartUpload(file.cpt.name, file.cpt.uploadId)
                    }
                  },
                }, '取消'),
              ]),
            ])
          }),
        ])
      },
      position: 'bottom-right',
      duration: 0,
    })

    await doUpload()

    setTimeout(() => {
      hotificationHandle.close()
    }, 3000)
  }
  finally {
    isUploading.value = false
  }
}

onMounted(async () => {
  OSSClient = await initClient()
  // bc.addEventListener('message', (e) => {
  //   if (!isUploading.value) {

  //   }
  // })
})
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
