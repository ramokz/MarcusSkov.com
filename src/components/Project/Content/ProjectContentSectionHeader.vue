<script setup lang="ts">

import { useStoryblokApi } from '@storyblok/vue'
const storyblokApi = useStoryblokApi()
const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})
const richTextComputed = computed(() => {
  return storyblokApi.richTextResolver.render(props.content.body)
})

</script>


<template>
  <div class="container text-center mx-auto mb-12 mt-32 lg:mt-64">
    <h1 class="h2">
      {{ content.title }}
    </h1>
    <div class="divider lg:w-1/2 mx-auto" />
    <p
      class="body lg:w-1/2 mx-auto"
      v-html="richTextComputed"
    />
  </div>
</template>


<style scoped>

</style>