<template lang="pug">
div(class="container mx-auto flex items-center")
  div(class="w-1/2")
      h2(class="textContentHeader") {{props.content.header}}
      p(class="textContentBody") {{props.content.text}}
  div(class="w-1/2")
    ProjectContentMedia(:content="content")
</template>

<script setup lang="ts">

const props = defineProps({
	content: {
		type: Object,
		required: true
	}
})

</script>
