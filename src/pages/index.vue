<script setup lang="ts">

/////////////////////////////
// Imports
/////////////////////////////
import { useStories } from '~/stores/storyblok'
import { gsap } from 'gsap'
import { onBeforeRouteLeave } from 'vue-router'
import TextSplitter from '../components/TextSplitter.vue'
import { useGlobalStore } from '../stores/globalStore'

/////////////////////////////
// Variables & Refs
/////////////////////////////
const storyStore = useStories()
const projectList = ref()

/////////////////////////////
// Methods
/////////////////////////////
onBeforeRouteLeave(() => {
  gsap.set(projectList.value, {
    visibility: 'hidden'
  })
})

const globalStore = useGlobalStore()

onMounted(() => {

  /////////////////////////////
  // Plays the intro animation
  /////////////////////////////
  if (!globalStore.seenIntro) {
    const tl = gsap.timeline({
      delay: 1
    }).timeScale(1)

    tl.from('.intro-header', {
      y: -30,
      opacity: 0,
      duration: 0.25,
      stagger: 0.04,
      ease: 'back.out'
    }).from('#intro-divider', {
      width: 0,
      duration: 0.4,
      ease: 'power1.out',
      onComplete: (() => {
        gsap.set('#intro-divider', {
          width: null
        })
      })
    }).from('.discipline', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: 'back.out'
    }, '+=0.2')
      .from('.subheader', {
        y: 30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.015,
        ease: 'back.out'
      })
  }
})
</script>

<template>
  <div ref="projectList">
    <div
      class="
            flex
            container
            px-12
            lg:px-0
            mx-auto
            flex-col
            items-left
            justify-center
            h-screen
      "
    >
      <TextSplitter
        string="Hey there"
        target-class="intro-header"
        font-class="h2"
      />
      <div
        id="intro-divider"
        class="divider"
      />
      <TextSplitter
        string="I’m a Game UI/UX Designer"
        target-class="discipline"
        font-class="h1"
        class="perspect-md"
      />
      <TextSplitter
        string="who also loves the technical bits"
        target-class="subheader"
        font-class="h3"
      />
    </div>
    <div class="project-list-header">
      <ProjectListHeader
        v-for="(story, index) in storyStore.getAllProjects"
        :key="story.id"
        :index="index"
        :story="story"
      />
    </div>
    <About />
  </div>
</template>

<style lang="scss">
.project-list-header {
  margin-top: -30vh;

  @media only screen and (max-width: 1280px) {
    margin-top: -20vh;
  }
}
</style>