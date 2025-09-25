import prisma from '@@/lib/prisma';

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'GET') {
    const stockCode = getRouterParam(event, 'stockCode');
    const returnData = {
      etfInfo: undefined,
      stockInfo: undefined
    };

    returnData.etfInfo = await prisma.etfList.findFirst({
      where: {
        stockCode
      }
    });

    returnData.stockInfo = await prisma.$queryRaw`select * from stock_price_info where etfStockCode = ${stockCode}`;


    return returnData;
  } else {
    setResponseStatus(event, 405);
  }
});