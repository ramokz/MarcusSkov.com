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
    items-center"
  >
    <div class="w-1/2">
      <h2 class="textContentHeader">
        {{ content.header }}
      </h2>
      <p class="textContentBody">
        {{ content.text }}
      </p>
    </div>
    <div class="w-1/2">
      <ProjectContentMedia :content="content" />
    </div>
  </div>
</template>

