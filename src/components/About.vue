<script setup lang="ts">
import photo from '~/assets/about/Photo.jpeg'
import { gsap } from 'gsap'

const aboutMe = ref<HTMLDivElement>(null)

onMounted(() => {
  gsap.from(aboutMe.value, {
    opacity: 0,
    delay: 1
  })
})

</script>

<template>
  <div
    ref="aboutMe"
    class="container pt-32 mb-12 mx-auto px-6 lg:px-0"
  >
    <div
      class="
        flex
        flex-col
        landscape:flex-row
        flex-col-reverse
        items-center
        landscape:space-x-12
      "
    >
      <div class="container md:w-1/2 body">
        <h2 class="h2">
          Hey again
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
              I’m currently working from Jutland (Denmark) as a <span class="color-light">Principal UI/UX Designer</span> in the video game industry at a Californian-based studio called
              <span class="color-light">
                <a
                  class="color-light"
                  href="https://www.thegameband.com/"
                  target="_blank"
                >The Game Band</a>.
              </span>
            </p>
          </div>

          <div>
            <h5 class="h5">
              A bit about my career path
            </h5>
            <div class="divider" />
            <p>
              Born and raised in Denmark, I moved to the UK in 2013 to study Film & Media at <span class="color-light"> Univeristy of East Anglia</span>.
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
          <div>
            <h5 class="h5">
              Contact
            </h5>
            <div class="divider" />
            <p>
              Feel free to reach out if you're interested in collaboration or consultation of any sort.
              <br>
              <br>
            </p>
            <div class="flex">
              <a
                class="font-semibold text-light no-underline"
                href="mailto:&#72;&#101;&#108;&#108;&#111;&#64;&#77;&#97;&#114;&#99;&#117;&#115;&#115;&#107;&#111;&#118;&#46;&#99;&#111;&#109;"
              >
                <div
                  class="
                    mx-auto
                    p-4
                    border-2
                    cursor-pointer
                    border-core
                    hover:border-light
                  "
                >
                  &#72;&#101;&#108;&#108;&#111;&#64;&#77;&#97;&#114;&#99;&#117;&#115;&#115;&#107;&#111;&#118;&#46;&#99;&#111;&#109;
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="container md:w-1/2 flex flex-col mb-12 lg:mb-0 self-center landscape:self-start">
        <div>
          <img
            :src="photo"
            alt="Photo of Marcus"
            class="object-contain w-full rounded-xl lg:rounded-3xl"
          >
        </div>
        <div class="flex mt-4 place-content-evenly">
          <a
            href="https://bsky.app/profile/marcusskov.com"
            target="_blank"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              class="fill-grey hover:fill-light transition-colors duration-300"
            >
              <path
                d="M7.23845 4.23373C10.7849 6.89618 14.5995 12.2945 16.0001 15.1916C17.4007 12.2947 21.2151 6.89613 24.7617 4.23373C27.3206 2.31261 31.4667 0.826155 31.4667 5.55613C31.4667 6.50077 30.9251 13.4916 30.6075 14.6265C29.5033 18.5723 25.4798 19.5787 21.9008 18.9696C28.1568 20.0344 29.7483 23.5612 26.3113 27.088C19.7838 33.7862 16.9294 25.4074 16.1977 23.2605C16.0636 22.8669 16.0009 22.6828 16 22.8394C15.999 22.6828 15.9363 22.8669 15.8022 23.2605C15.0708 25.4074 12.2165 33.7864 5.68862 27.088C2.2516 23.5612 3.84302 20.0342 10.0991 18.9696C6.52003 19.5787 2.49646 18.5723 1.39246 14.6265C1.07479 13.4915 0.533203 6.50066 0.533203 5.55613C0.533203 0.826155 4.67944 2.31261 7.23827 4.23373H7.23845Z"
              />
            </svg>
          </a>
          <a
            href="https://mastodon.social/@marcusskov"
            target="_blank"
          >
            <svg
              viewBox="0 0 16 16"
              width="32"
              height="32"
              class="fill-grey hover:fill-light transition-colors duration-300"
            ><path
              d="M 15.659 9.592 C 15.424 10.72 13.553 11.956 11.404 12.195 C 10.283 12.32 9.18 12.434 8.003 12.384 C 6.079 12.302 4.56 11.956 4.56 11.956 C 4.56 12.13 4.572 12.297 4.595 12.452 C 4.845 14.224 6.478 14.33 8.025 14.379 C 9.586 14.429 10.976 14.02 10.976 14.02 L 11.04 15.337 C 11.04 15.337 9.948 15.884 8.003 15.984 C 6.93 16.039 5.598 15.959 4.047 15.576 C 0.683 14.746 0.104 11.4 0.015 8.006 C -0.012 6.998 0.005 6.048 0.005 5.253 C 0.005 1.782 2.443 0.765 2.443 0.765 C 3.672 0.238 5.782 0.017 7.975 0 L 8.029 0 C 10.221 0.017 12.332 0.238 13.561 0.765 C 13.561 0.765 15.999 1.782 15.999 5.253 C 15.999 5.253 16.03 7.814 15.659 9.592 Z M 13.124 5.522 L 13.124 9.725 L 11.339 9.725 L 11.339 5.646 C 11.339 4.786 10.951 4.35 10.175 4.35 C 9.317 4.35 8.887 4.867 8.887 5.891 L 8.887 8.124 L 7.113 8.124 L 7.113 5.891 C 7.113 4.867 6.683 4.35 5.825 4.35 C 5.049 4.35 4.661 4.786 4.661 5.646 L 4.661 9.725 L 2.876 9.725 L 2.876 5.522 C 2.876 4.663 3.111 3.981 3.582 3.476 C 4.067 2.971 4.703 2.712 5.493 2.712 C 6.406 2.712 7.098 3.039 7.555 3.695 L 8 4.39 L 8.445 3.695 C 8.902 3.039 9.594 2.712 10.507 2.712 C 11.297 2.712 11.933 2.971 12.418 3.476 C 12.889 3.981 13.124 4.663 13.124 5.522 Z"
              style="stroke:none;stroke-miterlimit:10;fill-rule:evenodd;"
            /></svg>
          </a>
          <a
            href="https://www.linkedin.com/in/marcusskov"
            target="_blank"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              class="fill-grey hover:fill-light transition-colors duration-300"
            >
              <path
                d="M25.3879 25.3877H21.4368V19.2C21.4368 17.7245 21.4104 15.8251 19.3818 15.8251C17.3239 15.8251 17.009 17.4327 17.009 19.0926V25.3873H13.0578V12.6629H16.8509V14.4018H16.904C17.2836 13.7528 17.8322 13.2188 18.4912 12.8569C19.1503 12.4949 19.8952 12.3185 20.6465 12.3464C24.6512 12.3464 25.3896 14.9805 25.3896 18.4073L25.3879 25.3877ZM8.59959 10.9235C8.1461 10.9236 7.70275 10.7892 7.32564 10.5373C6.94852 10.2855 6.65459 9.92741 6.48097 9.50847C6.30735 9.08953 6.26185 8.62851 6.35024 8.18371C6.43864 7.73891 6.65695 7.33032 6.97756 7.00959C7.29817 6.68886 7.70669 6.47041 8.15146 6.38186C8.59623 6.29331 9.05725 6.33863 9.47626 6.5121C9.89526 6.68557 10.2534 6.97939 10.5054 7.35641C10.7575 7.73344 10.892 8.17673 10.8921 8.63022C10.8921 8.93133 10.8329 9.2295 10.7177 9.50771C10.6025 9.78592 10.4337 10.0387 10.2208 10.2517C10.0079 10.4646 9.75518 10.6336 9.47701 10.7488C9.19884 10.8641 8.9007 10.9235 8.59959 10.9235ZM10.5752 25.3877H6.61989V12.6629H10.5752V25.3877ZM27.3578 2.66848H4.63444C4.11868 2.66266 3.62169 2.86184 3.25272 3.22225C2.88374 3.58266 2.67297 4.07481 2.66667 4.59056V27.4082C2.67275 27.9242 2.8834 28.4166 3.25236 28.7774C3.62133 29.1382 4.11843 29.3378 4.63444 29.3323H27.3578C27.8748 29.3388 28.3733 29.1398 28.7437 28.779C29.1141 28.4182 29.3262 27.9252 29.3333 27.4082V4.58892C29.326 4.07214 29.1138 3.57943 28.7433 3.21903C28.3729 2.85863 27.8745 2.66002 27.3578 2.66684"
              />
            </svg>
          </a>
          <a
            href="https://github.com/ramokz"
            target="_blank"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              class="fill-grey hover:fill-light transition-colors duration-300"
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
