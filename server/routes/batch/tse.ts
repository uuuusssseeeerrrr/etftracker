import dayjs from 'dayjs';
import { getKisApiData } from './kisApi';
import { runStockBatch } from '@@/types'
import prisma from '@@/lib/prisma';

const market = "TSE";

// ETF 가격 입력 함수
export const runJpEtfBatch: runStockBatch = async (accessToken: string) => {
  const dateObj = dayjs().add(9, 'hour');
  const etfStockListArray = await prisma.etfList.findMany({
    where: {
      market
    }
  });
  const stockPriceArr = [];

  for (let stockObj of etfStockListArray.length) {
    const stockDataObj = await getKisApiData(market, stockObj.dataValues.stockCode, accessToken);

    stockPriceArr.push({
      market,
      stockCode: stockObj.stockCode,
      open: stockDataObj.open,
      high: stockDataObj.high,
      low: stockDataObj.low,
      price: stockDataObj.last,
      lastDayPrice: stockDataObj.base,
      h52P: stockDataObj.h52p,
      l52P: stockDataObj.l52p,
      tXprc: stockDataObj.t_xprc,
      tXdif: stockDataObj.t_xdif,
      tXrat: stockDataObj.t_xrat,
      tRate: stockDataObj.t_rate,
      regDate: dateObj.toDate()
    });
  }

  await prisma.etfPriceHistory.createMany({
    data: etfStockListArray
  });

  return true;
}

// 주식 가격 입력 함수
export const runJpStockBatch: runStockBatch = async (accessToken: string) => {
  const dateObj = dayjs().add(9, 'hour');
  const stockListArray = await prisma.stockList.findMany({
    where: {
      market
    }
  });
  const stockPriceArr = [];

  for (let stockObj of stockListArray.length) {
    const stockDataObj = await getKisApiData(market, stockObj.dataValues.stockCode, accessToken);

    stockPriceArr.push({
      market,
      stockCode: stockObj.stockCode,
      open: stockDataObj.open,
      high: stockDataObj.high,
      low: stockDataObj.low,
      price: stockDataObj.last,
      lastDayPrice: stockDataObj.base,
      tomv: stockDataObj.tomv,
      h52P: stockDataObj.h52p,
      l52P: stockDataObj.l52p,
      perx: stockDataObj.perx,
      pbrx: stockDataObj.pbrx,
      epsx: stockDataObj.epsx,
      bpsx: stockDataObj.bpsx,
      tXprc: stockDataObj.t_xprc,
      tXdif: stockDataObj.t_xdif,
      tXrat: stockDataObj.t_xrat,
      tRate: stockDataObj.t_rate,
      eIcod: stockDataObj.e_icod,
      regDate: dateObj.toDate()
    });
  }

  await prisma.stockPriceHistory.createMany({
    data: stockPriceArr
  });
  return true;
}
