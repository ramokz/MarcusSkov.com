<script setup lang="ts">

import { useStoryblok } from '@storyblok/vue'
import { useStories } from '~/stores/storyblok'
import { gsap } from 'gsap'

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
const projectData = await useStoryblok(`project/${projectRoute}`, {
  version: 'draft'
})
const headerBG = ref()
const projectContainer = ref()

onMounted(() => {

  gsap.set(headerBG.value, {
    visibility: 'hidden'
  })

  gsap.from(projectContainer.value, {
    opacity: 0,
    delay: 0.5
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
      ref="headerBG"
      class="relative h-3xl m-0 p-0 -z-5"
      :style="{backgroundColor: projectData.content.color.color}"
    />
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
          <div>
            <h4 class="h4">
              About
            </h4>
            <p class="body">
              {{ projectData.content.intro }}
            </p>
          </div>

          <div class="mt-4">
            <h4 class="h4">
              Responsibilities
            </h4>
            <p class="body">
              {{ projectData.content.intro }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-for="content in projectData.content.projectContent"
        :key="content"
        class="mb-48"
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
        <ProjectContentImageScrollReveal
          v-if="content.component === 'mediaMulti'"
          :content="content"
        />
        <ProjectContentMediaGallery
          v-if="content.component === 'mediaGallery'"
          :content="content"
        />
      </div>
    </div>
  </div>
</template>
