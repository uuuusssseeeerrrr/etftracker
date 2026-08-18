import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import prisma from '@@/lib/prisma';
import type { stockSlugResponse } from '@@/types';

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;
  const [marketSlug, stockCode] = slug?.split("/") ?? [];
  const market = marketSlug?.toUpperCase();

  if (!market || !stockCode) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid market/stockCode parameter'
    });
  }
  let stockData: stockSlugResponse = {
    stockInfo: null,
    stockPriceHistory: null,
    weightInfo: null
  };
  dayjs.extend(utc);

  stockData.stockInfo = await prisma.stockList.findFirst({
    where: {
      stockCode
    }
  });

  stockData.stockPriceHistory = await prisma.stockPriceHistory.findMany({
    where: {
      market,
      stockCode,
      regDate: {
        gte: dayjs().utc().subtract(3, 'day').startOf('day').format(),
        lte: dayjs().utc().endOf('day').format()
      }
    },
    orderBy: {
      regDate: 'desc'
    }
  });
  

  stockData.weightInfo = await prisma.etfStockList.findMany({
    select: {
      market: true,
      etfStockCode: true,
      checkDate: true,
      stockCode: true,
      etfPercent: true,
      etfList: true
    },
    where: {
      market,
      stockCode
    }
  });

  return stockData;
});
