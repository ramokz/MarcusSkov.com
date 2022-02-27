<script setup lang="ts">

/////////////////////////
// Data Fetching and Setup
/////////////////////////
import { useStories } from '~/stores/storyblok'
import { useStoryblokApi } from '@storyblok/vue'

const storyblokApi = useStoryblokApi()
const stories = useStories()

const version = import.meta.env.DEV ? 'draft' : 'published'
const { data } = await storyblokApi.get('cdn/stories', {
  version: version,
  starts_with: 'project/'
})
const state = reactive( data.stories )

stories.$patch({
  projectData: data.stories
})

/////////////////////////////
// Sets up the three renderer
/////////////////////////////
import { useThreeInit, addProjectModels } from '~/composables/ModelRender'

const canvas = ref<InstanceType<typeof HTMLCanvasElement> | null>(null)

let modelArr: string[] = []

onMounted(() => {
  useThreeInit(canvas)

  data.stories.forEach((story: any) => modelArr.push(story.content.projectHeader.filename))
  addProjectModels(modelArr)
})

const threeFG = ref(null)

</script>

<template>
  <canvas
    ref="canvas"
    class="fixed top-0 left-0 outline-none -z-2"
  />
</template>