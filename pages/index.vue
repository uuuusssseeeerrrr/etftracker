<template>
  <div>
    <v-container>
      <v-form>
        <v-row>
          <v-col>
            <v-select label="거래소" :items="exchangeList" item-text="name" item-value="value"
              v-on:change="searchSubject"></v-select>
          </v-col>
          <v-col>
            <v-btn color="success" style="width: 100px; height:33px;">
              조회
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select label="종목"></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'unhead'

// :items="subjectArray" item-text="stockNm" item-value="stockCode"
const exchangeList = [
  { name: "도쿄증권거래소(JAPAN)", value: "TSE" },
  { name: "나스닥(USA)", value: "NASDAQ" },
];

useHead({
  title: 'Index'
});

const searchSubject = function (e: any) {
  console.log(e);
}
</script>