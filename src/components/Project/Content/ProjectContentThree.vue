
<script setup lang="ts">

import { renderModels } from '~/composables/ModelRender'

const props = defineProps({
  model: {
    type: String,
    required: true
  }
})
const threeModelRef = ref()

// console.log(props.content.asset.filename)

onMounted(() => {
  // renderModels(props.model, threeModelRef.value)
})

</script>

<template>
  <div ref="threeModelRef" />
</template>
