<template>
  <section>
    <div class="m-5">
      <span>참고 : 장이 열리기 전인 경우 모든페이지 내 가격데이터가 표시되지 않을 수 있습니다</span>
      <br/>
      <span>가격내 통화가 표시되지 않은 경우 현지통화입니다</span>
      <br/>
      <span>거래소의 경우 API 조회 기준입니다</span>
      <br/>
      <span v-if="data !== undefined && data.length > 0">조회시간 : {{ data[0].regDate ? data[0].regDate : (data[1].regDate ? data[0].regDate : '데이터가 수집되는 시간이 아닙니다') }}</span>
    </div>
    <div>
      <UTable :columns="columns" :data="data" :ui="{
        base: 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 text-center whitespace-pre-line',
        th: 'text-center'
      }" @select="selectRow">
      </UTable>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui';

const UButton = resolveComponent('UButton');
const { data } = await useAsyncData<any[]>('etfData', () => $fetch('/api/etf'));
const router = useRouter();
const selectRow = (_: any, row: TableRow<any>) => {
  router.push(`/etf/stockCode/${row.getValue('etfStockCode')}`);
}

const columns: TableColumn<any>[] = [{
  accessorKey: 'marketCode',
  header: '거래소'
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
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
    })
  }
}, {
  accessorKey: 'etfName',
  header: 'ETF명',
  meta: {
    class: {
      td: 'text-left'
    }
  }
}, {
  accessorKey: 'companyName',
  header: '회사명',
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
  header: '현재가\n(KRW)'
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
  accessorKey: 'h52p',
  header: '52주\n최고가'
}, {
  accessorKey: 'l52p',
  header: '52주\n최저가'
}, {
  accessorKey: 'lastDayPrice',
  header: '전일\n종가'
}];
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>