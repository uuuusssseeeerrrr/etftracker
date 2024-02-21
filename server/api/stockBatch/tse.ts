import dayjs from 'dayjs';

import { getKisApiData } from './kisApi';
import getStockData from './stockIF'
import { models } from '../../../models';
import { logger } from '../../../pino.config'

const market = "TSE";

export const getTSEStockData: getStockData = async (accessToken: string) => {
    const today = dayjs();
    const stockListArray = await models.stockList.findAll({
        where: {
            market
        }
    });

    logger.info(`allStockList.length = ${stockListArray.length}`)

    for (let i = 0; i < stockListArray.length; i++) {
        const stockObj = stockListArray[i].dataValues;
        const stockDataObj = await getKisApiData(market, stockObj.stockCode, accessToken);

        await models.stockPriceHistory.create({
            market: 'TSE',
            stockCode: stockObj.stockCode,
            open: stockDataObj.open,
            high: stockDataObj.high,
            low: stockDataObj.low,
            price: stockDataObj.price,
            lastDayPrice: stockDataObj.lastDayPrice,
            tomv: stockDataObj.tomv,
            h52P: stockDataObj.h52P,
            l52P: stockDataObj.l52P,
            perx: stockDataObj.perx,
            pbrx: stockDataObj.pbrx,
            epsx: stockDataObj.epsx,
            bpsx: stockDataObj.bpsx,
            tXprc: stockDataObj.t_Xprc,
            tXdif: stockDataObj.t_Xdif,
            tXrat: stockDataObj.t_Xrat,
            pXprc: stockDataObj.p_Xprc,
            pXdif: stockDataObj.p_Xdif,
            pXrat: stockDataObj.p_Xrat,
            tRate: stockDataObj.t_Rate,
            tXsgn: stockDataObj.t_Xsgn,
            pXsng: stockDataObj.p_Xsng,
            eIcod: stockDataObj.e_Icod,
            regUnixtime: today.unix()
        });
    }

    logger.info(`end!!`);
    return true;
}
