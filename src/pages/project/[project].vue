<template lang="pug">
div
  div(
      class="w-screen h-3xl"
      :style="{backgroundColor: project.content.color.color}")
    div(class="w-lg h-lg mx-auto bg-red-500 pt-32")
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
        h3(class="text-xl") {{ project.content.year }}
        h1(class="projectTitle") {{ project.name }}
        div(class="flex space-x-8")
          ProjectMetadata(
            :slug="projectRoute"
            :title="'Role'"
            :content="project.content.role")
          ProjectMetadata(
            :slug="projectRoute"
            :title="'Studio'"
            :content="project.content.company")
          ProjectMetadata(
            :slug="projectRoute"
            :title="'Platforms'"
            :content="project.content.platforms"
            :showShowIcon="true")
      p(class="w-1/2") {{ project.content.intro }}
      
  div(v-for="content in projectContent" class="mb-48 media-content")
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
</template>

<script setup lang="ts">

  // import {useStories} from "~/stores/storyblok";
  //
  // const route = useRoute()
  // const story = useStories();
  //
  // const projectRoute = route.params.project
  //
  // interface projectInterface {
  //   content: object,
  //   projectContent: {
  //     role: string
  //   }
  // }
  //
  // const project: { content: projectInterface } = story.getProject(projectRoute as string)
  // const projectContent: object = project.content.projectContent
  
</script>

<style>
.media-content:nth-child(even) > .multi-media {
  flex-direction: row-reverse;
}
</style>
