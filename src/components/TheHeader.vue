<template lang="pug">
nav(class=`
    w-full
    flex
    fixed
    mx-auto
    space-x-8
    justify-center
    backdrop-filter
    backdrop-blur-lg
    py-4
    z-10
  `)
  router-link(to="/" class="navbarLinks") Project
  router-link(to="/about" class="navbarLinks") About me
</template>