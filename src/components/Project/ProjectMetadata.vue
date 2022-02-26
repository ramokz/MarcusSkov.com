
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
  }

  // Roles
  return props.content.join(', ')
})

</script>
<template>
  <div>
    <h3 class="uppercase">
      {{ title }}
    </h3>
    <h3> {{ contentString }} </h3>
  </div>
</template>