<script setup lang="ts">

const props = defineProps({
  story: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

</script>

<template>
  <div class="relative">
    <div
      class="
        container
        project-header
        mx-auto
        flex
        lg:flex-row
        items-end
        h-screen
        even:flex-row-reverse"
    >
      <RouterLink
        :to="`/project/${story.slug}`"
        class="text-light no-underline flex mx-auto"
      >
        <div class="mx-auto mb-64 p-4 bg-dark border-2 border-core hover:border-light">
          <h3 class="projectYear mx-auto text-center">
            ({{ story.content.year }})
          </h3>
          <h1 class="h1 text-center">
            {{ story.name }}
          </h1>
        </div>
      </RouterLink>
    </div>
  </div>
</template>