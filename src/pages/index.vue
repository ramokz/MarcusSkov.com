<script setup lang="ts">

/////////////////////////////
// Imports
/////////////////////////////
import { useStories } from '~/stores/storyblok'
import { gsap } from 'gsap'

/////////////////////////////
// Variables & Refs
/////////////////////////////
const storyStore = useStories()
const projectList = ref()
/////////////////////////////
// Methods
/////////////////////////////
const projectListFade = () => {
  console.log('Fading project list')
  gsap.to(projectList.value, {
    opacity: 0,
    duration: 0
  })
}

</script>

<template>
  <div ref="projectList">
    <ProjectListHeader
      v-for="(story, index) in storyStore.projectData"
      :key="story.id"
      :index="index"
      :story="story"
      @project-list-fade="projectListFade"
    />
  </div>
</template>