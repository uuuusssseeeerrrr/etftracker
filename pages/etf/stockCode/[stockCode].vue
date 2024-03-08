<template>
  <article>
    <section>
      <div class="text-xl mt-3 mb-3 bol font-semibold">ETF 정보</div>
      <div>
        <table>
          <colgroup>
            <col style="width:110px;"/>
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td class="mr-3">마켓</td>
              <td>{{ etfInfo.market }}</td>
            </tr>
            <tr>
              <td class="mr-3">ETF 코드</td>
              <td>{{ etfInfo.stockCode }}</td>
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
          </tbody>
        </table>
      </div>
    </section>
    <section class="mt-6">
      <div class="text-xl mt-3 font-semibold">ETF 종목별 정보</div>
      <div class="text-base mb-4">※ 하단 테이블 종목 클릭시 종목상세 외부페이지로 이동합니다</div>
      <div class="mb-5">
        <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" class="w-44"/>
      </div>
      <UTable 
        :loading="pending"
        :columns="columnsTable"
        :rows="rowData"
        :ui="{
          tr:{
            base: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'
          }
        }"
        @select="selectRow"
        >
      </UTable>
    </section>
  </article>
</template>

<script setup lang="ts">
const columns = [{
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

const route = useRoute();
const router = useRouter();
const { pending, data: stockData } = await useAsyncData('stockData', () => $fetch(`/api/etf/${route.params.stockCode}`));
const rowData: gIEtfList | undefined = stockData.value?.stockInfo as unknown as gIEtfList;
const etfInfo: any = stockData.value?.etfInfo;
const selectedColumns = ref([...columns])
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

const selectRow = (row: any) => {
  if(row.marketCode === 'TSE') {
    router.push(`/stock/${row.marketCode}-${row.stockCode}`);
  }
}
</script>