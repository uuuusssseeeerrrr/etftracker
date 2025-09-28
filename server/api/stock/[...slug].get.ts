import dayjs from 'dayjs';
import prisma from '@@/lib/prisma';
import { stockSlugResponse } from '@@/types';

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;
  const market: string = slug?.split("/")[0].toUpperCase() as string;
  const stockCode: string = slug?.split("/")[1] as string;
  let stockData: stockSlugResponse = {
    stockInfo: null,
    stockPriceHistory: null,
    weightInfo: null
  };

  stockData.stockInfo = await prisma.stockList.findFirst({
    where: {
      stockCode
    }
  });
console.log(process.env.TZ);
console.log(dayjs());
  stockData.stockPriceHistory = await prisma.stockPriceHistory.findMany({
    where: {
      market,
      stockCode,
      regDate: {
        gte: dayjs().subtract(3, 'day').startOf('day').toDate(),
        lte: dayjs().endOf('day').toDate()
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
