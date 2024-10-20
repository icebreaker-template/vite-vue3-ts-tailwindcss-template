<script setup lang="ts">
import './WordCount'

const { msg = 'icebreaker' } = defineProps<{
  msg?: string
}>()
</script>

<template>
  <div>
    <h1> {{ msg }}</h1>
    <div>Hello World</div>
    <p is="word-count">
      111
    </p>
    <popup-info>1</popup-info>
    <word-count>2</word-count>
    <my-custom-element>11222</my-custom-element>
    <ul is="expanding-list">
      …....
    </ul>
    <template id="my-element">
      <style>
        span {
        color: red;
        border: 2px dotted black;
        }
      </style>
      <span>I'm in the shadow DOM</span>
    </template>
  </div>
</template>

<style scoped></style>
