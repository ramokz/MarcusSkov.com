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
import { addModel, useThreeInit } from '~/composables/ModelRender'


const canvas = ref<InstanceType<typeof HTMLCanvasElement> | null>(null)

onMounted(() => {
	useThreeInit(canvas)

	data.stories.forEach(story => {
		addModel(story.content.projectHeader.filename)
	})
})


</script>

<template lang="pug">
div(
  v-for="story in stories.projectData"
  :key="story.id"
  class=`
  container
  project-header
  flex
  flex-col
  lg:flex-row
  mb-48
  items-center
  first:mt-48
  even:flex-row-reverse
`)
  RouterLink(:to="`/project/${story.slug}`")
    div(class="w-lg h-lg bg-red-500")

  div(class="flex flex-col mx-auto lg:mx-16")
    h3(class="projectYear") ({{ story.content.year }})
    RouterLink(:to="`/project/${story.slug}`" class="projectTitle hover:text-core")
      h1 {{ story.name }}
canvas(ref="canvas" class="fixed top-0 left-0 outline-none -z-1")
</template>

