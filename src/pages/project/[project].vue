<script setup lang="ts">

import { useStoryblok } from '@storyblok/vue'
import { useStories } from '~/stores/storyblok'
import { gsap } from 'gsap'
import { threeProjectPageInit } from '~/composables/ThreeRenderProjectPage'
import { onBeforeRouteLeave } from 'vue-router'
import { useGlobalStore } from '~/stores/globalStore'

const route = useRoute()
const router = useRouter()
const storyStore = useStories()
const projectRoute: string = route.params.project as string
const version = import.meta.env.DEV ? 'draft' : 'published'
const projectData = await useStoryblok(`project/${projectRoute}`, {
  version: version
}).catch( () => {
  router.push({
    name: '404'
  })
})
/////////////////////////////
// DOM Refs
/////////////////////////////
const headerBG = ref()
const projectHeader = ref()
const projectContainer = ref()
const projectPageCanvas = ref()

onMounted(() => {

  const projectIndex = storyStore.getAllProjects.findIndex((project: object) => project.slug === route.params.project)

  threeProjectPageInit(projectPageCanvas)

  const tl = gsap.timeline()

  tl.from(headerBG.value, {
    height: 0,
    delay: 0.2,
    ease: 'power2.out',
    duration: 1,
    onComplete: () => {
      gsap.set(headerBG.value, {
        height: null
      })
    }
  }).from(projectHeader.value, {
    opacity: 0,
    y: 80,
    ease: 'power3.out',
    duration: 0.7
  }, '-=0.2 ')


  if (projectIndex !== storyStore.projectIndex) {
    storyStore.$patch({
      projectIndex: projectIndex
    })
  }
})

onBeforeRouteLeave(() => {
  gsap.set(projectContainer.value, {
    visibility: 'hidden'
  })
})

const globalStore = useGlobalStore()

globalStore.seenIntro = true

</script>

<template>
  <div
    ref="projectContainer"
    class="-z-4"
  >
    <BackButton />
    <div
      class="relative -z-5 headerBG"
    >
      <div
        ref="headerBG"
        class="headerBG"
        :style="{backgroundColor: projectData.content.color.color}"
      />
    </div>
    <div
      class="mx-auto px-6"
    >
      <div
        ref="projectHeader"
        class="
          project-header
          container
          mx-auto
          flex
          flex-col
          lg:flex-row
          mt-10
          mb-32
          items-start
      "
      >
        <div class="flex flex-col mr-16 mb-12 lg:mb-0 lg:w-1/2">
          <h3 class="text-xl">
            {{ projectData.content.year }}
          </h3>
          <h1 class="h1">
            {{ projectData.name }}
          </h1>
          <div class="flex mt-6 flex-col space-y-8 lg:space-y-0 lg:flex-row lg:space-x-8">
            <ProjectMetadata
              :title="'Role'"
              :content="projectData.content.role"
            />
            <ProjectMetadata
              :title="'Studio'"
              :content="projectData.content.company"
            />
            <ProjectMetadata
              :title="'Platforms'"
              :content="projectData.content.platforms"
              :show-show-icon="true"
            />
          </div>
        </div>
        <div class="lg:w-1/2">
          <ProjectDescription
            title="About the Project"
            :rich-text="projectData.content.intro"
          />
          <ProjectDescription
            class="mt-8"
            title="My Responsibilities"
            :rich-text="projectData.content.responsibilities"
          />
        </div>
      </div>

      <section ref="projectContent">
        <div
          v-for="content in projectData.content.projectContent"
          :key="content"
        >
          <ProjectContentMedia
            v-if="content.component === 'media'"
            :content="content"
          />
          <ProjectContentMediaText
            v-if="content.component === 'mediaText'"
            class="multi-media"
            :content="content"
          />
          <ProjectContentMediaGallery
            v-if="content.component === 'mediaGallery'"
            :content="content"
          />
          <ProjectContentSectionHeader
            v-if="content.component === 'sectionHeader'"
            :content="content"
          />
        </div>
      </section>
      <div
        class="
        flex
        flex-col
        mx-auto
        h-128
        items-center
        mt-32
        lg:mt-64
      "
      >
        <h3
          class="
            text-5xl
            lg:text-6xl
            font-serif
            mb-24
            select-none
            text-center
            opacity-10
            color-grey
            uppercase
          "
        >
          Thanks for reading
        </h3>

        <router-link to="/">
          <div
            class="
            h5
            mx-auto
            p-4
            border
            cursor-pointer
            select-none
            border-core
            hover:border
            hover:border-light"
          >
            Back to the project list
          </div>
        </router-link>
      </div>
    </div>
    <canvas
      ref="projectPageCanvas"
      class="absolute left-0 top-0 w-full h-full -z-1 block"
    />
  </div>
</template>

<style>
.headerBG {
  height: 60vh;
}
</style>
