<template>
  <div class="body cont">
    <div class="content-center">
      <div class="title">내 ETF 주식가격은 얼마인가?
        <NuxtLink to="/about">
            <UIcon name="i-heroicons-exclamation-circle" class="w-8 h-8 float-right"/>
        </NuxtLink>
        <NuxtLink to="/">
            <UIcon name="i-heroicons-home" class="w-8 h-8 float-right mr-3"/>
        </NuxtLink>
      </div>
    </div>
    <div>
      <NuxtPage />
    </div>
  </div>
</template>

<style>
.body {
  margin-top: 20px;
  margin-bottom: 20px;
}

.title {
  font-size: 34px;
  font-weight: bold;
  text-align: center;
}

.cont {
  max-width: 1900px;
  margin: 0 auto;
}
</style>