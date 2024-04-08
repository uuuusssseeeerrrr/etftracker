<template>
    <section>
        <div class="m-5">
          <span>참고 : 장이 열리기 전인 경우 모든페이지 내 가격데이터가 표시되지 않을 수 있습니다</span><p></p>
          <span>가격내 통화가 표시되지 않은 경우 현지통화입니다</span>
        </div>
        <div class="mt-5 ml-5 mb-20">
          <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Columns" class="w-44 float-left"/>
          <UInput v-model="q" placeholder="ETF명을 입력하여 검색할수 있습니다(대소문자 구분X)" class="ml-3 w-1/3 float-left"/>
        </div>
        <div class="float-left">
          <UTable 
          :loading="pending"
          :columns="columnsTable"
          :rows="filteredRows"
          :ui="{
            tr:{
              base: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }
          }"
          @select="selectRow"
          >
          </UTable>
        </div>
    </section>
</template>

<script setup lang="ts">
const columns = [{
  key: 'marketCode',
  label: '국가'
}, {
  key: 'etfStockCode',
  label: '종목코드',
  sortable: true
}, {
  key: 'etfName',
  label: 'ETF명'
}, {
  key: 'companyName',
  label: '회사명'
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
  sort : (a:string, b:string, direction:"asc" | "desc") => {
    if(direction === "asc") {
      return Number(a.replace('%', '')) > Number(b.replace('%', '')) ? 1 : -1;
    } else if (direction === "desc") {
      return Number(a.replace('%', '')) > Number(b.replace('%', '')) ? -1 : 1;
    }
  }
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
  key: 'regDate',
  label: '마지막 조회시간'
}];

const { pending, data: etfData } = await useAsyncData('etfData', () => $fetch('/api/etf'));
const rowData = etfData.value as { [key: string]: any; }[];
const selectedColumns = ref([...columns])
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))
const router = useRouter();
const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return rowData;
  }

  return rowData.filter((inputObj) => {
    return Object.values(inputObj).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    })
  })
})

const selectRow = (row: any) => {
  router.push(`/etf/stockCode/${row.etfStockCode}`);
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}

</style>