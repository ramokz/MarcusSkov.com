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
  <div
    class="
        container
        mx-auto
        flex
        items-center
        text-center lg:text-left lg:odd:text-right
        h-screen
        justify-center lg:justify-start lg:even:justify-end
    "
  >
    <RouterLink
      :to="`/project/${story.slug}`"
      class="
        text-light
        no-underline
        mt-84 lg:mt-0
        mx-6
        bg-dark lg:bg-transparent
        border-2 lg:border-none
        border-core lg:border-transparent
        hover:text-core
        hover:text-underline
        lg:w-1/2
      "
    >
      <div class="p-4">
        <h3 class="h3">
          {{ story.content.year }}
        </h3>
        <h1 class="h1">
          {{ story.name }}
        </h1>
      </div>
    </RouterLink>
  </div>
</template>