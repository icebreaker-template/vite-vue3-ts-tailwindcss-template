<script setup lang="ts">
import { Canvas, FabricText, Textbox } from 'fabric'
import { onMounted, useTemplateRef } from 'vue'

const canvasRef = useTemplateRef('canvasDom')

let canvas: Canvas

onMounted(() => {
  if (canvasRef.value) {
    canvas = new Canvas(canvasRef.value)
    const helloWorld = new FabricText('WF038854KAA', {
      // left: 96,
      // top: 287,
      // fontSize: 13.368301343792792,
      // fill: '#000',
      // opacity: 1,
      // selectable: true,
      // hasControls: false,
      // lockRotation: true,
      // lockScalingX: true,
      // lockScalingY: true,
      width: undefined,
      // splitByGrapheme: true,
      // textAlign: 'left',
      // fontFamily: 'Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif',
      // lineHeight: 1,
      // lockMovementX: true,
      // lockMovementY: true,
      // lockRotation: true,
      // lockScalingFlip: true,
      // lockScalingX: true,
      // lockScalingY: true,
      // selectable: false,
    })
    canvas.add(helloWorld)
    canvas.centerObject(helloWorld)

    // requestAnimationFrame(function animate() {
    //   canvas.requestRenderAll()
    //   requestAnimationFrame(animate)
    // })

    const helloWorldxxx = new Textbox('WF038AAA', {
      // left: 96,
      // top: 287,
      // fontSize: 13.368301343792792,
      // fill: '#000',
      // opacity: 1,
      // selectable: true,
      // hasControls: false,
      // lockRotation: true,
      // lockScalingX: true,
      // lockScalingY: true,
      width: undefined,
      // splitByGrapheme: true,
      // textAlign: 'left',
      // fontFamily: 'Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif',
      // lineHeight: 1,
      // lockMovementX: true,
      // lockMovementY: true,
      // lockRotation: true,
      // lockScalingFlip: true,
      // lockScalingX: true,
      // lockScalingY: true,
      // selectable: false,
    })
    helloWorldxxx.set({
      top: 10,
    })
    canvas.add(helloWorldxxx)
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
    <div class="h-[100PX]" @click="download">
      Download
    </div>
  </div>
</template>

<style></style>
