<script setup lang="ts">

defineProps({
	story: {
		type: Object,
		required: true
	}
})

</script>

<template lang="pug">
div(
  class=`
  container
  project-header
  mx-auto
  flex
  flex-col
  lg:flex-row
  items-center
  h-screen
  even:flex-row-reverse
`)
  RouterLink(:to="`/project/${story.slug}`")
    div(class="w-lg h-lg bg-red-500")
  div(class="flex flex-col mx-auto lg:mx-16")
    h3(class="projectYear") ({{ story.content.year }})
    RouterLink(:to="`/project/${story.slug}`" class="projectTitle hover:text-core")
      h1 {{ story.name }}
</template>

