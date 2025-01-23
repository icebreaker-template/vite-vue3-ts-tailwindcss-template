<script setup lang="ts">
import type * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, type InvalidSubmissionContext, type SubmissionContext, useForm } from 'vee-validate'
import { computed, getCurrentInstance } from 'vue'
import { useOrderedChildren } from '../hooks/useOrderedChildren'
import { IceFormItemName, IceFormName } from './constants'
import { provideCtx, type State } from './shared'

defineOptions({
  name: IceFormName,
})

const props = defineProps<{
  rules?: zod.ZodSchema
}>()

const rules = computed(() => {
  return props.rules ? toTypedSchema(props.rules) : {}
})

const {
  children,
  addChild,
  removeChild,
} = useOrderedChildren<State>(getCurrentInstance()!, IceFormItemName)

provideCtx({
  children,
  addChild,
  removeChild,
})
const { meta, validate, validateField, handleSubmit, submitForm, resetForm } = useForm()
function onInvalidSubmit(ctx: InvalidSubmissionContext<any>) {

}

function onSubmit(values: any, ctx: SubmissionContext<any>) {
  console.log(values, ctx)
}
</script>

<template>
  <Form @invalid-submit="onInvalidSubmit" @submit="onSubmit">
    {{ meta }}
    <slot />
  </Form>
</template>

<style scoped></style>
