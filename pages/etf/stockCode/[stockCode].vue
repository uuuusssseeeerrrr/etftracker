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
          <tbody>
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
            <div class="mb-5">
              <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" class="w-44" />
            </div>
            <UTable :loading="pending" :columns="columnsTable" :rows="etfStockData" :ui="{
                tr:{
                  base: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }
              }" @select="selectRow">
            </UTable>
          </UCard>
        </template>
        <template #treeMap>
          <UCard>
            <apexchart type="treemap" :options="chartOptions" :series="chartData" @animationEnd="hiddenLoading"/>
            <div class="loader" ref="loader"></div>
          </UCard>
        </template>
      </UTabs>
    </section>
  </article>
</template>

<script setup lang="ts">
const items = [{
  label: '종목별 정보',
  slot: 'stock'
}, {
  label: '등락 맵',
  slot: 'treeMap'
}];

const columns = [{
  key: 'stockCode',
  label: '종목코드',
  sortable: true
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
  label: '전일대비',
  sortable: true,
  sort
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
  label: 'ETF 비중',
  sortable: true,
  sort
}, {
  key: 'buyUnitQty',
  label: '거래단위'
}, {
  key: 'regDate',
  label: '조회시간'
}];

const route = useRoute();
const router = useRouter();
const { pending, data: stockData } = await useAsyncData('stockData', () => $fetch(`/api/etf/${route.params.stockCode}`));
const etfInfo: any = stockData.value?.etfInfo;

// 종목별정보 탭
const etfStockData: any | undefined = stockData.value?.stockInfo;
const selectedColumns = ref([...columns]);
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)));

const selectRow = (row: any) => {
  if(row.marketCode === 'TSE') {
    router.push(`/stock/${row.marketCode}-${row.stockCode}`);
  }
}

function sort (a:string, b:string, direction:"asc" | "desc") {
  if (direction === "asc") {
    return Number(a.replace('%', '')) > Number(b.replace('%', '')) ? 1 : -1;
  } else if (direction === "desc") {
    return Number(a.replace('%', '')) > Number(b.replace('%', '')) ? -1 : 1;
  }
}

// 등락 맵
const loader = ref();
const chartData: any = [{ data: [] }];
const plusColorMap: string[][] = [
  ['#808080','#838a86','#86958c','#889f92','#8baa98','#8eb49f','#91bfa5','#93c9ab','#96d4b1','#99deb7'],
  ['#99deb7','#8dd6ab','#81cea0','#76c694','#6abe89','#5eb67d','#52ae72','#47a666','#3b9e5b','#2f964f'],
  ['#2f964f','#30a152','#30ac55','#31b658','#31c15b','#32cc5e','#32d761','#33e164','#33ec67','#34f76a']
];
const minusColorMap: string[][] = [
  ['#808080','#8c7e7e','#997c7d','#a5797b','#b27779','#be7578','#cb7376','#d77074','#e46e73','#f06c71'],
  ['#f06c71','#ec666b','#e76065','#e3595f','#df5359','#da4d52','#d6474c','#d24046','#cd3a40','#c9343a'],
  ['#cd373c','#d13136','#d52b2f','#d92529','#dd1f22','#e21a1c','#e61415','#ea0e0f','#ee0808','#f20202']
];
const chartOptions = {
  chart : {
    background: '#808080', 
    width: '100%'
  },
  stroke: { curve: "smooth", width: 2, colors:['#000000'] },
  dataLabels: {
    style: {
      fontSize: '16px',
      fontWeight: '600'
    }
  },
  tooltip: {
    custom: function({series, seriesIndex, dataPointIndex, w} : any) {
      const data = w.config.series[seriesIndex].data[dataPointIndex];
      return `
        <div class="m-2 text-base">
          <div>종목 : ${data.x}</div>
          <div>등락 : ${data.tXrat || 0}</div>
          <div>비중 : ${data.y}%</div>
        </div>
      `;
    }
  },
  legend: {
    show: false,
  }
};

for (const gIEtfObj of etfStockData) {
  let tXrat: number = Number(String(gIEtfObj.tXrat || '0').replace('%', ''));
  let fillColor: string = "";
  if (tXrat > 0) {
    console.log(tXrat);
    fillColor = (tXrat >= 3) ? plusColorMap[2][9] : plusColorMap[Math.floor(tXrat)][Math.floor(tXrat * 10) % 10];
  } else if (tXrat < 0) {
    fillColor = (tXrat <= -3) ? minusColorMap[2][9] : minusColorMap[Math.abs(Math.ceil(tXrat))][Math.floor(Math.abs(tXrat) * 10) % 10];
  } else {
    fillColor = 'rgb(65,69,84)';
  }

  chartData[0].data.push({
    x: gIEtfObj.prdtName,
    y : Number(String(gIEtfObj.etfPercent).replace('%', '')),
    tXrat : gIEtfObj.tXrat,
    fillColor
  });
}

const hiddenLoading = () => {
  loader.value.style.display = "none";
}

</script>

<style scoped>
.loader {
  width: 200px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
  margin: 0 auto;
}
@keyframes l3 {to{transform: rotate(1turn)}}
</style>
