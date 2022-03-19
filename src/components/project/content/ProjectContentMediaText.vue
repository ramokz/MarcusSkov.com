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
    class="container
    mx-auto
    flex
    flex-col
    flex-col-reverse
    mb-32
    text-center
    lg:text-left
    lg:flex-row
    lg:space-x-4
    lg:mt-64
    items-center"
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

