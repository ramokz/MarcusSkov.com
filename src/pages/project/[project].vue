<script setup lang="ts">

import { useStories } from '~/stores/storyblok'

const route = useRoute()
const story = useStories()
const projectRoute: string = route.params.project as string

interface projectInterface {
  content: object
  projectContent: {
    role: string
  }
}

const projectDataComputed = computed(() => {
  return story.getProject(projectRoute as string)
})


// content.value = projectDataComputed.content.projectContent
// const projectContent: object = project.content.projectContent

</script>

<template>
  <div v-if="projectDataComputed">
    <div
      class="relative h-3xl m-0 p-0 -z-5"
      :style="{backgroundColor: projectDataComputed.content.color.color}"
    />
    <div class="container mx-auto">
      <div
        class="
          project-header
          flex
          flex-col
          lg:flex-row
          mt-10
          mb-32
          items-center"
      >
        <div class="flex flex-col mr-16 columns-4 w-1/2">
          <h3 class="text-xl">
            {{ projectDataComputed.content.year }}
          </h3>
          <h1 class="projectTitle">
            {{ projectDataComputed.name }}
          </h1>
          <div class="flex space-x-8">
            <ProjectMetadata
              :title="'Role'"
              :content="projectDataComputed.content.role"
            />
            <ProjectMetadata
              :title="'Studio'"
              :content="projectDataComputed.content.company"
            />
            <ProjectMetadata
              :title="'Platforms'"
              :content="projectDataComputed.content.platforms"
              :show-show-icon="true"
            />
          </div>
        </div>
        <p class="w-1/2">
          {{ projectDataComputed.content.intro }}
        </p>
      </div>

      <div
        v-for="content in projectDataComputed.content.projectContent"
        :key="content"
        class="mb-48 media-content"
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
