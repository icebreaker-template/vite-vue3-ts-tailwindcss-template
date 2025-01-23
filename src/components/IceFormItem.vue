<script setup lang="ts">
import { ErrorMessage, Field, type RuleExpression } from 'vee-validate'
import { getCurrentInstance, onBeforeUnmount } from 'vue'
import { IceFormItemName } from './constants'
import { injectCtx } from './shared'

defineOptions({
  name: IceFormItemName,
})

const props = defineProps<{
  name: string
  rules?: RuleExpression<unknown>
}>()
const { children, addChild, removeChild } = injectCtx()
const vm = getCurrentInstance()

addChild(vm)

onBeforeUnmount(() => {
  removeChild(vm?.uid)
})
</script>

<template>
  <Field v-slot="scope" :name="name" :rules="rules">
    <slot v-bind="scope" />
  </Field>
  <ErrorMessage :name="name" />
</template>
