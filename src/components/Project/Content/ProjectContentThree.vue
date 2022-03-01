
<script setup lang="ts">

import { renderModels } from '~/composables/ModelRender'

const props = defineProps({
  model: {
    type: String,
    required: true
  }
})
const threeModelRef = ref()

onMounted(() => {
  renderModels({
    model: props.model,
    target: threeModelRef.value
  })
})

</script>

<template>
  <div ref="threeModelRef" />
</template>
