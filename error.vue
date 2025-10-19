<template>
  <v-app dark>
    <div class="font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden">
      <div class="max-w-520px text-center z-20">
        <h1 class="text-8xl sm:text-10xl font-medium mb-8" >
          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
        </h1>
        <!-- <p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight">notfound</p> -->
        <div class="w-full flex items-center justify-center">
          <NuxtLink to="/" class="gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"> 돌아가기 </NuxtLink>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '페이지를 찾을 수 없습니다',
      otherError: '오류가 발생했습니다',
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>



