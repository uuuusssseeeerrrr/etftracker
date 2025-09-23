<template>
  <section>
    <div class="m-5">
      <span>참고 : 장이 열리기 전인 경우 모든페이지 내 가격데이터가 표시되지 않을 수 있습니다</span>
      <p></p>
      <span>가격내 통화가 표시되지 않은 경우 현지통화입니다</span>
    </div>
    <div>
      <UTable :columns="columns" :data="data" :ui="{
        base: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }" @select="selectRow">
      </UTable>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import type { etfPriceHistoryAttributes } from '../../models/etfPriceHistory';
const UButton = resolveComponent('UButton');
const { data } = await useAsyncData<etfPriceHistoryAttributes[]>('etfData', () => $fetch('/api/etf'));
const router = useRouter();
const selectRow = (row: any) => {
  router.push(`/etf/stockCode/${row.etfStockCode}`);
}

const columns: TableColumn<etfPriceHistoryAttributes>[] = [{
  accessorKey: 'marketCode',
  header: '국가'
}, {
  accessorKey: 'etfStockCode',
  header: ({ column }) => {
    const isSorted = column.getIsSorted();

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
      onClick: (rowA: etfPriceHistoryAttributes, rowB: etfPriceHistoryAttributes) => {
        return isSorted === "asc" ? Number(rowA.stockCode < rowB.stockCode) ? 1 : -1 : rowA.stockCode > rowB.stockCode ? 1 : -1;
      }
    })
  }
}, {
  accessorKey: 'etfName',
  header: 'ETF명'
}, {
  accessorKey: 'companyName',
  header: '회사명'
}, {
  accessorKey: 'price',
  header: '현재가'
}, {
  accessorKey: 'tXprc',
  header: '현재가(KRW)'
}, {
  accessorKey: 'tXrat',
  header: ({ column }) => {
    const isSorted = column.getIsSorted();

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
      onClick: (rowA: etfPriceHistoryAttributes, rowB: etfPriceHistoryAttributes) => {
        if (isSorted === "asc") {
          return Number(rowA.tXrat?.replace('%', '')) > Number(rowB.tXrat?.replace('%', '')) ? 1 : -1;
        } else {
          return Number(rowA.tXrat?.replace('%', '')) > Number(rowB.tXrat?.replace('%', '')) ? -1 : 1;
        }
      }
    })
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
  accessorKey: 'regDate',
  header: '마지막 조회시간'
}];
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>