<script setup lang="ts">
import { ErrorMessage, Field, type RuleExpression } from 'vee-validate'
import { IceFormItem } from './constants'

defineOptions({
  name: IceFormItem,
})

const props = defineProps<{
  name: string
  rules: RuleExpression<unknown>
}>()
</script>

<template>
  <div>
    <Field :name="name" :rules="rules" />
    <ErrorMessage :name="name" />
  </div>
</template>
