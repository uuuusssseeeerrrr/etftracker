<template>
  <h2 class="mt-[20px] text-xl">환율 정보입니다</h2>
  <p>환율 정보는 1시간단위로 업데이트됩니다.</p>
  <p v-if="rateData !== undefined">최근 조회시간 :
    {{ dayjs(rateData[0]?.reg_date).subtract(9, 'hour').format('YYYY년 MM월 DD일 HH시 mm분') }}
  </p>

  <section class="mt-[20px]">
    <UTabs :items="items" v-model="currentTab">
      <template #usd>
        <rateInfo :chartData="usdChartData" :sliceData="usdRateSlice" :currentTab="'USD'" />
      </template>
      <template #jpy>
        <rateInfo :chartData="jpyChartData" :sliceData="jpyRateSlice" :currentTab="'JPY'" />
      </template>
      <template #eur>
        <rateInfo :chartData="eurChartData" :sliceData="eurRateSlice" :currentTab="'EUR'" />
      </template>
      <template #sgd>
        <rateInfo :chartData="sgdChartData" :sliceData="sgdRateSlice" :currentTab="'SGD'" />
      </template>
    </UTabs>
  </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { TabsItem } from '@nuxt/ui';
import type { rate } from '#types/index';
import type { rateChartResponse } from '#types/index';
type arrayRateData = { regDate: Date; value: String };
type chartData = { data: rateChartResponse[] }[];
let rateIdx;
let currentTab = ref('USD');

const items: TabsItem[] = [{
  label: 'USD/KRW',
  slot: 'usd',
  value: 'USD'
}, {
  label: 'JPY/KRW',
  slot: 'jpy',
  value: 'JPY'
}, {
  label: 'EUR/KRW',
  slot: 'eur',
  value: 'EUR'
}, {
  label: 'SGD/KRW',
  slot: 'sgd',
  value: 'SGD'
}];

const sliceFunction = (data: arrayRateData[]) => {
  const sliceArray = [];
  sliceArray.push(data.slice(0, 20));
  sliceArray.push(data.slice(20, 40));
  sliceArray.push(data.slice(40, 60));
  sliceArray.push(data.slice(60, 80));
  sliceArray.push(data.slice(80, 100));

  return sliceArray;
}

const { data: rateData } = await useAsyncData<rate[]>(`rate-${rateIdx}`, () => $fetch(`/api/rate?${rateIdx ? "rateIdx=" + rateIdx : ""}`));
const usdRateData: arrayRateData[] = rateData.value?.map(r => ({ 'regDate': r.reg_date, 'value': r.usd_rate?.toString() || '0' })) || [];
const jpyRateData: arrayRateData[] = rateData.value?.map(r => ({ 'regDate': r.reg_date, 'value': r.jpy_rate?.toString() || '0' })) || [];
const eurRateData: arrayRateData[] = rateData.value?.map(r => ({ 'regDate': r.reg_date, 'value': r.eur_rate?.toString() || '0' })) || [];
const sgdRateData: arrayRateData[] = rateData.value?.map(r => ({ 'regDate': r.reg_date, 'value': r.sgd_rate?.toString() || '0' })) || [];

const usdRateSlice = sliceFunction(usdRateData);
const jpyRateSlice = sliceFunction(jpyRateData);
const eurRateSlice = sliceFunction(eurRateData);
const sgdRateSlice = sliceFunction(sgdRateData);

const { data: usdChartResponse } = await useFetch<rateChartResponse[]>('/api/rate/USD');
const { data: jpyChartResponse } = await useFetch<rateChartResponse[]>('/api/rate/JPY');
const { data: eurChartResponse } = await useFetch<rateChartResponse[]>('/api/rate/EUR');
const { data: sgdChartResponse } = await useFetch<rateChartResponse[]>('/api/rate/SGD');

const usdChartData: chartData = [{
  data: usdChartResponse.value || []
}];

const jpyChartData: chartData = [{
  data: jpyChartResponse.value || []
}];

const eurChartData: chartData = [{
  data: eurChartResponse.value || []
}];

const sgdChartData: chartData = [{
  data: sgdChartResponse.value || []
}];

</script>
