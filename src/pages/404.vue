<template>
  <div class="flex flex-col w-screen h-screen items-center justify-center">
    <h2 class="h2 uppercase">
      Page not found
    </h2>
    <div class="divider" />
    <router-link
      to="/"
      class="no-underline"
    >
      <div class="border border-core hover:border-light p-4">
        <h3 class="h3 text-light">
          Return to home page
        </h3>
      </div>
    </router-link>
  </div>
</template>