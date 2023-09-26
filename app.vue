<template>
    <div style="text-align: center;">
        <h2>
            etfStockFinder!!
        </h2>
        <div style="margin-top: 30px;">
            <div>
                <select @change="searchSubject">
                    <option v-for="{ n, v } in exchangeList" :key="v" :value="v">{{ n }}</option>
                </select>

                <select>
                    <option v-for="{ stockNm, stockCode } in exchangeStockList" :key="stockCode" :value="stockCode">{{
                        stockNm }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useHead } from 'unhead'
import { ref } from 'vue';

useHead({
    titleTemplate: "etfTracker"
});

const exchangeList = [
    { n: "도쿄증권거래소(JAPAN)", v: "TSE" },
    { n: "나스닥(USA)", v: "NASDAQ" },
];

// async function searchSubject() {

// }
</script>

<script>

const exchangeStockArray = new Map();

const searchSubject = async function (e) {
    const stockCode = e.target.value;

    if (!exchangeStockArray.has(stockCode)) {
        const stockArray = await $fetch(`/api/etf?market=${stockCode}`);
        exchangeStockArray.set(stockCode, stockArray);
    }

    const exchangeStockList = ref(exchangeStockArray.get(stockCode) || []);
}
</script>