<template>
  <article>
    <section>
      <div class="text-xl mt-3 mb-3 bol font-semibold">종목 정보</div>
      <div>
        <table>
          <colgroup>
            <col style="width:250px;" />
            <col />
          </colgroup>
          <tbody v-if="stockInfo">
            <tr>
              <td class="mr-3">마켓</td>
              <template v-if="stockInfo.market === 'TSE'">
                <td>도쿄증권거래소({{ stockInfo.market }})</td>
              </template>
            </tr>
            <tr>
              <td class="mr-3">종목코드</td>
              <td>{{ stockInfo.stockCode }}</td>
            </tr>
            <tr>
              <td class="mr-3">표준상품번호</td>
              <td>{{ stockInfo.stdPdno }}</td>
            </tr>
            <tr>
              <td class="mr-3">종목명</td>
              <td>{{ stockInfo.stockName }}</td>
            </tr>
            <tr>
              <td class="mr-3">종목명(한글)</td>
              <td>{{ stockInfo.prdtName }}</td>
            </tr>
            <tr>
              <td class="mr-3">업종(섹터)</td>
              <td>{{ stockPriceHistory[0]?.eIcod || '수집된 자료가 없습니다.' }}</td>
            </tr>
            <tr>
              <td class="mr-3">거래통화</td>
              <td>{{ stockInfo.trCrcyCd }}</td>
            </tr>
            <tr>
              <td class="mr-3">시가총액</td>
              <td>{{ tomv || '수집된 자료가 없습니다.' }}</td>
            </tr>
            <tr>
              <td class="mr-3">매수단위수량</td>
              <td>{{ stockInfo.buyUnitQty }}</td>
            </tr>
            <tr>
              <td class="mr-3">종목 소개</td>
              <td>{{ stockInfo.stockComment || '종목소개가 없습니다.' }}</td>
            </tr>
            <tr>
              <td class="mr-3">종목 상세(외부페이지)</td>
              <td>
                <!-- 이거버튼안먹음 -->
                <template v-if="stockInfo.market === 'TSE'">
                  <UButton :to="`https://finance.yahoo.com/quote/${stockInfo.stockCode}.T`" target="_blank"
                    label="바로가기" />
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="mt-6">
      <div class="text-xl mt-3 font-semibold">주식 가격 테이블</div>
      <div class="text-base mb-4">※ 서버내 저장된 해당종목의 최근3일간의 등락현황을 나타낸 테이블입니다.</div>
      <UTable :columns="stockColumns" :data="stockPriceHistory" :ui="{
        base: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-center',
        th: 'text-center'
      }">
        <template>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="text-sm">서버에서 수집된 데이터가 없습니다.</span>
          </div>
        </template>
      </UTable>
    </section>
    <section class="mt-6">
      <div class="text-xl mt-3 font-semibold">ETF 비중 테이블</div>
      <div class="text-base mb-4">※ 서버내 저장된 해당종목의 ETF 비중 테이블입니다.</div>
      <UTable :columns="weightColumns" :data="etfWeight" :ui="{
        base: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 text-center',
        th: 'text-center'
      }" @select="selectRow">
        <template>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="text-sm">서버에서 수집된 데이터가 없습니다.</span>
          </div>
        </template>
      </UTable>
    </section>
  </article>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { TableColumn } from '@nuxt/ui';
import type { stockSlugResponse } from '#types/index';
import type { StockPriceHistory, EtfStockList } from '@prisma/client';
import { numberFormat, formatPercent } from '../lib/numberFn';

const stockColumns: TableColumn<StockPriceHistory>[] = [
  {
    accessorKey: 'regDate',
    header: '조회시간',
    cell: ({ row }) => {
      console.log(dayjs(row.getValue('regDate')))
      return h(
        'span',
        {},
        dayjs(row.getValue('regDate')).subtract(9, 'hour').format('YYYY-MM-DD HH:mm:ss')
      )
    },
  }, {
    accessorKey: 'price',
    header: '현재가',
    accessorFn: (row) => numberFormat(row.price)
  }, {
    accessorKey: 'tXprc',
    header: '현재가(KRW)',
    accessorFn: (row) => numberFormat(row.tXprc)
  }, {
    accessorKey: 'tXrat',
    header: '전일대비',
    cell: ({ row }) => {
      const tXrat: string = row.getValue('tXrat') + '%' || '';
      return h(
        'span',
        {
          class: Number(tXrat.replace('%', '')) > 0 ? 'text-green-500' : 'text-red-500'
        },
        tXrat
      )
    },
  }, {
    accessorKey: 'open',
    header: '시가',
    accessorFn: (row) => numberFormat(row.open)
  }, {
    accessorKey: 'high',
    header: '고가',
    accessorFn: (row) => numberFormat(row.high)
  }, {
    accessorKey: 'low',
    header: '저가',
    accessorFn: (row) => numberFormat(row.low)
  }, {
    accessorKey: 'lastDayPrice',
    header: '전일종가',
    accessorFn: (row) => numberFormat(row.lastDayPrice)
  }, {
    accessorKey: 'h52p',
    header: '52주 최고가',
    accessorFn: (row) => numberFormat(row.h52p)
  }, {
    accessorKey: 'l52p',
    header: '52주 최저가',
    accessorFn: (row) => numberFormat(row.l52p)
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
    accessorKey: 'tRate',
    header: '적용환율',
    accessorFn: (row) => (route.params.market === 'TSE') ? (Number(row.tRate) * 100).toFixed(2) : row.tRate
  }
];

const weightColumns: TableColumn<EtfStockList>[] = [{
  accessorKey: 'etfStockCode',
  header: 'ETF코드'
}, {
  accessorKey: 'etfList.etfName',
  header: 'ETF명',
  meta: {
    class: {
      td: 'text-left'
    }
  }
}, {
  accessorKey: 'stockCode',
  header: '종목코드'
}, {
  accessorKey: 'etfPercent',
  header: 'ETF 내 주식비중',
  accessorFn: (row) => formatPercent(row.etfPercent)
}, {
  accessorKey: 'etfList.companyName',
  header: '운용사',
  meta: {
    class: {
      td: 'text-left'
    }
  }
}, {
  accessorKey: 'etfList.tradingLot',
  header: '거래단위'
}, {
  accessorKey: 'etfList.trustFeeRate',
  header: '수수료'
}];

const route = useRoute();
const router = useRouter();
let tomv: string = "";
const { data: stockData } = await useAsyncData<stockSlugResponse>(`stockData-${route.params.stockCode}`, () => $fetch(`/api/stock/${route.params.market}/${route.params.stockCode}`));

const stockInfo = stockData.value?.stockInfo;
const stockPriceHistory = stockData.value?.stockPriceHistory || [];
const etfWeight = stockData.value?.weightInfo || [];

const selectRow = (_: any, row: any) => {
  router.push(`/etf/stockCode/${row.getValue('etfStockCode')}`);
}

for (const stockPriceObj of stockPriceHistory) {
  if (tomv.length === 0) {
    if (stockPriceObj.tomv && stockPriceObj.tomv.length > 12) {
      tomv = Math.floor(Number(stockPriceObj.tomv) / 1000000000000) + " 조엔";
    } else if (stockPriceObj.tomv && stockPriceObj.tomv.length > 8) {
      tomv = Math.floor(Number(stockPriceObj.tomv) / 100000000) + " 억엔";
    } else if (stockPriceObj.tomv && stockPriceObj.tomv.length > 8) {
      tomv = Math.floor(Number(stockPriceObj.tomv) / 10000) + " 만엔";
    }
  }
}
</script>