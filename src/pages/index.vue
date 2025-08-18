<script setup lang="ts">
import { FabricText, StaticCanvas } from 'fabric'

const canvas = new StaticCanvas()
const helloWorld = new FabricText('Hello world!', {
  width: undefined,
  fontSize: 200,
})
canvas.add(helloWorld)
canvas.centerObject(helloWorld)

function download() {
  const imageSrc = canvas.toDataURL()
  // some download code down here
  const a = document.createElement('a')
  a.href = imageSrc
  a.download = 'image.png'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>

<template>
  <div class="bg-amber-50 ppp">
    ppp
    <div @click="download">
      aaa
    </div>
  </div>
</template>

<style>

</style>
