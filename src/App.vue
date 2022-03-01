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
const router = useRouter()

function onEnter(el, done) {
  console.log(el)
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

router.afterEach((to, from) => {
  console.log('Hey there')
})

</script>

<template>
  <div class="antialiasing">
    <TheHeader />

    <RouterView v-slot="{Component, route}">
      <Transition @enter="onEnter">
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </Transition>
    </RouterView>
    <Suspense>
      <ProjectModels />
    </Suspense>
  </div>
</template>