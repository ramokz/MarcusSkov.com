<script setup lang="ts">

useHead({
  title: 'Marcus Skov',
  meta: [
    { name: 'description', content: 'My portfolio site!' },
  ],
})

import {useStories} from "../stores/storyblok";
import { useStoryblokApi } from "@storyblok/vue"; 
const stories = useStories();

const storyblokApi = useStoryblokApi();

const allProjects = ref() 

onBeforeMount( async() => {
  const version = import.meta.env.DEV ? 'draft' : 'published';
  const { data } = await storyblokApi.get("cdn/stories", { version: version })
  
  stories.$patch({
      storiesData: data.stories
    })
  
  allProjects.value = stories.getAllProjects
})

</script>

<template lang="pug">
div
  RouterLink
  ProjectListHeader(
    v-for="story in allProjects"
    :key="story.id"
    :projectName="story.name"
    :year="story.content.year"
    :slug="story.slug"
    class="even:flex-row-reverse")
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
