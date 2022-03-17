<script setup lang="ts">
import photo from '~/assets/about/Photo.jpeg'
// import GithubIcon from

</script>


<template>
  <div class="container pt-24 mb-64 mx-auto px-6 lg:px-0">
    <div class="flex flex-col flex-col-reverse items-center md:flex-row md:space-x-12">
      <div class="container md:w-1/2 body">
        <h2 class="h2">
          Hey there!
        </h2>

        <div class="mt-8 space-y-6 color-grey">
          <div>
            <h5 class="h5">
              What do I do?
            </h5>
            <div class="divider" />
            <p>
              Honestly, too many things and not enough of each.
              <br>
              I’m a <span class="color-light">Technical UI/UX Designer</span> working in the video game industry, currently at <span class="color-light"> Sumo Leamington in the UK. </span>
            </p>
            <br>
            <p>
              In practical terms, it means that I design user interfaces (UIs) while also prioritising the user experiences (UX) of said UIs so they feel nice to use again and again. As the “technical” part of the title implies, I’m also involved with implementing the code that brings the UIs to life for the end-user.
            </p>
          </div>

          <div>
            <h5 class="h5">
              A bit about my career path
            </h5>
            <div class="divider" />
            <p>
              Born and raised in Denmark, I moved to the UK in 2013 to study Film & Media at <span class="color-light"> Univeristy of East Anglia </span>.
            </p>
            <br>
            <p>
              Following that, I started my career in digital product design within the SAAS (software-as-a-service) industry working with video-on-demand applications for companies such as Verizon among others.
            </p>
            <br>
            <p>
              Later on I made the jump to game development at <span class="text-light">Frontier Development</span> in 2019.
            </p>
          </div>
        </div>
      </div>
      <div class="container md:w-1/2 flex flex-col mb-12 lg:mb-0 self-center md:self-start">
        <div>
          <img
            :src="photo"
            alt="Photo of Marcus"
            class="object-contain w-full rounded-xl lg:rounded-3xl"
          >
        </div>
        <div class="flex mt-4 place-content-evenly fill-grey">
          <a
            href="https://twitter.com/marcusskov"
            target="_blank"
            class="hover:fill-core"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                d="M28.9695 8.1284C28.0087 8.55433 26.9831 8.84274 25.8944 8.97262C27.0101 8.30287 27.8449 7.2509 28.2437 6.01212C27.1935 6.63722 26.0433 7.07659 24.8439 7.31092C20.5081 3.01341 14.3961 7.47136 15.714 12.2005C11.2637 11.9771 7.31004 9.85122 4.67423 6.60422C3.15769 9.18272 4.14516 12.3533 6.33212 13.7476C5.45351 13.7201 4.62839 13.4783 3.90641 13.0772C3.90565 13.0998 3.90565 13.1221 3.90565 13.1444C3.90565 15.742 5.75262 17.9003 8.20315 18.3969C7.36848 18.6032 6.5701 18.6357 5.77745 18.4886C6.45932 20.6087 8.43235 22.1558 10.7817 22.2131C8.41325 24.0124 5.66285 24.7534 2.85515 24.4287C14.9455 31.5339 26.3482 22.2322 26.31 11.5935C26.3099 11.363 26.3048 11.1324 26.2949 10.9021C27.3416 10.1457 28.2431 9.2022 28.9689 8.1326"
              />
            </svg>

          </a>
          <a
            href="https://www.linkedin.com/in/marcusskov"
            target="_blank"
            class="hover:fill-core"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                d="M25.3879 25.3877H21.4368V19.2C21.4368 17.7245 21.4104 15.8251 19.3818 15.8251C17.3239 15.8251 17.009 17.4327 17.009 19.0926V25.3873H13.0578V12.6629H16.8509V14.4018H16.904C17.2836 13.7528 17.8322 13.2188 18.4912 12.8569C19.1503 12.4949 19.8952 12.3185 20.6465 12.3464C24.6512 12.3464 25.3896 14.9805 25.3896 18.4073L25.3879 25.3877ZM8.59959 10.9235C8.1461 10.9236 7.70275 10.7892 7.32564 10.5373C6.94852 10.2855 6.65459 9.92741 6.48097 9.50847C6.30735 9.08953 6.26185 8.62851 6.35024 8.18371C6.43864 7.73891 6.65695 7.33032 6.97756 7.00959C7.29817 6.68886 7.70669 6.47041 8.15146 6.38186C8.59623 6.29331 9.05725 6.33863 9.47626 6.5121C9.89526 6.68557 10.2534 6.97939 10.5054 7.35641C10.7575 7.73344 10.892 8.17673 10.8921 8.63022C10.8921 8.93133 10.8329 9.2295 10.7177 9.50771C10.6025 9.78592 10.4337 10.0387 10.2208 10.2517C10.0079 10.4646 9.75518 10.6336 9.47701 10.7488C9.19884 10.8641 8.9007 10.9235 8.59959 10.9235ZM10.5752 25.3877H6.61989V12.6629H10.5752V25.3877ZM27.3578 2.66848H4.63444C4.11868 2.66266 3.62169 2.86184 3.25272 3.22225C2.88374 3.58266 2.67297 4.07481 2.66667 4.59056V27.4082C2.67275 27.9242 2.8834 28.4166 3.25236 28.7774C3.62133 29.1382 4.11843 29.3378 4.63444 29.3323H27.3578C27.8748 29.3388 28.3733 29.1398 28.7437 28.779C29.1141 28.4182 29.3262 27.9252 29.3333 27.4082V4.58892C29.326 4.07214 29.1138 3.57943 28.7433 3.21903C28.3729 2.85863 27.8745 2.66002 27.3578 2.66684"
              />
            </svg>
          </a>
          <a
            href="https://medium.com/@MarcusSkov"
            target="_blank"
            class="hover:fill-core"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                d="M5.71335 9.69199C5.72872 9.53894 5.70775 9.38443 5.65214 9.24102C5.59654 9.0976 5.50787 8.96934 5.39335 8.86666L3.03335 6.02266V5.59599H10.364L16.0307 18.0227L21.012 5.59599H28V6.02132L25.98 7.95599C25.8955 8.02184 25.8301 8.10912 25.7907 8.20877C25.7513 8.30842 25.7393 8.41681 25.756 8.52266V22.744C25.7391 22.8499 25.7509 22.9583 25.7903 23.058C25.8297 23.1577 25.8953 23.245 25.98 23.3107L27.952 25.2453V25.6707H18.0373V25.2453L20.076 23.2627C20.2787 23.0627 20.2787 23.0027 20.2787 22.6973V11.2013L14.6 25.624H13.8333L7.22268 11.2013V20.8667C7.16801 21.2733 7.30268 21.6827 7.58935 21.9773L10.2453 25.2V25.6253H2.71468V25.2L5.37068 21.9773C5.51041 21.8317 5.61416 21.6554 5.67366 21.4626C5.73316 21.2698 5.74675 21.0657 5.71335 20.8667V9.69199Z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/MarcusSkov"
            target="_blank"
            class="hover:fill-core"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path
                d="M16 2.21607C7.99292 2.21607 1.5 8.70755 1.5 16.7161C1.5 23.1223 5.65469 28.5575 11.416 30.4748C12.1406 30.6091 12.4067 30.1603 12.4067 29.7773C12.4067 29.4318 12.3932 28.2893 12.387 27.0777C8.35309 27.9548 7.50189 25.3669 7.50189 25.3669C6.8423 23.6911 5.89192 23.2452 5.89192 23.2452C4.57634 22.3453 5.99109 22.3638 5.99109 22.3638C7.44714 22.4661 8.21383 23.8583 8.21383 23.8583C9.50708 26.0748 11.6059 25.4339 12.4333 25.0634C12.5637 24.1265 12.9393 23.4866 13.3539 23.1245C10.1333 22.7581 6.74769 21.5145 6.74769 15.9585C6.74769 14.3757 7.31412 13.0822 8.24168 12.0667C8.09113 11.7013 7.59481 10.2265 8.38239 8.22925C8.38239 8.22925 9.6 7.83978 12.3707 9.71579C13.5273 9.39452 14.7677 9.2334 16 9.22764C17.2323 9.2334 18.4737 9.39452 19.6324 9.71579C22.4 7.83978 23.6159 8.22925 23.6159 8.22925C24.4052 10.2265 23.9089 11.7013 23.7583 12.0667C24.688 13.0822 25.2504 14.3757 25.2504 15.9585C25.2504 21.528 21.8583 22.754 18.6295 23.1129C19.1496 23.5629 19.613 24.4453 19.613 25.7981C19.613 27.7383 19.5964 29.2997 19.5964 29.7773C19.5964 30.1634 19.8572 30.6155 20.5922 30.4732C26.3506 28.5537 30.5 23.1204 30.5 16.7161C30.5 8.70755 24.008 2.21607 16 2.21607Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>