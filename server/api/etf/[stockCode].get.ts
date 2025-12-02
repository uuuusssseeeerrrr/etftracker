import prisma from '@@/lib/prisma';

import { etfStockCodeResponse } from '@@/types'

export default defineEventHandler(async (event) => {
  const stockCode = getRouterParam(event, 'stockCode');
  let returnData: etfStockCodeResponse = {
    etfInfo: null,
    stockInfo: null
  };

  returnData.etfInfo = await prisma.etfList.findFirst({
    where: {
      stockCode
    }
  });

  returnData.stockInfo = await prisma.stock_price_info.findMany({
    where : {
      etfStockCode: stockCode
    }
  });

  return returnData;
});