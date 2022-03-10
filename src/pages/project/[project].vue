<script setup lang="ts">

import { useStoryblok } from '@storyblok/vue'
import { useStories } from '~/stores/storyblok'
import { gsap } from 'gsap'
import { threeProjectPageInit } from '~/composables/ThreeRenderProjectPage'

const route = useRoute()
const storyStore = useStories()
const projectRoute: string = route.params.project as string

interface projectInterface {
  content: object
  projectContent: {
    role: string
  }
}

// const projectDataComputed = computed(() => {
//   return storyStore.getProject(projectRoute as string)
// })
const version = import.meta.env.DEV ? 'draft' : 'published'
const projectData = await useStoryblok(`project/${projectRoute}`, {
  version: version
})
const headerBG = ref()
const projectContainer = ref()
const projectPageCanvas = ref()

onMounted(() => {
  threeProjectPageInit(projectPageCanvas)

  // gsap.set(headerBG.value, {
  //   visibility: 'hidden'
  // })

  gsap.from(projectContainer.value, {
    opacity: 0,
    delay: 0.5
  })

  gsap.from(headerBG.value, {
    height: 0,
    delay: 0.2,
    ease: 'power2.out',
    duration: 1
  })

  const projectIndex = storyStore.projectData.findIndex((project: object) => project.slug === route.params.project)

  // console.log(`ProjectIndex is ${projectIndex}`)
  // console.log(`StoreIndex is ${storyStore.projectIndex}`)
  // console.log(projectIndex === storyStore.projectIndex)

  if (projectIndex !== storyStore.projectIndex) {
    storyStore.$patch({
      projectIndex: projectIndex
    })
  }
})

</script>

<template>
  <div ref="projectContainer">
    <BackButton />
    <div
      class="relative -z-5"
    >
      <div
        ref="headerBG"
        class="headerBG"
        :style="{backgroundColor: projectData.content.color.color}"
      />
    </div>
    <div class="mx-auto">
      <div
        class="
          project-header
          container
          mx-auto
          flex
          flex-col
          lg:flex-row
          mt-10
          mb-32
          items-start"
      >
        <div class="flex flex-col mr-16 w-1/2">
          <h3 class="text-xl">
            {{ projectData.content.year }}
          </h3>
          <h1 class="projectTitle">
            {{ projectData.name }}
          </h1>
          <div class="flex mt-6 space-x-8">
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
        <div class="w-1/2">
          <ProjectContentTextField
            title="About the Project"
            :rich-text="projectData.content.intro"
          />
          <ProjectContentTextField
            class="mt-8"
            title="My Responsibilities"
            :rich-text="projectData.content.responsibilities"
          />
        </div>
      </div>

      <div
        v-for="content in projectData.content.projectContent"
        :key="content"
        class="mb-48 max-w-full"
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
        <!--        <ProjectContentImageScrollReveal-->
        <!--          v-if="content.component === 'mediaMulti'"-->
        <!--          :content="content"-->
        <!--        />-->
        <ProjectContentMediaGallery
          v-if="content.component === 'mediaGallery'"
          :content="content"
        />
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
