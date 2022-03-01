<script setup lang="ts">

/////////////////////////
// Data Fetching and Setup
/////////////////////////
import { useStories } from '~/stores/storyblok'
import { useThreeStore } from '~/stores/threeStore'
import { useStoryblokApi } from '@storyblok/vue'

const storyblokApi = useStoryblokApi()
const stories = useStories()
const version = import.meta.env.DEV ? 'draft' : 'published'
const { data } = await storyblokApi.get('cdn/stories', {
  version: version,
  starts_with: 'project/'
})
// const state = reactive( data.stories )

stories.$patch({
  projectData: data.stories
})

/////////////////////////////
// Sets up the three renderer
/////////////////////////////
import { addProjectModels, useThreeInit } from '../composables/ModelRender'

const canvasRef = ref<InstanceType<typeof HTMLCanvasElement> | null>(null)
const modelArr = reactive({
  models: []
})

data.stories.forEach((story: object) => modelArr.models.push(story.content.projectHeader.filename))
onMounted(() => {
  useThreeInit(canvasRef)
  addProjectModels(modelArr.models)

})

</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed top-0 outline-none -z-2"
  />
</template>