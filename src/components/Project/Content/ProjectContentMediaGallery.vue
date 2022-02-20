<script setup lang="ts">

const props = defineProps({
    content: {
        type: Object,
        required: true
    }
})

const modalOpen = ref<boolean>(false)

onMounted(() => {
    console.log(props.content.media);
})

const mediaClick = (event) => {
    console.log("Clicked media");
    console.log(event);
    modalOpen.value = !modalOpen.value
}

</script>

<template lang="pug">
div(class="grid grid-cols-3 gap-6 container mx-auto")
    img(
        v-for="media in props.content.media"
        :key="media.id"
        :src="media.filename"
        class=`
            h-1/4
            cursor-pointer
            mx-auto
            object-cover
            h-full
            w-full
            shadow-xl
        `
        @click="mediaClick($event)")
div(
    class="fixed top-0 left-0 opacity-30 w-screen h-screen bg-dark cursor-pointer"
    @click="mediaClick"
    v-if="modalOpen")

</template>