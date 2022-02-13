<script setup lang="ts">

useHead({
	title: 'Marcus Skov',
	meta: [
		{ name: 'description', content: 'My portfolio site!' },
	],
})

import {useStories} from '~/stores/storyblok'
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

</script>

<template lang="pug">
#app
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

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
