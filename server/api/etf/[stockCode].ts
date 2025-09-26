import prisma from '@@/lib/prisma';
import { etfStockCodeResponse } from '@@/types'

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
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

    returnData.stockInfo = await prisma.$queryRaw<any[]>`select * from stock_price_info where etfStockCode = ${stockCode}`;


    return returnData;
  } else {
    setResponseStatus(event, 405);
  }
});