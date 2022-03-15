<script setup lang="ts">

/////////////////////////////
// Imports
/////////////////////////////
import { useStories } from '~/stores/storyblok'
import { gsap } from 'gsap'
import { onBeforeRouteLeave } from 'vue-router'

/////////////////////////////
// Variables & Refs
/////////////////////////////
const storyStore = useStories()
const projectList = ref()

/////////////////////////////
// Methods
/////////////////////////////
onBeforeRouteLeave(() => {
  console.log('Leaving')
  gsap.set(projectList.value, {
    visibility: 'hidden'
  })
})

</script>

<template>
  <div ref="projectList">
    <div class="opacity-20 fixed top-12 right-12">
      Site still work-in-progress
    </div>
    <!--    <div-->
    <!--      class="-->
    <!--        flex-->
    <!--        flex-col-->
    <!--        items-center-->
    <!--        justify-center-->
    <!--        h-screen-1/2-->
    <!--        shadow-xl"-->
    <!--    >-->
    <!--      <h1 class="h1">-->
    <!--        Hi-->
    <!--      </h1>-->
    <!--      <h2 class="h4 mt-12">-->
    <!--        I'm a UI Designer and Developer working in games-->
    <!--      </h2>-->
    <!--    </div>-->
    <ProjectListHeader
      v-for="(story, index) in storyStore.projectData"
      :key="story.id"
      :index="index"
      :story="story"
    />
    <About/>
  </div>
</template>