<script setup lang="ts">

defineProps({
  content: {
    type: Object,
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
      flex-row-reverse
      even:lg:flex-row
      items-center
      mb-32
      text-center lg:text-left
      lg:space-x-12
      odd:lg:space-x-reverse
      lg:mt-64
    "
  >
    <div class="w-full h-full lg:mt-0 lg:w-1/2">
      <h2 class="h2">
        {{ content.header }}
      </h2>
      <p class="body">
        {{ content.text }}
      </p>
    </div>
    <div class="w-full h-full lg:w-1/2">
      <ProjectContentMedia :content="content" />
    </div>
  </div>
</template>

