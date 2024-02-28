<template>
    <section>
        <UTable 
        :loading="pending"
        :columns="columns"
        :rows="etfData">
        </UTable>
    </section>
</template>

<script setup lang="ts">
const columns = [{
  key: 'marketCode',
  label: '국가'
}, {
  key: 'etfStockCode',
  label: '종목코드'
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
  key: 'tXrat',
  label: '전일대비'
}, {
  key: 'tXprc',
  label: '현재가(KRW)'
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
  label: '최종 업데이트시간'
}];

const { pending, data: etfData } = await useAsyncData('etfData', () => $fetch('/api/etf'));
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>