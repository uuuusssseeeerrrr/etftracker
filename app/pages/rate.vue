<template>
  <h2 class="mt-[20px] text-xl">환율 정보입니다</h2>
  <p>환율 정보는 1시간단위로 업데이트됩니다.</p>
  <p v-if="rateData !== undefined">최근 조회시간 :
    {{ dayjs(rateData[0]?.reg_date).subtract(9, 'hour').format('YYYY년 MM월 DD일 HH시 mm분') }}
  </p>

  <section class="mt-[20px]">
    <UTabs :items="items" v-model="currentTab">
      <template #usd>
        <ClientOnly>
          <apexchart type="candlestick" height="350" :options="chartOption" :series="usdChartData"></apexchart>
        </ClientOnly>
        <template v-for="sliceObj in usdRateSlice">
          <UTable :data="sliceObj" :columns="columns" class="w-[365px] ml-[10px] float-left mt-[20px]" />
        </template>
      </template>
      <template #jpy>
        <ClientOnly>
          <apexchart type="candlestick" height="350" :options="chartOption" :series="jpyChartData"></apexchart>
        </ClientOnly>
        <template v-for="sliceObj in jpyRateSlice">
          <UTable :data="sliceObj" :columns="columns" class="w-[365px] ml-[10px] float-left mt-[20px]" />
        </template>
      </template>
      <template #eur>
        <ClientOnly>
          <apexchart type="candlestick" height="350" :options="chartOption" :series="eurChartData"></apexchart>
        </ClientOnly>
        <template v-for="sliceObj in eurRateSlice">
          <UTable :data="sliceObj" :columns="columns" class="w-[365px] ml-[10px] float-left mt-[20px]" />
        </template>
      </template>
      <template #sgd>
        <ClientOnly>
          <apexchart type="candlestick" height="350" :options="chartOption" :series="sgdChartData"></apexchart>
        </ClientOnly>
        <template v-for="sliceObj in sgdRateSlice">
          <UTable :data="sliceObj" :columns="columns" class="w-[365px] ml-[10px] float-left mt-[20px]" />
        </template>
      </template>
    </UTabs>
  </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { TableColumn, TabsItem } from '@nuxt/ui';
import type { rate } from '#types/index';
import type { rateChartResponse } from '#types/index';
import { padRate } from './lib/numberFn';
type arrayRateData = { regDate: Date; value: String };
type rateChartDataContainer = { data: rateChartResponse[] };
type chartData = rateChartDataContainer[];
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

const columns: TableColumn<arrayRateData>[] = [
  {
    accessorKey: 'regDate',
    header: '조회시간',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
    accessorFn: (row) => dayjs(row.regDate).subtract(9, 'hour').format('YYYY년 MM월 DD일 HH시')
  },
  {
    accessorKey: 'value',
    header: '환율',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    }
  }
];

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

const chartOption = computed(() => {
  return {
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: {
        show: false
      }
    },
    xaxis: {
      labels: {
        show: true,
        formatter: (value: string) => {
          return dayjs(value).subtract(9, 'hour').format('YYYY-MM-DD');
        }
      }
    },
    tooltip: {
      enabled: true,
      custom: ({ seriesIndex, dataPointIndex, w }: any) => {
        const data = w.config.series[seriesIndex].data[dataPointIndex];
        return `
          <style>
          .custom-tooltip-box {
            width: 200px;
            height: 130px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px;
            box-sizing: border-box;
            border-radius: 4px;
            font-size: 12px;
            line-height: 1.4;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        </style>
        <div class="apexcharts-tooltip-custom">
          <div class="custom-tooltip-box">
            <p style="margin: 4px 0 0 0;">조회일 : ${dayjs(data.x).subtract(9, 'hour').format('YYYY-MM-DD')}</p>
            <p style="margin: 4px 0 0 0;">시작가격 : ${padRate(data.y[0], currentTab.value)}</p>
            <p style="margin: 4px 0 0 0;">높은가격 : ${padRate(data.y[1], currentTab.value)}</p>
            <p style="margin: 4px 0 0 0;">낮은가격 : ${padRate(data.y[2], currentTab.value)}</p>
            <p style="margin: 4px 0 0 0;">마지막가격 : ${padRate(data.y[3], currentTab.value)}</p>
          </div>
        </div>
        `;
      }
    }
  }
});



</script>
