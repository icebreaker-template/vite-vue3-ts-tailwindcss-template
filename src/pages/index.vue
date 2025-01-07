<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const uploadRef = ref<HTMLInputElement>()
function onUpload() {
  const files = uploadRef.value?.files
  if (!files) {
    return
  }
  const fd = new FormData()
  fd.append('file', files[0])
  axios.post('http://localhost:3000/upload', fd, {
    onUploadProgress(progressEvent) {
      console.log(progressEvent)
    },
  }).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div class="container mx-auto">
    <input ref="uploadRef" type="file">
    <button @click="onUpload">
      Upload
    </button>
  </div>
</template>
