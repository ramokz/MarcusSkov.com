<script setup lang="ts">

import { useThreeInit } from './composables/ModelRender'

useHead({
	title: 'Marcus Skov',
	meta: [
		{ name: 'description', content: 'My portfolio site!' }
	]
})

/////////////////////////
// Data Fetching and Setup
/////////////////////////

import { useStories } from '~/stores/storyblok'
import { useStoryblokApi } from '@storyblok/vue'
const storyblokApi = useStoryblokApi()
const stories = useStories()


onBeforeMount( async() => {
	const version = import.meta.env.DEV ? 'draft' : 'published'
	const { data } = await storyblokApi.get('cdn/stories', { version: version })

	stories.$patch({
		storiesData: data.stories
	})
})

/////////////////////////////
// Sets up the
/////////////////////////////

const canvas = ref<HTMLCanvasElement>()

useThreeInit(canvas)

</script>

<template lang="pug">
#app(class="antialiasing")
  canvas(ref="canvas" class="fixed top-0 left-0 outline-none")
  TheHeader
  RouterView
  ProjectListHeader(
    v-for="story in stories.getAllProjects"
    :key="story.id"
    :projectName="story.name"
    :year="story.content.year"
    :slug="story.slug"
    class="even:flex-row-reverse")
</template>
