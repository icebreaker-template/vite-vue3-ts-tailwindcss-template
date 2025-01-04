<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import dayjs from 'dayjs'

// import tz from 'dayjs/plugin/timezone'
// import utc from 'dayjs/plugin/utc'
// dayjs.extend(utc)
// dayjs.extend(tz)
const testCase = '2024-12-26T00:00:00Z'

function request() {
  return Promise.resolve({
    msg: 'success',
  })
}
async function handleError() {
  const { msg, ss } = await request().then(() => {
    return {
      msg: 'error',
      ss: 'ee',
    }
  }).finally(() => {
    console.log('finally')
  })
  console.log(msg)
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline" @click="handleError">
      {{ dayjs(testCase).format('YYYY-MM-DD HH:mm:ss') }}
    </h1>
    <HelloWorld />
  </div>
</template>
