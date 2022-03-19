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

<template>
  <div>
    <div>
      <h4 class="h3">
        {{ title }}
      </h4>
      <div class="divider" />
    </div>
    <p
      class="body"
      v-html="richTextComputed"
    />
  </div>
</template>


<style>
li {
  list-style-type: square;
  margin: 0 20px 10px 20px;
}
</style>