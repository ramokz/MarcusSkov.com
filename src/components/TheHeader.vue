<template lang="pug">
div()
  nav(class=`
      w-full
      flex
      fixed
      mx-auto
      space-x-8
      justify-center
      bg-core
      shadow-2xl
      py-4
    `)
    router-link(to="/" class="navbarLinks") Project
    router-link(to="/about" class="navbarLinks") About me
</template>