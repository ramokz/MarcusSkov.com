

<template>
  <div class="sticky z-1 top-6 container mx-auto h-0">
    <div
      class="inline-block cursor-pointer"
      @click="$router.go(-1)"
    >
      <div
        class="
          flex
          items-center
          py-1
          px-2
          bg-light
          hover:bg-dark
          border-2
          border-dark
          hover:border-light
          rounded-md
          stroke-dark
          hover:stroke-light
          space-x-1
          text-xl
          text-dark
          hover:text-light"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <path
            d="M14.9865 7L6 16.5M6 16.5L14.9865 26M6 16.5H26.8108"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="">
          Back
        </div>
      </div>
    </div>
  </div>
</template>

