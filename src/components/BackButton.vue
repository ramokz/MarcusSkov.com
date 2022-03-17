

<template>
  <div class="sticky z-1 top-6 container mx-auto h-0">
    <div
      class="inline-block cursor-pointer select-none ml-6 md:ml-0"
      @click="$router.go(-1)"
    >
      <div
        class="
          flex
          items-center
          py-2
          px-2
          bg-dark
          hover:bg-dark
          border
          border-core
          hover:border-light
          stroke-core
          hover:stroke-light
          text-lg
          text-light
          uppercase"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
        >
          <path
            d="M14.9865 7L6 16.5M6 16.5L14.9865 26M6 16.5H26.8108"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

