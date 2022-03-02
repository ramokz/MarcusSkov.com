<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: [Array, String],
    required: true
  },
  showShowIcon: {
    type: Boolean,
    required: false,
    default: false
  }
})
const contentString = computed(() => {
  // Need a type checker to convert array<strings>

  // Studio name
  if (typeof props.content === 'string') {
    return props.content

    // Platforms
  }
  else if (props.showShowIcon) {
    // TODO - Render platform icons
    console.log(props.content)
  }

  // Roles
  return props.content.join(', ')
})

</script>
<template>
  <div class="flex flex-col">
    <div>
      <h3 class="uppercase">
        {{ title }}
      </h3>
      <div class="h-2px bg-light mt-2 mb-1 opacity-30" />
    </div>
    <h3
      v-if="!props.showShowIcon"
      class="font-bold h3"
    >
      {{ contentString }}
    </h3>
    <div
      v-if="props.showShowIcon"
      class="flex space-x-2"
    >
      <img
        v-for="icon in props.content"
        :key="icon"
        :src="`./../../src/assets/${icon}-icon.svg`"
        :alt="`${icon} icon`"
        height="32"
        width="32"
      >
    </div>
  </div>
</template>