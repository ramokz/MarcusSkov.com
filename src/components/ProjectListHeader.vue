<script setup lang="ts">

import {useStories} from "../../stores/storyblok";

const allProjects = useStories().getProject

  const props = defineProps({
    projectName: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: false
    },
    year: {
      type: String,
      required: false
    }
  })

  const projectSlug =  computed((): string => {
    return '/project/' + props.slug
  })
  
</script>
<template lang="pug">
div(class=`
  container
  project-header
  flex
  flex-col
  lg:flex-row
  mb-48
  items-center
  first:mt-48
`)
  
  router-link(:to="projectSlug")
    div(class="w-lg h-lg bg-red-500")
  
  div(class="flex flex-col mx-auto lg:mx-16")
    h3(class="projectYear") ({{ year }})
    router-link(:to="projectSlug" class="projectTitle hover:text-core")
      h1 {{ projectName }}
    
</template>

