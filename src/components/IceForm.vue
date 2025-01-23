<script setup lang="ts">
import type * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, type SubmissionContext } from 'vee-validate'
import { computed, getCurrentInstance } from 'vue'
import { useOrderedChildren } from '../hooks/useOrderedChildren'
import { IceForm, IceFormItem } from './constants'

defineOptions({
  name: IceForm,
})

const props = defineProps<{
  rules: zod.ZodSchema
}>()

const rules = computed(() => {
  return toTypedSchema(props.rules)
})

const {
  children,
  addChild,
  removeChild,
} = useOrderedChildren(getCurrentInstance()!, IceFormItem)

function onInvalidSubmit() {

}

function onSubmit(values: any, ctx: SubmissionContext<any>) {
  console.log('submit')
}
</script>

<template>
  <Form @invalid-submit="onInvalidSubmit" @submit="onSubmit">
    <slot />
  </Form>
</template>

<style scoped></style>
