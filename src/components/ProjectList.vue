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
ProjectListHeader(
  v-for="story in stories.projectData"
  :key="story.id"
  :story="story")
canvas(ref="canvas" class="fixed top-0 left-0 outline-none -z-1")
</template>