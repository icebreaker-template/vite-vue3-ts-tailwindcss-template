<script setup lang="ts">
import { FabricText, StaticCanvas } from 'fabric'
import { onMounted, useTemplateRef } from 'vue'

const canvasRef = useTemplateRef('canvasDom')

let canvas: StaticCanvas

onMounted(() => {
  if (canvasRef.value) {
    canvas = new StaticCanvas(canvasRef.value)
    const helloWorld = new FabricText('Hello world!', {
      // lockMovementX: true,
      // lockMovementY: true,
      // lockRotation: true,
      // lockScalingFlip: true,
      // lockScalingX: true,
      // lockScalingY: true,
      selectable: false,
    })
    canvas.add(helloWorld)
    canvas.centerObject(helloWorld)

    // requestAnimationFrame(function animate() {
    //   canvas.requestRenderAll()
    //   requestAnimationFrame(animate)
    // })
  }
})

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
  <div class="">
    <div>
      <canvas ref="canvasDom" class="border" width="500" height="500" />
    </div>
    <div @click="download">
      Download
    </div>
  </div>
</template>

<style></style>
