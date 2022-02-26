<script setup lang="ts">

useHead({
  title: 'Marcus Skov',
  meta: [
    { name: 'description', content: 'My portfolio site' }
  ]
})

</script>

<template>
  <div class="antialiasing">
    <TheHeader />

    <RouterView />

    <Suspense>
      <ProjectList />
    </Suspense>
  </div>
</template>