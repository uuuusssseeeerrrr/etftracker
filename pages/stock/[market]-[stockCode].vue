<template>
    <article>
      <section>
        <div class="text-xl mt-3 mb-3 bol font-semibold">종목 정보</div>
        <div>
          <table>
            <colgroup>
              <col style="width:250px;"/>
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td class="mr-3">마켓</td>
                <td>{{ stockInfo.market }}</td>
              </tr>
              <tr>
                <td class="mr-3">종목코드</td>
                <td>{{ stockInfo.stockCode }}</td>
              </tr>
              <tr>
                <td class="mr-3">종목명(한글)</td>
                <td>{{ stockInfo.prdtName }}</td>
              </tr>
              <tr>
                <td class="mr-3">종목명</td>
                <td>{{ stockInfo.stockName }}</td>
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
                <td>{{ stockInfo.stockComment }}</td>
              </tr>
              <tr>
                <td class="mr-3">종목 상세(외부페이지)</td>
                <td>
                  <!-- 이거버튼안먹음 -->
                  <UButton :href="outerLink" target="_blank" label="바로가기"/>
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
          <USelectMenu v-model="selectedStockColumns" :options="stockColumns" multiple placeholder="Columns" class="w-44"/>
        </div>
        <UTable 
          :loading="pending"
          :columns="selectedStockColumns"
          :rows="stockPriceHistory"
          :ui="{
            tr:{
              base: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }
          }">
        </UTable>
      </section>
      <section class="mt-6">
        <div class="text-xl mt-3 font-semibold">etf 비중 표</div>
        <div class="text-base mb-4">※ 서버내 저장된 해당종목의 ETF 비중 테이블입니다.</div>
        <div class="mb-5">
          <USelectMenu v-model="selectedWeightColumns" :options="weightColumns" multiple placeholder="Columns" class="w-44"/>
        </div>
        <UTable 
          :loading="pending"
          :columns="selectedWeightColumns"
          :rows="etfWeight"
          :ui="{
            tr:{
              base: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }
          }">
        </UTable>
      </section>
    </article>
  </template>
  
  <script setup lang="ts">
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
    key: 'etfCode',
    label: 'ETF코드'
  }, {
    key: 'etfName',
    label: 'ETF명'
  }, {
    key: 'stockCode',
    label: '종목코드'
  }, {
    key: 'prdtName',
    label: '종목명'
  }, {
    key: 'stockNm',
    label: '종목명(ENG)'
  }, {
    key: 'price',
    label: '현재가'
  }, {
    key: 'tXprc',
    label: '현재가(KRW)'
  }, {
    key: 'tXrat',
    label: '전일대비'
  }, {
    key: 'etfWeight',
    label: 'ETF내 비중'
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
    key: 'regDate',
    label: '최종 업데이트시간'
  }];
  
  const route = useRoute();
  const { pending, data: stockData } = await useAsyncData('stockData', () => $fetch(`/api/stock/${route.params.market}/${route.params.stockCode}`));
  console.log(stockData);

  const stockInfo: gIStockList | null | undefined = stockData.value?.stockInfo as unknown as gIStockList;
  const stockPriceHistory: gIStockPriceHistory[] | undefined = stockData.value?.stockPriceHistory;
  const etfWeight: gIStockWeightInfo[] | undefined = stockData.value?.etfWeight;

  const stockRefColumns = ref([...stockColumns])
  const selectedStockColumns = computed(() => stockColumns.filter((stockColumns) => stockRefColumns.value.includes(stockColumns)))

  const weightRefColumns = ref([...weightColumns])
  const selectedWeightColumns = computed(() => weightColumns.filter((weightColumns) => weightRefColumns.value.includes(weightColumns)))
    
  const outerLink = computed(() => {
    console.log(route.params.market);
    switch(route.params.market) {
      case "TSE":
      case "tse":
        return `https://finance.yahoo.com/quote/${route.params.stockCode}.T`;
    }
  });
  </script>