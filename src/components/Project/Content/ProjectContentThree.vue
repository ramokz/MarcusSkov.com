<script setup lang="ts">

import { addModelToScene } from '~/composables/ThreeRenderProjectPage'
const props = defineProps({
  model: {
    type: String,
    required: true
  }
})
const threeModelRef = ref()

// console.log(props.content.asset.filename)

onMounted(() => {
  addModelToScene(props.model, threeModelRef.value)
})

</script>

<template>
  <div
    ref="threeModelRef"
    class="h-120"
  />
</template>
