<script setup lang="ts">
import photo from '~/assets/about/Photo.jpeg'
// import GithubIcon from 

</script>


<template>
  <div class="container pt-24 mb-64 mx-auto">
    <div class="flex space-x-12">
      <div class="w-1/2 body">
        <h2 class="h2"> Hey there! </h2>
        
        <h3 class="h3">What do I do?</h3>
        <div class="divider"/>
        <div class="color-grey">
          <p>
            Honestly, too many things and not enough of each.
            <br/>
            I’m a <span class="color-light">Technical UI/UX Designer</span> working in the video game industry, currently at <span class="color-light"> Sumo Leamington in the UK. </span>
          </p>
          <br/>
          <p>
            In practical terms, it means that I design user interfaces (UIs) and working around optimising the user experiences (UX) of said UIs. As the “technical” part of the title implies, I’m also involved with implementing the code that brings the UIs to life for the end-user.
          </p>
          <br/>
          <p>
            In the past, I used to be a product design within the SAAS (software-as-a-service) industry working with video-on-demand applications for companies such as Verizon among others.
          </p>
        </div>
      </div>
      <div class="w-1/2 flex">
        <img
          :src="photo"
          alt="Photo of Marcus"
          class="object-contain w-full rounded-3xl"/>
        <svg/>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>