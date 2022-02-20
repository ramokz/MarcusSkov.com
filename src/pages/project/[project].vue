<script setup lang="ts">

import {useStories} from '~/stores/storyblok'
import ProjectContentMediaGallery from '../../components/Project/Content/ProjectContentMediaGallery.vue'

const route = useRoute()
const story = useStories()

const projectRoute = route.params.project

interface projectInterface {
  content: object,
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

<template lang="pug">
div(v-if="projectDataComputed")
  div(
    class="w-screen h-3xl"
    :style="{backgroundColor: projectDataComputed.content.color.color}")
    div(class="w-lg h-lg mx-auto bg-red-500")
  div(class="container mx-auto")
    div(class=`
      project-header
      flex
      flex-col
      lg:flex-row
      mt-10
      mb-32
      items-center`)
      div(class="flex flex-col mr-16 columns-4 w-1/2")
        h3(class="text-xl") {{ projectDataComputed.content.year }}
        h1(class="projectTitle") {{ projectDataComputed.name }}
        div(class="flex space-x-8")
          ProjectMetadata(
            :slug="projectRoute"
            :title="'Role'"
            :content="projectDataComputed.content.role")
          ProjectMetadata(
            :slug="projectRoute"
            :title="'Studio'"
            :content="projectDataComputed.content.company")
          ProjectMetadata(
            :slug="projectRoute"
            :title="'Platforms'"
            :content="projectDataComputed.content.platforms"
            :showShowIcon="true")
      p(class="w-1/2") {{ projectDataComputed.content.intro }}
      
  div(v-for="content in projectDataComputed.content.projectContent" class="mb-48 media-content")
    ProjectContentMedia(
      v-if="content.component === 'media'"
      :content="content")
    ProjectContentMediaText(
      v-if="content.component === 'mediaText'"
      class="multi-media"
      :content="content")
    ProjectContentImageMulti(
      v-if="content.component === 'mediaMulti'"
      :content="content")
    ProjectContentMediaGallery(
      v-if="content.component === 'mediaGallery'"
      :content="content")
  
</template>


<!--<style>-->
<!--.media-content:nth-child(even) > .multi-media {-->
<!--  flex-direction: row-reverse;-->
<!--}-->
<!--</style>-->
