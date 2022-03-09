<template>
  <div>
    <div>
    <h4 class="h4">
      {{ title }}
    </h4>
      <div class="h-1px bg-light mt-1 mb-1 opacity-30" />
    </div>
    <p class="body" v-html="richTextComputed" />
  </div>
</template>

<script setup lang="ts">

import { useStoryblokApi } from '@storyblok/vue'
const storyblokApi = useStoryblokApi()

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  richText: {
    type: Object,
    required: false
  }
})

const richTextComputed = computed(() => {
  return storyblokApi.richTextResolver.render(props.richText)
})

</script>

<style>
li {
  list-style-type: square;
  margin-bottom: 5px;
}
</style>