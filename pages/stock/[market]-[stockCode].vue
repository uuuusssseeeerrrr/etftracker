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
          <tbody>
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
              <td class="mr-3">거래통화</td>
              <td>{{ stockInfo.trCrcyCd }}</td>
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
      <div class="mb-5">
        <USelectMenu v-model="stockRefColumns" :options="stockColumns" multiple placeholder="Columns"
          class="w-44" />
      </div>
      <UTable :loading="pending" :columns="selectedStockColumns" :rows="stockPriceHistory" :ui="{
              tr:{
                base: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }
            }">
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="text-sm">서버에서 수집된 데이터가 없습니다.</span>
          </div>
        </template>
      </UTable>
    </section>
    <section class="mt-6">
      <div class="text-xl mt-3 font-semibold">ETF 비중 테이블</div>
      <div class="text-base mb-4">※ 서버내 저장된 해당종목의 ETF 비중 테이블입니다.</div>
      <div class="mb-5">
        <USelectMenu v-model="weightRefColumns" :options="weightColumns" multiple placeholder="Columns"
          class="w-44" />
      </div>
      <UTable :loading="pending" 
        :columns="selectedWeightColumns" 
        :rows="etfWeight"
        :ui="{
                tr:{
                  base: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }
              }"
        @select="selectRow">
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="text-sm">서버에서 수집된 데이터가 없습니다.</span>
          </div>
        </template>
      </UTable>
    </section>
  </article>
</template>
  
<script setup lang="ts">
import type { gIStockList, gIStockPriceHistory, gIStockWeightInfo } from '~/types';

  const tabMenu = [{
    label: '주식가격',
    slot: 'stock'
  }, {
    label: 'etf 비중',
    slot: 'etf'
  }, {
    label: '차트',
    slot: 'treeMap'
  }];

  const stockColumns = [{
      key: 'price',
      label: '현재가'
  }, {
      key: 'tXprc',
      label: '현재가(KRW)'
  }, {
      key: 'tXrat',
      label: '전일대비'
  }, {
      key: 'open',
      label: '시가'
  }, {
      key: 'high',
      label: '고가'
  }, {
      key: 'low',
      label: '저가'
  }, {
      key: 'lastDayPrice',
      label: '전일종가'
  }, {
      key: 'h52p',
      label: '52주 최고가'
  }, {
      key: 'l52p',
      label: '52주 최저가'
  }, {
      key: 'perx',
      label: 'PER'
  }, {
      key: 'pbrx',
      label: 'PBR'
  }, {
      key: 'epsx',
      label: 'EPS'
  }, {
      key: 'bpsx',
      label: 'BPS'
  }, {
      key: 'etfPercent',
      label: 'ETF 비중'
  }, {
      key: 'buyUnitQty',
      label: '거래단위'
  }, {
      key: 'regDate',
      label: '최종 업데이트시간'
  }];

  const weightColumns = [{
    key: 'etfStockCode',
    label: 'ETF코드'
  }, {
    key: 'etfList.etfName',
    label: 'ETF명'
  }, {
    key: 'stockCode',
    label: '종목코드'
  }, {
    key: 'etfPercent',
    label: 'ETF 내 주식비중'
  }, {
    key: 'etfList.companyName',
    label: '운용사'
  }, {
    key: 'etfList.tradingLot',
    label: '거래단위'
  }, {
    key: 'etfList.trustFeeRate',
    label: '수수료'
  }];
  
  const route = useRoute();
  const router = useRouter();
  const { pending, data: stockData } = await useAsyncData('stockData', () => $fetch(`/api/stock/${route.params.market}/${route.params.stockCode}`));
  
  const stockInfo: gIStockList | null | undefined = stockData.value?.stockInfo as unknown as gIStockList;
  const stockPriceHistory: gIStockPriceHistory[] | undefined = stockData.value?.stockPriceHistory;
  const etfWeight: gIStockWeightInfo[] | undefined = stockData.value?.weightInfo;

  const stockRefColumns = ref([...stockColumns]);
  const selectedStockColumns = computed(() => stockColumns.filter((column) => stockRefColumns.value.includes(column)));

  const weightRefColumns = ref([...weightColumns]);
  const selectedWeightColumns = computed(() => weightColumns.filter((column) => weightRefColumns.value.includes(column)));

  const selectRow = (row: any) => {
    router.push(`/etf/stockCode/${row.etfStockCode}`);
  }
</script>