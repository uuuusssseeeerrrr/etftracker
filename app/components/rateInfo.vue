<template>
  <ClientOnly>
    <apexchart type="candlestick" height="350" :options="chartOption" :series="chartData"></apexchart>
  </ClientOnly>
  <template v-for="sliceObj in sliceData">
    <UTable :data="sliceObj" :columns="columns" class="w-[365px] ml-[10px] float-left mt-[20px]" />
  </template>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { TableColumn } from '@nuxt/ui';
import type { rateChartResponse } from '#types/index';
import { padRate } from '../pages/lib/numberFn';

type arrayRateData = { regDate: Date; value: String };
const props = defineProps<{
  chartData: { data: rateChartResponse[] }[]
  sliceData: arrayRateData[][],
  currentTab: String
}>()

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
            <p style="margin: 4px 0 0 0;">시작가격 : ${padRate(data.y[0], props.currentTab)}</p>
            <p style="margin: 4px 0 0 0;">높은가격 : ${padRate(data.y[1], props.currentTab)}</p>
            <p style="margin: 4px 0 0 0;">낮은가격 : ${padRate(data.y[2], props.currentTab)}</p>
            <p style="margin: 4px 0 0 0;">마지막가격 : ${padRate(data.y[3], props.currentTab)}</p>
          </div>
        </div>
        `;
      }
    }
  }
});
</script>