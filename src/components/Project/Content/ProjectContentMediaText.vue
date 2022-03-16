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
    space-x-4
    mt-64
    items-center"
  >
    <div class="w-1/2">
      <h2 class="h2">
        {{ content.header }}
      </h2>
      <p class="body">
        {{ content.text }}
      </p>
    </div>
    <div class="w-1/2">
      <ProjectContentMedia :content="content" />
    </div>
  </div>
</template>

