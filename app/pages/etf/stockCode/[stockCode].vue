<template>
  <article>
    <section>
      <div class="text-xl mt-3 mb-3 bol font-semibold">ETF 정보</div>
      <div>
        <table>
          <colgroup>
            <col style="width:150px;" />
            <col />
          </colgroup>
          <tbody v-if="etfInfo">
            <tr>
              <td class="mr-3">마켓</td>
              <template v-if="etfInfo.market === 'TSE'">
                <td>도쿄증권거래소({{ etfInfo.market }})</td>
              </template>
            </tr>
            <tr>
              <td class="mr-3">ETF 종목코드</td>
              <td>{{ etfInfo.stockCode }}</td>
            </tr>
            <tr>
              <td class="mr-3">ETF 표준상품번호</td>
              <td>{{ etfInfo.stdPdno }}</td>
            </tr>
            <tr>
              <td class="mr-3">ETF 명</td>
              <td>{{ etfInfo.etfName }}</td>
            </tr>
            <tr>
              <td class="mr-3">ETF 운용사</td>
              <td>{{ etfInfo.companyName }}</td>
            </tr>
            <tr>
              <td class="mr-3">벤치마크 인덱스</td>
              <td>{{ etfInfo.benchmarkIndex }}</td>
            </tr>
            <tr>
              <td class="mr-3">인덱스 소개</td>
              <td>{{ etfInfo.indexComment }}</td>
            </tr>
            <tr>
              <td class="mr-3">거래단위</td>
              <td>{{ etfInfo.tradingLot }}</td>
            </tr>
            <tr>
              <td class="mr-3">수수료</td>
              <td>{{ etfInfo.trustFeeRate }}</td>
            </tr>
            <tr>
              <td class="mr-3">주의사항</td>
              <td>
                <div class="text-base">일정퍼센트 이하의 종목은 종목명이 표시되지 않거나 데이터가 없을 수 있습니다</div>
                <div class="text-base">ETF비중은 정확히 자료가 고지되지 않거나 리밸런싱등의 이유로 실데이터와 상이할 수 있습니다</div>
                <div class="text-base">차트의 경우 컴퓨터 환경에 의해 다소 느릴수 있습니다</div>
              </td>
            </tr>
            <tr v-if="etfStockData !== undefined && etfStockData.length > 0 && etfStockData[0] !== undefined">
              <td class="mr-3">조회시간</td>
              <td>
                <div class="text-base">{{ etfStockData[0].regDate ? etfStockData[0].regDate : '데이터가 수집되는 시간이 아닙니다' }}
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td class="">etf 정보가 존재하지 않습니다</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="mt-6">
      <UTabs :items="items">
        <template #stock>
          <UCard>
            <div class="text-xl mt-3 font-semibold">ETF 종목별 정보</div>
            <div class="text-base mb-4">※ 하단 테이블 종목 클릭시 종목상세 외부페이지로 이동합니다</div>
            <UTable :columns="columns" :data="etfStockData" :ui="{
              tr: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 text-center',
              th: 'text-center'
            }" @select="selectRow">
            </UTable>
          </UCard>
        </template>
        <template #treeMap>
          <UCard>
            <ClientOnly>
              <apexchart type="treemap" :options="chartOptions" :series="chartData"/>
            </ClientOnly>
          </UCard>
        </template>
      </UTabs>
    </section>
  </article>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui';
import type { etfStockCodeResponse } from '#types/index';
import type { StockPriceHistory } from '@prisma/client';

const UButton = resolveComponent('UButton');

const items = [{
  label: '종목별 정보',
  slot: 'stock'
}, {
  label: '등락 맵',
  slot: 'treeMap'
}];

const columns: TableColumn<StockPriceHistory>[] = [{
  accessorKey: 'stockCode',
  header: ({ column }) => {
    const isSorted = column.getIsSorted()

    return h(UButton, {
      color: 'neutral',
      variant: 'ghost',
      label: '종목코드',
      icon: isSorted
        ? isSorted === 'asc'
          ? 'i-lucide-arrow-up-narrow-wide'
          : 'i-lucide-arrow-down-wide-narrow'
        : 'i-lucide-arrow-up-down',
      class: '-mx-2.5',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    })
  }
}, {
  accessorKey: 'prdtName',
  header: '종목명',
  meta: {
    class: {
      td: 'text-left'
    }
  }
}, {
  accessorKey: 'stockNm',
  header: '종목명(ENG)',
  meta: {
    class: {
      td: 'text-left'
    }
  }
}, {
  accessorKey: 'price',
  header: '현재가'
}, {
  accessorKey: 'tXprc',
  header: '현재가(KRW)'
}, {
  accessorKey: 'tXrat',
  header: ({ column }) => {
    const isSorted = column.getIsSorted()

    return h(UButton, {
      color: 'neutral',
      variant: 'ghost',
      label: '전일대비',
      icon: isSorted
        ? isSorted === 'asc'
          ? 'i-lucide-arrow-up-narrow-wide'
          : 'i-lucide-arrow-down-wide-narrow'
        : 'i-lucide-arrow-up-down',
      class: '-mx-2.5',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    })
  },
  cell: ({ row }) => {
    const tXrat: string = row.getValue('tXrat') || '';
    return h(
      'span',
      {
        class: Number(tXrat.replace('%', '')) > 0 ? 'text-green-500' : 'text-red-500'
      },
      tXrat
    )
  },
  sortingFn: (a, b) => {
    return Number(String(a.getValue('tXrat')).replace('%', '')) - Number(String(b.getValue('tXrat')).replace('%', ''));
  }
}, {
  accessorKey: 'open',
  header: '시가'
}, {
  accessorKey: 'high',
  header: '고가'
}, {
  accessorKey: 'low',
  header: '저가'
}, {
  accessorKey: 'lastDayPrice',
  header: '전일종가'
}, {
  accessorKey: 'h52p',
  header: '52주 최고가'
}, {
  accessorKey: 'l52p',
  header: '52주 최저가'
}, {
  accessorKey: 'perx',
  header: 'PER'
}, {
  accessorKey: 'pbrx',
  header: 'PBR'
}, {
  accessorKey: 'epsx',
  header: 'EPS'
}, {
  accessorKey: 'bpsx',
  header: 'BPS'
}, {
  accessorKey: 'etfPercent',
  header: ({ column }) => {
    const isSorted = column.getIsSorted()

    return h(UButton, {
      color: 'neutral',
      variant: 'ghost',
      label: 'ETF 비중',
      icon: isSorted
        ? isSorted === 'asc'
          ? 'i-lucide-arrow-up-narrow-wide'
          : 'i-lucide-arrow-down-wide-narrow'
        : 'i-lucide-arrow-up-down',
      class: '-mx-2.5',
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    })
  }
}, {
  accessorKey: 'buyUnitQty',
  header: '거래단위'
}];

const route = useRoute();
const router = useRouter();
const { data: stockData } = await useAsyncData<etfStockCodeResponse>('stockData', () => $fetch(`/api/etf/${route.params.stockCode}`));
const etfInfo = stockData.value?.etfInfo;

// 종목별정보 탭
const etfStockData = stockData.value?.stockInfo || [];

const selectRow = (_: any, row: TableRow<any>) => {
  if (etfInfo?.market === 'TSE') {
    router.push(`/stock/${etfInfo?.market}-${row.getValue('stockCode')}`);
  }
}

// 등락 맵
const loader = ref();
const chartData: any = [{ data: [] }];
const chartOptions = {
  chart: {
    background: '#808080',
    width: '100%'
  },
  stroke: { curve: "smooth", width: 2, colors: ['#000000'] },
  dataLabels: {
    style: {
      fontSize: '16px',
      fontWeight: '600'
    }
  },
  legend: {
    show: false,
  },
  tooltip: {
    enabled: true,
    custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
      const data = w.config.series[seriesIndex].data[dataPointIndex];
      return `
        <style>
        .custom-tooltip-box {
          width: 200px;
          height: 100px;
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
          <p style="margin: 4px 0 0 0;">종목명 : ${data.x}</p>
          <p style="margin: 4px 0 0 0;">등락율 : ${data.tXrat ? data.tXrat : ''}</p>
        </div>
      </div>
      `;
    }
  }
};

const plusColorMap: string[][] = [
  ['#808080', '#838a86', '#86958c', '#889f92', '#8baa98', '#8eb49f', '#91bfa5', '#93c9ab', '#96d4b1', '#99deb7'],
  ['#99deb7', '#8dd6ab', '#81cea0', '#76c694', '#6abe89', '#5eb67d', '#52ae72', '#47a666', '#3b9e5b', '#2f964f'],
  ['#2f964f', '#30a152', '#30ac55', '#31b658', '#31c15b', '#32cc5e', '#32d761', '#33e164', '#33ec67', '#34f76a']
];
const minusColorMap: string[][] = [
  ['#808080', '#8c7e7e', '#997c7d', '#a5797b', '#b27779', '#be7578', '#cb7376', '#d77074', '#e46e73', '#f06c71'],
  ['#f06c71', '#ec666b', '#e76065', '#e3595f', '#df5359', '#da4d52', '#d6474c', '#d24046', '#cd3a40', '#c9343a'],
  ['#cd373c', '#d13136', '#d52b2f', '#d92529', '#dd1f22', '#e21a1c', '#e61415', '#ea0e0f', '#ee0808', '#f20202']
];

for (const etfObj of etfStockData) {
  let tXrat = Number(String(etfObj.tXrat || '0').replace('%', ''));
  let fillColor;
  if (tXrat > 0) {
    fillColor = (tXrat >= 3) ? plusColorMap[2][9] : plusColorMap[Math.floor(tXrat)][Math.floor(tXrat * 10) % 10];
  } else if (tXrat < 0) {
    fillColor = (tXrat <= -3) ? minusColorMap[2][9] : minusColorMap[Math.abs(Math.ceil(tXrat))][Math.floor(Math.abs(tXrat) * 10) % 10];
  } else {
    fillColor = 'rgb(65,69,84)';
  }

  chartData[0].data.push({
    x: etfObj.prdtName,
    y: Number(String(etfObj.etfPercent).replace('%', '')),
    tXrat: etfObj.tXrat,
    fillColor
  });
}
</script>
