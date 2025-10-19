<template>
  <div class="body cont">
    <div class="content-center">
      <div class="title">
        <span>
          <NuxtLink to="/">
            ETF 주식가격이 얼마나 올랐나
          </NuxtLink>
        </span>
        <NuxtLink to="/about">
            <UIcon name="i-heroicons-exclamation-circle" class="w-8 h-8 float-right"/>
        </NuxtLink>
        <NuxtLink to="/rate">
            <UIcon name="i-heroicons-currency-dollar" class="w-8 h-8 float-right"/>
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