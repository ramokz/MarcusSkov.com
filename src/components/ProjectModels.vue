<script setup lang="ts">

/////////////////////////
// Data Fetching and Setup
/////////////////////////
import { useStories } from '~/stores/storyblok'
import { useStoryblokBridge, useStoryblokApi } from '@storyblok/vue'
import { addProjectModels, projectPageSetter, useThreeInit } from '../composables/ModelRender'
const storyblokApi = useStoryblokApi()
const version = import.meta.env.DEV ? 'draft' : 'published'
const { data } = await storyblokApi.get('cdn/stories', {
  version: version,
  starts_with: 'project/'
})
const story = ref()

story.value = data.stories

const storyStore = useStories()
const route = useRoute()
const projectRoute: string = route.params.project as string

storyStore.$patch({
  projectData: data.stories
})

/////////////////////////////
// Sets up the three renderer
/////////////////////////////
const canvasRef = ref<HTMLCanvasElement>(null)
const modelArr = reactive({
  models: []
})

data.stories.forEach((story: object) => modelArr.models.push(story.content.projectHeader.filename))

onMounted(() => {
  // useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory))
  useThreeInit(canvasRef.value)
  addProjectModels(modelArr.models)

  if (storyStore.projectIndex < 0 && route.name === 'project-project') {

    const projectIndex = data.stories.findIndex((project: object) => project.slug === route.params.project)

    storyStore.$patch({
      projectIndex: projectIndex
    })

    projectPageSetter(projectIndex, true)
  }
})

</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed top-0 outline-none -z-2"
  />
</template>