<template>
    <div style="text-align: center;">
        <h2>
            etfStockFinder!!
        </h2>
        <div style="margin-top: 30px;">
            <v-container>
                <v-form>
                    <v-row>
                        <v-col>
                            <v-select v-model="exchangeSelectValue" label="거래소" :items="exchangeList" item-title="n"
                                item-value="v"></v-select> </v-col>
                        <v-col>
                            <v-btn color="success" style="width: 100px; height:33px;">
                                조회
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select v-model="exchangeStockSelectValue" label="종목" :items="exchangeStockList"
                                item-title="stockNm" item-value="stockCode"></v-select>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useHead } from 'unhead'
import { watch, ref } from 'vue';

useHead({
    titleTemplate: "etfTracker"
});

const exchangeList = [
    { n: "도쿄증권거래소(JAPAN)", v: "TSE" },
    { n: "나스닥(USA)", v: "NASDAQ" },
];

interface stockObj {
    stockNm: string;
    stockCode: string;
}

const exchangeStockArray = new Map<string, stockObj[]>();
const exchangeSelectValue = ref('');
let exchangeStockSelectValue: string;
let exchangeStockList: stockObj[] = [];

watch(exchangeSelectValue, async (newValue) => {
    console.log(newValue);

    if (!exchangeStockArray.has(newValue)) {
        const stockArray: stockObj[] = await $fetch(`/api/etf?market=${newValue}`);
        exchangeStockArray.set(newValue, stockArray);
    }

    exchangeStockList = [];

    exchangeStockArray.get(newValue)!.forEach((stockObj) => {
        exchangeStockList.push({
            stockCode: stockObj.stockCode,
            stockNm: stockObj.stockNm
        });
    })

    exchangeStockSelectValue = exchangeStockList[0].stockCode;
    console.log(exchangeStockList);
});
</script>
