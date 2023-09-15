// eslint-disable-next-line import/no-named-default
import { default as dayjs } from 'dayjs';

import models from '../../../models';
import { etfstocklist } from '../../../models/etfstocklist';
import { logger } from '../../../pino.config'

export const getJPStockData = async (allStockList: etfstocklist[]) => {
    const today = dayjs();

    if (allStockList.length === 0) {
        return {};
    }

    logger.info(`allStockList.length = ${allStockList.length}`)

    for (let i = 0; i < allStockList.length; i++) {
        const stockObj = allStockList[i].dataValues;
        let yahooHttpData: string = await $fetch(`https://finance.yahoo.co.jp/quote/${stockObj.stockCode}.T`);
        yahooHttpData = yahooHttpData.substring(yahooHttpData.indexOf("__PRELOADED_STATE__") + "__PRELOADED_STATE__".length + 2);
        yahooHttpData = yahooHttpData.substring(0, yahooHttpData.indexOf("</script>"));
        const dataObj = JSON.parse(yahooHttpData);

        await models.stockpricehistory.create({
            market: stockObj.market,
            stockCode: stockObj.stockCode,
            priceDate: today.format("YYYYMMDD"),
            priceTime: today.format("HHmmss"),
            lowPrice: dataObj.mainStocksDetail.detail.lowPrice.replace(",", ""),
            highPrice: dataObj.mainStocksDetail.detail.highPrice.replace(",", ""),
            price: dataObj.mainStocksPriceBoard.priceBoard.price.replace(",", ""),
            priceChangeAmt: dataObj.mainStocksPriceBoard.priceBoard.priceChange.replace(",", ""),
            priceChangeRate: dataObj.mainStocksPriceBoard.priceBoard.priceChangeRate.replace(",", ""),
        });
    }

    logger.info(`end!!`);
    return "end!!";
}
