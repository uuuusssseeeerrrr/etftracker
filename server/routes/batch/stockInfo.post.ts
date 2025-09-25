import dayjs from 'dayjs';
import { getKisAccessToken, getKisInfoApiData } from './kisApi';
import prisma from '@@/lib/prisma';

export default defineEventHandler(async (event) => {
  // 접근토큰 체크(미들웨어가 늦게 실행되서 먼저 실행)
  const authToken = getHeader(event, 'Authorization')?.substring(6).trim();
  const { batchToken } = useRuntimeConfig();

  // ETF 신규데이터 기타정보 가져오기
  if (authToken && authToken === batchToken) { // 접근토큰 체크(미들웨어가 늦게 실행되서 먼저 실행)
    let dataListArray = await prisma.etfList.findMany({
      where: {
        OR: [
          { std_pdno: null },
          { std_pdno: "" }
        ],
      }
    });

    // 데이터가 있어야만 실행
    if (dataListArray && dataListArray.length > 0) {
      const accessToken = await getKisAccessToken();

      for (let i = 0; i < dataListArray.length; i++) {
        const stockObj = dataListArray[i];
        const stockDataObj = await getKisInfoApiData(stockObj.market, stockObj.stock_code, accessToken);

        await prisma.etfList.update({
          where: { stockCode: stockObj.stock_code },
          data: {
            stdPdno: stockDataObj.std_pdno,
            tradingLot: stockDataObj.buy_unit_qty,
            modDate: dayjs().toDate()
          }
        });
      }
    }

    let stockListArray = await prisma.stockList.findMany({
      where: {
        OR: [
          { std_pdno: null },
          { std_pdno: "" }
        ],
      }
    });

    if (stockListArray && stockListArray.length > 0) {
      const accessToken = await getKisAccessToken();

      for (let i = 0; i < stockListArray.length; i++) {
        const stockObj = stockListArray[i];
        const stockDataObj = await getKisInfoApiData(stockObj.market, stockObj.stock_code, accessToken);

        await prisma.stockList.update({
          where: { stockCode: stockObj.stock_code },
          data: {
            stdPdno: stockDataObj.std_pdno,
            trCrcyCd: stockDataObj.tr_crcy_cd,
            buyUnitQty: stockDataObj.buy_unit_qty,
            prdtName: stockDataObj.prdt_name.indexOf(']') > -1 ? stockDataObj.prdt_name.split(']')[1] : stockDataObj.prdt_name,
            modDate: dayjs().toDate()
          }
        });
      }
    }

    return { msg: "정상적으로 작업되었습니다" };
  } else {
    setResponseStatus(event, 401);
    return { msg: "인증값이 올바르지 않습니다" };
  }
});