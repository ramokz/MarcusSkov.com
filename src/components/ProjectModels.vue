<script setup lang="ts">

/////////////////////////
// Data Fetching and Setup
/////////////////////////
import { useStories } from '~/stores/storyblok'
import { useStoryblokApi } from '@storyblok/vue'
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

storyStore.getAllProjects.forEach((story: object) => modelArr.models.push(
  {
    model: story.content.projectModel.filename,
    texture: story.content.projectModelTexture.filename
  }
))

onMounted(() => {
  useThreeInit(canvasRef.value)
  addProjectModels(modelArr.models)

  if (storyStore.projectIndex < 0 && storyStore.projectSlug) {

    const projectIndex = storyStore.getAllProjects.findIndex((project: object) => project.slug === storyStore.projectSlug)

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
    class="fixed top-0 -z-2 pointer-events-none"
  />
</template>