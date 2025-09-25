import dayjs from 'dayjs';
import prisma from '@@/lib/prisma';

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug;
  const market: string = slug?.split("/")[0].toUpperCase() as string;
  const stockCode: string = slug?.split("/")[1] as string;
  let stockData = {
    stockInfo: null,
    stockPriceHistory: null,
    weightInfo: null
  };

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
        gte: dayjs().add(9, 'hour').subtract(3, 'day').toDate(),
        lte: dayjs().add(9, 'hour').toDate()
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
      etf_list: {
        etfName: true,
        companyName: true,
        tradingLot: true,
        trustFeeRate: true,
        stdPdno: true,
      }
    },
    where: {
      market,
      stockCode
    }
  });

  return stockData;
});
