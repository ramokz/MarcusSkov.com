<script setup lang="ts">

/////////////////////////////
// Imports
/////////////////////////////
import { useStories } from '~/stores/storyblok'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { onBeforeRouteLeave } from 'vue-router'
import TextSplitter from '../components/TextSplitter.vue'
import { useGlobalStore } from '../stores/globalStore'
gsap.registerPlugin(ScrollToPlugin)

/////////////////////////////
// Dynamic Imports
/////////////////////////////
const About = defineAsyncComponent(() => import('../components/About.vue'))
/////////////////////////////
// Variables & Refs
/////////////////////////////
const storyStore = useStories()
const projectList = ref<HTMLDivElement>()
const projectListHeaders = ref<HTMLDivElement>()

/////////////////////////////
// Methods
/////////////////////////////
onBeforeRouteLeave(() => {
  gsap.set(projectList.value as HTMLDivElement, {
    visibility: 'hidden'
  })
})

const globalStore = useGlobalStore()
const scrollToProjectListHeaders = () => {
  if (projectListHeaders.value) {
    gsap.to(window, {
      scrollTo: {
        y: projectListHeaders.value
      },
      duration: 0.6,
      ease: 'power2.out'
    })
    // projectListHeaders.value.scrollIntoView({
    //   behavior: 'smooth'
    // })
  }
}

onMounted(() => {

  if (!globalStore.seenIntro) {
    gsap.set(projectList.value as HTMLDivElement, {
      visibility: 'hidden'
    })
  }

  /////////////////////////////
  // Plays the intro animation
  /////////////////////////////
  globalStore.$subscribe(() => {
    if (globalStore.loadingComplete) {

      gsap.set(projectList.value as HTMLDivElement, {
        visibility: 'visible'
      })

      if (!globalStore.seenIntro) {
        const tl = gsap.timeline({
          delay: 0.3,
          onComplete: () => {
            globalStore.seenIntro = true
          }
        })

        tl.from('.intro-header', {
          y: -30,
          opacity: 0,
          duration: 0.4,
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
        }, '-=0.4').from('.discipline', {
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
          .from('.my-work', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out'
          }, '+=0.6')
      }
    }

  })
})
</script>

<template>
  <div
    id="projectList"
    ref="projectList"
  >
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
    <div
      class="-mt-32 mx-auto container flex justify-center my-work"
    >
      <div
        class="opacity-20 hover:opacity-100 transition-opacity duration-300"
        @click="scrollToProjectListHeaders"
      >
        <div class="text-3xl lg:text-6xl font-serif font-bold uppercase text-center select-none cursor-pointer">
          My Work
        </div>
      </div>
    </div>
    <div ref="projectListHeaders">
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