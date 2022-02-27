<script setup lang="ts">

import { useStories } from '~/stores/storyblok'
const stories = useStories()

</script>

<template>
  <div>
    <ProjectListHeader
      v-for="(story, index) in stories.projectData"
      :key="story.id"
      :index="index"
      :story="story"
    />
  </div>
</template>