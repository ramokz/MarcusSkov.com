<template lang="pug">
div(class="container mx-auto flex items-center")
  div(class="w-1/2")
      h2(class="textContentHeader") {{textHeader}}
      p(class="textContentBody") {{textBody}}
  div(class="w-1/2")
    ProjectContentMedia(:content="content")
</template>

<script setup lang="ts">

import ProjectContentMedia from '~/components/Project/Content/ProjectContentMedia.vue'

const props = defineProps({
	content: {
		type: Object,
		required: true
	}
})
  
const textHeader = props.content.header
const textBody = props.content.text

</script>
