<script setup lang="ts">

useHead({
  title: 'Marcus Skov',
  meta: [
    {
      name: 'description', content: 'My portfolio site'
    }
  ]
})

const route = useRoute()

function onEnter(el, done) {
  switch(route.name){
    // TODO - Figure out how to get a clean route name for project slugs
    case 'project-project':
      console.log('Entering project page')
      break
    case 'about':
      console.log('Entering about page')
      break
    default:
      console.log('Entering index page')
      break
  }
  done()
}

</script>

<template>
  <div class="antialiasing">
    <TheHeader />

    <RouterView v-slot="{Component}">
      <Transition @enter="onEnter">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <Suspense>
      <ProjectModels />
    </Suspense>
  </div>
</template>